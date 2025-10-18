import { jwtDecode } from "jwt-decode";

const getRole = (token) => {
  if (!token) return null;
  try {
    const payload = jwtDecode(token);
    return payload?.role ?? null;
  } catch (err) {
    console.error("El token es inválido o expiró, no se pudo decodificar.", err);
    return null;
  }
};

export { getRole };
