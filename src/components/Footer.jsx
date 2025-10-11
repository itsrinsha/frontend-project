import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Company Info */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-white">Glanzio</h2>
          <p className="text-gray-400">
            Your one-stop shop for stylish clothing and accessories. Quality products at affordable prices.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-white mb-2">Quick Links</h3>
          <NavLink to="/" className="hover:text-white">Home</NavLink>
          <NavLink to="/products" className="hover:text-white">Products</NavLink>
          <NavLink to="/cart" className="hover:text-white">Cart</NavLink>
          <NavLink to="/wishlist" className="hover:text-white">Wishlist</NavLink>
          <NavLink to="/orders" className="hover:text-white">Orders</NavLink>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-white mb-2">Contact Us</h3>
          <p>Email: support@glanzio.com</p>
          <p>Phone: +91 12345 67890</p>
          <p>Address: 123 Fashion Street, Mumbai, India</p>
        </div>
      </div>

      <div className="bg-gray-800 text-gray-400 text-center py-4 mt-6">
        &copy; {new Date().getFullYear()} Glanzio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
