import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        const res = await axios.get(`http://localhost:5000/users/${user.id}`);
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  if (loading) return <p className="text-center mt-20 text-xl">Loading orders...</p>;
  if (orders.length === 0) return <p className="text-center mt-20 text-xl">You have no orders yet</p>;

  return (
    <div className="min-h-screen px-6 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      <div className="flex flex-col gap-6">
        {orders
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // Latest first
          .map((order) => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Order ID:</span>
                <span>{order.id}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Date:</span>
                <span>{new Date(order.date).toLocaleString()}</span>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-2">Items:</h4>
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between mb-1">
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="mt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span>₹{order.total}</span>
              </div>

              <div className="mt-2">
                <p><span className="font-semibold">Shipping:</span> {order.shippingAddress}</p>
                <p><span className="font-semibold">Phone:</span> {order.phone}</p>
                <p><span className="font-semibold">Payment Method:</span> {order.paymentMethod}</p>
                <p><span className="font-semibold">Status:</span> {order.status}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
