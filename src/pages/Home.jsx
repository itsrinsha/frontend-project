import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaShoppingCart, FaArrowRight } from "react-icons/fa";

function Home({ cart, setCart, wishlist, setWishlist }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/products?featured=true")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

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
    if (!cart.find((p) => p.id === product.id)) {
      setCart([...cart, product]);
      
      const button = document.getElementById(`cart-${product.id}`);
      if (button) {
        button.classList.add('scale-110');
        setTimeout(() => button.classList.remove('scale-110'), 300);
      }
    }
  };

  const handleAddToWishlist = (product) => {
    if (!wishlist.find((p) => p.id === product.id)) {
      setWishlist([...wishlist, product]);
      
      const button = document.getElementById(`wishlist-${product.id}`);
      if (button) {
        button.classList.add('scale-110');
        setTimeout(() => button.classList.remove('scale-110'), 300);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading featured products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 px-6 overflow-hidden">
        
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white rounded-full"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Glanzio
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Discover the latest fashion trends curated for you. Quality products, 
            amazing prices, and exceptional shopping experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/products")}
              className="bg-amber-400 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-500 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Shop Now <FaArrowRight />
            </button>
            <button
              onClick={() => document.getElementById('featured').scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Explore Products
            </button>
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
              <p className="text-gray-600 text-lg">Happy Customers</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600 text-lg">Premium Products</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-gray-600 text-lg">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      
      <section id="featured" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated selection of premium products
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-6 rounded-full"></div>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group overflow-hidden"
              >
                
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  
                  
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      id={`wishlist-${product.id}`}
                      onClick={() => handleAddToWishlist(product)}
                      className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-110"
                    >
                      <FaHeart
                        className={
                          wishlist.find((p) => p.id === product.id)
                            ? "text-red-500"
                            : "text-gray-600"
                        }
                      />
                    </button>
                    <button
                      id={`cart-${product.id}`}
                      onClick={() => handleAddToCart(product)}
                      className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-110"
                    >
                      <FaShoppingCart className="text-gray-600" />
                    </button>
                  </div>
                </div>

                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {renderStars(product.rating)}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({product.rating})
                    </span>
                  </div>

                
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>

                  
                  <div className="flex gap-2">
                    <NavLink
                      to={`/products/${product.id}`}
                      className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center font-medium"
                    >
                      View Details
                    </NavLink>
                    <button
                      onClick={() =>
                        navigate(`/checkout/${product.id}`, {
                          state: {
                            order: {
                              product: { ...product, quantity: 1 },
                              total: product.price,
                            },
                            type: "direct",
                          },
                        })
                      }
                      className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/products")}
              className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      
     
    </div>
  );
}

export default Home;