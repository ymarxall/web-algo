'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
import PropTypes from 'prop-types';

const FloatingCart = ({ cartItems, onUpdateCart, onRemoveFromCart, onClearCart, onCheckout, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!Array.isArray(cartItems)) {
      console.error('cart.js: cartItems is not an array:', cartItems);
      setShowCart(false);
      return;
    }
    console.log('cart.js: Received cartItems:', JSON.stringify(cartItems, null, 2));
    const hasItems = cartItems.length > 0;
    setShowCart(hasItems);
    if (!hasItems) {
      setIsExpanded(false);
    }
    console.log('cart.js: showCart set to:', hasItems);
  }, [cartItems]);

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseInt(item?.price?.replace(/[^\d]/g, '') || '0', 10);
    return sum + (price * (item?.quantity || 1));
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + (item?.quantity || 1), 0);

  const formatPrice = (price) => {
    return `Rp${(price || 0).toLocaleString('id-ID')}`;
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
      onCheckout();
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
    console.log('cart.js: Closing cart, items before close:', JSON.stringify(cartItems, null, 2));
    setIsExpanded(false);
    console.log('cart.js: isExpanded set to false, showCart:', showCart, 'cartItems:', JSON.stringify(cartItems, null, 2));
    onClose();
  };

  const getValidImagePath = (image) => {
    if (!image) return '/api/placeholder/128/128';
    if (!image.startsWith('/') && !image.startsWith('http://') && !image.startsWith('https://')) {
      return `/${image}`;
    }
    return image;
  };

  if (!showCart) {
    console.log('cart.js: Cart hidden due to showCart=false, cartItems:', JSON.stringify(cartItems, null, 2));
    return null;
  }

  return (
    <>
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-gradient-to-b from-black/20 to-black/40 backdrop-blur-md z-40 transition-all duration-300"
          onClick={handleClose}
        />
      )}

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-60">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl transform animate-bounce-in border border-orange-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <CheckIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-1 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Order Confirmed!
              </h3>
              <p className="text-sm text-gray-600">Redirecting to checkout...</p>
            </div>
          </div>
        </div>
      )}

      <div className={`fixed z-50 transition-all duration-500 ${
        isExpanded 
          ? 'top-20 md:top-28 bottom-20 md:bottom-28 left-4 right-4 md:left-1/2 md:-translate-x-1/2 max-w-3xl mx-auto'
          : 'bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xs md:w-72'
      }`}>
        {isExpanded && (
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-orange-200 max-h-[calc(100vh-224px)] md:max-h-[calc(100vh-256px)] min-h-[300px] overflow-hidden flex flex-col transform animate-slide-up">
            <div className="flex items-center justify-between p-4 border-b border-orange-200 bg-gradient-to-r from-orange-100 to-orange-200/50">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <ShoppingBagIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-xl text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Your Order
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">{totalItems} items selected</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-orange-100 rounded-xl transition-all duration-200 hover:scale-110"
                title="Close cart"
              >
                <XMarkIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className={`flex-1 max-h-[calc(100vh-288px)] md:max-h-[calc(100vh-320px)] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-orange-100 transition-all duration-300 ${
              isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
            }`}>
              {cartItems.map((item, index) => {
                const itemPrice = parseInt(item?.price?.replace(/[^\d]/g, '') || '0', 10);
                return (
                  <div 
                    key={item.id} 
                    className="p-4 border-b border-orange-200 last:border-b-0 hover:bg-orange-100/70 transition-all duration-200 group animate-pulse-once bg-gradient-to-r from-orange-50 to-orange-100 shadow-md hover:shadow-lg"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-orange-200 to-orange-300 flex-shrink-0 shadow-lg">
                        <Image
                          src={getValidImagePath(item.image)}
                          alt={item.name || 'Item'}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => { e.target.src = '/api/placeholder/128/128'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex-1 pr-2">
                            <h4 className="font-black text-lg text-gray-900 mb-0.5 truncate group-hover:text-orange-700 transition-colors">
                              {item.name || 'Unknown Item'} 
                              <span className="text-xs text-gray-600 ml-1">({item.category || 'Unknown'})</span>
                            </h4>
                            <p className="text-gray-700 text-sm font-medium line-clamp-2">{item.description || 'No description'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-lg bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                            {formatPrice(itemPrice)}
                          </span>
                          <span className="text-gray-600 text-xs">each</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-orange-100 rounded-xl p-1 border border-orange-200 shadow-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-white hover:bg-red-100 border border-orange-300 hover:border-red-400 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                            title="Decrease quantity"
                          >
                            <MinusIcon className="w-4 h-4 text-gray-700 hover:text-red-600" />
                          </button>
                          <div className="flex flex-col items-center w-10">
                            <span className="text-lg font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg shadow-sm">{item.quantity || 1}</span>
                            <span className="text-xs text-gray-600">qty</span>
                          </div>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                            title="Increase quantity"
                          >
                            <PlusIcon className="w-4 h-4 text-white" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveFromCart(item.id)}
                          className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-100 rounded-xl transition-all duration-200 hover:scale-110"
                          title="Remove item"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-orange-200 flex justify-between items-center">
                      <span className="text-sm text-gray-700 font-medium">Subtotal:</span>
                      <span className="font-black text-lg bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                        {formatPrice(itemPrice * (item.quantity || 1))}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-gradient-to-r from-white to-orange-100 border-t border-orange-200">
              <div className="bg-white rounded-xl p-3 shadow-md border border-orange-200">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-700 text-sm font-medium">Items ({totalItems}):</span>
                  <span className="font-bold text-sm text-gray-900">{formatPrice(totalPrice)}</span>
                </div>
                <div className="border-t border-orange-200 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-base text-gray-900">Total:</span>
                    <span className="font-black text-lg bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={handleClearCart}
                  className="flex-1 py-2 px-4 bg-white hover:bg-red-100 text-gray-800 hover:text-red-700 border border-orange-300 hover:border-red-400 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 shadow-sm"
                >
                  <TrashIcon className="w-4 h-4 inline mr-1" />
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-2 py-2 px-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold text-sm transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-1"
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

        {!isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="group w-full max-w-xs bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-4 rounded-2xl shadow-lg flex items-center justify-between transition-all duration-300 hover:scale-105 hover:shadow-orange-600/30 border border-orange-500/30 animate-pulse-slow"
          >
            <div className="flex items-center">
              <div className="relative mr-3">
                <div className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center backdrop-blur-md shadow-md">
                  <ShoppingBagIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                </div>
                {totalItems > 0 && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce shadow-md">
                    {totalItems > 99 ? '99+' : totalItems}
                  </div>
                )}
              </div>
              <div className="text-left">
                <p className="text-base font-bold mb-0.5">
                  {totalItems} item{totalItems !== 1 ? 's' : ''}
                </p>
                <p className="text-xs font-medium opacity-90 flex items-center gap-1">
                  <SparklesIcon className="w-3 h-3" />
                  Review order
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-bold text-lg">{formatPrice(totalPrice)}</p>
            </div>
          </button>
        )}
      </div>

      <style jsx>{`
        .animate-slide-up {
          animation: slideUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .animate-bounce-in {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animate-pulse-once {
          animation: pulseOnce 0.5s ease-in-out;
        }
        .animate-pulse-slow {
          animation: pulseSlow 2s ease-in-out infinite;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseOnce {
          0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.5); }
          50% { box-shadow: 0 0 0 10px rgba(249, 115, 22, 0); }
          100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
        }
        @keyframes pulseSlow {
          0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4); }
          50% { box-shadow: 0 0 0 10px rgba(249, 115, 22, 0); }
          100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #f97316 #fef7ee;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #fef7ee;
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      `}</style>
    </>
  );
};

FloatingCart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      name: PropTypes.string,
      price: PropTypes.string,
      quantity: PropTypes.number,
      image: PropTypes.string,
      category: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  onUpdateCart: PropTypes.func.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onClearCart: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FloatingCart;