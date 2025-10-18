export const API_URL = "http://localhost:4002"; 

export async function fetchData(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({ message: `Error ${res.status}` }));
    throw new Error(errorBody.message);
  }
  return res.json();
}

// --- Authentication API (AuthController) ---
export const loginAPI = (credentials) => {
  return fetchData("/api/v1/auth/authenticate", {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const registerAPI = (registerData) => {
  return fetchData("/api/v1/auth/register", {
    method: 'POST',
    body: JSON.stringify(registerData),
  });
};

// --- User API (UserController) ---
export const fetchUserProfileAPI = () => {
    return fetchData("/api/v1/users/me");
};

export const updateUserAPI = (userData) => {
    return fetchData("/api/v1/users/me", {
        method: 'PUT',
        body: JSON.stringify(userData),
    });
};

// --- Admin API (AdminController) ---
export const fetchAllUsersAPI = () => {
    return fetchData("/api/v1/admin/usuarios");
};

export const updateUserRoleAPI = (userId, newRole) => {
    return fetchData(`/api/v1/admin/usuarios/${userId}/rol`, {
        method: 'PUT',
        body: JSON.stringify({ nuevoRol: newRole }),
    });
};

// --- Game API (GameController) ---
export const fetchAvailableGamesAPI = () => {
    return fetchData("/games/get/available");
};

export const fetchAllGamesForAdminAPI = () => {
    return fetchData("/games/admin");
};

export const fetchGameByIdAPI = (gameId) => {
    // NOTA: Este endpoint falta en tu GameController. Ver plan de acción abajo.
    return fetchData(`/games/get/${gameId}`);
};

export const deleteGameAPI = (gameId) => {
    return fetchData(`/games/admin/${gameId}`, { method: 'DELETE' });
};

// ... Las funciones para crear y editar juegos con imagen son más complejas
// y las manejamos directamente en los componentes con fetch, lo cual está bien.

// --- Category API (CategoryController) ---
export const fetchCategoriesAPI = () => {
    return fetchData("/categories");
};

export const createCategoryAPI = (categoryData) => {
    return fetchData("/categories/create", {
        method: 'POST',
        body: JSON.stringify(categoryData),
    });
};

export const updateCategoryAPI = (categoryId, categoryData) => {
    return fetchData(`/categories/${categoryId}`, {
        method: 'PUT',
        body: JSON.stringify(categoryData),
    });
};

export const deleteCategoryAPI = (categoryId) => {
    return fetchData(`/categories/${categoryId}`, { method: 'DELETE' });
};

// --- Wishlist API (WishlistController) ---
export const fetchWishlistAPI = () => {
    // NOTA: Este endpoint falta en tu WishlistController. Ver plan de acción.
    return fetchData("/wishlist/me");
};

export const addToWishlistAPI = (gameId) => {
    // NOTA: Este endpoint falta en tu WishlistController. Ver plan de acción.
    return fetchData("/wishlist/me/add", {
        method: 'PUT',
        body: JSON.stringify({ gameId }),
    });
};

// --- Order API (OrderController) ---
export const fetchOrdersAPI = () => {
    // NOTA: Este endpoint falta en tu OrderController. Ver plan de acción.
    return fetchData("/order/me");
};
