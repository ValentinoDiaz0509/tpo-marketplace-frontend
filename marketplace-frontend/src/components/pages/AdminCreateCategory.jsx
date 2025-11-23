import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/categorySlice";

const AdminCreateCategory = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = { name };
    dispatch(createCategory(categoryData));
    setName(""); // Limpiar formulario después de enviar
  };

  return (
    // ELIMINADO EL COMENTARIO PROBLEMÁTICO {/* Responsive: max-w-sm en móvil, p-6 adaptable */}
    <div className="max-w-sm sm:max-w-lg mx-auto mt-8 p-6 bg-[#222222] rounded-2xl shadow-lg mb-8 text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Crear Nueva Categoría
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4"> 
        <div>
          <label className="block font-medium mb-1 text-white">Nombre:</label>
          <input
            className="w-full border rounded-lg p-2 text-black"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: RPG, Estrategia"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#32CD32] text-white py-2 rounded-lg hover:bg-green-700 transition mt-4"
        >
          Crear Categoría
        </button>
      </form>
    </div>
  );
};

export default AdminCreateCategory;
