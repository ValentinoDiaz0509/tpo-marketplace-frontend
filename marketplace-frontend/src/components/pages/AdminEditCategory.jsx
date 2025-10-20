import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../utils/api";

const AdminEditCategory = () => {
  const { id } = useParams(); // obtiene el id desde la URL (ej: /edit-category/3)
  const [name, setName] = useState("");

  useEffect(() => {
    fetchData(`/categories/${id}`)
      .then((data) => {
        setName(data.name);
      })
      .catch(() => alert("Error al cargar categorías"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedCategory = { name };

    try {
      const response = await fetchData(`/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
      });

      if (response.ok) {
        alert("✅ Categoría actualizada correctamente");
      }
    } catch (error) {
      console.error("Error al editar la categoría:", error.message);
    }
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "0 auto", backgroundColor: "gray" }}
    >
      <h2>Editar categoría</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            style={{ border: "1px solid white" }}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "15px" }}>
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default AdminEditCategory;
