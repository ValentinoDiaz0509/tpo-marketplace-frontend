import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, requiredRole }) => {
  const { token, role, loading } = useContext(AuthContext);

  // Mientras se verifica la autenticación, mostramos un loader.
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (requiredRole == "USER") {
    return token ? children : <Navigate to="/login" />;
  }

  if (requiredRole == "ADMIN") {
    return token && role == "ADMIN" ? children : <Navigate to="/" />;
  }
};

export default PrivateRoute;
