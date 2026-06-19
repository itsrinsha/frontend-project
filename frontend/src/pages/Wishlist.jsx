import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { FaTrashAlt, FaShoppingBag } from "react-icons/fa";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { cart, addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const handleAddToCart = (product) => {
    const productId = product.id || product._id;
    const exists = cart.find((item) => (item.id || item._id) === productId);
    if (exists) {
      toast.info("Already in cart");
      return;
    }
    addToCart({ ...product, quantity: 1 });
    toast.success("Added to cart");
  };

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
    toast.info("Item removed");
  };

  if (wishlist.length === 0)
    return (
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-stone-50 px-4 text-center">
        <h2 className="text-4xl font-serif text-stone-900 mb-4 tracking-wide">Your Wishlist is Empty</h2>
        <p className="text-stone-500 font-light mb-8 max-w-md">Save your favorite pieces here to keep track of what you love.</p>

        <button
          onClick={() => navigate("/products")}
          className="bg-stone-900 text-white px-10 py-4 rounded-full uppercase tracking-widest text-sm font-medium hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/20"
        >
          Explore Collection
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-stone-50 py-20 px-6 sm:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4 tracking-wide">
            My Favorites
          </h2>
          <div className="w-16 h-[1px] bg-stone-300 mx-auto mb-6"></div>
          <p className="text-stone-500 text-sm uppercase tracking-widest font-medium">
            {wishlist.length} Items Saved
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {wishlist.map((item) => {
            const productId = item.id || item._id;
            const isInCart = cart.some((c) => (c.id || c._id) === productId);

            return (
              <div
                key={productId}
                className="group flex flex-col bg-transparent w-full"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-white rounded-sm mb-4 border border-stone-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                    onClick={() => navigate(`/viewproduct/${productId}`)}
                  />

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(productId)}
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 shadow-sm text-stone-400 hover:text-red-500 transition-all duration-300 z-10"
                  >
                    <FaTrashAlt className="text-sm" />
                  </button>

                  {/* Quick Add Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={isInCart}
                      className={`w-full py-3.5 flex items-center justify-center gap-2 text-sm uppercase tracking-widest font-medium transition-all duration-300 shadow-lg ${
                        isInCart
                          ? "bg-stone-200 text-stone-500 cursor-not-allowed"
                          : "bg-white text-stone-900 hover:bg-stone-900 hover:text-white"
                      }`}
                    >
                      <FaShoppingBag className="text-xs" />
                      {isInCart ? "In Bag" : "Add to Bag"}
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1 px-1">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-serif text-stone-800 text-lg line-clamp-1 group-hover:text-rose-600 transition-colors duration-300">
                      {item.title || item.name}
                    </h3>
                    <span className="text-lg text-stone-900 font-light">
                      ₹{item.price}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
