import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../../utils/api";

// Pequeño componente para mostrar el estado con colores
const StatusBadge = ({ status }) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    const statusMap = {
        "Activo": "bg-green-500/20 text-green-400",
        "Inactivo": "bg-red-500/20 text-red-400",
        "Pendiente": "bg-yellow-500/20 text-yellow-400",
    };
    return (
        <span className={`${baseClasses} ${statusMap[status] || 'bg-gray-500/20 text-gray-400'}`}>
            <span className={`w-2 h-2 mr-1.5 rounded-full ${status === 'Activo' ? 'bg-green-500' : status === 'Inactivo' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
            {status}
        </span>
    );
};

export default function AdminGameList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData("/games/admin") // Tu endpoint para traer todos los juegos
      .then((data) => {
        setGames(data);
      })
      .catch(() => setError("Error al cargar juegos"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-white">Cargando juegos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      {/* Encabezado y botón de "Añadir" */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-white text-4xl font-bold tracking-tight">Gestión de Juegos</h1>
        <Link to="/admin/games/create" className="flex items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold shadow-lg hover:bg-primary/90 transition-colors">
          <span className="material-symbols-outlined mr-2">add_circle</span>
          <span className="truncate">+ Añadir Nuevo Juego</span>
        </Link>
      </div>

      <div className="mb-6">{/* ... JSX de la barra de búsqueda ... */}</div>

      <div className="overflow-x-auto rounded-lg border border-gray-700 bg-component-dark">
        <table className="w-full text-left">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-4 py-3 text-white text-sm font-medium">Imagen</th>
              <th className="px-4 py-3 text-white text-sm font-medium">Título</th>
              <th className="px-4 py-3 text-white text-sm font-medium">Categoría</th>
              <th className="px-4 py-3 text-white text-sm font-medium">Precio</th>
              <th className="px-4 py-3 text-white text-sm font-medium">Estado</th>
              <th className="px-4 py-3 text-white text-sm font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id} className="border-t border-gray-700 hover:bg-gray-800/40">
                <td className="px-4 py-2">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-md w-12 h-12" style={{ backgroundImage: `url(${game.imageUrl})` }}></div>
                </td>
                <td className="px-4 py-2 text-white font-medium">{game.title}</td>
                <td className="px-4 py-2 text-gray-300">{game.categories?.map(c => c.name).join(', ') || 'N/A'}</td>
                <td className="px-4 py-2 text-gray-300">${game.price}</td>
                <td className="px-4 py-2"><StatusBadge status={game.status || 'Inactivo'} /></td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-4">
                    <Link to={`/admin/games/edit/${game.id}`} className="text-gray-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">edit</span>
                    </Link>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-center mt-6">{/* ... JSX de la paginación ... */}</div>
    </div>
  );
}
