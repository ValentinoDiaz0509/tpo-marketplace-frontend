import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDashboardStatsAPI } from "../../utils/api";

// Componente para cada tarjeta de estadística
const StatCard = ({ title, value, icon, linkTo }) => {
  return (
    <Link to={linkTo} className="bg-component-dark p-6 rounded-lg shadow-lg hover:bg-gray-800/60 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className="p-3 bg-primary/20 rounded-lg">
          <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
        </div>
      </div>
    </Link>
  );
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStatsAPI()
      .then(data => setStats(data))
      .catch(() => setError("Error al cargar las estadísticas"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-white">Cargando dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-white text-4xl font-bold tracking-tight mb-8">Dashboard</h1>
      
      {/* Grilla de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Usuarios Totales" value={stats?.totalUsers || 0} icon="group" linkTo="/admin/users" />
        <StatCard title="Juegos Totales" value={stats?.totalGames || 0} icon="sports_esports" linkTo="/admin/games" />
        <StatCard title="Categorías" value={stats?.totalCategories || 0} icon="category" linkTo="/admin/categories" />
        <StatCard title="Ventas Totales" value={`$${stats?.totalRevenue || '0.00'}`} icon="attach_money" linkTo="#" />
      </div>

      {/* Actividad Reciente */}
      <div>
        <h2 className="text-white text-2xl font-bold mb-4">Actividad Reciente</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-700 bg-component-dark">
          <table className="w-full text-left">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-4 py-3 text-white text-sm font-medium">Últimos Usuarios Registrados</th>
                <th className="px-4 py-3 text-white text-sm font-medium">Email</th>
              </tr>
            </thead>
            <tbody>
              {(stats?.recentUsers || []).map(user => (
                <tr key={user.id} className="border-t border-gray-700">
                  <td className="px-4 py-3 text-white font-medium">{`${user.firstName} ${user.lastName}`}</td>
                  <td className="px-4 py-3 text-gray-300">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
