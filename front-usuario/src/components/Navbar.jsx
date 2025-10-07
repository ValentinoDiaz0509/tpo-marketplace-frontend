import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/games">Juegos</Link>
      <Link to="/wishlist">Wishlist</Link>
      <Link to="/orders">Pedidos</Link>
      {user ? (
        <>
          <Link to="/profile">Mi perfil</Link>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/register">Registrarse</Link>
        </>
      )}
    </nav>
  );
}
