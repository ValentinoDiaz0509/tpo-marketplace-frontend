import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import Layout from "../components/layout/Layout";
import PrivateRoute from "./PrivateRoute";

// Importa las páginas que irán fuera del Layout principal
import Login from "../components/pages/Login";
import Register from "../components/pages/Register";
import ForgotPassword from "../components/pages/ForgotPassword";

const AppRouter = () => {
  return (
    <Routes>
      {/* --- Rutas Públicas (SIN Navbar/Footer) --- */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* --- Rutas que SÍ usan el Layout (CON Navbar/Footer) --- */}
      <Route element={<Layout />}>
        {/* Tu código original para mapear las rutas del archivo routes.js */}
        {routes.map(({ id, path, Element, children, requiredRole }) => {
          if (children) {
            return (
              <Route
                key={id}
                path={path}
                element={
                  requiredRole ? (
                    <PrivateRoute requiredRole={requiredRole}>
                      <Element />
                    </PrivateRoute>
                  ) : (
                    <Element />
                  )
                }
              >
                {children.map(
                  ({
                    id: childId,
                    path: childPath,
                    Element: ChildElement,
                    requiredRole: childRequiredRole,
                  }) => {
                    // Corrección: el PrivateRoute hijo debe usar el rol del hijo
                    return (
                      <Route
                        key={childId}
                        path={childPath}
                        element={
                          childRequiredRole ? (
                            <PrivateRoute requiredRole={childRequiredRole}>
                              <ChildElement />
                            </PrivateRoute>
                          ) : (
                            <ChildElement />
                          )
                        }
                      />
                    );
                  }
                )}
              </Route>
            );
          }
          return (
            <Route
              key={id}
              path={path}
              element={
                requiredRole ? (
                  <PrivateRoute requiredRole={requiredRole}>
                    <Element />
                  </PrivateRoute>
                ) : (
                  <Element />
                )
              }
            />
          );
        })}
      </Route>

      {/* Ruta para páginas no encontradas */}
      <Route path="*" element={<h1>404: Página No Encontrada</h1>} />
    </Routes>
  );
};

export default AppRouter;
