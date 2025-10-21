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
    <div className="min-h-screen px-4 sm:px-6 md:px-8 py-16 bg-gray-50">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">My Cart</h2>

      <div className="flex flex-col gap-4 sm:gap-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white p-4 sm:p-6 rounded-lg shadow"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full sm:w-32 h-32 object-cover rounded"
            />
            <div className="flex-1 flex flex-col gap-2">
              <h4 className="font-semibold text-lg sm:text-xl">{item.title}</h4>
              <p className="text-gray-600 text-sm sm:text-base">₹{item.price}</p>

              {/* Quantity */}
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => decrementQty(item.id)}
                  className="px-3 py-1 border rounded text-sm sm:text-base"
                >
                  -
                </button>
                <span className="text-sm sm:text-base">{item.quantity}</span>
                <button
                  onClick={() => incrementQty(item.id)}
                  className="px-3 py-1 border rounded text-sm sm:text-base"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 mt-4 sm:mt-0">
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline text-sm sm:text-base"
              >
                Remove
              </button>
              <p className="font-semibold text-sm sm:text-base">
                Subtotal: ₹{item.price * item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 bg-white p-4 sm:p-6 rounded-lg shadow flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <p className="text-lg sm:text-xl font-bold">Total: ₹{totalPrice}</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={clearCart}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors duration-200"
          >
            Clear Cart
          </button>
          <button
            onClick={() => navigate("/CheckoutPage")}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
