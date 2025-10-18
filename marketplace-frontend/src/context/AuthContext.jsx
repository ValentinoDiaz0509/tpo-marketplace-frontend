import { createContext, useState, useEffect, useContext } from "react";
import { getRole } from "../utils/decodeJwt";
import { fetchUserProfileAPI, fetchWishlistAPI, addToWishlistAPI } from "../utils/api";

// 1. Crear el Contexto
export const AuthContext = createContext();

// 2. Crear un Hook personalizado para consumir el contexto fácilmente
export const useAuth = () => {
    return useContext(AuthContext);
};

// 3. Crear el Proveedor del Contexto
export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    // Este useEffect es la única fuente de verdad para cargar datos del usuario.
    // Se ejecuta al cargar la página o cada vez que el 'token' cambia (al hacer login/logout).
    useEffect(() => {
        const loadUserData = async () => {
            if (token) {
                try {
                    // Pedimos los datos del perfil y la wishlist en paralelo para más velocidad
                    const [userData, wishlistData] = await Promise.all([
                        fetchUserProfileAPI(),
                        fetchWishlistAPI()
                    ]);
                    
                    setUser(userData);
                    setRole(userData?.role ?? getRole(token));
                    setWishlist(wishlistData || []);
                } catch (error) {
                    console.error("Error al cargar datos del usuario, token inválido.", error);
                    // Si hay un error (ej: token expirado), limpiamos todo.
                    logout();
                }
            }
            setLoading(false);
        };
        
        loadUserData();
    }, [token]);

    // La función login ahora solo se encarga de actualizar el token.
    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    // La función logout limpia todo.
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setRole(null);
        setWishlist([]);
    };
    
    // Función para agregar a la wishlist, actualiza el estado localmente.
    const addGameToWishlist = async (gameId) => {
        try {
            const updatedWishlist = await addToWishlistAPI(gameId);
            setWishlist(updatedWishlist);
        } catch (error) {
            console.error("No se pudo agregar el juego a la wishlist desde el contexto.", error);
        }
    };
    
    const value = {
        token,
        user,
        role,
        loading,
        wishlist,
        login,
        logout,
        addGameToWishlist,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
