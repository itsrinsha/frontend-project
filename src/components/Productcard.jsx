import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addToCart, cart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const isInWishlist = wishlist.some(item => item.productId === product.id);
  const isInCart = cart.some(item => item.productId === product.id);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login first to add to cart!");
      navigate("/login");
      return;
    }
    if (!isInCart) addToCart(product);
  };

  const handleWishlist = () => {
    if (!user) {
      alert("Please login first to add to wishlist!");
      navigate("/login");
      return;
    }
    if (isInWishlist) removeFromWishlist(wishlist.find(i => i.productId === product.id).id);
    else addToWishlist(product);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", width: "220px", textAlign: "center" }}>
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "100%", height: "180px", objectFit: "cover", cursor: "pointer" }}
        onClick={() => navigate(`/product/${product.id}`)}
      />

      {/* Product Info */}
      <h4>{product.title}</h4>
      <p>₹{product.price}</p>

      {/* Wishlist Icon */}
      <div style={{ cursor: "pointer", marginBottom: "10px" }} onClick={handleWishlist}>
        {isInWishlist ? <FaHeart color="red" /> : <FaRegHeart />}
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isInCart}
        style={{
          padding: "5px 10px",
          backgroundColor: isInCart ? "gray" : "blue",
          color: "white",
          border: "none",
          cursor: isInCart ? "not-allowed" : "pointer"
        }}
      >
        {isInCart ? "In Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
