import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const BuyNowModal = ({ product, isOpen, onClose, onProceedToCheckout }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  if (!isOpen) return null;

  const totalPrice = product.price * quantity;

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['Black', 'White', 'Blue', 'Red', 'Green'];

  const handleBuyNow = () => {
    const orderDetails = {
      product: {
        ...product,
        quantity,
        selectedSize: selectedSize || sizes[0],
        selectedColor: selectedColor || colors[0],
      },
      total: totalPrice,
    };
    onProceedToCheckout(orderDetails);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Buy Now</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <FaTimes className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full sm:w-24 sm:h-24 md:w-28 md:h-28 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{product.name}</h3>
              <p className="text-blue-600 font-bold text-lg sm:text-xl">₹{product.price}</p>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Select Size</label>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 sm:px-4 py-2 border rounded-lg transition-all text-sm sm:text-base ${
                    selectedSize === size
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Select Color</label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 sm:px-4 py-2 border rounded-lg transition-all text-sm sm:text-base ${
                    selectedColor === color
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                -
              </button>
              <span className="text-lg sm:text-xl font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Total Price */}
          <div className="border-t pt-3 sm:pt-4 mb-4 sm:mb-6">
            <div className="flex justify-between items-center text-lg sm:text-xl font-semibold">
              <span>Total:</span>
              <span className="text-blue-600">₹{totalPrice}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNowModal;
