import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
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

  if (loading)
    return <p className="text-center mt-20 text-xl">Loading orders...</p>;
  if (orders.length === 0)
    return <p className="text-center mt-20 text-xl">You have no orders yet</p>;

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 py-16 bg-gray-50">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center sm:text-left">
        My Orders
      </h2>

      <div className="flex flex-col gap-4 sm:gap-6">
        {orders
          .sort((a, b) => new Date(b.date) - new Date(a.date)) // Latest first
          .map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow w-full"
            >
              <div className="flex flex-col sm:flex-row justify-between mb-2 gap-2 sm:gap-0">
                <span className="font-semibold">Order ID:</span>
                <span>{order.id}</span>
              </div>
              <div className="flex flex-col sm:flex-row justify-between mb-2 gap-2 sm:gap-0">
                <span className="font-semibold">Date:</span>
                <span>{new Date(order.date).toLocaleString()}</span>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold mb-2 text-lg sm:text-xl">Items:</h4>
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between mb-1 text-sm sm:text-base"
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="mt-2 flex flex-col sm:flex-row justify-between font-bold text-sm sm:text-base gap-1 sm:gap-0">
                <span>Total:</span>
                <span>₹{order.total}</span>
              </div>

              <div className="mt-2 text-sm sm:text-base flex flex-col gap-1">
                <p>
                  <span className="font-semibold">Shipping:</span>{" "}
                  {order.shippingAddress}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {order.phone}
                </p>
                <p>
                  <span className="font-semibold">Payment Method:</span>{" "}
                  {order.paymentMethod}
                </p>
                <p>
                  <span className="font-semibold">Status:</span> {order.status}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
