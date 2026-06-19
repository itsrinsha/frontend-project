import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user, login } = useContext(AuthContext); // Updated to use login instead of loginUser
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      user.role === "admin" ? navigate("/adminhome") : navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const loggedInUser = await login(form.email, form.password);

      // Redirect handled by useEffect or here
      loggedInUser.role === "admin" ? navigate("/adminhome") : navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-stone-50 px-4 sm:px-6 font-sans py-12">
      <div className="bg-white p-8 sm:p-12 md:p-14 rounded-2xl shadow-sm border border-stone-100 w-full max-w-md">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif text-stone-900 tracking-wide mb-2">
            Welcome Back
          </h2>
          <p className="text-stone-500 font-light text-sm">
            Sign in to access your curated experience
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-6 text-center border border-red-100">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-stone-500 font-medium ml-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400 focus:bg-white transition-all duration-300"
              required
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-stone-500 font-medium ml-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400 focus:bg-white transition-all duration-300"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full mt-2 py-4 bg-stone-900 text-white rounded-xl text-sm uppercase tracking-widest font-medium hover:bg-stone-800 transition-colors shadow-lg shadow-stone-900/20"
          >
            Sign In
          </button>
        </form>
        
        <p className="mt-8 text-sm text-stone-500 text-center font-light">
          Don't have an account?{" "}
          <a href="/register" className="text-stone-900 font-medium hover:text-rose-600 transition-colors">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
