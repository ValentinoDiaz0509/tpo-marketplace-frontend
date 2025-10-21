import { useContext, useEffect, useState } from "react";
import { fetchData } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const { logout, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  useEffect(() => {
    setLoading(true);
    fetchData("/api/v1/users/me")
      .then((data) => {
        setForm((prevForm) => ({ ...prevForm, ...data }));
      })
      .catch(() => alert("Error al cargar datos del usuario"));

    setLoading(false);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchData("/api/v1/users/me", {
        method: "PUT",
        body: JSON.stringify(form),
      });

      // If backend returned an auth token (password was changed), log the user in with the new token
      if (res && res.access_token) {
        login(res.access_token);
        alert(
          "Perfil actualizado. Se generó un nuevo token y se mantuvo la sesión."
        );
      } else {
        // 204 No Content — profile updated but no re-auth required
        alert("Perfil actualizado");
      }

      // Clear sensitive field
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden font-display bg-[#121212]">
      {/* --- CAPA DE FONDO CON IMAGEN (ESTO TAMBIÉN FALTABA) --- */}
      {/* <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-center bg-no-repeat bg-cover"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1555864408-5626a424266c?q=80&w=1932&auto=format&fit=crop")',
                filter: "blur(4px) brightness(0.6)",
              }}
            ></div>
          </div> */}

      {/* --- EL FORMULARIO (ESTO ES LO QUE YA TENÍAS BIEN) --- */}
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
                id="email-input"
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
              id="firstName-input"
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
              id="lastName-input"
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
                id="password-input"
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
