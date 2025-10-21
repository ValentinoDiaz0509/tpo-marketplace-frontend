import { useEffect, useState } from "react";
import { fetchData } from "../../utils/api";

export default function AdminUserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData("/api/v1/admin/usuarios")
      .then((data) => {
        setUsers(data);
      })
      .catch(() => alert("Error al cargar usuarios"));
  }, []);

  const handleMakeAdmin = async (user) => {
    const userId = user?.id;
    if (!userId) {
      alert('No se puede cambiar el rol: el usuario no tiene id definido. Asegurate de que el backend esté devolviendo el campo id en /api/v1/admin/usuarios. Revisa la consola para más detalles.');
      console.error('Usuario sin id recibido desde backend:', user);
      return;
    }

    const ok = window.confirm('¿Asignar rol ADMIN a este usuario?');
    if (!ok) return;

    try {
      await fetchData(`/api/v1/admin/usuarios/${userId}/rol`, {
        method: 'PUT',
        body: JSON.stringify({ nuevoRol: 'ADMIN' }),
      });

      // Actualizar estado localmente
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: 'ADMIN' } : u)));
      alert('Rol actualizado a ADMIN');
    } catch (err) {
      console.error('Error cambiando rol:', err);
      alert('No se pudo cambiar el rol');
    }
  };

  return (
    <div>
      <h2>Usuarios</h2>
      {users.map((u) => (
        <div key={u.id ?? u.email} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            {u.email} — Rol: {u.role}
          </div>
          <div>
            {u.role !== 'ADMIN' && (
              <button onClick={() => handleMakeAdmin(u)} style={{ background: '#2b6cb0', color: 'white', padding: '6px 8px', borderRadius: 6 }}>
                Hacer ADMIN
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
