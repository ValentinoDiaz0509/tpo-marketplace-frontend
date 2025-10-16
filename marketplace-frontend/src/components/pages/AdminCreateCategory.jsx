import { useState } from "react";

const AdminCreateCategory = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = { name };

    try {
      const response = await fetch("http://localhost:4002/categories/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        alert("✅ Categoría creada exitosamente");
        setName("");
      } else {
        alert("❌ Error al crear la categoría");
      }
    } catch (error) {
      console.error("Error al crear la categoría:", error);
    }
  };

  return (
    <div
      style={{ maxWidth: "400px", margin: "0 auto", backgroundColor: "gray" }}
    >
      <h2>Crear nueva categoría</h2>
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
          Crear categoría
        </button>
      </form>
    </div>
  );
};

export default AdminCreateCategory;
