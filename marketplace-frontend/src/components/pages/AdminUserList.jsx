import { useEffect, useState } from "react";
import { fetchData, deleteUserAPI, updateUserRoleAPI } from "../../utils/api";

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Carga inicial de usuarios
  useEffect(() => {
    fetchData("/api/v1/admin/usuarios")
      .then((data) => setUsers(data))
      .catch(() => setError("Error al cargar usuarios"))
      .finally(() => setLoading(false));
  }, []);

  // Función para manejar el cambio de rol
  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRoleAPI(userId, newRole);
      // Actualiza el rol en el estado local para un feedback instantáneo
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      alert(`Error al cambiar el rol: ${err.message}`);
    }
  };

  // Función para manejar el borrado de usuario
  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de que querés eliminar este usuario?')) {
      try {
        await deleteUserAPI(userId);
        setUsers(prev => prev.filter(user => user.id !== userId));
      } catch (err) {
        alert(`Error al eliminar el usuario: ${err.message}`);
      }
    }
  };

  if (loading) return <p className="text-white">Cargando usuarios...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-4xl font-bold tracking-tight">Gestión de Usuarios</h1>
        {/* Podríamos agregar un botón de "Invitar Usuario" aquí en el futuro */}
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-700 bg-component-dark">
        <table className="w-full text-left">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-4 py-3 text-white text-sm font-medium">ID</th>
              <th className="px-4 py-3 text-white text-sm font-medium">Email</th>
              <th className="px-4 py-3 text-white text-sm font-medium">Nombre</th>
              <th className="px-4 py-3 text-white text-sm font-medium">Rol</th>
              <th className="px-4 py-3 text-white text-sm font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-700 hover:bg-gray-800/40">
                <td className="px-4 py-3 text-gray-300">{user.id}</td>
                <td className="px-4 py-3 text-white font-medium">{user.email}</td>
                <td className="px-4 py-3 text-gray-300">{`${user.firstName} ${user.lastName}`}</td>
                <td className="px-4 py-3">
                  <select 
                    value={user.role} 
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="bg-gray-700 border-gray-600 rounded-md text-white text-sm focus:ring-primary focus:border-primary"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end">
                    <button onClick={() => handleDelete(user.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined">delete</span>
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
