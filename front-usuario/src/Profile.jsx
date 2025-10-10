import { useState } from "react";
import { fetchData } from "../api/api";

export default function Profile() {
  const [form, setForm] = useState({ email: "", firstname: "", lastname: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await fetchData("/api/v1/users/me", {
        method: "PUT",
        body: JSON.stringify(form),
      });
      alert("Perfil actualizado");
    } catch {
      alert("Error al actualizar");
    }
  };

  return (
    <div>
      <h2>Mi perfil</h2>
      <form onSubmit={handleUpdate}>
        <input name="email" placeholder="Nuevo email" onChange={handleChange} />
        <input name="firstname" placeholder="Nombre" onChange={handleChange} />
        <input name="lastname" placeholder="Apellido" onChange={handleChange} />
        <input name="password" placeholder="Nueva contraseña" type="password" onChange={handleChange} />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}
