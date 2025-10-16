import { useState, useContext } from "react";
import { fetchData } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchData("/api/v1/auth/authenticate", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (res.access_token) {
        login(res.access_token);
        // Redirigir al catálogo de juegos después del login exitoso
        navigate("/");
      } else {
        alert("La respuesta del servidor no es válida.");
      }
    } catch {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>
      <p>
        <a href="/register">Registrarme</a>
      </p>
      <p>
        <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
      </p>
    </div>
  );
}
