import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { FaShoppingCart, FaTrashAlt } from "react-icons/fa";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { cart, addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  // ✅ Add item to cart
  const handleAddToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      toast.info("Item already in cart");
      return;
    }
    addToCart({ ...product, quantity: 1 });
    toast.success("Added to cart!");
  };

  // ✅ Handle remove from wishlist
  const handleRemove = (productId) => {
    removeFromWishlist(productId);
    toast.info("Removed from wishlist");
  };

  if (wishlist.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076503.png"
          alt="Empty Wishlist"
          className="w-40 h-40 mb-6 opacity-70"
        />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-2">
          Your Wishlist is Empty 💔
        </h2>
        <p className="text-gray-500 mb-6">
          Save your favorite items and view them anytime.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
        >
          Continue Shopping
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center sm:text-left">
        🛒 My Wishlist
      </h2>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => {
          const isInCart = cart.some((c) => c.id === item.id);

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden group"
            >
              {/* Product Image */}
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-t-2xl group-hover:opacity-90 transition"
                />
              </div>

              {/* Product Details */}
              <div className="p-5 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-medium text-base mb-2">
                  ₹{item.price}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-auto">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={isInCart}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition w-full ${
                      isInCart
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    <FaShoppingCart />
                    {isInCart ? "In Cart" : "Add to Cart"}
                  </button>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="ml-3 p-2 text-red-500 hover:text-red-600 transition rounded-lg"
                    title="Remove from Wishlist"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishlistPage;
