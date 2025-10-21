import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData, useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const navigate=useLocation()

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setIsLoading(false);
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    // if(userData.role==='admin'){
    //   navigate()
    // }
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Updated signup to POST user to backend
  const signup = async (userData) => {
    try {
      // Add default fields
      const newUser = {
        ...userData,
        role: "user",
        isBlocked: false,
        isActive: true,
        cart: [],
        wishlist: [],
      };

      const res = await axios.post("http://localhost:5000/users", newUser);

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      return res.data;
    } catch (err) {
      console.error("Signup failed:", err);
      throw new Error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loginUser, logoutUser, signup, isLoading }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
