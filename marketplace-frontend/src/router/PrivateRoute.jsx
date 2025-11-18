import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, requiredRole }) => {
  const { token, role, loading } = useSelector((state) => state.auth);

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
