import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaBoxOpen, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext"; // Adjust the path if needed

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/adminhome" },
    { name: "Users", icon: <FaUsers />, path: "/admin/users" },
    { name: "Products", icon: <FaBoxOpen />, path: "/admin/products" },
    { name: "Orders", icon: <FaShoppingCart />, path: "/admin/orders" },
  ];

  // Logout handler
  const handleLogout = () => {
    logoutUser();
    navigate("/login"); // Redirect to login page
  };

  return (
    <div
      className={`h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ${isOpen ? "w-64" : "w-20"
        }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <h2 className="text-xl font-bold">Admin Panel</h2>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded hover:bg-gray-800 transition"
        >
          {isOpen ? "<" : ">"}
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 mt-4">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 mx-2 my-1 rounded hover:bg-gray-800 transition ${isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {isOpen && <span>{item.name}</span>}
          </NavLink>
        ))}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-4 p-3 m-2 mt-auto rounded hover:bg-gray-800 transition"
      >
        <FaSignOutAlt />
        {isOpen && <span>Logout</span>}
      </button>
    </div>
  );
}

export default AdminSidebar;
