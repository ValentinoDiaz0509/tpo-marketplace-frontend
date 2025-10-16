import React, { useState } from "react";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = { name, description };

    try {
      const response = await fetch("http://localhost:8080/categories/admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        alert("✅ Categoría creada exitosamente");
        setName("");
        setDescription("");
      } else {
        alert("❌ Error al crear la categoría");
      }
    } catch (error) {
      console.error("Error al crear la categoría:", error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Crear nueva categoría</h2>
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
          Crear categoría
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
