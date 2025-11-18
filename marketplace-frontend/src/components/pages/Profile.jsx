import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../../redux/profileSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const { userData, loading } = useSelector((state) => state.profile);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      setForm({
        email: userData.email || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        password: "",
      });
    }
  }, [userData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(form));
    setForm((prev) => ({ ...prev, password: "" }));
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden font-display bg-[#121212]">
      <form
        onSubmit={handleUpdate}
        className="relative z-10 flex w-full max-w-md flex-col items-center rounded-xl bg-[#222222] p-8 backdrop-blur-sm text-white"
      >
        <div className="mb-6">
          <span className="material-symbols-outlined text-5xl text-[#32CD32]">
            check_circle
          </span>
        </div>
        <h3 className="text-3xl font-bold leading-tight text-center pb-2">
          Mi perfil
        </h3>

        <div className="w-full space-y-4">
          <div>
            <label
              htmlFor="email-input"
              className="block text-sm font-medium text-gray-300 pb-2"
            >
              Correo Electrónico
            </label>
            <div className="flex w-full items-stretch">
              <span className="flex items-center justify-center pl-4 rounded-l-lg bg-[#3c4922] text-[#b7cb90]">
                <span className="material-symbols-outlined">
                  alternate_email
                </span>
              </span>
              <input
                name="email"
                className="flex-1 rounded-r-lg text-white bg-[#3c4922] border-none h-14 placeholder:text-[#b7cb90] p-3 focus:ring-2 focus:ring-[#32CD32]"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <label
            htmlFor="firstName-input"
            className="block text-sm font-medium text-gray-300 pb-2 mb-0"
          >
            Nombre
          </label>
          <div className="flex w-full items-stretch">
            <span className="flex items-center justify-center pl-4 rounded-l-lg bg-[#3c4922] text-[#b7cb90]">
              <span className="material-symbols-outlined">person</span>
            </span>
            <input
              name="firstName"
              className="flex-1 rounded-r-lg text-white bg-[#3c4922] border-none h-14 placeholder:text-[#b7cb90] p-3 focus:ring-2 focus:ring-[#32CD32]"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <label
            htmlFor="lastName-input"
            className="block text-sm font-medium text-gray-300 pb-2 mb-0"
          >
            Apellido
          </label>
          <div className="flex w-full items-stretch">
            <span className="flex items-center justify-center pl-4 rounded-l-lg bg-[#3c4922] text-[#b7cb90]">
              <span className="material-symbols-outlined">person</span>
            </span>
            <input
              name="lastName"
              className="flex-1 rounded-r-lg text-white bg-[#3c4922] border-none h-14 placeholder:text-[#b7cb90] p-3 focus:ring-2 focus:ring-[#32CD32]"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password-input"
              className="block text-sm font-medium text-gray-300 pb-2"
            >
              Contraseña
            </label>
            <div className="flex w-full items-stretch">
              <span className="flex items-center justify-center pl-4 rounded-l-lg bg-[#3c4922] text-[#b7cb90]">
                <span className="material-symbols-outlined">lock</span>
              </span>
              <input
                name="password"
                className="flex-1 rounded-r-lg text-white bg-[#3c4922] border-none h-14 placeholder:text-[#b7cb90] p-3 focus:ring-2 focus:ring-[#32CD32]"
                placeholder="Contraseña"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="w-full pt-6">
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-lg h-12 px-5 bg-[#32CD32] text-[#121212] text-base font-bold transition-colors disabled:opacity-50"
            disabled={loading}
          >
            <span className="truncate">
              {loading ? "Ingresando..." : "Actualizar perfil"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
