import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/authSlice";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(register(form));
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordRepeat: "",
    });
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
              Nombre
            </p>
            <input
              name="firstName"
              onChange={handleChange}
              value={form.firstName}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#32CD32] border-none bg-[#3c4922] h-14 placeholder:text-[#b7cb90] p-4 text-base font-normal leading-normal"
              placeholder="Nombre"
              required
            />
          </label>
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-white text-base font-medium leading-normal pb-2">
              Nombre
            </p>
            <input
              name="lastName"
              onChange={handleChange}
              value={form.lastName}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#32CD32] border-none bg-[#3c4922] h-14 placeholder:text-[#b7cb90] p-4 text-base font-normal leading-normal"
              placeholder="Apellido"
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
              name="passwordRepeat"
              onChange={handleChange}
              value={form.passwordRepeat}
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#32CD32] border-none bg-[#3c4922] h-14 placeholder:text-[#b7cb90] p-4 text-base font-normal leading-normal"
              placeholder="Repetir Contraseña"
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
