import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logoImage from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-stone-50 pt-20 pb-10 border-t border-stone-200 text-stone-600 font-sans mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">

        {/* Company Info */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <img src={logoImage} alt="Liora Logo" className="h-32 object-contain mb-2 -ml-4 scale-[1.2] origin-left" />
          
          <p className="text-stone-500 text-sm leading-relaxed max-w-sm font-light">
            Defining modern elegance with curated collections of premium women's fashion. Designed to inspire and empower your unique style journey.
          </p>

          <div className="flex gap-6 text-stone-400 mt-4">
            <a href="#" className="hover:text-rose-500 transition-colors duration-300"><FaInstagram className="text-xl" /></a>
            <a href="#" className="hover:text-rose-500 transition-colors duration-300"><FaFacebookF className="text-xl" /></a>
            <a href="#" className="hover:text-rose-500 transition-colors duration-300"><FaTwitter className="text-xl" /></a>
            <a href="#" className="hover:text-rose-500 transition-colors duration-300"><FaLinkedinIn className="text-xl" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-stone-900 text-lg mb-2">Explore</h3>
          
          {[
            { name: "New Arrivals", path: "/products" },
            { name: "Best Sellers", path: "/products" },
            { name: "Collections", path: "/products" },
            { name: "Our Story", path: "/about" },
            { name: "Journal", path: "/" },
          ].map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className="text-sm text-stone-500 hover:text-rose-600 transition-colors duration-300 w-fit"
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Client Services */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-stone-900 text-lg mb-2">Client Services</h3>

          {[
            { name: "Contact Us", path: "/about" },
            { name: "Shipping & Returns", path: "/" },
            { name: "Track Order", path: "/orders" },
            { name: "Size Guide", path: "/" },
            { name: "FAQ", path: "/" },
          ].map((link, idx) => (
            <NavLink
              key={idx}
              to={link.path}
              className="text-sm text-stone-500 hover:text-rose-600 transition-colors duration-300 w-fit"
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 mt-20">
        <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-400 text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Liora. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-stone-400 tracking-widest uppercase">
            <a href="#" className="hover:text-rose-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-rose-500 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
