import { createContext, useState, useEffect } from "react";
import { getRole } from "../utils/decodeJwt";
import { fetchData } from "../utils/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  /* const [user, setUser] = useState(null); */
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  // MODIFIED: On load, if token exists fetch user profile from backend to obtain role
  // Reason: backend does not include role claim in JWT; role is obtained via user profile endpoint
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    async function loadUser() {
      if (storedToken) {
        setToken(storedToken);
        try {
          const user = await fetchData('/api/v1/users/me');
          // expecting user object with a role field
          setRole(user?.role ?? getRole(storedToken));
          /* setUser(user); */
        } catch (err) {
          console.error('Error fetching current user:', err);
          // token may be invalid/expired -> cleanup
          localStorage.removeItem('token');
          setToken(null);
          setRole(null);
        }
      }
      setLoading(false);
    }

    loadUser();
  }, []);

  // MODIFIED: after storing token, request user profile to obtain role; fallback to decoding token
  // Reason: backend validates roles from DB and does not provide role claim in JWT
  const login = (newToken, userData) => {
    // Persist token first so fetchData will include it in headers
    localStorage.setItem("token", newToken);
    setToken(newToken);
    /* setUser(userData); */

    // Fetch user profile to obtain role from backend
    fetchData('/api/v1/users/me')
      .then(user => {
        setRole(user?.role ?? getRole(newToken));
      })
      .catch(err => {
        console.error('Error fetching user after login:', err);
        // If backend doesn't respond, fallback to decoding token
        setRole(getRole(newToken));
      });
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
