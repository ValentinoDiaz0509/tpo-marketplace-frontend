import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../../utils/api";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await fetchData("/api/v1/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setMessage("Si el correo existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña en unos minutos.");
      toast.success("Petición enviada con éxito.");
    } catch (err) {
      // Incluso si hay un error, mostramos un mensaje genérico por seguridad
      setMessage("Si el correo existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña en unos minutos.");
      console.error("Error en forgot-password:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden font-display p-4 sm:p-6 bg-gray-900">
      {/* Fondo con Imagen (Estilos en línea fuera de la función return) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542751371-292c35b8e367?q=80&w=2070&auto=format&fit=crop')`,
          filter: 'blur(4px) brightness(0.6)'
        }}
      ></div>

      {/* Panel de Recuperación (Centrado y apilable) */}
      <div className="relative z-10 flex w-full max-w-sm sm:max-w-md flex-col items-center rounded-xl bg-gray-800/80 p-8 backdrop-blur-md border border-gray-700 text-white shadow-2xl">
        <h1 className="text-3xl font-bold text-center pb-4">Recuperar Contraseña</h1>
        <p className="text-gray-400 text-center pb-8">Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
        
        {message ? (
          <p className="text-green-400 text-center">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <label className="flex flex-col w-full">
              <p className="text-white text-base font-medium leading-normal pb-2">Correo Electrónico</p>
              <div className="flex w-full items-stretch rounded-lg bg-gray-700">
                <div className="text-gray-400 flex items-center justify-center pl-4">
                  <span className="material-symbols-outlined">alternate_email</span>
                </div>
                <input
                  className="flex-1 resize-none overflow-hidden rounded-r-lg text-white focus:outline-none focus:ring-2 focus:ring-[#32CD32] border-none bg-transparent h-12 placeholder:text-gray-400 p-4 text-base font-normal"
                  placeholder="tu@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </label>
            <div className="w-full pt-4">
              <button type="submit" className="flex w-full items-center justify-center rounded-lg h-12 bg-[#32CD32] text-black font-bold hover:bg-green-700" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar Enlace'}
              </button>
            </div>
          </form>
        )}
        
        <div className="w-full text-center mt-6">
          <Link to="/login" className="text-sm text-gray-400 hover:text-white">
            Volver a Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
