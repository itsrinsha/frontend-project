import React from "react";
import { FaTrash } from "react-icons/fa";

function Cart({ cart, setCart }) {
  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const handleQuantityChange = (id, value) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: value } : item
    );
    setCart(updatedCart);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-700">Your cart is empty</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-blue-700 font-bold">₹{item.price}</p>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className="w-16 border px-2 py-1 rounded mt-2"
                  />
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 hover:text-red-600 text-xl"
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <div className="text-right text-2xl font-bold text-gray-900">
            Total: ₹{total}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;

