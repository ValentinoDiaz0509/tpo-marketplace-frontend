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

  return (
    <div>
      <h2>Usuarios</h2>
      {users.map((u) => (
        <div key={u.id}>
          {u.email} — Rol: {u.role}
        </div>
      ))}
    </div>
  );
}
