import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AdminNavbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/users">Usuarios</Link>
      <Link to="/games">Juegos</Link>
      <Link to="/categories">Categorías</Link>
      <button onClick={logout}>Cerrar sesión</button>
    </nav>
  );
}
