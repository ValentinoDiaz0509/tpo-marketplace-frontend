import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

export default function Navbar() {
 
  const { user, logout } = useAuth(); 

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#223649] bg-background-dark/80 px-10 py-3 backdrop-blur-sm">
      
      <Link to="/" className="flex items-center gap-4 text-white">
        <div className="size-8 text-lime-400">
          {/* SVG Logo */}
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path><path d="M2 7L12 12M12 22V12M22 7L12 12M17 4.5L7 9.5" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
        </div>
        <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">Uade Games</h2>
      </Link>

      
      <nav className="hidden md:flex items-center gap-6 text-base font-medium text-[#90adcb]">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-white" : "hover:text-white transition-colors"}>Catálogo</NavLink>
        
            <NavLink to="/wishlist" className={({ isActive }) => isActive ? "text-white" : "hover:text-white transition-colors"}>Wishlist</NavLink>
        )}
        
            <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "text-white" : "hover:text-white transition-colors"}>Admin</NavLink>
        )}
      </nav>

    
      <div className="flex flex-1 justify-end gap-4 items-center">
        
        <div className="flex gap-2">
          <Link to="/cart" className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#223649] text-white gap-2 text-sm font-bold min-w-0 px-2.5">
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="hidden md:inline">Carrito</span>
          </Link>
        </div>
        
        {user ? (
          <div className="flex items-center gap-3">
             <Link to="/profile">
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" style={{ backgroundImage: `url(${user.avatar || 'https://via.placeholder.com/40'})` }}></div>
             </Link>
             <button onClick={logout} className="text-sm bg-red-600/80 hover:bg-red-700/80 rounded-lg px-3 py-2 transition-colors">Salir</button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="flex items-center justify-center rounded-lg h-10 px-4 text-white font-bold text-sm">
                Iniciar Sesión
            </Link>
            <Link to="/register" className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-background-dark font-bold text-sm">
                Registrarse
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
