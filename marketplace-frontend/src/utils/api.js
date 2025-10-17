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



export const fetchWishlistAPI = () => {
  return fetchData("/api/v1/wishlist");
};


export const addToWishlistAPI = (gameId) => {
  return fetchData("/api/v1/wishlist", {
    method: 'POST',
    body: JSON.stringify({ gameId: gameId }),
  });
};
