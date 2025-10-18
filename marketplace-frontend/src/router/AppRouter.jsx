import { Route, Routes } from "react-router-dom";

// Layouts
import Layout from "../components/layout/Layout";
import AdminLayout from "../components/layout/AdminLayout";

// Componente de Ruta Privada
import PrivateRoute from "./PrivateRoute";

// Páginas Públicas y de Usuario
import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import ForgotPassword from "../components/pages/ForgotPassword";
import Profile from "../components/pages/Profile";
import GameDetail from "../components/pages/GameDetail";
import Wishlist from "../components/pages/Wishlist";
import Orders from "../components/pages/Orders";

// Páginas de Administrador
import AdminDashboard from "../components/pages/AdminDashboard";
import AdminUserList from "../components/pages/AdminUserList";
import AdminGameList from "../components/pages/AdminGameList";
import AdminCreateGame from "../components/pages/AdminCreateGame";
import AdminEditGame from "../components/pages/AdminEditGame";
import AdminCategoryList from "../components/pages/AdminCategoryList";
import AdminCreateCategory from "../components/pages/AdminCreateCategory";
import AdminEditCategory from "../components/pages/AdminEditCategory";

export default function AppRouter() {
  return (
    <Routes>
      {/* --- Rutas con el Layout Principal (Navbar y Footer) --- */}
      <Route element={<Layout />}>
        <Route path="/" element={<PrivateRoute requiredRole="USER"><Home /></PrivateRoute>} />
        <Route path="/userProfile" element={<PrivateRoute requiredRole="USER"><Profile /></PrivateRoute>} />
        <Route path="/detail/:id" element={<PrivateRoute requiredRole="USER"><GameDetail /></PrivateRoute>} />
        <Route path="/wishlist" element={<PrivateRoute requiredRole="USER"><Wishlist /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute requiredRole="USER"><Orders /></PrivateRoute>} />
        {/* Agrega aquí otras páginas que usen el layout principal */}
      </Route>

      {/* --- Rutas con el Layout de Administrador --- */}
      <Route path="/admin" element={<PrivateRoute requiredRole="ADMIN"><AdminLayout /></PrivateRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUserList />} />
        <Route path="games" element={<AdminGameList />} />
        <Route path="games/create" element={<AdminCreateGame />} />
        <Route path="games/edit/:id" element={<AdminEditGame />} />
        <Route path="categories" element={<AdminCategoryList />} />
        <Route path="categories/create" element={<AdminCreateCategory />} />
        <Route path="categories/edit/:id" element={<AdminEditCategory />} />
      </Route>

      {/* --- Rutas a Pantalla Completa (SIN Layout) --- */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* --- Ruta para Páginas no Encontradas --- */}
      <Route path="*" element={<h1>404: Página no encontrada</h1>} />
    </Routes>
  );
}
