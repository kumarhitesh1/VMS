import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const refreshUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/profile");

        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
      } catch (error) {
        // api.js interceptor already clears storage and redirects on 401,
        // so nothing extra to do here besides clearing local state.
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    refreshUser();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);