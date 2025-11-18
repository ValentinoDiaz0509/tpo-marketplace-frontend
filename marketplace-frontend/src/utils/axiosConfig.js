import axios from "axios";

// Configurar la URL base
axios.defaults.baseURL = "http://localhost:4002";

export const setupAxiosInterceptors = (token) => {
  if (token) {
    // Establece el token para todas las solicitudes futuras
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Limpia el token si no hay sesión
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Opcionalmente, puedes exportar la instancia ya configurada
export default axios;
