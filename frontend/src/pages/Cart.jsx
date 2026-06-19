import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaTrashAlt, FaMinus, FaPlus, FaShieldAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const CartPage = () => {
  const {
    cart,
    loading,
    removeFromCart,
    incrementQty,
    decrementQty,
    totalPrice,
    clearCart,
  } = useContext(CartContext);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (!user) {
    return null;
  }

  if (loading) return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-stone-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-t-2 border-stone-900 rounded-full animate-spin"></div>
        <p className="mt-4 text-stone-500 uppercase tracking-widest text-sm">Loading Cart...</p>
      </div>
    </div>
  );

  if (cart.length === 0)
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-stone-50 px-4">
        <h2 className="text-3xl font-serif text-stone-900 mb-4">Your Bag is Empty</h2>
        <p className="text-stone-500 font-light mb-8 text-center max-w-md">Discover our latest collections and find your new favorite pieces.</p>
        <button 
          onClick={() => navigate('/products')}
          className="px-10 py-4 bg-stone-900 text-white rounded-full uppercase tracking-widest text-sm font-medium hover:bg-rose-600 transition-colors shadow-lg shadow-stone-900/20"
        >
          Continue Shopping
        </button>
      </div>
    );

  return (
    <div className="min-h-screen px-4 sm:px-8 lg:px-12 py-20 bg-stone-50 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-12 tracking-wide text-center">Shopping Bag</h2>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Cart Items List */}
          <div className="flex-1">
            <div className="border-b border-stone-200 pb-4 mb-6 hidden sm:grid grid-cols-12 gap-4 text-xs uppercase tracking-widest text-stone-400 font-medium">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            <div className="flex flex-col gap-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center py-6 border-b border-stone-100 bg-white sm:bg-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none shadow-sm sm:shadow-none"
                >
                  {/* Product Info */}
                  <div className="col-span-1 sm:col-span-6 flex gap-6">
                    <div className="w-24 h-32 flex-shrink-0 bg-stone-100 rounded-lg overflow-hidden border border-stone-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-serif text-stone-800 text-lg line-clamp-2 leading-tight mb-2">{item.name || item.title || "Unnamed Product"}</h4>
                      <p className="text-stone-500 font-light">₹{item.price}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-red-500 mt-4 text-xs uppercase tracking-widest flex items-center gap-2 w-fit transition-colors"
                      >
                        <FaTrashAlt className="text-[10px]" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-1 sm:col-span-3 flex justify-between sm:justify-center items-center border-t border-stone-100 sm:border-0 pt-4 sm:pt-0">
                    <span className="sm:hidden text-xs uppercase tracking-widest text-stone-500 font-medium">Quantity</span>
                    <div className="flex items-center border border-stone-200 rounded-full bg-white shadow-sm">
                      <button
                        onClick={() => decrementQty(item.id)}
                        className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
                      >
                        <FaMinus className="text-[10px]" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-stone-800">{item.quantity}</span>
                      <button
                        onClick={() => incrementQty(item.id)}
                        className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
                      >
                        <FaPlus className="text-[10px]" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="col-span-1 sm:col-span-3 flex justify-between sm:justify-end items-center">
                    <span className="sm:hidden text-xs uppercase tracking-widest text-stone-500 font-medium">Total</span>
                    <p className="text-lg font-medium text-stone-900">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end sm:justify-start">
              <button
                onClick={clearCart}
                className="text-stone-500 uppercase tracking-widest text-xs font-medium hover:text-stone-900 transition-colors border-b border-transparent hover:border-stone-900 pb-1"
              >
                Clear Entire Bag
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm sticky top-32">
              <h3 className="font-serif text-2xl text-stone-900 mb-6 border-b border-stone-100 pb-6">Order Summary</h3>
              
              <div className="flex flex-col gap-5 mb-8 text-stone-600 font-light">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-800">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Complimentary</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-6 mb-8 flex justify-between items-center">
                <span className="text-stone-900 font-serif text-lg">Estimated Total</span>
                <span className="text-2xl font-medium text-stone-900">₹{totalPrice}</span>
              </div>

              <button
                onClick={() => navigate("/CheckoutPage")}
                className="w-full py-4 bg-stone-900 text-white rounded-2xl uppercase tracking-widest text-sm font-medium hover:bg-rose-600 transition-colors duration-300 shadow-lg shadow-stone-900/20 flex justify-center items-center"
              >
                Proceed to Checkout
              </button>
              
              <div className="mt-8 flex justify-center items-center gap-3 text-stone-400">
                <FaShieldAlt className="text-lg" />
                <p className="text-xs uppercase tracking-widest font-medium">Secure Encrypted Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
