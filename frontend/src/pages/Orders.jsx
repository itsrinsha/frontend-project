import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import api from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import { FaBox, FaClock, FaCheckCircle, FaTruck } from "react-icons/fa";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await api.get(`/orders/user/${user.id}`);
        setOrders(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading)
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-stone-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-t-2 border-stone-900 rounded-full animate-spin"></div>
          <p className="mt-4 text-stone-500 uppercase tracking-widest text-sm">Loading orders...</p>
        </div>
      </div>
    );

  if (orders.length === 0)
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-stone-50 px-4 text-center">
        <h2 className="text-4xl font-serif text-stone-900 mb-4 tracking-wide">No Orders Found</h2>
        <p className="text-stone-500 font-light mb-8 max-w-md">You haven't placed any orders yet. Start shopping to see your history.</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-stone-900 text-white px-10 py-4 rounded-full uppercase tracking-widest text-sm font-medium hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/20"
        >
          Go to Collection
        </button>
      </div>
    );

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return <FaClock className="text-amber-500" />;
      case 'delivered': return <FaCheckCircle className="text-green-600" />;
      case 'shipped': return <FaTruck className="text-blue-500" />;
      default: return <FaBox className="text-stone-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-20 px-4 sm:px-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4 tracking-wide">
            My Orders
          </h2>
          <div className="w-16 h-[1px] bg-stone-300 mx-auto mb-6"></div>
          <p className="text-stone-500 text-sm uppercase tracking-widest font-medium">
            Order History
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {orders
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-stone-50/50 px-6 py-6 border-b border-stone-100 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Order ID</span>
                    <span className="text-sm font-medium text-stone-900 truncate">#{order.id.slice(-8).toUpperCase()}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Date Placed</span>
                    <span className="text-sm text-stone-800">{new Date(order.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Total Amount</span>
                    <span className="text-sm font-bold text-stone-900">₹{order.total}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Status</span>
                    <div className="flex items-center gap-2 text-sm font-medium text-stone-800 capitalize">
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-col gap-6">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-6"
                      >
                        <div className="w-20 h-24 flex-shrink-0 bg-stone-100 rounded-xl overflow-hidden border border-stone-100">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/200x250?text=Product';
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-serif text-stone-900 text-lg leading-tight mb-1">{item.name}</h4>
                              <p className="text-xs text-stone-500 font-light">Qty: {item.quantity} units</p>
                            </div>
                            <span className="font-medium text-stone-900">₹{item.price * item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping & Delivery Footer */}
                  <div className="mt-8 pt-8 border-t border-stone-50 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3">
                      <h5 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Delivery Address</h5>
                      <p className="text-xs text-stone-600 font-light leading-relaxed max-w-xs italic">
                        {order.shippingAddress}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h5 className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Payment Details</h5>
                      <div className="flex flex-col gap-1 text-xs text-stone-600 font-light">
                        <p>Method: <span className="font-medium text-stone-800 uppercase tracking-tighter">{order.paymentMethod}</span></p>
                        <p>Contact: <span className="font-medium text-stone-800">{order.phone}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
