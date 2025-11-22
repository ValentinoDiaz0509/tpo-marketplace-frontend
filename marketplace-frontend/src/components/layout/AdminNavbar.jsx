import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "2rem",
        margin: "2rem 0",
        fontSize: "30px",
        justifyContent: "center",
      }}
    >
      <Link to="users" className="bg-[#32CD32] px-4 py-2 rounded-lg font-bold">
        USUARIOS
      </Link>
      <Link to="games" className="bg-[#32CD32] px-4 py-2 rounded-lg font-bold">
        JUEGOS
      </Link>
      <Link
        to="categories"
        className="bg-[#32CD32] px-4 py-2 rounded-lg font-bold"
      >
        CATEGORÍAS
      </Link>
      {/* <-- NUEVO ENLACE A PEDIDOS --> */}
      <Link to="orders" className="bg-[#32CD32] px-4 py-2 rounded-lg font-bold">
        PEDIDOS
      </Link>
      {/* <-- FIN NUEVO ENLACE --> */}
    </nav>
  );
}
