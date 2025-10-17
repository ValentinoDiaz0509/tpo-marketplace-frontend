import { createContext, useState, useEffect } from "react";
import { getRole } from "../utils/decodeJwt";
import { fetchData, fetchWishlistAPI, addToWishlistAPI } from "../utils/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    async function loadUserAndWishlist() {
      if (storedToken) {
        setToken(storedToken);
        try {
          const user = await fetchData('/api/v1/users/me');
          setRole(user?.role ?? getRole(storedToken));
          // --- AÑADIDO: Carga la wishlist si el usuario se carga correctamente ---
          const wishlistData = await fetchWishlistAPI();
          setWishlist(wishlistData);
        } catch (err) {
          // Si hay error, limpiamos todo
          localStorage.removeItem('token');
          setToken(null);
          setRole(null);
          setWishlist([]); // Limpia la wishlist también
        }
      }
      setLoading(false);
    }
    loadUserAndWishlist();
  }, []);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    fetchData('/api/v1/users/me')
      .then(user => {
        setRole(user?.role ?? getRole(newToken));
        return fetchWishlistAPI(); // Llama para obtener la wishlist
      })
      .then(wishlistData => {
        setWishlist(wishlistData);
      })
      .catch(err => {
        console.error('Error al obtener datos post-login:', err);
        setRole(getRole(newToken));
      });
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setWishlist([]); // Limpia la wishlist al cerrar sesión
    localStorage.removeItem("token");
  };

  const addGameToWishlist = async (gameId) => {
    try {
      const updatedWishlist = await addToWishlistAPI(gameId);
      setWishlist(updatedWishlist); 
    } catch (error) {
      console.error("No se pudo agregar el juego a la wishlist desde el contexto.");
    }
  };

  const value = {
    token,
    role,
    loading,
    wishlist, 
    login,
    logout,
    addGameToWishlist, 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
