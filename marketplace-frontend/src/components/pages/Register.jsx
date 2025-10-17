import { useState } from "react";
import { fetchData } from "../../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

  
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return; // Detenemos la ejecución si no coinciden
    }

    setLoading(true); // Iniciar la carga

    try {
      
      const { confirmPassword, ...dataToSend } = form;

      await fetchData("/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify(dataToSend),
      });

    
      navigate("/login"); 
      

    } catch (err) {
      setError("Error al registrar. El correo o usuario ya puede estar en uso.");
    } finally {
      setLoading(false); // Detener la carga
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#1d2310] font-display py-10">
      <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col space-y-6 rounded-xl bg-[#222222] bg-opacity-80 p-8">
        <div className="flex justify-center">
            {/* un logo? */}
            <h1 className="text-white text-2xl font-bold">Uade Games</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em] text-center">Crea tu Cuenta</p>
        </div>
        
        {/* Mostrar error si existe */}
        {error && (
            <div className="w-full p-3 bg-red-500/20 text-red-400 text-center rounded-lg">
                {error}
            </div>
        )}

        <div className="flex flex-col gap-4">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">Nombre de Usuario</p>
            <input name="username" onChange={handleChange} value={form.username} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary border-none bg-[#3c4922] h-14 placeholder:text-[#b7cb90] p-4 text-base font-normal leading-normal" placeholder="Nombre de Usuario" required/>
          </label>
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">Correo Electrónico</p>
            <input name="email" onChange={handleChange} value={form.email} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary border-none bg-[#3c4922] h-14 placeholder:text-[#b7cb90] p-4 text-base font-normal leading-normal" placeholder="Correo Electrónico" type="email" required/>
          </label>
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">Contraseña</p>
            <input name="password" onChange={handleChange} value={form.password} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary border-none bg-[#3c4922] h-14 placeholder:text-[#b7cb90] p-4 text-base font-normal leading-normal" placeholder="Contraseña" type="password" required/>
          </label>
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">Confirmar Contraseña</p>
            <input name="confirmPassword" onChange={handleChange} value={form.confirmPassword} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary border-none bg-[#3c4922] h-14 placeholder:text-[#b7cb90] p-4 text-base font-normal leading-normal" placeholder="Confirmar Contraseña" type="password" required/>
          </label>
        </div>

        <button type="submit" className="flex items-center justify-center w-full h-14 rounded-lg bg-primary text-black font-bold text-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-dark disabled:bg-primary/50 disabled:cursor-not-allowed" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Cuenta'}
        </button>

        <p className="text-center text-white">
          ¿Ya tienes una cuenta? <Link className="font-bold text-primary hover:underline" to="/login">Inicia sesión aquí</Link>
        </p>
      </form>
    </div>
  );
}
