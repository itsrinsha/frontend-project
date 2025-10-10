import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/users?email=${formData.email}&password=${formData.password}`
      );
      console.log("Login response:", res.data);

      if (res.data.length > 0) {
        setMessage("Login Successful!");
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage("Invalid Email or Password");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error logging in");
    }
  };

  return (
    <div  className="flex items-center justify-center min-h-screen bg-no-repeat bg-center">
      <div   className="w-full max-w-md p-30 rounded-2xl shadow-lg"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/bb/bb/31/bbbb31838fbee38c45bf8400caa8ecc8.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
             className="w-full mb-2 p-2 border rounded-md focus:outline-none focus:border-blue-600 bg-white/60 hover:bg-blue-100"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
             className="w-full mb-2 p-2 border rounded-md focus:outline-none focus:border-blue-600 bg-white/60 hover:bg-blue-100"
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}

          <button
            type="submit"
          className="w-full mt-4 mb-4 p-2 border rounded-xl focus:outline-none border-y-indigo-700 bg-indigo-400 hover:bg-indigo-300"
          >
            Login
          </button>

          {message && (
            <p
              className={`mt-3 text-center ${
                message.includes("Successful") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <p className="text-center mt-4 text-sm">
            Don’t have an account?{" "}
            <NavLink to="/register" className="text-blue-600 hover:underline">
              Sign Up
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
