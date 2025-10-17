import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/admin/games', icon: 'sports_esports', label: 'Gestión de Juegos' },
  { to: '/admin/categories', icon: 'category', label: 'Gestión de Categorías' },
  { to: '/admin/users', icon: 'group', label: 'Gestión de Usuarios' },
];

const NavItem = ({ to, icon, label }) => {
  const activeClass = "bg-primary text-white";
  const inactiveClass = "text-gray-300 hover:bg-primary/20 hover:text-primary";
  return (
    <NavLink to={to} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? activeClass : inactiveClass}`}>
      <span className="material-symbols-outlined">{icon}</span>
      <p className="text-sm font-medium">{label}</p>
    </NavLink>
  );
};

export default function AdminNavbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <Link to="users">Usuarios</Link>
      <Link to="games">Juegos</Link>
      <Link to="categories">Categorías</Link>
    </nav>
  );
}
