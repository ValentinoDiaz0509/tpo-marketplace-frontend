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
    <header className="w-full px-4 sm:px-6 lg:px-8">
      <div className="w-full flex items-center justify-between py-4 border-b border-border-light dark:border-border-dark">
        <h2 class="text-2xl font-bold">GameSphere</h2>
        <nav className="hidden md:flex items-center gap-6">
          {token ? (
            <>
              {((role && role == "USER") || role == "ADMIN") && (
                <Link to="/">Catálogo</Link>
              )}
              {role && role == "USER" && <Link to="/wishlist">Wishlist</Link>}
              {role && role == "USER" && (
                <Link to="/shoppingCart">Carrito</Link>
              )}
              {role && role == "USER" && <Link to="/orders">Mis compras</Link>}

              <Link to="/userProfile">Mi perfil</Link>
              {role && role == "ADMIN" && (
                <Link to="/admin/dashboard">Admin</Link>
              )}
              <button onClick={handleLogout}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link
                className="text-base font-medium text-card-dark hover:text-primary"
                to="/login"
              >
                Iniciar sesión
              </Link>
              <Link to="/register">Registrarse</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
