import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { cart, addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleAddToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      toast.info("Item already in cart");
      return;
    }
    addToCart({ ...product, quantity: 1 });
    toast.success("Added to cart!");
  };

  if (wishlist.length === 0)
    return <p className="text-center mt-20 text-xl">Your wishlist is empty</p>;

  return (
    <div className="min-h-screen px-6 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">My Wishlist</h2>

      <div className="flex flex-col gap-6">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg shadow"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-32 h-32 object-cover rounded cursor-pointer"
              onClick={() => navigate(`/product/${item.id}`)}
            />

            <div className="flex-1 flex flex-col gap-2">
              <h4 className="font-semibold text-lg">{item.title}</h4>
              <p className="text-gray-600">₹{item.price}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <button
                onClick={() => handleAddToCart(item)}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
