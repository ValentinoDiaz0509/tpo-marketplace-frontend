import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPasswordAPI } from "../../utils/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Mostramos un mensaje genérico por seguridad, sin importar el resultado de la API.
    setFeedback({
      message: "Si tu correo electrónico está en nuestros registros, recibirás un enlace para restablecer tu contraseña en breve.",
      type: "success"
    });

    try {
      await forgotPasswordAPI(email);
    } catch (error) {
      // Internamente podemos registrar el error, pero no le mostramos nada diferente al usuario
      console.error("Error en la solicitud de forgot-password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden font-display bg-background-dark">
      {/* Fondo con imagen difuminada (opcional, igual que en Login) */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-center bg-no-repeat bg-cover" 
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1593305842742-5624d3a245a4?q=80&w=2070&auto=format&fit=crop")',
            filter: 'blur(4px) brightness(0.7)'
          }}
        ></div>
      </div>
      
      <form onSubmit={handleSubmit} className="relative z-10 flex w-full max-w-md flex-col items-center rounded-xl bg-gray-900/70 p-8 backdrop-blur-sm text-white">
        <h1 className="tracking-light text-3xl font-bold leading-tight text-center pb-6 pt-2">Recuperar Contraseña</h1>
        <p className="text-gray-400 text-center mb-6 text-sm">Ingresa tu correo electrónico y te enviaremos un enlace para que puedas volver a entrar a tu cuenta.</p>
        
        {feedback.message ? (
          <div className={`p-4 rounded-lg mb-4 w-full text-center text-sm ${feedback.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-400'}`}>
            {feedback.message}
          </div>
        ) : (
          <div className="w-full space-y-4">
            <div>
              <label className="flex flex-col w-full flex-1">
                <p className="text-base font-medium leading-normal pb-2">Correo Electrónico</p>
                <div className="flex w-full flex-1 items-stretch rounded-lg">
                  <div className="text-[#b7cb90] flex border-none bg-[#3c4922] items-center justify-center pl-4 rounded-l-lg">
                    <span className="material-symbols-outlined">alternate_email</span>
                  </div>
                  <input 
                    className="form-input flex w-full min-w-0 flex-1 rounded-r-lg text-white focus:outline-none focus:ring-2 focus:ring-primary border-none bg-[#3c4922] h-14 placeholder:text-[#b7cb90] p-4 text-base" 
                    placeholder="tu@email.com" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </label>
            </div>
          </div>
        )}
        
        <div className="w-full pt-6">
          <button 
            type="submit" 
            className="flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-primary text-background-dark text-base font-bold transition-colors disabled:bg-primary/50 disabled:cursor-not-allowed"
            disabled={loading || feedback.message} // Deshabilita si está cargando o si ya se mostró el mensaje
          >
            <span className="truncate">
              {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
            </span>
          </button>
        </div>
        
        <div className="w-full text-center mt-6">
          <Link to="/login" className="font-bold text-primary hover:text-primary/90 transition-colors text-sm">
            Volver a Iniciar Sesión
          </Link>
        </div>
      </form>
    </div>
  );
}
