import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCategoriesAPI, deleteCategoryAPI } from "../../utils/api";

export default function AdminCategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Carga inicial de categorías usando la función de api.js
  useEffect(() => {
    loadCategories();
  }, []);
    
  const loadCategories = () => {
    setLoading(true);
    fetchCategoriesAPI()
      .then((data) => setCategories(data.content || data))
      .catch(() => setError("Error al cargar las categorías"))
      .finally(() => setLoading(false));
  }

  // Función para manejar el borrado
  const handleDelete = async (categoryId) => {
    if (window.confirm('¿Estás seguro de que querés eliminar esta categoría? Esto podría afectar a los juegos existentes.')) {
      try {
        await deleteCategoryAPI(categoryId);
        // Actualiza la lista en el frontend sin recargar la página
        setCategories(prev => prev.filter(cat => cat.id !== categoryId));
      } catch (err) {
        alert(`Error al eliminar la categoría: ${err.message}`);
      }
    }
  };

  if (loading) return <p className="text-white">Cargando categorías...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {/* Encabezado y botón de "Añadir" */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-white text-4xl font-bold tracking-tight">Gestión de Categorías</h1>
        <Link to="/admin/categories/create" className="flex items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold shadow-lg hover:bg-primary/90 transition-colors">
          <span className="material-symbols-outlined mr-2">add_circle</span>
          <span>+ Añadir Nueva Categoría</span>
        </Link>
      </div>

      {/* Tabla de Categorías */}
      <div className="overflow-x-auto rounded-lg border border-gray-700 bg-component-dark">
        <table className="w-full text-left">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-4 py-3 text-white text-sm font-medium">ID</th>
              <th className="px-4 py-3 text-white text-sm font-medium">Nombre</th>
              <th className="px-4 py-3 text-white text-sm font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
                categories.map((category) => (
              <tr key={category.id} className="border-t border-gray-700 hover:bg-gray-800/40">
                <td className="px-4 py-3 text-gray-300">{category.id}</td>
                <td className="px-4 py-3 text-white font-medium">{category.name}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-4">
                    <Link to={`/admin/categories/edit/${category.id}`} className="text-gray-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">edit</span>
                    </Link>
                    <button onClick={() => handleDelete(category.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
            ) : (
                <tr>
                    <td colSpan="3" className="text-center py-8 text-gray-400">
                        No hay categorías para mostrar.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
