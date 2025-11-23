import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const { token, role } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="w-full px-4 sm:px-6 lg:px-8 bg-[#182634] shadow-xl border-b border-gray-700">
      <div className="w-full flex items-center justify-between py-4">
        <h2 className="text-2xl font-bold text-white">GameSphere</h2>
        
        {/* CLAVE RESPONSIVE: Los enlaces se ocultan en móvil y aparecen en desktop */}
        <nav className="hidden md:flex items-center gap-6 text-gray-300">
          {token ? (
            <>
              {/* Se asegura que el catálogo esté visible para ambos roles */}
              <Link to="/" className="hover:text-[#32CD32] transition">Catálogo</Link> 

              {role === "USER" && <Link to="/wishlist" className="hover:text-[#32CD32] transition">Wishlist</Link>}
              {role === "USER" && (
                <Link to="/shoppingCart" className="hover:text-[#32CD32] transition">Carrito</Link>
              )}
              {role === "USER" && <Link to="/orders" className="hover:text-[#32CD32] transition">Mis compras</Link>}

              <Link to="/userProfile" className="hover:text-[#32CD32] transition">Mi perfil</Link>
              {role === "ADMIN" && (
                <Link to="/admin/dashboard" className="text-[#32CD32] font-bold hover:text-green-400">Admin</Link>
              )}
              <button onClick={handleLogout} className="text-red-400 hover:text-red-500 transition">Cerrar sesión</button>
            </>
          ) : (
            <>
              {/* Enlaces de no logueado */}
              <Link to="/" className="hover:text-[#32CD32] transition">Catálogo</Link>
              <Link
                className="text-base font-medium text-white hover:text-[#32CD32]"
                to="/login"
              >
                Iniciar sesión
              </Link>
              <Link to="/register" className="text-white hover:text-[#32CD32]">Registrarse</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
