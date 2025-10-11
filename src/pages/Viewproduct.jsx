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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p className="text-center mt-20 text-xl">Loading product details...</p>;

  const isInCart = cart.some(item => item.productId === product.id);
  const isInWishlist = wishlist.some(item => item.productId === product.id);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add to cart");
      navigate("/login");
      return;
    }
    if (!isInCart) addToCart({ ...product, quantity });
  };

  const handleWishlist = () => {
    if (!user) {
      alert("Please login to add to wishlist");
      navigate("/login");
      return;
    }
    if (isInWishlist) removeFromWishlist(wishlist.find(i => i.productId === product.id).id);
    else addToWishlist(product);
  };

  const handleBuyNow = () => {
    if (!user) {
      alert("Please login to buy");
      navigate("/login");
      return;
    }
    setShowBuyModal(true);
  };

  return (
    <>
      <div className="min-h-screen py-16 px-6 flex justify-center bg-gray-50">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Product Images */}
          <div className="flex flex-col">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-96 object-cover rounded-2xl mb-4 cursor-pointer"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-gray-900">{product.title}</h2>
            <p className="text-blue-700 font-bold text-3xl">₹{product.price}</p>
            <p className="text-gray-700 text-lg">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity:</span>
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="w-10 h-10 border rounded-full flex items-center justify-center"
              >-</button>
              <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border rounded-full flex items-center justify-center"
              >+</button>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={handleAddToCart}
                disabled={isInCart}
                className={`flex-1 py-3 rounded-lg text-white font-semibold ${isInCart ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                {isInCart ? "In Cart" : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 font-semibold"
              >
                Buy Now
              </button>

              <button
                onClick={handleWishlist}
                className={`flex-1 py-3 rounded-lg font-semibold ${isInWishlist ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
              >
                {isInWishlist ? "In Wishlist" : "Wishlist"}
              </button>
            </div>

            {/* Extra Info */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mt-4">
              <div><span className="font-semibold">Category:</span> {product.category}</div>
              <div><span className="font-semibold">SKU:</span> {product.id}</div>
              <div><span className="font-semibold">Stock:</span> {product.stock || "Available"}</div>
              <div><span className="font-semibold">Brand:</span> {product.brand || "Glanzio"}</div>
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
