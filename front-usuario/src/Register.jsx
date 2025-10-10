import { useState } from "react";
import { fetchData } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ firstname: "", lastname: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchData("/api/v1/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
      });
      alert("Registro exitoso");
      navigate("/");
    } catch {
      alert("Error al registrar");
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstname" placeholder="Nombre" onChange={handleChange} />
        <input name="lastname" placeholder="Apellido" onChange={handleChange} />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} />
        <input name="password" placeholder="Contraseña" type="password" onChange={handleChange} />
        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  );
}
