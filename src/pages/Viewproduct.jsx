import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BuyNowModal from "../components/BuyNowModal";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";

function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { cart, addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(""); // ✅ size selection state

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product)
    return <p className="text-center mt-20 text-xl">Loading product details...</p>;

  const isInCart = cart.some((item) => item.productId === product.id);
  const isInWishlist = wishlist.some((item) => item.productId === product.id);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add to cart");
      navigate("/login");
      return;
    }
    if (!selectedSize) {
      alert("Please select a size before adding to cart");
      return;
    }
    if (!isInCart) addToCart({ ...product, quantity, selectedSize });
  };

  const handleWishlist = () => {
    if (!user) {
      alert("Please login to add to wishlist");
      navigate("/login");
      return;
    }
    if (isInWishlist)
      removeFromWishlist(wishlist.find((i) => i.productId === product.id).id);
    else addToWishlist(product);
  };

  return (
    <>
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-12 flex justify-center bg-gray-50">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Product Images */}
          <div className="flex flex-col items-center lg:items-start relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full sm:w-auto h-72 sm:h-96 object-cover rounded-2xl mb-4 cursor-pointer"
            />

            {/* ❤️ Heart Wishlist Toggle Button */}
            <button
              onClick={handleWishlist}
              className={`absolute top-4 right-4 p-3 rounded-full shadow-md transition ${
                isInWishlist
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isInWishlist ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke={isInWishlist ? "white" : "currentColor"}
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.8 8.25a5.5 5.5 0 0 0-9.8-3.32A5.5 5.5 0 0 0 2.2 8.25c0 5.52 8.8 10.83 9.8 10.83s9.8-5.31 9.8-10.83Z"
                />
              </svg>
            </button>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              {product.title}
            </h2>
            <p className="text-blue-700 font-bold text-2xl sm:text-3xl lg:text-3xl">
              ₹{product.price}
            </p>
            <p className="text-gray-700 text-sm sm:text-base">{product.description}</p>

            {/* ✅ Size Selector */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-sm sm:text-base">Size:</span>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Size</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-sm sm:text-base">Quantity:</span>
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="w-8 sm:w-10 h-8 sm:h-10 border rounded-full flex items-center justify-center text-lg"
              >
                -
              </button>
              <span className="text-base sm:text-lg font-semibold w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 sm:w-10 h-8 sm:h-10 border rounded-full flex items-center justify-center text-lg"
              >
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
              <button
                onClick={handleAddToCart}
                disabled={isInCart}
                className={`flex-1 py-2 sm:py-3 rounded-lg text-white font-semibold transition ${
                  isInCart
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isInCart ? "In Cart" : "Add to Cart"}
              </button>

              <button
                onClick={() => {
                  if (!selectedSize) {
                    alert("Please select a size before buying");
                    return;
                  }
                  navigate("/CheckoutPage");
                }}
                className="flex-1 py-2 sm:py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 font-semibold"
              >
                Buy Now
              </button>
            </div>

            {/* Extra Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm sm:text-base text-gray-600 mt-4">
              <div>
                <span className="font-semibold">Category:</span> {product.category}
              </div>
              <div>
                <span className="font-semibold">SKU:</span> {product.id}
              </div>
              <div>
                <span className="font-semibold">Stock:</span>{" "}
                {product.stock || "Available"}
              </div>
              <div>
                <span className="font-semibold">Brand:</span>{" "}
                {product.brand || "Glanzio"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Now Modal */}
      {showBuyModal && (
        <BuyNowModal
          product={product}
          quantity={quantity}
          isOpen={showBuyModal}
          onClose={() => setShowBuyModal(false)}
        />
      )}
    </>
  );
}

export default ViewProduct;
