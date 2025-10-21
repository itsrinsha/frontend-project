import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrderSection = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  // Fetch orders from all users
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      const allOrders = res.data
        .filter((user) => user.orders)
        .flatMap((user) =>
          user.orders.map((order) => ({
            ...order,
            customer: user.name,
            userId: user.id,
          }))
        );
      setOrders(allOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status
  const handleStatusChange = async (userId, orderId, newStatus) => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${userId}`);
      const user = res.data;

      const updatedOrders = user.orders.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      );

      await axios.patch(`http://localhost:5000/users/${userId}`, {
        orders: updatedOrders,
      });

      fetchOrders();
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  // Delete order
  const handleDelete = async (userId, orderId) => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${userId}`);
      const user = res.data;

      const updatedOrders = user.orders.filter((o) => o.id !== orderId);

      await axios.patch(`http://localhost:5000/users/${userId}`, {
        orders: updatedOrders,
      });

      fetchOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  // Toggle expand/collapse for order details
  const toggleExpand = (orderId) => {
    setExpandedOrder((prev) => (prev === orderId ? null : orderId));
  };

  // Helper function for status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Order Section</h1>
          <p className="text-gray-600">Manage and track all customer orders</p>
        </div>

        {/* Orders Table Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">All Orders ({orders.length})</h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    {/* Order Row */}
                    <tr className="hover:bg-gray-50 transition-all duration-200 group">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-2 rounded-lg mr-3">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                          </div>
                          <span className="font-mono text-sm font-medium text-gray-900">#{order.id}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                            <span className="text-purple-600 font-semibold text-sm">
                              {order.customer?.charAt(0) || "U"}
                            </span>
                          </div>
                          <span className="font-medium text-gray-800">{order.customer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-lg text-gray-900">₹{order.total}</span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.userId, order.id, e.target.value)
                          }
                          className={`border-2 rounded-xl px-4 py-2 font-medium cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${getStatusColor(order.status)}`}
                        >
                          <option value="Pending" className="bg-white text-yellow-800">Pending</option>
                          <option value="Shipped" className="bg-white text-blue-800">Shipped</option>
                          <option value="Delivered" className="bg-white text-green-800">Delivered</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => toggleExpand(order.id)}
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {expandedOrder === order.id ? "Hide" : "View"}
                          </button>
                          <button
                            onClick={() => handleDelete(order.userId, order.id)}
                            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Order Details */}
                    {expandedOrder === order.id && (
                      <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <td colSpan="5" className="px-6 py-6">
                          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                Order Details
                              </h3>
                              <div className={`px-4 py-2 rounded-full font-semibold border-2 ${getStatusColor(order.status)}`}>
                                {order.status}
                              </div>
                            </div>
                            
                            <h4 className="font-semibold text-gray-700 mb-4 text-lg">Order Items:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {order.items?.map((item) => (
                                <div
                                  key={item.id}
                                  className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                                >
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-20 h-20 object-cover rounded-xl shadow-sm"
                                  />
                                  <div className="flex-1">
                                    <p className="font-semibold text-gray-800 mb-1 line-clamp-2">{item.title}</p>
                                    <p className="text-gray-600 text-sm mb-1">
                                      ₹{item.price} × {item.quantity}
                                    </p>
                                    <p className="font-bold text-green-600">
                                      ₹{(item.price * item.quantity).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-gray-200">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-600">Order Total:</span>
                                <span className="text-2xl font-bold text-gray-800">₹{order.total}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}

                {orders.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p className="text-xl font-medium mb-2">No orders found</p>
                        <p className="text-gray-400">There are no orders to display at the moment.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderSection;