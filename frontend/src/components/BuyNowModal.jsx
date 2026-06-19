import React, { useState } from 'react';
import { FaTimes, FaMinus, FaPlus } from 'react-icons/fa';

const BuyNowModal = ({ product, isOpen, onClose, onProceedToCheckout }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  if (!isOpen) return null;

  const totalPrice = (product.price || 0) * quantity;

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['Midnight', 'Ivory', 'Stone', 'Rose'];

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    const orderDetails = {
      product: {
        ...product,
        quantity,
        selectedSize: selectedSize,
        selectedColor: selectedColor || colors[0],
      },
      total: totalPrice,
    };
    if (onProceedToCheckout) {
       onProceedToCheckout(orderDetails);
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 sm:p-6 transition-all duration-500">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl border border-stone-100 flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-8 border-b border-stone-50">
          <h2 className="text-2xl font-serif text-stone-900 tracking-wide">Quick Purchase</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-stone-50 text-stone-400 transition-colors">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-8 custom-scrollbar text-left">
          {/* Product Preview */}
          <div className="flex gap-6 mb-10 items-center bg-stone-50 p-4 rounded-2xl border border-stone-100">
            <div className="w-24 h-28 flex-shrink-0 bg-white rounded-xl overflow-hidden border border-stone-100 shadow-sm">
              <img
                src={product.image}
                alt={product.name || product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1 block text-left">Selected Item</span>
              <h3 className="font-serif text-stone-900 text-lg leading-tight mb-2 text-left">{product.name || product.title}</h3>
              <p className="text-xl font-light text-stone-900 tracking-tight text-left">₹{product.price}</p>
            </div>
          </div>

          {/* Selections */}
          <div className="space-y-8">
            {/* Size */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold">Select Size</span>
                <span className="text-[10px] text-stone-300 underline underline-offset-4 cursor-pointer hover:text-stone-900 transition-colors">Size Guide</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center text-xs font-medium transition-all duration-300 rounded-full border ${
                      selectedSize === size
                        ? 'bg-stone-900 text-white border-stone-900 shadow-lg shadow-stone-900/10'
                        : 'bg-white text-stone-500 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold">Quantity</span>
              <div className="flex items-center w-fit border border-stone-200 rounded-full bg-stone-50 p-1">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <FaMinus className="text-[10px]" />
                </button>
                <span className="w-12 text-center text-sm font-medium text-stone-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <FaPlus className="text-[10px]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 bg-stone-50 border-t border-stone-100 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-stone-400 text-sm font-light">Subtotal</span>
            <span className="text-2xl font-serif text-stone-900 tracking-tight">₹{totalPrice}</span>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-4 px-4 border border-stone-200 rounded-2xl text-stone-600 hover:bg-white hover:text-stone-900 transition-all font-medium text-xs uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-4 px-4 bg-stone-900 text-white rounded-2xl hover:bg-stone-800 transition-all font-medium text-xs uppercase tracking-widest shadow-xl shadow-stone-900/10 active:scale-[0.98]"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNowModal;
