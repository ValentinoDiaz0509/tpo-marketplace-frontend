import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({ isAllowed, redirectTo = "/login" }) => {
  const { user, loading } = useContext(AuthContext);

  // Mientras se verifica la autenticación, mostramos un loader.
  // Esto evita redirecciones inesperadas al recargar la página.
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si el usuario no tiene los permisos, lo redirigimos.
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }

  // Si tiene permisos, mostramos el contenido de la ruta.
  return <Outlet />;
};
