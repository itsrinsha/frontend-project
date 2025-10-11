import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

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

  if (loading) return <p className="text-center mt-20 text-xl">Loading cart...</p>;
  if (cart.length === 0)
    return <p className="text-center mt-20 text-xl">Your cart is empty</p>;

  return (
    <div className="min-h-screen px-6 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">My Cart</h2>

      <div className="flex flex-col gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-32 h-32 object-cover rounded"
            />
            <div className="flex-1 flex flex-col gap-2">
              <h4 className="font-semibold text-lg">{item.title}</h4>
              <p className="text-gray-600">₹{item.price}</p>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decrementQty(item.id)}
                  className="px-3 py-1 border rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => incrementQty(item.id)}
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
              <p className="font-semibold">Subtotal: ₹{item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow flex flex-col sm:flex-row justify-between items-center">
        <p className="text-xl font-bold">Total: ₹{totalPrice}</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <button
            onClick={clearCart}
            className="px-6 py-3 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Clear Cart
          </button>
          <button
            onClick={() => navigate("/checkout")}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
