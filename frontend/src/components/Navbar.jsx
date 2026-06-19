import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaSearch
} from "react-icons/fa";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import logoImage from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const getFirstLetter = () => {
    if (!user) return "U";
    if (typeof user.name === "string" && user.name.length > 0)
      return user.name.charAt(0).toUpperCase();
    if (user.name?.firstName?.length > 0)
      return user.name.firstName.charAt(0).toUpperCase();
    return "U";
  };

  const getDisplayName = () => {
    if (!user) return "User";
    if (typeof user.name === "string") return user.name;
    if (user.name?.firstName) return user.name.firstName;
    return "User";
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-white py-5'} border-b border-stone-100 px-4 sm:px-8 flex justify-between items-center`}>
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-2 h-16 overflow-visible">
        <img src={logoImage} alt="Liora Logo" className="h-24 md:h-32 object-contain scale-[1.3] origin-left" />
      </NavLink>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-10 items-center">
        {["Home", "Products", "About"].map((link) => (
          <li key={link}>
            <NavLink
              to={`/${link.toLowerCase() === "home" ? "" : link.toLowerCase()}`}
              className={({ isActive }) =>
                `text-[14px] uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? "text-rose-600 font-medium"
                    : "text-stone-500 hover:text-rose-500"
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
        <NavLink
          to="/wishlist"
          className="relative text-stone-600 hover:text-rose-500 transition-colors duration-300"
        >
          <FaHeart className="text-xl" />
          {wishlist?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </NavLink>

        {/* Cart */}
        <NavLink
          to="/cart"
          className="relative text-stone-600 hover:text-rose-500 transition-colors duration-300"
        >
          <FaShoppingCart className="text-xl" />
          {cart?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </NavLink>

        {/* Orders Link */}
        <NavLink
          to="/orders"
          className="text-[14px] uppercase tracking-widest text-stone-500 hover:text-rose-500 transition-colors duration-300"
        >
          Orders
        </NavLink>

        {/* User Section */}
        {user ? (
          <div className="flex items-center gap-4 pl-4 border-l border-stone-200">
            <div className="relative group">
              <button className="flex items-center gap-2 focus:outline-none">
                <div className="w-9 h-9 bg-rose-50 rounded-full flex items-center justify-center border border-rose-100 hover:border-rose-300 transition-colors">
                  <span className="text-rose-800 text-sm font-medium font-serif">
                    {getFirstLetter()}
                  </span>
                </div>
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-stone-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:translate-y-2 z-50">
                <div className="p-4 border-b border-stone-50 bg-stone-50/50 rounded-t-xl">
                  <p className="font-serif font-medium text-stone-800">
                    {getDisplayName()}
                  </p>
                  <p className="text-xs text-stone-400 truncate mt-1">{user.email}</p>
                </div>

                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left px-4 py-3 hover:bg-rose-50/50 flex items-center gap-3 text-stone-600 text-sm transition-colors duration-200"
                >
                  <FaUser className="text-rose-300" />
                  My Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 hover:bg-rose-50/50 flex items-center gap-3 text-stone-600 border-t border-stone-50 text-sm transition-colors duration-200 rounded-b-xl"
                >
                  <FaSignOutAlt className="text-rose-300" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="ml-4 bg-stone-900 text-white px-7 py-2.5 rounded-full hover:bg-rose-600 transition-colors duration-300 text-sm uppercase tracking-widest font-medium"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-stone-800 text-2xl focus:outline-none"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <div className={`absolute top-full left-0 w-full bg-white shadow-2xl flex flex-col md:hidden transition-all duration-300 origin-top overflow-hidden z-40 ${menuOpen ? 'max-h-screen py-8 border-t border-stone-100' : 'max-h-0'}`}>
        <div className="flex flex-col items-center space-y-8">
          {["Home", "Products", "About"].map((link) => (
            <NavLink
              key={link}
              to={`/${link.toLowerCase() === "home" ? "" : link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `text-lg uppercase tracking-widest transition-colors ${
                  isActive ? "text-rose-600 font-medium" : "text-stone-500 hover:text-rose-500"
                }`
              }
            >
              {link}
            </NavLink>
          ))}

          {/* Icons */}
          <div className="flex items-center gap-10 pt-6 border-t border-stone-100 w-2/3 justify-center">
            <NavLink to="/wishlist" onClick={() => setMenuOpen(false)} className="relative">
              <FaHeart className="text-2xl text-stone-400 hover:text-rose-500 transition-colors" />
              {wishlist?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </NavLink>
            <NavLink to="/cart" onClick={() => setMenuOpen(false)} className="relative">
              <FaShoppingCart className="text-2xl text-stone-400 hover:text-rose-500 transition-colors" />
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </NavLink>
          </div>

          {/* User Auth */}
          <div className="pt-6 w-3/4 flex flex-col gap-4">
            {user ? (
              <>
                <button
                  onClick={() => { navigate("/profile"); setMenuOpen(false); }}
                  className="w-full bg-stone-50 text-stone-800 border border-stone-200 py-3 rounded-full font-medium uppercase tracking-widest text-sm"
                >
                  My Profile
                </button>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="w-full bg-stone-900 text-white py-3 rounded-full font-medium uppercase tracking-widest text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => { navigate("/login"); setMenuOpen(false); }}
                className="w-full bg-stone-900 text-white py-3.5 rounded-full font-medium tracking-widest uppercase text-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
