import { jwtDecode } from "jwt-decode";

const getRole = (token) => {
  if (token) {
    try {
      const payload = jwtDecode(token);
      const userRole = payload.role;
      return userRole;
    } catch {
      console.error("El token es inválido o expiró, no se pudo decodificar.");
    }
  }
};

const getUserId = (token) => {
  if (token) {
    try {
      const payload = jwtDecode(token);
      const userId = payload.userId;
      return userId;
    } catch {
      console.error("El token es inválido o expiró, no se pudo decodificar.");
    }
  }
};

export { getRole, getUserId };
