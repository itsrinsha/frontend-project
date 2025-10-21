import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaUser, FaSignOutAlt, FaCrown, FaBars, FaTimes } from "react-icons/fa";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const getFirstLetter = () => {
    if (!user) return "U";
    if (typeof user.name === "string" && user.name.length > 0) return user.name.charAt(0).toUpperCase();
    if (user.name?.firstName?.length > 0) return user.name.firstName.charAt(0).toUpperCase();
    return "U";
  };

  const getDisplayName = () => {
    if (!user) return "User";
    if (typeof user.name === "string") return user.name;
    if (user.name?.firstName) return user.name.firstName;
    return "User";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200 px-4 sm:px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-3">
        {/* <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
          <FaCrown className="text-white text-sm sm:text-base" />
        </div> */}
 <h1 className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500 tracking-wide select-none">
  Glanzio
</h1>






      </NavLink>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-gray-700 hover:text-amber-600 text-xl focus:outline-none"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-8 items-center">
        {["Home", "Products", "About"].map((link) => (
          <li key={link}>
            <NavLink
              to={`/${link.toLowerCase() === "home" ? "" : link.toLowerCase()}`}
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${
                  isActive ? "text-amber-600 font-semibold" : "text-gray-700 hover:text-amber-500"
                }`
              }
            >
              {link}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Desktop Right Side */}
      <div className="hidden md:flex space-x-6 items-center">
        {/* Wishlist */}
        <NavLink to="/wishlist" className="relative p-2 rounded-lg hover:bg-red-50 transition-colors duration-200">
          <FaHeart className="text-lg text-gray-600 hover:text-red-500" />
          {wishlist?.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </NavLink>

        {/* Cart */}
        <NavLink to="/cart" className="relative p-2 rounded-lg hover:bg-amber-50 transition-colors duration-200">
          <FaShoppingCart className="text-lg text-gray-600 hover:text-amber-600" />
          {cart?.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/orders"
          className="text-gray-600 hover:text-amber-600 font-medium px-3 py-2 rounded-lg hover:bg-amber-50 transition-colors duration-200"
        >
          Orders
        </NavLink>

        {/* User Section */}
        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{getFirstLetter()}</span>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-800">Hello, {getDisplayName()}</p>
              </div>
            </div>

            <div className="relative group">
              <button className="flex items-center justify-center w-9 h-9 bg-gray-100 rounded-lg hover:bg-amber-500 hover:text-white transition-colors duration-200">
                <FaUser className="text-sm" />
              </button>

              <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-3 bg-gray-50 border-b border-gray-200">
                  <p className="font-semibold text-gray-800 text-sm">{getDisplayName()}</p>
                  <p className="text-xs text-gray-600 truncate">{user.email}</p>
                </div>

                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left px-4 py-3 hover:bg-amber-50 flex items-center gap-2 text-gray-700 text-sm"
                >
                  <FaUser className="text-amber-500" />
                  My Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-red-50 flex items-center gap-2 text-red-600 border-t border-gray-200 text-sm"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors duration-200 shadow-md font-medium text-sm"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 shadow-lg flex flex-col items-center py-5 space-y-4 md:hidden animate-fadeIn z-50">
          {["Home", "Products", "About"].map((link) => (
            <NavLink
              key={link}
              to={`/${link.toLowerCase() === "home" ? "" : link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-medium text-base transition-colors duration-200 ${
                  isActive ? "text-amber-600" : "text-gray-700 hover:text-amber-500"
                }`
              }
            >
              {link}
            </NavLink>
          ))}

          <div className="flex items-center gap-6">
            <NavLink to="/wishlist" onClick={() => setMenuOpen(false)}>
              <FaHeart className="text-xl text-gray-600 hover:text-red-500" />
            </NavLink>
            <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
              <FaShoppingCart className="text-xl text-gray-600 hover:text-amber-600" />
            </NavLink>
          </div>

          {user ? (
            <>
              <button
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
                className="text-gray-700 hover:text-amber-600 font-medium"
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-lg text-sm hover:from-amber-600 hover:to-orange-600"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
