import { useState, useContext } from "react";
import { fetchData } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetchData("/api/v1/auth/authenticate", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      login(res.access_token);
      navigate("/dashboard");
    } catch {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div>
      <h2>Panel de Administración</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
