import { useState, useContext } from "react";
import { fetchData } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify'; // 1. Importar toast

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

        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        // 2. Notificación de éxito
        toast.success(`¡Bienvenido, ${decodedToken.sub}!`);

        if (userRole === 'ADMIN') {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }

      } else {
        // 3. Notificación de advertencia (en lugar del alert)
        toast.warn("La respuesta del servidor no es válida.");
      }
    } catch (err) {
      console.error("Error de login:", err);
      // 4. Notificación de error (en lugar del alert)
      toast.error("Credenciales incorrectas");
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
