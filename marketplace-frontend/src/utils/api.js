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

export const updateUserRoleAPI = (userId, role) => {
  return fetchData(`/api/v1/admin/usuarios/${userId}/role`, {
    method: 'PUT',
    body: JSON.stringify({ role }),
  });
};

export const deleteUserAPI = (userId) => {
  return fetchData(`/api/v1/admin/usuarios/${userId}`, {
    method: 'DELETE',
  });
};
export const createCategoryAPI = (categoryData) => {
  return fetchData("/api/v1/admin/categories", {
    method: 'POST',
    body: JSON.stringify(categoryData),
  });
};

export const updateCategoryAPI = (categoryId, categoryData) => {
  return fetchData(`/api/v1/admin/categories/${categoryId}`, {
    method: 'PUT',
    body: JSON.stringify(categoryData),
  });
};

export const deleteCategoryAPI = (categoryId) => {
  return fetchData(`/api/v1/admin/categories/${categoryId}`, {
    method: 'DELETE',
  });
};


export const deleteGameAPI = (gameId) => {
  return fetchData(`/api/v1/admin/games/${gameId}`, { // Endpoint de ejemplo para borrar
    method: 'DELETE',
  });
};

export const fetchDashboardStatsAPI = () => {
  return fetchData("/api/v1/admin/stats"); // Asumimos este nuevo endpoint
};

export const fetchWishlistAPI = () => {
  return fetchData("/api/v1/wishlist");
};

export const fetchCategoriesAPI = () => {
  return fetchData("/api/v1/categories");
};

export const createGameAPI = (gameData) => {
  return fetchData("/api/v1/admin/games", { // Endpoint de ejemplo para crear
    method: 'POST',
    body: JSON.stringify(gameData),
  });
};

export const fetchCategoryByIdAPI = (categoryId) => {
  return fetchData(`/api/v1/admin/categories/${categoryId}`); // Endpoint de ejemplo
};

export const fetchGameForEditAPI = (gameId) => {
  return fetchData(`/games/admin/${gameId}`); // Asumiendo este endpoint
};

export const updateGameAPI = (gameId, data) => {
  const isFormData = data instanceof FormData;
  const token = localStorage.getItem("token");
  
  return fetch(`${API_URL}/games/admin/update/${gameId}`, { // Endpoint de ejemplo
    method: 'PUT',
    headers: {
      // Si es FormData, el navegador pone el Content-Type correcto automáticamente.
      // Si es JSON, lo especificamos nosotros.
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...(token && { "Authorization": `Bearer ${token}` })
    },
    body: isFormData ? data : JSON.stringify(data),
  });
};


export const addToWishlistAPI = (gameId) => {
  return fetchData("/api/v1/wishlist", {
    method: 'POST',
    body: JSON.stringify({ gameId: gameId }),
  });
};
