import { useContext, useEffect, useState } from "react";
import { fetchData } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const { logout, login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  useEffect(() => {
    fetchData("/api/v1/users/me")
      .then((data) => {
        setForm((prevForm) => ({ ...prevForm, ...data }));
      })
      .catch(() => alert("Error al cargar datos del usuario"));
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
        alert("Perfil actualizado. Se generó un nuevo token y se mantuvo la sesión.");
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
    <div>
      <h2>Mi perfil</h2>
      <form onSubmit={handleUpdate}>
        <input name="email" value={form.email} onChange={handleChange} />
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
        />
        <input name="lastName" value={form.lastName} onChange={handleChange} />
        <input
          name="password"
          placeholder="Nueva contraseña"
          type="password"
          onChange={handleChange}
        />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}
