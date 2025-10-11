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

    if (!address || !phone) {
      toast.error("Please fill in all details");
      return;
    }
    if (cart.length === 0) {
      toast.error("Cart is empty");
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
      // Get current user data
      const res = await axios.get(`http://localhost:5000/users/${user.id}`);
      const userData = res.data;

      // Update orders and clear cart
      const updatedOrders = [...(userData.orders || []), newOrder];

      await axios.patch(`http://localhost:5000/users/${user.id}`, {
        orders: updatedOrders,
        cart: [],
      });

      clearCart();
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-6 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cart Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.title} x {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <hr className="my-4" />
          <p className="text-lg font-bold">Total: ₹{totalPrice}</p>
        </div>

        {/* Shipping & Payment Form */}
        <form
          onSubmit={handleCheckout}
          className="bg-white p-6 rounded-lg shadow flex flex-col gap-4"
        >
          <h3 className="text-xl font-semibold mb-2">Shipping Details</h3>

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />

          {/* Phone Number */}
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />

          {/* Address */}
          <textarea
            placeholder="Shipping Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />

          {/* Payment Method */}
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>Cash on Delivery</option>
            <option>UPI</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
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
