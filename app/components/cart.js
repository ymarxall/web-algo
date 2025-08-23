
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBagIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  TrashIcon,
  SparklesIcon,
  HeartIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const FloatingCart = ({ cartItems, onUpdateCart, onRemoveFromCart, onClearCart, onCheckout, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  // Show cart when there are items
  useEffect(() => {
    console.log('cart.js: Received cartItems:', JSON.stringify(cartItems, null, 2));
    setShowCart(cartItems.length > 0);
    if (cartItems.length === 0) {
      setIsExpanded(false);
    }
  }, [cartItems]);

  // Calculate total
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
    return sum + (price * item.quantity);
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (price) => {
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    
    if (newQuantity <= 0) {
      onRemoveFromCart(itemId);
    } else {
      onUpdateCart(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    console.log('cart.js: Cart items before checkout:', JSON.stringify(cartItems, null, 2));
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      console.warn('cart.js: No valid cart items to checkout');
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }
    
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onCheckout(); // Use the onCheckout prop passed from Menu
      console.log('cart.js: Navigating to /struk via onCheckout');
    }, 1500);
  };

  const handleClearCart = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onClearCart();
      setIsAnimating(false);
    }, 300);
  };

  const handleClose = () => {
    setIsExpanded(false);
    onClose(); // Call the onClose prop to close the cart
  };

  if (!showCart) return null;

  return (
    <>
      {/* Enhanced Backdrop */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-gradient-to-b from-black/10 to-black/30 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={handleClose}
        />
      )}

      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-60">
          <div className="bg-white rounded-3xl p-8 shadow-2xl transform animate-bounce-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Order Confirmed!</h3>
              <p className="text-gray-600">Redirecting to checkout...</p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Floating Cart - Adjusted position for desktop collapsed state */}
      <div className={`fixed left-4 right-4 z-50 transition-all duration-500 ${
        isExpanded 
          ? 'bottom-16 md:bottom-24 md:top-20' 
          : 'bottom-32 md:bottom-16'
      }`}>
        <div className="max-w-md mx-auto">
          {/* Enhanced Expanded Cart View */}
          {isExpanded && (
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 mb-4 max-h-[calc(100vh-150px)] md:max-h-[calc(100vh-200px)] min-h-[300px] overflow-hidden flex flex-col transform animate-slide-up">
              {/* Enhanced Cart Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-gradient-to-r from-orange-50 to-orange-100/50">
                <div>
                  <h3 className="font-bold text-gray-800 flex items-center text-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-3">
                      <ShoppingBagIcon className="w-4 h-4 text-white" />
                    </div>
                    Your Order
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{totalItems} delicious items selected</p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/50 rounded-2xl transition-all duration-200 hover:scale-110"
                >
                  <XMarkIcon className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Enhanced Cart Items */}
              <div className={`flex-1 max-h-[calc(100vh-230px)] md:max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-100 transition-all duration-300 ${
                isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
              }`}>
                {cartItems.map((item, index) => {
                  const itemPrice = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
                  return (
                    <div 
                      key={item.id} 
                      className="p-5 border-b border-gray-100/50 last:border-b-0 hover:bg-orange-50/50 transition-all duration-200 group animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-4">
                        {/* Enhanced Item Image */}
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200 flex-shrink-0 shadow-lg">
                          <img
                            src={item.image || 'https://via.placeholder.com/128'}
                            alt={item.name || 'Item'}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                        </div>

                        {/* Enhanced Item Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-base mb-1 truncate group-hover:text-orange-600 transition-colors">
                            {item.name || 'Unknown Item'} <span className="text-xs text-gray-500">({item.category})</span>
                          </h4>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-orange-600 font-bold text-sm">
                              {formatPrice(itemPrice)}
                            </span>
                            <span className="text-gray-500 text-xs">each</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <SparklesIcon className="w-3 h-3" />
                            <span>Fresh & Hot</span>
                          </div>
                        </div>

                        {/* Enhanced Quantity Controls */}
                        <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-white hover:bg-red-50 border border-gray-200 hover:border-red-300 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                          >
                            <MinusIcon className="w-4 h-4 text-gray-600 hover:text-red-500" />
                          </button>
                          <div className="flex flex-col items-center">
                            <span className="w-8 text-center text-lg font-bold text-gray-900">
                              {item.quantity}
                            </span>
                            <span className="text-xs text-gray-500">qty</span>
                          </div>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                          >
                            <PlusIcon className="w-4 h-4 text-white" />
                          </button>
                        </div>

                        {/* Enhanced Remove Button */}
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-200 hover:scale-110"
                          title="Remove item"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Item Subtotal */}
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm text-gray-600">Subtotal:</span>
                        <span className="font-bold text-orange-600">
                          {formatPrice(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Enhanced Cart Footer */}
              <div className="p-6 bg-gradient-to-r from-gray-50 to-orange-50 border-t border-gray-200/50">
                {/* Total Section */}
                <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Items ({totalItems}):</span>
                    <span className="font-medium text-gray-800">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg text-gray-800">Total:</span>
                      <span className="font-bold text-2xl text-orange-600">
                        {formatPrice(totalPrice)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleClearCart}
                    className="flex-1 py-3 px-4 bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 border border-gray-200 hover:border-red-300 rounded-2xl font-medium text-sm transition-all duration-200 hover:scale-105 shadow-sm"
                  >
                    <TrashIcon className="w-4 h-4 inline mr-2" />
                    Clear
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="flex-2 py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    disabled={cartItems.length === 0}
                  >
                    <HeartIcon className="w-4 h-4" />
                    Order Now
                    <SparklesIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Collapsed Cart Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="group w-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-orange-700 hover:to-red-600 text-white py-4 px-6 rounded-3xl shadow-2xl flex items-center justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-orange-500/25 border border-orange-400/20"
          >
            <div className="flex items-center">
              <div className="relative mr-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <ShoppingBagIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                </div>
                {totalItems > 0 && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse shadow-lg">
                    {totalItems > 99 ? '99+' : totalItems}
                  </div>
                )}
              </div>
              <div className="text-left">
                <p className="text-base font-bold mb-1">
                  {totalItems} item{totalItems !== 1 ? 's' : ''} added
                </p>
                <p className="text-sm opacity-90 flex items-center gap-1">
                  <SparklesIcon className="w-3 h-3" />
                  Tap to {isExpanded ? 'close' : 'review'} order
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-bold text-xl mb-1">{formatPrice(totalPrice)}</p>
              <p className="text-sm opacity-90 flex items-center justify-end gap-1">
                <HeartIcon className="w-3 h-3" />
                Total
              </p>
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        .animate-slide-up {
          animation: slideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .animate-bounce-in {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out both;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #f97316 #f3f4f6;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }
      `}</style>
    </>
  );
};

export default FloatingCart;
