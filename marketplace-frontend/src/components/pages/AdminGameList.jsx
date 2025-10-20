import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../utils/api";

export default function AdminGameList() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData("/games/admin")
      .then((data) => {
        setGames(data);
      })
      .catch(() => alert("Error al cargar juegos"));
  }, []);

  const handleEdit = (id) => {
    // Navegar a la página de edición del juego
    navigate(`/admin/games/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("¿Seguro que querés borrar este juego?");
    if (!ok) return;

    try {
      const res = await fetchData(`/games/admin/${id}`, { method: "DELETE" });
      // Si el backend devuelve algún status o body, asumimos éxito si no hay error
      // Actualizamos la UI para remover el juego eliminado
      setGames((prev) => prev.filter((g) => g.id !== id));
      alert("Juego eliminado");
    } catch (err) {
      console.error("Error borrando juego:", err);
      alert("No se pudo eliminar el juego");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Juegos</h2>
        <button onClick={() => navigate('/admin/games/create')} style={{ background: '#2b6cb0', color: 'white', padding: '6px 10px', borderRadius: 6 }}>
          Crear juego
        </button>
      </div>
      {games.map((g) => (
        <div key={g.id} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            {g.title} - ${g.price}
          </div>
          <div>
            <button onClick={() => handleEdit(g.id)} style={{ marginRight: "8px" }}>
              Editar
            </button>
            <button onClick={() => handleDelete(g.id)} style={{ background: "#f44336", color: "white" }}>
              Borrar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
