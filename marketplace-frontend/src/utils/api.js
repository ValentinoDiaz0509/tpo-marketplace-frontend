export const API_URL = "http://localhost:4002";

export async function fetchData(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  // If the caller provided a FormData body, don't set Content-Type (browser will set the multipart boundary)
  const isFormData = options && options.body && typeof FormData !== "undefined" && options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  if (!res.ok) throw new Error(`Error ${res.status}`);

  // No content (204) — return null so callers don't try to parse JSON
  if (res.status === 204 || res.status === 205) return null;

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }

  // Fallback: try to return text or parseable JSON
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}
