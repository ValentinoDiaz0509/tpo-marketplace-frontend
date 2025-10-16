import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditCategory = () => {
  const { id } = useParams(); // obtiene el id desde la URL (ej: /edit-category/3)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Cargar los datos de la categoría actual
    fetch(`http://localhost:8080/categories/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
      })
      .catch((err) => console.error("Error al cargar la categoría:", err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedCategory = { name, description };

    try {
      const response = await fetch(`http://localhost:8080/categories/admin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
      });

      if (response.ok) {
        alert("✅ Categoría actualizada correctamente");
      } else {
        alert("❌ Error al actualizar la categoría");
      }
    } catch (error) {
      console.error("Error al editar la categoría:", error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Editar categoría</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

export default EditCategory;
