import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!number) newErrors.number = "Phone number is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirm) newErrors.confirm = "Confirm password is required";

    if (password && password.length < 8)
      newErrors.password = "Password must be at least 8 characters long";
    if (password && password[0] !== password[0].toUpperCase())
      newErrors.password = "Password must start with an uppercase letter";
    if (password && confirm && password !== confirm)
      newErrors.confirm = "Passwords do not match";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    
    try {
      const res = await axios.get(`http://localhost:5000/users?email=${email}`);
      if (res.data.length > 0) {
        setMessage("Email already registered!");
        return;
      }
    } catch (err) {
      console.error("Email check failed:", err);
      setMessage("Error checking email");
      return;
    }

    
    try {
      const res = await axios.post("http://localhost:5000/users", {
        name,
        email,
        number,
        password,
      });

      if (res.status === 201) {
        setMessage("Sign up Successfully!");
        
        setName("");
        setEmail("");
        setNumber("");
        setPassword("");
        setConfirm("");
        setErrors({});

        
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      console.error(err);
      setMessage("Error registering user");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-no-repeat bg-center">
      <div
        className="w-full max-w-md p-8 rounded-2xl shadow-lg"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/bb/bb/31/bbbb31838fbee38c45bf8400caa8ecc8.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign Up
        </h2>
        <h5 className="text-lg text-center mb-6 text-gray-600">
          Sign up to continue
        </h5>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-2 p-2 border rounded-md focus:outline-none focus:border-blue-600 bg-white/60 hover:bg-blue-100"
          />
          {errors.name && <p className="text-red-600 text-sm mb-2">{errors.name}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-2 p-2 border rounded-md focus:outline-none focus:border-blue-600 bg-white/60 hover:bg-blue-100"
          />
          {errors.email && <p className="text-red-600 text-sm mb-2">{errors.email}</p>}

          <input
            type="number"
            placeholder="Phone number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full mb-2 p-2 border rounded-md focus:outline-none focus:border-blue-600 bg-white/60 hover:bg-blue-100"
          />
          {errors.number && <p className="text-red-600 text-sm mb-2">{errors.number}</p>}

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-2 p-2 border rounded-md focus:outline-none focus:border-blue-600 bg-white/60 hover:bg-blue-100"
          />
          {errors.password && <p className="text-red-600 text-sm mb-2">{errors.password}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full mb-2 p-2 border rounded-md focus:outline-none focus:border-blue-600 bg-white/60 hover:bg-blue-100"
          />
          {errors.confirm && <p className="text-red-600 text-sm mb-2">{errors.confirm}</p>}

          <button
            type="submit"
            className="w-full mt-4 mb-4 p-2 border rounded-xl focus:outline-none border-y-indigo-700 bg-indigo-400 hover:bg-indigo-300"
          >
            Sign Up
          </button>

          {message && (
            <p
              className={`mt-3 text-center ${
                message.includes("Successfully") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <p className="text-center mt-4 text-sm text-white">
            Already have an account?{" "}
            <NavLink to="/login" className="text-fuchsia-950 hover:underline">
              Login here
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
