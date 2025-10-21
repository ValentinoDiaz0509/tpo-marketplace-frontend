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
      alert(
        "No se puede cambiar el rol: el usuario no tiene id definido. Asegurate de que el backend esté devolviendo el campo id en /api/v1/admin/usuarios. Revisa la consola para más detalles."
      );
      console.error("Usuario sin id recibido desde backend:", user);
      return;
    }

    const ok = window.confirm("¿Asignar rol ADMIN a este usuario?");
    if (!ok) return;

    try {
      await fetchData(`/api/v1/admin/usuarios/${userId}/rol`, {
        method: "PUT",
        body: JSON.stringify({ nuevoRol: "ADMIN" }),
      });

      // Actualizar estado localmente
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: "ADMIN" } : u))
      );
      alert("Rol actualizado a ADMIN");
    } catch (err) {
      console.error("Error cambiando rol:", err);
      alert("No se pudo cambiar el rol");
    }
  };

  return (
    <div className="p-[3rem]">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-3xl font-bold text-text-light dark:text-white">
          Usuarios
        </h2>
      </div>
      <div class="overflow-x-auto bg-card-light dark:bg-card-dark rounded-lg border border-border-light dark:border-border-dark">
        <table class="min-w-full text-sm text-left mx-auto">
          <thead class="bg-background-light dark:bg-background-dark/50 border-b border-border-light dark:border-border-dark">
            <tr>
              <th
                class="px-6 py-3 font-medium text-text-light dark:text-white uppercase tracking-wider"
                scope="col"
              >
                Email
              </th>
              <th
                class="px-6 py-3 font-medium text-text-light dark:text-white uppercase tracking-wider"
                scope="col"
              >
                Rol
              </th>
              <th
                class="px-6 py-3 font-medium text-text-light dark:text-white uppercase tracking-wider text-right"
                scope="col"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-light dark:divide-border-dark">
            {users.map((u) => (
              <tr>
                <td class="px-6 py-4 font-medium text-text-light dark:text-white whitespace-nowrap">
                  {u.email}
                </td>
                <td class="px-6 py-4 font-medium text-text-light dark:text-white whitespace-nowrap">
                  {u.role}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex justify-end items-center space-x-4">
                    <button
                      onClick={() => handleMakeAdmin(u)}
                      class="font-medium text-primary hover:underline"
                    >
                      Hacer admin
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
