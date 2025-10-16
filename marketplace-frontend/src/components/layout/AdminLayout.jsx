import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const AdminLayout = () => {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
