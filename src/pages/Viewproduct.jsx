
// src/pages/Viewproduct.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BuyNowModal from "../components/BuyNowModal";

function Viewproduct({ cart, setCart, wishlist, setWishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleProceedToCheckout = (orderDetails) => {
    // Navigate to checkout with order details
    navigate(`/checkout/${id}`, { 
      state: { 
        order: orderDetails,
        type: 'direct' // Indicates this is a direct purchase, not from cart
      }
    });
  };

  if (!product) return <p className="text-center mt-20 text-xl">Loading product details...</p>;

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-16 px-6 flex justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex flex-col">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-96 object-cover rounded-2xl mb-4"
            />
            <div className="grid grid-cols-4 gap-2">
              {/* Thumbnail images would go here */}
              <div className="h-20 bg-gray-200 rounded-lg"></div>
              <div className="h-20 bg-gray-200 rounded-lg"></div>
              <div className="h-20 bg-gray-200 rounded-lg"></div>
              <div className="h-20 bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {"★".repeat(Math.floor(product.rating))}
                {"☆".repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-gray-600">({product.rating})</span>
            </div>

            {/* Price */}
            <p className="text-blue-700 font-bold text-3xl">₹{product.price}</p>

            {/* Description */}
            <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>

            {/* Additional product details */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-semibold">Category:</span> {product.category}
              </div>
              <div>
                <span className="font-semibold">In Stock:</span> {product.stock || 'Yes'}
              </div>
              <div>
                <span className="font-semibold">Brand:</span> {product.brand || 'Glanzio'}
              </div>
              <div>
                <span className="font-semibold">SKU:</span> {product.id}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-700">Quantity:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={() => {
                  const productWithQuantity = { ...product, quantity };
                  if (!cart.find((i) => i.id === product.id)) {
                    setCart([...cart, productWithQuantity]);
                  }
                }}
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21m-7.5-2.5h9"/>
                </svg>
                Add to Cart
              </button>

              <button
                onClick={() => setShowBuyModal(true)}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Buy Now
              </button>

              <button
                onClick={() => {
                  if (!wishlist.find((i) => i.id === product.id)) {
                    setWishlist([...wishlist, product]);
                  }
                }}
                className={`px-6 py-3 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2 ${
                  wishlist.find((i) => i.id === product.id)
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                </svg>
                {wishlist.find((i) => i.id === product.id) ? "In Wishlist" : "Wishlist"}
              </button>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Free Shipping
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  Secure Payment
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  30-Day Returns
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buy Now Modal */}
      <BuyNowModal
        product={product}
        isOpen={showBuyModal}
        onClose={() => setShowBuyModal(false)}
        onProceedToCheckout={handleProceedToCheckout}
      />
    </>
  );
}

export default Viewproduct;


