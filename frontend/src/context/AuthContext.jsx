import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid JSON in localStorage:", error);
        localStorage.removeItem("user");
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post("/user/login", { email, password });

      const userData = res.data.user;
      // If token is returned, you might want to store it too
      // userData.token = res.data.token; 

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", res.data.token); // Store token if available
      return userData;
    } catch (err) {
      console.error("Login failed:", err);
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const logoutUser = async () => {
    try {
      await api.post("/user/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };


  const signup = async (userData) => {
    try {
      // Backend expects { name, email, password }
      // Role is handled by backend default, or can be passed if controller allows
      const res = await api.post("/user/register", userData);

      const newUser = res.data.user;
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    } catch (err) {
      console.error("Signup failed:", err);
      throw new Error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logoutUser, signup, isLoading }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
