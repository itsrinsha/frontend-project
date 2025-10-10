import React from "react";
import { FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Wishlist({ wishlist, setWishlist, cart, setCart }) {
  const handleRemove = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  const handleAddToCart = (product) => {
    if (!cart.find((item) => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-700">Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 flex flex-col gap-3">
                <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                <p className="text-blue-700 font-bold text-lg">₹{item.price}</p>
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-[#1E3A8A] text-white px-4 py-2 rounded-lg hover:bg-[#3B82F6] transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-600 text-xl"
                  >
                    <FaTrash />
                  </button>
                </div>
               <NavLink
  to={`/products/${item.id}`}
  state={{ product: item }}  
  className="mt-2 inline-block bg-[#1E3A8A] text-white px-4 py-2 rounded-lg hover:bg-[#3B82F6] transition text-center"
>
  View Details
</NavLink>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;

