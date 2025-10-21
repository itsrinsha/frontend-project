import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingBag } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addToCart, cart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  // ✅ Check if product is in wishlist or cart
  const isInWishlist = wishlist.some(item => item.id === product.id);
  const isInCart = cart.some(item => item.id === product.id);

  // ✅ Add to cart
  const handleAddToCart = () => {
    if (!user) {
      alert("Please login first to add to cart!");
      navigate("/login");
      return;
    }
    if (!isInCart) {
      addToCart(product);
    }
  };

  // ✅ Wishlist toggle (add/remove + color change)
  const handleWishlist = () => {
    if (!user) {
      alert("Please login first to add to wishlist!");
      navigate("/login");
      return;
    }

    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-80 md:w-72">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 sm:h-64 md:h-64 lg:h-72 object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
          onClick={() => navigate(`/viewproduct/${product.id}`)}
        />

        {/* Wishlist Button */}
        <div
          className="absolute top-3 right-3 cursor-pointer bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={handleWishlist}
        >
          {isInWishlist ? (
            <FaHeart className="text-red-500 text-lg transition-colors duration-300" />
          ) : (
            <FaRegHeart className="text-gray-400 text-lg hover:text-red-400 transition-colors duration-300" />
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5">
        <h4 className="font-semibold text-gray-800 text-base sm:text-lg md:text-lg mb-2 line-clamp-2 h-14 overflow-hidden">
          {/* {product.title} */}
           {product.name || "Unnamed Product"}
        </h4>

        <div className="flex items-center justify-between mb-4">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-amber-600">
            ₹{product.price}
          </span>
          <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full capitalize">
            {product.category}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isInCart}
          className={`w-full py-2 sm:py-3 px-3 sm:px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            isInCart
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-amber-500/25"
          }`}
        >
          <FaShoppingBag className="text-sm sm:text-base" />
          {isInCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
