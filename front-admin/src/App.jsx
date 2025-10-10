import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext"; // Importa AuthContext
import { useContext } from "react"; // Importa useContext
import { ProtectedRoute } from "./router/ProtectedRoute"; // Importa el componente
import AdminGames from './pages/admin/AdminGames';
import GameForm from './components/GameForm'; 



function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute
            isAllowed={!!user && user.role === 'ADMIN'}
            redirectTo="/login"
          />
        }
      >
        <Route path="/" element={<Dashboard />} />
        
        {}
        <Route path="/games" element={<AdminGames />} /> 
        <Route path="/games/new" element={<GameForm />} /> 
        <Route path="/games/edit/:id" element={<GameForm />} /> 
        
        <Route path="/users" element={<Users />} />
        <Route path="/categories" element={<Categories />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
