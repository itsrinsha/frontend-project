
import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaStar, FaStarHalfAlt, FaRegStar, FaFilter } from "react-icons/fa";

function Products({ cart, setCart, wishlist, setWishlist, searchQuery }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data);
        // Extract unique categories from products
        const uniqueCategories = ["All", ...new Set(res.data.map(product => product.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "All" || product.category === selectedCategory)
  );

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} className="text-amber-400 inline" />);
      else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} className="text-amber-400 inline" />);
      else stars.push(<FaRegStar key={i} className="text-amber-400 inline" />);
    }
    return stars;
  };

  const handleAddToCart = (product) => {
    if (!cart.find((p) => p.id === product.id)) setCart([...cart, product]);
  };

  const handleAddToWishlist = (product) => {
    if (!wishlist.find((p) => p.id === product.id)) setWishlist([...wishlist, product]);
  };

  const handleBuyNow = (product) => {
    navigate(`/checkout/${product.id}`, { state: { buyNowProduct: product } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header with Filters */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">All Products</h2>
          
          {/* Category Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md border border-gray-200"
            >
              <FaFilter className="text-gray-600" />
              <span>Filters</span>
            </button>

            {/* Category Filter - Desktop */}
            <div className="hidden lg:flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-navy text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-200">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
        </div>

        {/* Mobile Category Filter */}
        {showFilters && (
          <div className="lg:hidden mb-6 bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowFilters(false);
                  }}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-navy text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No products found matching your criteria.</p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="mt-4 bg-navy text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-gold text-navy px-2 py-1 rounded-full text-xs font-semibold">
                      {product.category}
                    </span>
                  </div>
                  {/* Wishlist Button */}
                  <button 
                    onClick={() => handleAddToWishlist(product)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                  >
                    <FaHeart 
                      className={wishlist.find((p) => p.id === product.id) ? "text-red-500" : "text-gray-400"} 
                      size={16}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">({product.rating})</span>
                  </div>

                  {/* Price */}
                  <p className="text-blue-700 font-bold text-xl mb-4">₹{product.price}</p>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center gap-2">
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex-1 justify-center"
                    >
                      <FaShoppingCart size={14} />
                      <span className="text-sm">Add to Cart</span>
                    </button>
                    
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium flex-1"
                    >
                      Buy Now
                    </button>
                  </div>

                  {/* View Details Button */}
                  <NavLink
                    to={`/products/${product.id}`}
                    className="block w-full bg-navy text-blue-500 text-center py-2 rounded-lg hover:bg-blue-800 transition-colors mt-2 text-sm font-medium"
                  >
                    View Details
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;

