import { useState } from "react";
import { fetchData } from "../api/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Por ahora solo mostramos un mensaje — más adelante lo conectamos al backend
      setMessage("Si el correo existe, recibirás un enlace para restablecer tu contraseña.");
      await fetchData("/api/v1/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
    } catch {
      setMessage("Ocurrió un error, intenta nuevamente.");
    }
  };

  return (
    <div>
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar enlace</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
