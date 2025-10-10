import { useState, useContext } from "react";
import { fetchData } from "../api/api"; // Asegúrate que la ruta al api.js sea correcta
import { AuthContext } from "../context/AuthContext"; // Asegúrate que la ruta al context sea correcta
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

      if (res.access_token && res.user) {
        // Verificamos que el usuario sea ADMIN
        if (res.user.role !== 'ADMIN') {
          alert("No tienes permisos para acceder a esta sección.");
          return;
        }

        login(res.access_token, res.user);
        // Redirigir al Dashboard principal del admin
        navigate("/"); 
      } else {
        alert("La respuesta del servidor no es válida.");
      }
    } catch {
      alert("Credenciales incorrectas o error en el servidor.");
    }
  };

  return (
    <div>
      <h2>Panel de Administración</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
