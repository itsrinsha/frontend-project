import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

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
        id: item.id,
        name: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      total: totalPrice,
      shippingAddress: address,
      paymentMethod,
      phone,
      status: "Pending",
    };

    try {
      const res = await axios.get(`http://localhost:5000/users/${user.id}`);
      const userData = res.data || {};
      const existingOrders = userData.orders ?? [];
      const updatedOrders = [...existingOrders, newOrder];

      await axios.patch(`http://localhost:5000/users/${user.id}`, {
        orders: updatedOrders,
        cart: [],
      });

      clearCart();
      toast.success("Order placed successfully!");  
      navigate("/orders");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 py-16 bg-gray-50">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center sm:text-left">
        Checkout
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Order Summary */}
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow w-full">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4">Order Summary</h3>

          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between mb-2 text-sm sm:text-base"
              >
                <span>
                  {item.title} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))
          )}

          <hr className="my-4" />
          <p className="text-lg sm:text-xl font-bold">Total: ₹{totalPrice}</p>
        </div>

        {/* Right Side: Shipping Form */}
        <form
          onSubmit={handleCheckout}
          className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow flex flex-col gap-4 w-full"
        >
          <h3 className="text-xl sm:text-2xl font-semibold mb-2">Shipping Details</h3>

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 sm:p-3 rounded w-full text-sm sm:text-base"
            required
          />

          {/* Phone */}
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 sm:p-3 rounded w-full text-sm sm:text-base"
            required
          />

          {/* Address */}
          <textarea
            placeholder="Shipping Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 sm:p-3 rounded w-full text-sm sm:text-base"
            required
          />

          {/* Payment Method */}
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border p-2 sm:p-3 rounded w-full text-sm sm:text-base"
          >
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>Cash on Delivery</option>
            <option>UPI</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            className={`mt-4 py-3 sm:py-4 rounded font-semibold text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
