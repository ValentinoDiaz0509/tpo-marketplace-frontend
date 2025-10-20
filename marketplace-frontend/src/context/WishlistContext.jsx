// src/context/WishlistContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchData } from '../utils/api'; // Asegúrate que la ruta a tu api.js sea correcta

// 1. Creamos el Contexto
const WishlistContext = createContext();

// 2. Creamos un "Hook" para usar el contexto fácilmente en otros componentes
export const useWishlist = () => useContext(WishlistContext);

// 3. Creamos el "Proveedor" que contendrá toda la lógica
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token'); // Revisa si el usuario está logueado

  useEffect(() => {
    // Si hay un token, cargamos la wishlist del usuario
    if (token) {
      const loadWishlist = async () => {
        try {
          const userProfile = await fetchData('/profile/me');
          const wishlistData = await fetchData(`/wishlist/${userProfile.id}`);
          setWishlist(wishlistData);
        } catch (error) {
          console.error("Error al cargar la wishlist:", error);
        } finally {
          setLoading(false);
        }
      };
      loadWishlist();
    } else {
      setLoading(false); // Si no hay usuario, no hay nada que cargar
    }
  }, [token]);

  // Función para AÑADIR un juego a la wishlist
  const addToWishlist = async (gameId) => {
    if (!wishlist) return alert("Para agregar a tu wishlist, primero debes iniciar sesión.");
    try {
      const addedGame = await fetchData(`/wishlist/${wishlist.id}/add/${gameId}`, { method: 'POST' });
      // Actualizamos el estado para que se refleje en toda la aplicación
      setWishlist(current => ({ ...current, games: [...current.games, addedGame] }));
      alert('¡Juego añadido a tu lista de deseos!');
    } catch (error) {
      alert('No se pudo añadir el juego.');
    }
  };

  // El valor que compartimos con el resto de la app
  const value = { wishlist, addToWishlist, loading };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
