import { useState } from "react";
import { fetchData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // 1. Importar toast
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetchData("/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });

      // 2. Notificación de éxito
      toast.success("¡Registro exitoso! Ahora podés iniciar sesión.");

      navigate("/login"); // Redirigimos al login para que el usuario ingrese
    } catch (err) {
      console.error("Error en el registro:", err);
      // 3. Notificación de error
      toast.error(
        "Error al registrar. Es posible que el email ya esté en uso."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-[#121212] font-display py-10">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col space-y-6 rounded-xl bg-[#222222] bg-opacity-80 p-8"
      >
        <div className="flex justify-center">
          {/* un logo? */}
          <h1 className="text-white text-2xl font-bold">GameSphere</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em] text-center">
            Crea tu Cuenta
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Nombre de Usuario
            </p>
            <input
              name="username"
              onChange={handleChange}
              value={form.username}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#32CD32] border-none bg-[#3c4922] h-14 placeholder:text-[#b7cb90] p-4 text-base font-normal leading-normal"
              placeholder="Nombre de Usuario"
              required
            />
          </label>
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Correo Electrónico
            </p>
            <input
              name="email"
              onChange={handleChange}
              value={form.email}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#32CD32] border-none bg-[#3c4922] h-14 placeholder:text-[#b7cb90] p-4 text-base font-normal leading-normal"
              placeholder="Correo Electrónico"
              type="email"
              required
            />
          </label>
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Contraseña
            </p>
            <input
              name="password"
              onChange={handleChange}
              value={form.password}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#32CD32] border-none bg-[#3c4922] h-14 placeholder:text-[#b7cb90] p-4 text-base font-normal leading-normal"
              placeholder="Contraseña"
              type="password"
              required
            />
          </label>
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Confirmar Contraseña
            </p>
            <input
              name="confirmPassword"
              onChange={handleChange}
              value={form.confirmPassword}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#32CD32] border-none bg-[#3c4922] h-14 placeholder:text-[#b7cb90] p-4 text-base font-normal leading-normal"
              placeholder="Confirmar Contraseña"
              type="password"
              required
            />
          </label>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center w-full h-14 rounded-lg bg-[#32CD32] text-black font-bold text-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#32CD32] focus:ring-offset-background-dark disabled:bg-[#32CD32]/50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Cuenta"}
        </button>

        <p className="text-center text-white">
          ¿Ya tienes una cuenta?{" "}
          <Link
            className="font-bold text-[#32CD32] hover:underline"
            to="/login"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </form>
    </div>
  );
}
