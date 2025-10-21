import { useState } from "react";
import { fetchData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'; // 1. Importar toast

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      toast.error("Error al registrar. Es posible que el email ya esté en uso.");
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="Nombre" onChange={handleChange} />
        <input name="lastName" placeholder="Apellido" onChange={handleChange} />
        <input
          name="email"
          placeholder="Email"
          type="email"
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Contraseña"
          type="password"
          onChange={handleChange}
        />
        <input
          name="passwordRepeat"
          placeholder="Repetir contraseña"
          type="password"
          onChange={handleChange}
        />
        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  );
}
