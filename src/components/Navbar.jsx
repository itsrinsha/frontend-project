import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser, FaSignOutAlt } from "react-icons/fa";

function Navbar({ cart, wishlist, searchQuery, setSearchQuery }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setIsLoggedIn(true);
      setUserName(userData.name || "User");
    }
  }, []);

  const handleLogin = () => navigate("/login");

  const handleLogout = () => {
    
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/login");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg px-6 py-4 flex justify-between items-center">
      
      
      <NavLink to="/" className="text-2xl font-bold text-navy flex items-center gap-2">
        <span className="bg-gold text-white p-2 rounded-lg">G</span>
        Glanzio
      </NavLink>

     
      <ul className="flex space-x-8 items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-gold font-medium transition-colors ${
                isActive ? "text-gold font-semibold" : "text-gray-700"
              }`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `hover:text-gold font-medium transition-colors ${
                isActive ? "text-gold font-semibold" : "text-gray-700"
              }`
            }
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-gold font-medium transition-colors ${
                isActive ? "text-gold font-semibold" : "text-gray-700"
              }`
            }
          >
            About
          </NavLink>
        </li>
      </ul>

     
      <div className="flex-1 max-w-md mx-4">
        <input
          type="text"
          placeholder="Search dresses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
        />
      </div>

     
      <div className="flex space-x-6 items-center text-xl">
       
        <NavLink
          to="/wishlist"
          className="relative hover:text-red-500 transition-colors text-gray-700"
        >
          <FaHeart />
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </NavLink>

      
        <NavLink
          to="/cart"
          className="relative hover:text-red-500 transition-colors text-gray-700"
        >
          <FaShoppingCart />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </NavLink>
          <NavLink
  to="/orders"
  className="text-gray-800 hover:text-blue-600 font-medium"
>
  orders
</NavLink>
     
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
           
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-700">
              <FaUser className="text-gold" />
              <span>Hello, {userName}</span>
            </div>

            
            <div className="relative group">
              <button className="flex items-center gap-2 bg-gray-100 rounded-full p-2 hover:bg-gold hover:text-white transition-colors">
                <FaUser className="text-sm" />
              </button>

              <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <button
                  onClick={handleProfile}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-t-lg flex items-center gap-2 text-gray-700"
                >
                  <FaUser className="text-gold" />
                  My Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-b-lg flex items-center gap-2 text-red-600 border-t border-gray-200"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleLogin}
              className="bg-navy text-blue-400 px-6 py-2 rounded-lg hover:bg-gold hover:text-navy transition-colors font-medium text-sm"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;





