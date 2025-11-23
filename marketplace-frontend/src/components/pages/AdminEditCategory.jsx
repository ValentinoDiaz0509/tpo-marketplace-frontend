import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryById, updateCategory } from "../../redux/categorySlice";

const AdminEditCategory = () => {
  const { id } = useParams();
  const category = useSelector((state) => state.categories.currentCategory);
  const loading = useSelector((state) => state.categories.loading);
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryById(id));
  }, [dispatch, id]);

  useEffect(() => {
    // Solo actualiza el estado local si la categoría existe y si el nombre es diferente
    if (category && category.name) {
      setName(category.name);
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = { name };
    dispatch(updateCategory({ id, categoryData }));
  };

  if (loading) {
    return (
      <div className="text-center mt-8 text-white">Cargando categoría...</div>
    );
  }

  return (
    <div className="max-w-sm sm:max-w-lg mx-auto mt-8 p-6 bg-[#222222] rounded-2xl shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar categoría</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nombre:</label>
          <input
            className="w-full border rounded-lg p-2 text-black"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#32CD32] text-white py-2 rounded-lg hover:bg-green-700 transition mt-4"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default AdminEditCategory;
