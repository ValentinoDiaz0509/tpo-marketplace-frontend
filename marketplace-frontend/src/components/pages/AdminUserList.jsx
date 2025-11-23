import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { changeUserRole, fetchAllUsers } from "../../redux/userSlice";

export default function AdminUserList() {
  const users = useSelector((state) => state.users.userList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length === 0) { 
      dispatch(fetchAllUsers());
    }
  }, [dispatch, users.length]);

  const handleMakeAdmin = async (user) => {
    const userId = user?.id;
    if (!userId) {
      toast.error(
        "No se puede cambiar el rol: el usuario no tiene ID definido. Revisa la consola."
      );
      console.error("Usuario sin id recibido desde backend:", user);
      return;
    }

    const ok = window.confirm(
      "¿Seguro que quieres cambiarle el rol a este usuario?"
    );
    if (!ok) return;

    const userRole = { nuevoRol: user.role === "USER" ? "ADMIN" : "USER" };

    dispatch(changeUserRole({ userId, userRole }));
  };

  return (
    <div className="p-4 sm:p-6 md:p-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-text-light dark:text-white">
          Usuarios
        </h2>
      </div>
      
      {/* CLAVE RESPONSIVE: overflow-x-auto */}
      <div className="overflow-x-auto bg-card-light dark:bg-card-dark rounded-lg border border-border-light dark:border-border-dark">
        <table className="min-w-full text-sm text-left mx-auto">
          <thead className="bg-background-light dark:bg-background-dark/50 border-b border-border-light dark:border-border-dark">
            <tr>
              <th
                className="px-6 py-3 font-medium text-text-light dark:text-white uppercase tracking-wider whitespace-nowrap"
                scope="col"
              >
                Email
              </th>
              <th
                className="px-6 py-3 font-medium text-text-light dark:text-white uppercase tracking-wider whitespace-nowrap"
                scope="col"
              >
                Rol
              </th>
              <th
                className="px-6 py-3 font-medium text-text-light dark:text-white uppercase tracking-wider text-right whitespace-nowrap"
                scope="col"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light dark:divide-border-dark">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-6 py-4 font-medium text-text-light dark:text-white whitespace-nowrap">
                  {u.email}
                </td>
                <td className="px-6 py-4 font-medium text-text-light dark:text-white whitespace-nowrap">
                  {u.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-end items-center space-x-4">
                    <button
                      onClick={() => handleMakeAdmin(u)}
                      className="font-medium text-primary hover:underline"
                    >
                      {u.role === "USER" ? "Hacer admin" : "Hacer user"}
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
