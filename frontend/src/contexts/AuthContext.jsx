import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
      // Verify token with backend
      verifyToken(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  // Setup axios interceptor
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("authToken", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("authToken");
    }
  }, [token]);

  const verifyToken = async (tokenToVerify) => {
    try {
      const response = await axios.get(
        "https://huntboard.onrender.com/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${tokenToVerify}`,
          },
        }
      );
      setUser(response.data.user);
      setToken(tokenToVerify);
      setError(null);
    } catch (err) {
      // Token is invalid, clear it
      setToken(null);
      setUser(null);
      localStorage.removeItem("authToken");
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setError(null);
      const response = await axios.post(
        "https://huntboard.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      setUser(response.data.user);
      setToken(response.data.token);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post(
        "https://huntboard.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      setUser(response.data.user);
      setToken(response.data.token);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem("authToken");
    delete axios.defaults.headers.common["Authorization"];
  };

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!token,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
