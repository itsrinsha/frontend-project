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
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const productId = product.id || product._id;
  const isInWishlist = wishlist.some((item) => item.id === productId);
  const isInCart = cart.some((item) => item.id === productId);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      alert("Please login first to add to cart!");
      navigate("/login");
      return;
    }
    if (!isInCart) {
      addToCart(product);
    }
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (!user) {
      alert("Please login first to add to wishlist!");
      navigate("/login");
      return;
    }

    if (isInWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div 
      className="group flex flex-col bg-transparent cursor-pointer w-full"
      onClick={() => navigate(`/viewproduct/${productId}`)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4 rounded-sm">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Wishlist Button */}
        {user && (
          <button
            onClick={handleWishlist}
            className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
              isInWishlist ? 'bg-white/90 shadow-sm' : 'bg-white/0 hover:bg-white/90 opacity-0 group-hover:opacity-100'
            }`}
          >
            {isInWishlist ? (
              <FaHeart className="text-rose-500 text-lg" />
            ) : (
              <FaRegHeart className="text-stone-600 text-lg" />
            )}
          </button>
        )}

        {/* Add to Cart Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
          <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`w-full py-3.5 flex items-center justify-center gap-2 text-sm uppercase tracking-widest font-medium transition-all duration-300 shadow-lg ${
              isInCart
                ? "bg-stone-200 text-stone-500 cursor-not-allowed"
                : "bg-white text-stone-900 hover:bg-stone-900 hover:text-white"
            }`}
          >
            {isInCart ? "In Cart" : "Add to Cart"}
          </button>
        </div>
        
        {/* Subtle gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex justify-between items-start gap-4">
          <h4 className="font-serif text-stone-800 text-lg line-clamp-1 group-hover:text-rose-600 transition-colors duration-300">
            {product.name || "Unnamed Product"}
          </h4>
          <span className="text-lg text-stone-900 font-light">
            ₹{product.price}
          </span>
        </div>
        <span className="text-xs uppercase tracking-widest text-stone-500">
          {product.category}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
