import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import Layout from "../components/layout/Layout";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
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
                    return (
                      <Route
                        key={childId}
                        path={childPath}
                        element={
                          childRequiredRole ? (
                            <PrivateRoute requiredRole={requiredRole}>
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
      <Route path="*" element={<h1>Not found</h1>} />
    </Routes>
  );
};
export default AppRouter;
