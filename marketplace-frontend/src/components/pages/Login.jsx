import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import { loginAPI } from "../../utils/api"; // Usamos la función específica de la API

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Llamamos a la función específica de la API para más claridad
      const data = await loginAPI({ email, password });
      
      if (data.access_token) {
        login(data.access_token); // El contexto guarda el token
        toast.success('¡Bienvenido de vuelta!');
        navigate("/"); // Redirige al home
      } else {
        // Este caso es raro si la API está bien hecha, pero por si acaso
        throw new Error("La respuesta del servidor no contenía un token.");
      }
    } catch (error) {
      // Usamos toast para mostrar el error de forma elegante
      toast.error(error.message || "Credenciales incorrectas. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // --- CONTENEDOR PRINCIPAL (ESTO ES LO QUE FALTABA) ---
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden font-display bg-background-dark">
      
      {/* --- CAPA DE FONDO CON IMAGEN (ESTO TAMBIÉN FALTABA) --- */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-center bg-no-repeat bg-cover" 
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1555864408-5626a424266c?q=80&w=1932&auto=format&fit=crop")',
            filter: 'blur(4px) brightness(0.6)'
          }}
        ></div>
      </div>
      
      {/* --- EL FORMULARIO (ESTO ES LO QUE YA TENÍAS BIEN) --- */}
      <form onSubmit={handleSubmit} className="relative z-10 flex w-full max-w-md flex-col items-center rounded-xl bg-gray-900/70 p-8 backdrop-blur-sm text-white">
        <div className="mb-6">
            <span className="material-symbols-outlined text-5xl text-primary">check_circle</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight text-center pb-2">Bienvenido de vuelta</h1>
        <p className="text-gray-400 text-center mb-6 text-sm">Ingresá tus credenciales para acceder a tu cuenta.</p>

        <div className="w-full space-y-4">
          <div>
            <label htmlFor="email-input" className="block text-sm font-medium text-gray-300 pb-2">Correo Electrónico</label>
            <div className="flex w-full items-stretch">
              <span className="flex items-center justify-center pl-4 rounded-l-lg bg-[#3c4922] text-[#b7cb90]"><span className="material-symbols-outlined">alternate_email</span></span>
              <input 
                id="email-input"
                className="flex-1 rounded-r-lg text-white bg-[#3c4922] border-none h-14 placeholder:text-[#b7cb90] p-3 focus:ring-2 focus:ring-primary" 
                placeholder="tu@email.com" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password-input" className="block text-sm font-medium text-gray-300 pb-2">Contraseña</label>
            <div className="flex w-full items-stretch">
                <span className="flex items-center justify-center pl-4 rounded-l-lg bg-[#3c4922] text-[#b7cb90]"><span className="material-symbols-outlined">lock</span></span>
                <input 
                    id="password-input"
                    className="flex-1 rounded-r-lg text-white bg-[#3c4922] border-none h-14 placeholder:text-[#b7cb90] p-3 focus:ring-2 focus:ring-primary" 
                    placeholder="Contraseña" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
          </div>
        </div>
        
        <div className="w-full text-right mt-2">
            <Link to="/forgot-password" className="text-sm text-gray-400 hover:text-primary transition-colors">¿Olvidaste tu contraseña?</Link>
        </div>

        <div className="w-full pt-6">
          <button type="submit" className="flex w-full items-center justify-center rounded-lg h-12 px-5 bg-primary text-background-dark text-base font-bold transition-colors disabled:opacity-50" disabled={loading}>
            <span className="truncate">{loading ? 'Ingresando...' : 'Iniciar Sesión'}</span>
          </button>
        </div>
        
        <div className="w-full text-center mt-6">
          <p className="text-sm text-gray-400">¿No tienes una cuenta? <Link to="/register" className="font-bold text-primary hover:underline">Regístrate aquí</Link></p>
        </div>
      </form>
    </div>
  );
}
