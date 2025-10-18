import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import Profile from "../components/pages/Profile";
import GameDetail from "../components/pages/GameDetail";
import Wishlist from '../components/pages/Wishlist';
import Orders from '../components/pages/Orders';
import ForgotPassword from '../components/pages/ForgotPassword';

// Páginas y Layout de Administrador
import AdminLayout from "../components/layout/AdminLayout";
import AdminDashboard from "../components/pages/AdminDashboard";
import AdminUserList from "../components/pages/AdminUserList";
import AdminGameList from "../components/pages/AdminGameList";
import AdminCreateGame from "../components/pages/AdminCreateGame";
import AdminEditGame from "../components/pages/AdminEditGame";
import AdminCategoryList from "../components/pages/AdminCategoryList";
import AdminCreateCategory from "../components/pages/AdminCreateCategory";
import AdminEditCategory from "../components/pages/AdminEditCategory";


// --- DEFINICIÓN DE RUTAS ---

export const routes = [
  // --- RUTAS PÚBLICAS Y DE USUARIO (NIVEL PRINCIPAL) ---
  {
    id: "home",
    path: "/",
    Element: Home,
    requiredRole: "USER",
  },
  {
    id: "login",
    path: "/login",
    Element: Login,
    requiredRole: null,
  },
  {
    id: "register",
    path: "/register",
    Element: Register,
    requiredRole: null,
  },
  {
    id: "forgot-password",
    path: "/forgot-password",
    Element: ForgotPassword,
    requiredRole: null,
  },
  {
    id: "userProfile",
    path: "/userProfile",
    Element: Profile,
    requiredRole: "USER",
  },
  {
    id: "game-detail",
    path: "/detail/:id",
    Element: GameDetail,
    requiredRole: "USER",
  },
  {
    id: "wishlist",
    path: "/wishlist",
    Element: Wishlist,
    requiredRole: "USER",
  },
  {
    id: "orders",
    path: "/orders",
    Element: Orders,
    requiredRole: "USER",
  },

  // --- RUTA PRINCIPAL DE ADMIN (CON SUS HIJOS ANIDADOS) ---
  {
    id: "admin",
    path: "/admin",
    Element: AdminLayout,
    requiredRole: "ADMIN",
    children: [
      {
        id: "admin-dashboard",
        path: "dashboard",
        Element: AdminDashboard,
      },
      {
        id: "admin-users",
        path: "users",
        Element: AdminUserList,
      },
      {
        id: "admin-games",
        path: "games",
        Element: AdminGameList,
      },
      {
        id: "admin-create-game",
        path: "games/create",
        Element: AdminCreateGame,
      },
      {
        id: "admin-edit-game",
        path: "games/edit/:id",
        Element: AdminEditGame,
      },
      {
        id: "admin-categories",
        path: "categories",
        Element: AdminCategoryList,
      },
      {
        id: "admin-create-category",
        path: "categories/create",
        Element: AdminCreateCategory,
      },
      {
        id: "admin-edit-category",
        path: "categories/edit/:id",
        Element: AdminEditCategory,
      },
    ],
  },
];
