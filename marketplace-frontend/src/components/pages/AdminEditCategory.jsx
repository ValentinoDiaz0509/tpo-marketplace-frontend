import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../../utils/api";
import { toast } from "react-toastify";

const AdminEditCategory = () => {
  const { id } = useParams(); // obtiene el id desde la URL (ej: /edit-category/3)
  const [name, setName] = useState("");

  useEffect(() => {
    fetchData(`/categories/${id}`)
      .then((data) => {
        setName(data.name);
      })
      .catch(() => toast.error("Error al cargar la categoría."));
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
        toast.success("✅ Categoría actualizada correctamente");
      }
    } catch (error) {
      console.error("Error al editar la categoría:", error.message);
      toast.error("Error de red o conexión al intentar guardar la categoría.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-[#222222] rounded-2xl shadow-lg mb-[3rem]">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar categoría</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium mb-1">Nombre:</label>
          <input
            className="w-full border rounded-lg p-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#32CD32] text-white py-2 rounded-lg hover:bg-blue-700 transition mt-[20px]"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default AdminEditCategory;
