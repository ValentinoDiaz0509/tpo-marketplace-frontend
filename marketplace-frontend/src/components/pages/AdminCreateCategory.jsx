import { useState } from "react";
import { fetchData } from "../../utils/api";
import { toast } from "react-toastify";

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
        toast.success("✅ Categoría creada exitosamente");
        setName("");
      } else {
            // Manejo de error para respuestas HTTP no exitosas (ej. 409 Conflict)
            const errorData = await response.json();
            toast.error(`Error (${response.status}): ${errorData.message || 'No se pudo crear la categoría.'}`);
     }
    } catch (error) {
      // 2. REEMPLAZO: console.error + sin alert -> toast.error(...)
      console.error("Error al crear la categoría:", error.message);
      toast.error("Error de red o conexión al crear la categoría.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-[#222222] rounded-2xl shadow-lg mb-[3rem]">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Crear nueva categoría
      </h2>
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
          Crear categoría
        </button>
      </form>
    </div>
  );
};

export default AdminCreateCategory;
