import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../utils/api";
import { toast } from "react-toastify";

export default function AdminGameList() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData("/games/admin")
      .then((data) => {
        setGames(data);
      })
      .catch(() => toast.error("Error al cargar la lista de juegos."));
  }, []);

  const handleEdit = (id) => {
    // Navegar a la página de edición del juego
    navigate(`/admin/games/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("¿Seguro que querés borrar este juego?");
    if (!ok) return;

    try {
      const res = await fetchData(`/games/admin/${id}`, { method: "DELETE" });
      // Si el backend devuelve algún status o body, asumimos éxito si no hay error
      // Actualizamos la UI para remover el juego eliminado
      setGames((prev) => prev.filter((g) => g.id !== id));
      toast.success("Juego eliminado correctamente.");
    } catch (err) {
      console.error("Error borrando juego:", err);
      toast.error("No se pudo eliminar el juego.");
    }
  };

  return (
    <div className="p-[3rem]">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold text-text-light dark:text-white">
          Juegos
        </h2>
        <button
          onClick={() => navigate("/admin/games/create")}
          class="flex items-center justify-center h-10 px-6 font-medium text-white bg-[#90adcb] rounded-lg shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark"
        >
          Añadir Juego
        </button>
      </div>
      <div class="overflow-x-auto bg-card-light dark:bg-card-dark rounded-lg border border-border-light dark:border-border-dark">
        <table class="min-w-full text-sm text-left">
          <thead class="bg-background-light dark:bg-background-dark/50 border-b border-border-light dark:border-border-dark">
            <tr>
              <th
                class="px-6 py-3 font-medium text-text-light dark:text-white uppercase tracking-wider"
                scope="col"
              >
                Nombre
              </th>
              <th
                class="px-6 py-3 font-medium text-text-light dark:text-white uppercase tracking-wider"
                scope="col"
              >
                Categoría
              </th>
              <th
                class="px-6 py-3 font-medium text-text-light dark:text-white uppercase tracking-wider"
                scope="col"
              >
                Precio
              </th>
              <th
                class="px-6 py-3 font-medium text-text-light dark:text-white uppercase tracking-wider"
                scope="col"
              >
                Stock
              </th>
              <th
                class="px-6 py-3 font-medium text-text-light dark:text-white uppercase tracking-wider"
                scope="col"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-light dark:divide-border-dark">
            {games.map((g) => (
              <tr>
                <td class="px-6 py-4 font-medium text-text-light dark:text-white whitespace-nowrap">
                  {g.title}
                </td>
                <td class="px-6 py-4 text-text-muted-light dark:text-text-muted-dark whitespace-nowrap">
                  {g.categories?.map((category) => category.name).join(", ")}
                </td>
                <td class="px-6 py-4 text-text-muted-light dark:text-text-muted-dark whitespace-nowrap">
                  {g.price}
                </td>
                <td class="px-6 py-4 text-text-muted-light dark:text-text-muted-dark whitespace-nowrap">
                  {g.stock}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center space-x-4">
                    <button
                      onClick={() => handleEdit(g.id)}
                      class="font-medium text-primary hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(g.id)}
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
