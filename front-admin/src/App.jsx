import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminNavbar from "./components/AdminNavbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Games from "./pages/Games";
import Categories from "./pages/Categories";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AdminNavbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/games" element={<Games />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
