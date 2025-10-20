import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../utils/api";

export default function AdminCategoryList() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData("/categories")
      .then((data) => {
        setCategories(data.content);
      })
      .catch(() => alert("Error al cargar categorías"));
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/categories/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("¿Seguro que querés borrar esta categoría?");
    if (!ok) return;

    try {
      await fetchData(`/categories/${id}`, { method: "DELETE" });
      setCategories((prev) => prev.filter((c) => c.id !== id));
      alert("Categoría eliminada");
    } catch (err) {
      console.error("Error borrando categoría:", err);
      alert("No se pudo eliminar la categoría");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Categorías</h2>
        <button onClick={() => navigate('/admin/categories/create')} style={{ background: '#2b6cb0', color: 'white', padding: '6px 10px', borderRadius: 6 }}>
          Crear categoría
        </button>
      </div>
      {categories.map((c) => (
        <div key={c.id} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ flex: 1 }}>{c.name}</div>
          <div>
            <button onClick={() => handleEdit(c.id)} style={{ marginRight: "8px" }}>Editar</button>
            <button onClick={() => handleDelete(c.id)} style={{ background: "#f44336", color: "white" }}>Borrar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
