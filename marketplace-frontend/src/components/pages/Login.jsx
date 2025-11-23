import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, role } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login({ email, password })).unwrap();

      // Navegación basada en el rol (usando el rol del resultado de la acción)
      const userRole = resultAction.role || role; 
      
      if (userRole === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Fallo de inicio de sesión:", error);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden font-display bg-[#121212] p-4 sm:p-6">
      <form
        onSubmit={handleLogin}
        className="relative z-10 flex w-full max-w-md flex-col items-center rounded-xl bg-[#222222] p-8 backdrop-blur-sm text-white shadow-2xl"
      >
        {/* Encabezado y título */}
        <div className="mb-6">
          <span className="material-symbols-outlined text-5xl text-[#32CD32]">
            check_circle
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-tight text-center pb-2">
          Bienvenido de vuelta
        </h1>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Ingresá tus credenciales para acceder a tu cuenta.
        </p>

        {/* Campos del Formulario */}
        <div className="w-full space-y-4">
          <div>
            <label
              htmlFor="email-input"
              className="block text-sm font-medium text-gray-300 pb-2"
            >
              Correo Electrónico
            </label>
            <div className="flex w-full items-stretch">
              {/* Icono (Si usas Material Icons) */}
              <span className="flex items-center justify-center pl-4 rounded-l-lg bg-[#3c4922] text-[#b7cb90]">
                <span className="material-symbols-outlined">
                  alternate_email
                </span>
              </span>
              <input
                id="email-input"
                className="flex-1 rounded-r-lg text-white bg-[#3c4922] border-none h-12 placeholder:text-[#b7cb90] p-3 focus:ring-2 focus:ring-[#32CD32]"
                placeholder="tu@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password-input"
              className="block text-sm font-medium text-gray-300 pb-2"
            >
              Contraseña
            </label>
            <div className="flex w-full items-stretch">
              {/* Icono */}
              <span className="flex items-center justify-center pl-4 rounded-l-lg bg-[#3c4922] text-[#b7cb90]">
                <span className="material-symbols-outlined">lock</span>
              </span>
              <input
                id="password-input"
                className="flex-1 rounded-r-lg text-white bg-[#3c4922] border-none h-12 placeholder:text-[#b7cb90] p-3 focus:ring-2 focus:ring-[#32CD32]"
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        {/* Link a Forgot Password */}
        <div className="w-full text-right mt-2">
          <Link
            to="/forgot-password"
            className="text-sm text-gray-400 hover:text-[#32CD32] transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        {/* Botón de Submit */}
        <div className="w-full pt-6">
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-lg h-12 px-5 bg-[#32CD32] text-[#121212] text-base font-bold transition-colors disabled:opacity-50"
            disabled={loading}
          >
            <span className="truncate">
              {loading ? "Ingresando..." : "Iniciar Sesión"}
            </span>
          </button>
        </div>

        {/* Link a Registro */}
        <div className="w-full text-center mt-6">
          <p className="text-sm text-gray-400">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/register"
              className="font-bold text-[#32CD32] hover:underline"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
