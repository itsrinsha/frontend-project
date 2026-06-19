import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(form); // calls context.signup
      setLoading(false);
      navigate("/"); // redirect after signup
    } catch (err) {
      setLoading(false);
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-stone-50 px-4 sm:px-6 font-sans py-12">
      <div className="bg-white p-8 sm:p-12 md:p-14 rounded-2xl shadow-sm border border-stone-100 w-full max-w-md">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif text-stone-900 tracking-wide mb-2">
            Join Liora
          </h2>
          <p className="text-stone-500 font-light text-sm">
            Create an account to elevate your style
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-stone-500 font-medium ml-1">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400 focus:bg-white transition-all duration-300"
              placeholder="Enter your name"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-stone-500 font-medium ml-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400 focus:bg-white transition-all duration-300"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-stone-500 font-medium ml-1">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400 focus:bg-white transition-all duration-300"
              placeholder="Create a password"
            />
          </div>

          <button
            type="submit"
            className={`w-full mt-2 py-4 rounded-xl text-sm uppercase tracking-widest font-medium transition-all shadow-lg ${
              loading 
                ? "bg-stone-300 text-stone-500 cursor-not-allowed" 
                : "bg-stone-900 text-white hover:bg-stone-800 shadow-stone-900/20"
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-sm text-stone-500 text-center font-light">
          Already have an account?{" "}
          <a href="/login" className="text-stone-900 font-medium hover:text-rose-600 transition-colors">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
