import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import api from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { FaShieldAlt, FaTruck, FaCreditCard } from "react-icons/fa";

const CheckoutPage = () => {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.number || "");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!address.trim() || !phone.trim()) {
      toast.error("Please fill in all details");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setLoading(true);

    const newOrder = {
      id: `order_${Date.now()}`,
      userId: user.id,
      date: new Date().toISOString(),
      items: cart.map((item) => ({
        id: item.id || item._id,
        name: item.name || item.title || "Unnamed Product",
        price: Number(item.price),
        quantity: Number(item.quantity),
        image: item.image,
      })),
      total: Number(totalPrice),
      shippingAddress: address,
      paymentMethod,
      phone,
      status: "Pending",
    };

    try {
      await api.post("/orders", newOrder);
      await api.patch(`/user/${user.id}`, { cart: [] });
      clearCart();
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || err.response?.data?.error || "Failed to place order. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 lg:px-12 py-20 bg-stone-50 font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif text-stone-900 mb-12 tracking-wide text-center md:text-left">Checkout</h2>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Left Side: Shipping Form */}
          <div className="flex-1 order-2 lg:order-1">
            <form onSubmit={handleCheckout} className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-100 shadow-sm flex flex-col gap-8">
              <div>
                <h3 className="text-2xl font-serif text-stone-900 mb-6 flex items-center gap-3">
                  <FaTruck className="text-stone-400 text-lg" />
                  Shipping Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold ml-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400 focus:bg-white transition-all"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold ml-1">Phone Number</label>
                    <input
                      type="text"
                      placeholder="Enter your number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400 focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 mt-6">
                  <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold ml-1">Delivery Address</label>
                  <textarea
                    placeholder="Enter your full address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-sm focus:outline-none focus:border-stone-400 focus:bg-white transition-all min-h-[120px] resize-none"
                    required
                  />
                </div>
              </div>

              <div className="w-full h-[1px] bg-stone-100"></div>

              <div>
                <h3 className="text-2xl font-serif text-stone-900 mb-6 flex items-center gap-3">
                  <FaCreditCard className="text-stone-400 text-lg" />
                  Payment Method
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Credit Card", "Debit Card", "Cash on Delivery", "UPI"].map((method) => (
                    <label 
                      key={method}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                        paymentMethod === method 
                          ? "border-stone-900 bg-stone-900 text-white shadow-lg shadow-stone-900/10" 
                          : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-400"
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        value={method} 
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="hidden"
                      />
                      <span className="text-sm uppercase tracking-widest font-medium">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className={`mt-6 py-5 rounded-2xl text-sm uppercase tracking-widest font-medium transition-all shadow-xl flex justify-center items-center ${
                  loading
                    ? "bg-stone-300 text-stone-500 cursor-not-allowed shadow-none"
                    : "bg-stone-900 text-white hover:bg-rose-600 shadow-stone-900/20 active:scale-[0.98]"
                }`}
                disabled={loading}
              >
                {loading ? "Confirming Order..." : "Finalize Order"}
              </button>
            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full lg:w-[450px] order-1 lg:order-2">
            <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm sticky top-32">
              <h3 className="font-serif text-2xl text-stone-900 mb-6 border-b border-stone-100 pb-6">Your Selection</h3>

              <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-20 bg-stone-100 rounded-lg overflow-hidden border border-stone-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title || item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/100x125?text=Product'; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-stone-800 text-sm truncate">{item.title || item.name}</h4>
                      <p className="text-[10px] uppercase tracking-widest text-stone-400 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-stone-900">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-100 mt-8 pt-8 flex flex-col gap-4">
                <div className="flex justify-between text-stone-500 font-light text-sm">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-800">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-stone-500 font-light text-sm">
                  <span>Standard Shipping</span>
                  <span className="text-green-600 font-medium tracking-widest uppercase text-[10px]">Complimentary</span>
                </div>
                <div className="flex justify-between items-center mt-2 border-t border-stone-50 pt-4">
                  <span className="text-stone-900 font-serif text-lg">Total</span>
                  <span className="text-2xl font-medium text-stone-900">₹{totalPrice}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center items-center gap-3 text-stone-400 border-t border-stone-50 pt-6">
                <FaShieldAlt className="text-lg" />
                <p className="text-[10px] uppercase tracking-widest font-bold">Secure Order Processing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
