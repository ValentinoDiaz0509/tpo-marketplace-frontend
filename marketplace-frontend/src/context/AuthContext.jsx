import { createContext, useState, useEffect } from "react";
import { getRole } from "../utils/decodeJwt";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  /* const [user, setUser] = useState(null); */
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    /* const storedUser = localStorage.getItem("user"); */

    if (storedToken /* && storedUser */) {
      setToken(storedToken);
      setRole(getRole(storedToken));
      /* setUser(JSON.parse(storedUser)); */
    }
    setLoading(false);
  }, []);

  const login = (newToken, userData) => {
    setToken(newToken);
    setRole(getRole(newToken));
    /* setUser(userData); */
    localStorage.setItem("token", newToken);
    /* localStorage.setItem("user", JSON.stringify(userData)); */
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    /* setUser(null); */
    localStorage.removeItem("token");
    /* localStorage.removeItem("user"); */
  };

  const value = {
    token,
    role,
    /* user, */
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
