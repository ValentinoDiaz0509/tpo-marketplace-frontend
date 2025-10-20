import { useState, useContext } from "react";
import { fetchData } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // No te olvides de importar esto

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
        const token = res.access_token;
        login(token); // Guarda el token en el contexto

        // --- LÓGICA DE REDIRECCIÓN POR ROL ---
        // 1. Decodifica el token para obtener los datos del usuario
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role; // Asumo que el rol está en el campo 'role'

        // 2. Comprueba el rol y redirige a la ruta correspondiente
        if (userRole === 'ADMIN') {
          navigate("/admin/dashboard"); // Si es ADMIN, va al dashboard de admin
        } else {
          navigate("/"); // Si es cualquier otro rol, va a la página principal
        }

      } else {
        alert("La respuesta del servidor no es válida.");
      }
    } catch (err) {
      console.error("Error de login:", err)
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>
      <p>
        <Link to="/register">Registrarme</Link>
      </p>
      <p>
        <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
      </p>
    </div>
  );
}
