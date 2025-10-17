import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchData, deleteGameAPI } from "../../utils/api";

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
    fetchData("/games/admin") 
      .then((data) => {
        setGames(data);
      })
      .catch(() => setError("Error al cargar juegos"))
      .finally(() => setLoading(false));
  }, []);

    const handleDelete = async (gameIdToDelete) => {
    if (window.confirm('¿Estás seguro de que querés eliminar este juego? Esta acción no se puede deshacer.')) {
      try {
        await deleteGameAPI(gameIdToDelete);
        // Si la API tuvo éxito, actualizamos el estado para quitar el juego de la lista
        setGames(prevGames => prevGames.filter(game => game.id !== gameIdToDelete));
        alert('Juego eliminado con éxito.');
      } catch (err) {
        console.error('Error al eliminar el juego:', err);
        alert(`Error al eliminar el juego: ${err.message}`);
      }
    }
  };

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

      {/* Barra de Búsqueda (funcionalidad se puede agregar después) */}
      <div className="mb-6">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-gray-400 flex bg-component-dark items-center justify-center pl-4 rounded-l-lg border-r-0">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input className="form-input flex w-full min-w-0 flex-1 rounded-r-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-component-dark h-full placeholder:text-gray-400 px-4 text-base" placeholder="Buscar juegos por título..." />
          </div>
        </label>
      </div>

      {/* Tabla de Juegos */}
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
                    <button onClick={() => handleDelete(game.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Paginación (funcionalidad se puede agregar después) */}
      <div className="flex items-center justify-center mt-6">
        {/* ... JSX de la paginación ... */}
      </div>
    </div>
  );
}
