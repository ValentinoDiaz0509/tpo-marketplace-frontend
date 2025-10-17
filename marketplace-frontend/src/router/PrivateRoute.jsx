import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, requiredRole }) => {
  const { token, role, loading } = useContext(AuthContext);

  // Mientras se verifica la autenticación, mostramos un loader.
  if (loading) {
    return <div>Cargando...</div>;
  }
  // MODIFIED: Added explicit handling when no role is required, strict comparisons and a fallback
  // Reason: avoids returning undefined and makes behavior explicit.
  if (!requiredRole) {
    // No role required, allow access.
    return children;
  }

  if (requiredRole === "USER") {
    return token ? children : <Navigate to="/login" />;
  }

  if (requiredRole === "ADMIN") {
    return token && role === "ADMIN" ? children : <Navigate to="/" />;
  }

  // Fallback: deny access by redirecting to login
  return <Navigate to="/login" />;
};

export default PrivateRoute;
