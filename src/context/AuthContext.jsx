import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const baseURL = "http://localhost:5000/users";

  // Persist login
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  // Signup
  const signup = async ({ name, email, password }) => {
    // check if email already exists
    const res = await axios.get(`${baseURL}?email=${email}`);
    if (res.data.length > 0) {
      throw new Error("Email already registered");
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: "user",
      isBlocked: false,
      isActive: true,
      cart: [],
      wishlist: [],
      orders: [],
      created_at: new Date().toISOString()
    };

    const created = await axios.post(baseURL, newUser);
    localStorage.setItem("user", JSON.stringify(created.data));
    setUser(created.data);
    return created.data;
  };

  // Login
  const login = async (email, password) => {
    const res = await axios.get(`${baseURL}?email=${email}&password=${password}`);
    if (res.data.length === 0) {
      throw new Error("Invalid email or password");
    }

    const loggedUser = res.data[0];

    if (loggedUser.isBlocked) throw new Error("Your account is blocked");
    if (!loggedUser.isActive) throw new Error("Your account is inactive");

    localStorage.setItem("user", JSON.stringify(loggedUser));
    setUser(loggedUser);
    return loggedUser;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
