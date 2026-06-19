import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api.js";
import BuyNowModal from "../components/BuyNowModal";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { FaHeart, FaRegHeart, FaMinus, FaPlus, FaShieldAlt, FaTruck, FaUndoAlt } from "react-icons/fa";

function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { cart, addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (!id || id === "undefined") return;
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!id || id === "undefined") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-stone-50">
        <h2 className="text-2xl font-serif text-stone-900 mb-4">Invalid Product</h2>
        <button onClick={() => navigate('/products')} className="text-stone-500 uppercase tracking-widest text-sm border-b border-stone-300 pb-1">Return to Collection</button>
      </div>
    );
  }

  if (!product)
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-stone-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-t-2 border-stone-900 rounded-full animate-spin"></div>
          <p className="mt-4 text-stone-500 uppercase tracking-widest text-sm">Loading details...</p>
        </div>
      </div>
    );

  const productId = product.id || product._id;
  const isInCart = cart.some((item) => (item.id || item._id) === productId);
  const isInWishlist = wishlist.some((item) => (item.id || item._id) === productId);

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
    if (!isInCart) {
      addToCart({ ...product, quantity, selectedSize });
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      alert("Please login to buy");
      navigate("/login");
      return;
    }
    if (!selectedSize) {
      alert("Please select a size before buying");
      return;
    }
    if (!isInCart) {
      addToCart({ ...product, quantity, selectedSize });
    }
    navigate("/checkoutpage");
  };

  const handleWishlist = () => {
    if (!user) {
      alert("Please login to add to wishlist");
      navigate("/login");
      return;
    }

    if (isInWishlist) {
      const wishItem = wishlist.find((i) => (i.id || i._id) === productId);
      if (wishItem) removeFromWishlist(wishItem.id || wishItem._id);
    }
    else addToWishlist(product);
  };

  return (
    <div className="bg-stone-50 min-h-screen font-sans py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Breadcrumbs - Optional but adds to premium feel */}
          <div className="lg:col-span-12 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-2">
            <span className="cursor-pointer hover:text-stone-900" onClick={() => navigate('/')}>Home</span>
            <span>/</span>
            <span className="cursor-pointer hover:text-stone-900" onClick={() => navigate('/products')}>Collection</span>
            <span>/</span>
            <span className="text-stone-900 font-medium">{product.category}</span>
          </div>

          {/* Image Gallery Section */}
          <div className="lg:col-span-7">
            <div className="relative group overflow-hidden bg-white rounded-sm aspect-[4/5]">
              <img
                src={product.image}
                alt={product.title || product.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              
              {user && (
                <button
                  onClick={handleWishlist}
                  className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
                    isInWishlist ? 'bg-white shadow-md' : 'bg-white/50 hover:bg-white'
                  }`}
                >
                  {isInWishlist ? (
                    <FaHeart className="text-rose-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-stone-800 text-xl" />
                  )}
                </button>
              )}
            </div>
            
            {/* Additional images grid if they existed */}
            <div className="grid grid-cols-2 gap-4 mt-4">
               {/* This could be mapped from product.images if available */}
               <div className="aspect-square bg-stone-200 rounded-sm overflow-hidden opacity-40"></div>
               <div className="aspect-square bg-stone-200 rounded-sm overflow-hidden opacity-40"></div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="lg:col-span-5 flex flex-col gap-8 sticky top-32 h-fit">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-rose-500 font-bold mb-3 block">
                {product.category}
              </span>
              <h1 className="text-4xl lg:text-5xl font-serif text-stone-900 mb-4 leading-tight tracking-tight">
                {product.title || product.name}
              </h1>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-3xl font-light text-stone-900">
                  ₹{product.price}
                </span>
                <span className="text-stone-400 text-sm font-light">Includes all taxes</span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-stone-200"></div>

            <p className="text-stone-500 font-light leading-relaxed text-base">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center text-xs uppercase tracking-widest text-stone-900 font-bold">
                <span>Select Size</span>
                <button className="text-stone-400 hover:text-stone-900 underline decoration-stone-200 underline-offset-4 transition-colors">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center text-sm transition-all duration-300 rounded-full border ${
                      selectedSize === size
                        ? "bg-stone-900 text-white border-stone-900 shadow-lg shadow-stone-900/20"
                        : "bg-white text-stone-600 border-stone-200 hover:border-stone-900"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-col gap-4">
              <span className="text-xs uppercase tracking-widest text-stone-900 font-bold">Quantity</span>
              <div className="flex items-center w-fit border border-stone-200 rounded-full bg-white px-2 py-1 shadow-sm">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <FaMinus className="text-[10px]" />
                </button>
                <span className="w-10 text-center text-sm font-medium text-stone-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <FaPlus className="text-[10px]" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mt-4">
              <button
                onClick={handleAddToCart}
                disabled={isInCart}
                className={`w-full py-5 rounded-2xl text-sm uppercase tracking-widest font-medium transition-all duration-300 shadow-xl ${
                  isInCart
                    ? "bg-stone-200 text-stone-400 cursor-not-allowed shadow-none"
                    : "bg-stone-900 text-white hover:bg-stone-800 shadow-stone-900/20 active:scale-[0.98]"
                }`}
              >
                {isInCart ? "Already in Bag" : "Add to Bag"}
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-5 rounded-2xl text-sm uppercase tracking-widest font-medium bg-white text-stone-900 border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition-all duration-300 active:scale-[0.98]"
              >
                Buy it now
              </button>
            </div>

            {/* Delivery & Returns Info */}
            <div className="mt-6 flex flex-col gap-4 bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
               <div className="flex items-center gap-4 text-stone-600">
                  <FaTruck className="text-lg text-stone-400" />
                  <div className="flex flex-col text-xs uppercase tracking-widest">
                    <span className="text-stone-900 font-bold">Free Shipping</span>
                    <span className="font-light mt-1">Delivery in 3-5 business days</span>
                  </div>
               </div>
               <div className="flex items-center gap-4 text-stone-600">
                  <FaUndoAlt className="text-lg text-stone-400" />
                  <div className="flex flex-col text-xs uppercase tracking-widest">
                    <span className="text-stone-900 font-bold">14-Day Returns</span>
                    <span className="font-light mt-1">Hassle-free return policy</span>
                  </div>
               </div>
               <div className="flex items-center gap-4 text-stone-600">
                  <FaShieldAlt className="text-lg text-stone-400" />
                  <div className="flex flex-col text-xs uppercase tracking-widest">
                    <span className="text-stone-900 font-bold">Secure Payment</span>
                    <span className="font-light mt-1">Your data is always protected</span>
                  </div>
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
    </div>
  );
}

export default ViewProduct;
