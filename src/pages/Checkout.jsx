import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Checkout({ cart, setCart }) {
  const location = useLocation();
  const navigate = useNavigate();

  
  const product = location.state || null;
  const [address, setAddress] = useState("");
  const buyNowProdect = location.state?.buyNowProdect; 
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [quantity, setQuantity] = useState(product ? product.quantity : 1);
  const [size, setSize] = useState(product ? product.size : "M");

  const productsToCheckout = buyNowProdect? 
     [{...buyNowProdect,quantity:1}]: cart

  if (productsToCheckout === 0) {
    return <p className="text-center mt-20 text-xl">No product selected for checkout!</p>;
  }
  

  const handlePlaceOrder = () => {
    alert(`Order placed for ${product ? product.name : "items in cart"}!\nPayment Method: ${paymentMethod}\nAddress: ${address}\nSize: ${size}\nQuantity: ${quantity}`);
    setCart([]);
    
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 flex justify-center">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl w-full flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Checkout</h2>

        {product && (
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-blue-700 font-bold">₹{product.price}</p>
            </div>
            <div>
              <p>Quantity: {quantity}</p>
              <p>Size: {size}</p>
            </div>
          </div>
        )}

        <div>
          <label className="font-semibold">Shipping Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address..."
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          >
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
            <option value="cod">Cash on Delivery</option>
          </select>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition mt-4"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;


