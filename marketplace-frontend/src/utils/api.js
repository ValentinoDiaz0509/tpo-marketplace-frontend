// --- CONFIGURACIÓN PRINCIPAL ---
// Lee la URL del backend desde una variable de entorno para mayor seguridad y flexibilidad.
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4002";

/**
 * Función genérica para hacer peticiones a la API.
 * Automáticamente añade el token de autorización si existe.
 */
export async function fetchData(endpoint, options = {}) {
    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
    const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    if (!res.ok) {
        const errorBody = await res.json().catch(() => ({ message: `Error ${res.status}: ${res.statusText}` }));
        throw new Error(errorBody.message);
    }
    return res.json();
}

// --- AUTHENTICATION API (AuthController) ---
export const loginAPI = (credentials) => fetchData("/api/v1/auth/authenticate", { method: 'POST', body: JSON.stringify(credentials) });
export const registerAPI = (registerData) => fetchData("/api/v1/auth/register", { method: 'POST', body: JSON.stringify(registerData) });
export const forgotPasswordAPI = (email) => fetchData("/api/v1/auth/forgot-password", { method: 'POST', body: JSON.stringify({ email }) });


// --- USER API (UserController / AdminController) ---
export const fetchUserProfileAPI = () => fetchData("/api/v1/users/me");
export const updateUserAPI = (userData) => fetchData("/api/v1/users/me", { method: 'PUT', body: JSON.stringify(userData) });
export const fetchAllUsersAPI = () => fetchData("/api/v1/admin/usuarios");
export const updateUserRoleAPI = (userId, newRole) => fetchData(`/api/v1/admin/usuarios/${userId}/rol`, { method: 'PUT', body: JSON.stringify({ nuevoRol: newRole }) });
export const deleteUserAPI = (userId) => fetchData(`/api/v1/admin/usuarios/${userId}`, { method: 'DELETE' });


// --- GAME API (GameController) ---
export const fetchAvailableGamesAPI = () => fetchData("/games/get/available");
export const fetchAllGamesForAdminAPI = () => fetchData("/games/admin");
export const fetchGameByIdAPI = (gameId) => fetchData(`/games/get/${gameId}`);
export const deleteGameAPI = (gameId) => fetchData(`/games/admin/${gameId}`, { method: 'DELETE' });


// --- CATEGORY API (CategoryController) ---
export const fetchCategoriesAPI = () => fetchData("/categories");
export const fetchCategoryByIdAPI = (categoryId) => fetchData(`/categories/${categoryId}`);
export const createCategoryAPI = (categoryData) => fetchData("/categories/create", { method: 'POST', body: JSON.stringify(categoryData) });
export const updateCategoryAPI = (categoryId, categoryData) => fetchData(`/categories/${categoryId}`, { method: 'PUT', body: JSON.stringify(categoryData) });
export const deleteCategoryAPI = (categoryId) => fetchData(`/categories/${categoryId}`, { method: 'DELETE' });


// --- WISHLIST API (WishlistController) ---
export const fetchWishlistAPI = () => fetchData("/wishlist/me");
export const addToWishlistAPI = (gameId) => fetchData("/wishlist/me/add", { method: 'PUT', body: JSON.stringify({ gameId }) });


// --- ORDER API (OrderController) ---
export const fetchOrdersAPI = () => fetchData("/order/me");
