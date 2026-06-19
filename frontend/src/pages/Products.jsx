import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import api from "../../api/api.js";
import ProductCard from "../components/Productcard";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState(["all"]);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products", {
          params: { search, category, page: currentPage, limit: itemsPerPage }
        });

        if (res.data.products) {
          setProducts(res.data.products);
          setTotalPages(res.data.pagination.totalPages);

          // Optionally update categories from the returned products if they aren't all there
          const newCats = [...new Set(res.data.products.map(p => p.category).filter(Boolean))];
          setCategories(prev => [...new Set([...prev, ...newCats])]);
        } else if (Array.isArray(res.data)) {
          setProducts(res.data);
          setTotalPages(Math.ceil(res.data.length / itemsPerPage));
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search, category, currentPage]);

  const { user } = useContext(AuthContext);
  const currentProducts = user ? products : products.slice(0, 4);

  const goToPage = page => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-stone-50 py-20 px-4 sm:px-8 font-sans">

      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4 tracking-wide">
          The Collection
        </h1>
        <div className="w-16 h-[1px] bg-stone-300 mx-auto mb-6"></div>
        <p className="text-stone-500 text-lg font-light max-w-2xl mx-auto">
          Explore our thoughtfully curated pieces designed for the modern wardrobe.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Results Count */}
          <div className="text-sm uppercase tracking-widest text-stone-500 font-medium">
            {products.length} Products
          </div>

          <div className="flex flex-col sm:flex-row gap-6 w-full md:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search pieces..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-transparent border-b border-stone-300 py-2 pl-8 pr-4 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-900 transition-colors duration-300 font-light"
              />
              <FaSearch className="absolute left-0 top-1/2 -translate-y-1/2 text-stone-400" />
            </div>

            {/* Category */}
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full sm:w-48 bg-transparent border-b border-stone-300 py-2 px-0 text-stone-800 focus:outline-none focus:border-stone-900 cursor-pointer font-light appearance-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === "all"
                    ? "All Categories"
                    : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
            {currentProducts.map((product, index) => (
              <ProductCard
                key={`${product.id}-${index}`}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <h3 className="text-2xl font-serif text-stone-800 mb-4">
              No pieces found
            </h3>
            <p className="text-stone-500 font-light mb-8 max-w-md mx-auto">
              We couldn't find anything matching your current filters. Please try adjusting them.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("all");
                setCurrentPage(1);
              }}
              className="px-8 py-3 bg-stone-900 text-white text-sm uppercase tracking-widest hover:bg-stone-800 transition-colors duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Login Prompt for Guests */}
      {!user && products.length > 0 && (
        <div className="max-w-4xl mx-auto mt-20 text-center bg-white p-12 border border-stone-200 shadow-sm">
          <h3 className="text-3xl font-serif text-stone-900 mb-4">Discover the Full Collection</h3>
          <p className="text-stone-500 font-light mb-8 max-w-lg mx-auto text-lg">
            Create an account or login to explore all our beautiful, curated pieces.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="px-8 py-3 bg-stone-900 text-white text-sm uppercase tracking-widest hover:bg-stone-800 transition-colors duration-300">
              Login
            </Link>
            <Link to="/signup" className="px-8 py-3 bg-stone-100 text-stone-900 border border-stone-200 text-sm uppercase tracking-widest hover:bg-stone-200 transition-colors duration-300">
              Sign Up
            </Link>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && user && (
        <div className="flex justify-center items-center gap-4 mt-20">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-sm uppercase tracking-widest text-stone-500 hover:text-stone-900 disabled:opacity-30 transition-colors duration-300"
          >
            Prev
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`w-10 h-10 flex items-center justify-center text-sm font-light transition-colors duration-300 ${
                  currentPage === i + 1
                    ? "bg-stone-900 text-white"
                    : "text-stone-500 hover:bg-stone-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-sm uppercase tracking-widest text-stone-500 hover:text-stone-900 disabled:opacity-30 transition-colors duration-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
