import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchCategories } from "../../redux/categorySlice";

export default function AdminCategoryList() {
  const categories = useSelector((state) => state.categories.categoryList);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/admin/categories/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("¿Seguro que querés borrar esta categoría?");
    if (!ok) return;

    dispatch(deleteCategory(id));
  };

  return (
    <div className="p-[3rem]">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold text-text-light dark:text-white">
          Categorías
        </h2>
        <button
          onClick={() => navigate("/admin/categories/create")}
          class="flex items-center justify-center h-10 px-6 font-medium text-white bg-[#90adcb] rounded-lg shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark"
        >
          Añadir categoría
        </button>
      </div>
      <div class="overflow-x-auto bg-card-light dark:bg-card-dark rounded-lg border border-border-light dark:border-border-dark">
        <table class="min-w-full text-sm text-left mx-auto">
          <thead class="bg-background-light dark:bg-background-dark/50 border-b border-border-light dark:border-border-dark">
            <tr>
              <th
                class="px-6 py-3 font-medium text-text-light dark:text-white uppercase tracking-wider"
                scope="col"
              >
                Nombre
              </th>
              <th
                class="px-6 py-3 font-medium text-text-light dark:text-white uppercase tracking-wider text-right pr-[45px]"
                scope="col"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-light dark:divide-border-dark">
            {categories.map((c) => (
              <tr>
                <td class="px-6 py-4 font-medium text-text-light dark:text-white whitespace-nowrap">
                  {c.name}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex justify-end items-center space-x-4">
                    <button
                      onClick={() => handleEdit(c.id)}
                      class="font-medium text-primary hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      class="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
