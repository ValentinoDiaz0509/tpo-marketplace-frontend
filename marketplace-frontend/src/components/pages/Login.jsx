import { useState, useContext } from "react";
import { fetchData } from "../../utils/api"; // Tu función de API existente
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom"; // Importamos Link para la navegación

export default function Login() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos
    setLoading(true); // Iniciar la carga

    try {
      const res = await fetchData("/api/v1/auth/authenticate", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (res.access_token) {
        login(res.access_token); // Tu lógica del contexto
        navigate("/"); // Redirigir al home
      } else {
        setError("La respuesta del servidor no es válida.");
      }
    } catch (err) {
      setError("Credenciales incorrectas. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false); // Detener la carga, tanto si hay éxito como si hay error
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden font-display">
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-center bg-no-repeat bg-cover aspect-auto" 
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1593305842742-5624d3a245a4?q=80&w=2070&auto=format&fit=crop")',
            filter: 'blur(4px) brightness(0.7)'
          }}
        ></div>
      </div>
      
      <form onSubmit={handleLogin} className="relative z-10 flex w-full max-w-md flex-col items-center rounded-xl bg-gray-900/70 p-8 backdrop-blur-sm">
        <div className="mb-6 flex flex-col items-center">
            <h1 className="text-white text-2xl font-bold">Uade Games</h1>
        </div>
        <h1 className="text-white tracking-light text-[32px] font-bold leading-tight text-center pb-6 pt-2">Bienvenido de vuelta</h1>
        
        {/* Mostrar error si existe */}
        {error && (
            <div className="w-full mb-4 p-3 bg-red-500/20 text-red-400 text-center rounded-lg">
                {error}
            </div>
        )}

        <div className="w-full space-y-4">
          <div className="flex flex-col">
            <label className="flex flex-col w-full flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">Correo Electrónico</p>
              <div className="flex w-full flex-1 items-stretch rounded-lg">
                <div className="text-[#b7cb90] flex border-none bg-[#3c4222] items-center justify-center pl-4 rounded-l-lg border-r-0">
                  <span className="material-symbols-outlined">alternate_email</span>
                </div>
                <input 
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-white focus:outline-none focus:ring-2 focus:ring-primary border-none bg-[#3c4922] h-14 placeholder:text-[#b7cb90] p-4 text-base font-normal leading-normal" 
                  placeholder="tu@email.com" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </label>
          </div>
          <div className="flex flex-col">
            <label className="flex flex-col w-full flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">Contraseña</p>
              <div className="flex w-full flex-1 items-stretch rounded-lg">
                <div className="text-[#b7cb90] flex border-none bg-[#3c4922] items-center justify-center pl-4 rounded-l-lg border-r-0">
                  <span className="material-symbols-outlined">lock</span>
                </div>
                <input 
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-white focus:outline-none focus:ring-2 focus:ring-primary border-none bg-[#3c4922] h-14 placeholder:text-[#b7cb90] p-4 text-base font-normal leading-normal" 
                  placeholder="Contraseña" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </label>
          </div>
        </div>
        
        <div className="w-full pt-6">
          <button 
            type="submit" 
            className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-background-dark text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors disabled:bg-primary/50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <span className="truncate">
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </span>
          </button>
        </div>
        
        <div className="w-full text-center mt-4">
          <Link to="/forgot-password" className="text-sm text-gray-400 hover:text-white transition-colors">¿Olvidaste tu contraseña?</Link>
        </div>
        <div className="w-full text-center mt-6">
          <p className="text-sm text-gray-400">¿No tienes una cuenta? <Link to="/register" className="font-bold text-primary hover:text-primary/90 transition-colors">Regístrate aquí</Link></p>
        </div>
      </form>
    </div>
  );
}
