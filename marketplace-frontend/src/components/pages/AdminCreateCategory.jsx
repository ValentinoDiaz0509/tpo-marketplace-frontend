import { useState } from "react";
import { fetchData } from "../../utils/api";

const AdminCreateCategory = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = { name };

    try {
      const response = await fetchData("/categories/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        alert("✅ Categoría creada exitosamente");
        setName("");
      }
    } catch (error) {
      console.error("Error al crear la categoría:", error.message);
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
