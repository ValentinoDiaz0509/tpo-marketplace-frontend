import { Link } from "react-router-dom";

export default function AdminNavbar() {
  return (
    // CLAVE RESPONSIVE: Usa flex-wrap para que los botones se apilen en móvil
    <nav
      className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 p-4 sm:p-6 bg-[#182634] shadow-lg border-b border-gray-700"
    >
      <Link 
        to="users" 
        className="bg-[#32CD32] px-4 py-2 rounded-lg font-bold text-base text-black hover:bg-green-600 transition duration-150"
      >
        USUARIOS
      </Link>
      <Link 
        to="games" 
        className="bg-[#32CD32] px-4 py-2 rounded-lg font-bold text-base text-black hover:bg-green-600 transition duration-150"
      >
        JUEGOS
      </Link>
      <Link
        to="categories"
        className="bg-[#32CD32] px-4 py-2 rounded-lg font-bold text-base text-black hover:bg-green-600 transition duration-150"
      >
        CATEGORÍAS
      </Link>
      <Link 
        to="orders" 
        className="bg-[#32CD32] px-4 py-2 rounded-lg font-bold text-base text-black hover:bg-green-600 transition duration-150"
      >
        PEDIDOS
      </Link>
    </nav>
  );
}
