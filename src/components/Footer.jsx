import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {/* Company Info */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Glanzio</h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Your one-stop shop for stylish clothing and accessories. Quality products at affordable prices.
          </p>
          <div className="flex gap-4 mt-2 text-sm sm:text-base">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-white mb-2 text-base sm:text-lg">Quick Links</h3>
          <NavLink to="/" className="hover:text-white text-sm sm:text-base">Home</NavLink>
          <NavLink to="/products" className="hover:text-white text-sm sm:text-base">Products</NavLink>
          <NavLink to="/cart" className="hover:text-white text-sm sm:text-base">Cart</NavLink>
          <NavLink to="/wishlist" className="hover:text-white text-sm sm:text-base">Wishlist</NavLink>
          <NavLink to="/orders" className="hover:text-white text-sm sm:text-base">Orders</NavLink>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-white mb-2 text-base sm:text-lg">Contact Us</h3>
          <p className="text-sm sm:text-base">Email: support@glanzio.com</p>
          <p className="text-sm sm:text-base">Phone: +91 12345 67890</p>
          <p className="text-sm sm:text-base">Address: 123 Fashion Street, Mumbai, India</p>
        </div>
      </div>

      <div className="bg-gray-800 text-gray-400 text-center py-4 mt-6 text-sm sm:text-base">
        &copy; {new Date().getFullYear()} Glanzio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
