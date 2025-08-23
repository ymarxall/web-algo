'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MagnifyingGlassIcon,
  HeartIcon,
  PlusIcon,
  SparklesIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { 
  StarIcon, 
  HeartIcon as HeartSolidIcon 
} from '@heroicons/react/24/solid';
import Cart from '../components/cart'; 

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All Menu');
  const [favorites, setFavorites] = useState(new Set([1, 3]));
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Load cartItems from localStorage on mount
  useEffect(() => {
    const storedItems = localStorage.getItem('cartItems');
    console.log('menu.js: Stored cartItems on mount:', storedItems);
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        if (Array.isArray(parsedItems)) {
          setCartItems(parsedItems);
        } else {
          console.warn('menu.js: Stored cartItems is not an array:', parsedItems);
          localStorage.removeItem('cartItems');
        }
      } catch (error) {
        console.error('menu.js: Error parsing stored cartItems:', error);
        localStorage.removeItem('cartItems');
      }
    }
  }, []);

  // Handle scroll for desktop header
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: 'All Menu', icon: '🍽️' }, 
    { name: 'Coffee', icon: '☕' }, 
    { name: 'Snack', icon: '🥐' }, 
    { name: 'Non Coffee', icon: '🥤' }
  ];

  const menuItems = [
    {
      id: 1,
      name: 'Tea',
      description: 'Classic black tea with rich aroma and smooth finish',
      price: 'Rp5,000',
      originalPrice: null,
      image: '/thaitea.JPG',
      category: 'Non Coffee',
      isPopular: true,
    },
    {
      id: 2,
      name: 'Milk Tea',
      description: 'Creamy blend of premium tea and fresh milk',
      price: 'Rp10,000',
      originalPrice: null,
      rating: 4.8,
      image: '/thaitea.JPG',
      category: 'Non Coffee',
      isPopular: false
    },
    {
      id: 3,
      name: 'Coffee Milk',
      description: 'Cold brew coffee perfectly balanced with creamy milk',
      price: 'Rp12,000',
      originalPrice: 'Rp25,000',
      image: '/thaitea.JPG',
      category: 'Coffee',
      isPopular: true
    },
    {
      id: 4,
      name: 'Cappuccino',
      description: 'Espresso topped with velvety steamed milk foam',
      price: 'Rp13,000',
      originalPrice: null,
      image: '/thaitea.JPG',
      category: 'Coffee',
      isPopular: false
    },
    {
      id: 5,
      name: 'Palm Sugar Milk Coffee',
      description: 'Indonesian coffee sweetened with natural palm sugar',
      price: 'Rp18,000',
      originalPrice: null,
      rating: 4.9,
      image: '/thaitea.JPG',
      category: 'Coffee',
      isPopular: true
    },
    {
      id: 6,
      name: 'Vanilla',
      description: 'Smooth vanilla latte with aromatic vanilla notes',
      price: 'Rp15,000',
      originalPrice: null,
      rating: 4.6,
      image: '/vanilla.JPG',
      category: 'Non Coffee',
      isPopular: false
    },
    {
      id: 7,
      name: 'Red Velvet',
      description: 'Indulgent red velvet drink with chocolate undertones',
      price: 'Rp15,000',
      originalPrice: null,
      rating: 4.5,
      image: '/thaitea.JPG',
      category: 'Non Coffee',
      isPopular: false
    },
    {
      id: 8,
      name: 'Thai Tea',
      description: 'Authentic Thai tea with condensed milk and spices',
      price: 'Rp15,000',
      originalPrice: null,
      rating: 4.7,
      image: '/thaitea.JPG',
      category: 'Non Coffee',
      isPopular: false
    },
    {
      id: 9,
      name: 'Green Tea',
      description: 'Refreshing green tea packed with antioxidants',
      price: 'Rp15,000',
      originalPrice: null,
      rating: 4.7,
      image: '/thaitea.JPG',
      category: 'Non Coffee',
      isPopular: false
    },
    {
      id: 10,
      name: 'Taro',
      description: 'Creamy purple taro drink with natural sweetness',
      price: 'Rp15,000',
      originalPrice: null,
      rating: 4.7,
      image: '/taro.JPG',
      category: 'Non Coffee',
      isPopular: false
    },
    {
      id: 11,
      name: 'Milo',
      description: 'Rich chocolate malt drink with nostalgic flavor',
      price: 'Rp13,000',
      originalPrice: null,
      rating: 4.7,
      image: '/thaitea.JPG',
      category: 'Non Coffee',
      isPopular: false
    },
    {
      id: 12,
      name: 'French Fries',
      description: 'Golden crispy fries seasoned to perfection',
      price: 'Rp13,000',
      originalPrice: null,
      rating: 4.7,
      image: '/frenchfries.JPG',
      category: 'Snack',
      isPopular: false
    },
    {
      id: 13,
      name: 'Sausage',
      description: 'Grilled sausage with savory herbs and spices',
      price: 'Rp13,000',
      originalPrice: null,
      rating: 4.7,
      image: '/sausage.JPG',
      category: 'Snack',
      isPopular: false
    },
    {
      id: 14,
      name: 'Nuggets',
      description: 'Crispy chicken nuggets with tender meat inside',
      price: 'Rp13,000',
      originalPrice: null,
      rating: 4.7,
      image: '/nugget.JPG',
      category: 'Snack',
      isPopular: false
    },
    {
      id: 15,
      name: 'Mix Platter',
      description: 'Perfect combo of fries, sausage, and nuggets for sharing',
      price: 'Rp25,000',
      originalPrice: null,
      rating: 4.8,
      image: '/3.JPG',
      category: 'Snack',
      isPopular: false
    }
  ];

  const navItems = [
    { icon: '🏠', path: '/', active: false, label: 'Home' },
    { icon: '📋', path: '/menu', active: true, label: 'Menu' },
    { icon: '📞', path: '/contact', active: false, label: 'Contact' }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const sanitizeItem = (item) => {
    const safeString = (str) => (str ? String(str).replace(/[^\w\s.-]/g, '') : '');
    return {
      id: item.id,
      name: safeString(item.name),
      description: safeString(item.description),
      price: safeString(item.price) || 'Rp0',
      quantity: item.quantity || 1,
      category: safeString(item.category),
      image: safeString(item.image) || '/api/placeholder/112/112'
    };
  };

  const addToCart = (item) => {
    const sanitizedItem = sanitizeItem(item);
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      const updatedItems = existingItem
        ? prev.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...prev, { ...sanitizedItem, quantity: 1 }];
      console.log('menu.js: Updated cartItems:', JSON.stringify(updatedItems, null, 2));
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
    setShowToast(true);
    setIsCartOpen(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    setCartItems(prev => {
      const updatedItems = prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0);
      console.log('menu.js: Updated cartItems quantity:', JSON.stringify(updatedItems, null, 2));
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => {
      const updatedItems = prev.filter(item => item.id !== itemId);
      console.log('menu.js: Cart items after removal:', JSON.stringify(updatedItems, null, 2));
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    console.log('menu.js: Cart cleared');
    localStorage.removeItem('cartItems');
  };

  const handleCheckout = () => {
    console.log('menu.js: Cart items before checkout:', JSON.stringify(cartItems, null, 2));
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      console.warn('menu.js: No valid cart items to checkout');
      alert('Your cart is empty. Please add items before checking out.');
      return;
    }
    try {
      const rawJson = JSON.stringify(cartItems);
      console.log('menu.js: Raw cartItems JSON:', rawJson);
      const cartItemsString = encodeURIComponent(rawJson);
      console.log('menu.js: Encoded cartItems string:', cartItemsString);
      router.push(`/struk?cartItems=${cartItemsString}`);
      setIsCartOpen(false);
    } catch (error) {
      console.error('menu.js: Error encoding cartItems:', error);
      alert('An error occurred while processing your order. Please try again.');
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All Menu' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-in">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              ✓
            </div>
            <span className="font-medium">Item added to cart!</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="relative bg-gradient-to-br from-orange-500 to-red-600 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-24 h-24 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 left-1/3 w-12 h-12 bg-white rounded-full animate-pulse"></div>
        </div>

        {/* Navigation */}
        <div className="relative z-10">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between max-w-6xl mx-auto p-6">
            <div className="text-white text-2xl font-bold">Algo Coffee</div>
            <div className="flex items-center gap-2">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    console.log(`Navigating to ${item.path}`);
                    router.push(item.path);
                  }}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    item.active 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-center max-w-6xl mx-auto p-6">
            <div className="text-center">
              <h1 className="text-white text-2xl font-bold mb-1 tracking-tight">Our Menu</h1>
              <p className="text-white/80 text-sm">Discover amazing flavors</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="relative max-w-md mx-auto">
              <div className="flex items-center bg-white/15 backdrop-blur-md rounded-3xl px-6 py-4 w-full border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <MagnifyingGlassIcon className="w-5 h-5 text-white/80 mr-4" />
                <input
                  type="text"
                  placeholder="Search for coffee, tea, pastry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-base"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="ml-2 text-white/60 hover:text-white text-xl"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Header for Desktop (appears on scroll) */}
      <div className={`hidden md:block fixed top-0 left-0 right-0 z-50 bg-white shadow-lg transition-transform duration-300 ${
        scrolled ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="flex items-center justify-between max-w-6xl mx-auto p-4">
          <div className="text-orange-600 text-xl font-bold">Algo Coffee</div>
          <div className="flex items-center gap-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => router.push(item.path)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  item.active 
                    ? 'bg-orange-100 text-orange-600' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-orange-100 shadow-sm">
        <div className="px-4 md:px-8 lg:px-16 xl:px-24 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`group whitespace-nowrap py-3 px-6 rounded-2xl font-medium text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 ${
                    activeCategory === category.name
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30 transform scale-105'
                      : 'bg-white text-gray-600 hover:text-orange-600 hover:bg-orange-50 shadow-md border border-gray-100'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 py-8">
        <div className="max-w-7xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <MagnifyingGlassIcon className="w-10 h-10 text-orange-400" />
              </div>
              <h3 className="text-gray-800 font-bold mb-3 text-xl">No items found</h3>
              <p className="text-gray-500 text-base mb-4">Try searching with different keywords</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="group bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex gap-4 sm:gap-5">
                      {/* Product Image */}
                      <div className="relative flex-shrink-0">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200 shadow-lg">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = '/api/placeholder/128/128';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Badges */}
                        {item.discount && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse flex items-center gap-1">
                            <SparklesIcon className="w-3 h-3" />
                            {item.discount}
                          </div>
                        )}
                        {item.isPopular && !item.discount && (
                          <div className="absolute -top-2 -left-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                            <FireIcon className="w-3 h-3" />
                            Popular
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2 sm:mb-3">
                          <div className="flex-1 pr-3">
                            <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-1 sm:mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          <button
                            onClick={() => toggleFavorite(item.id)}
                            className="p-2 rounded-2xl hover:bg-red-50 transition-all duration-300 flex-shrink-0 hover:scale-110"
                          >
                            {favorites.has(item.id) ? (
                              <HeartSolidIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 animate-pulse" />
                            ) : (
                              <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-red-400" />
                            )}
                          </button>
                        </div>

                        {/* Price and Add Button */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className="font-bold text-orange-600 text-lg sm:text-xl">
                              {item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-gray-400 line-through text-xs sm:text-sm">
                                {item.originalPrice}
                              </span>
                            )}
                          </div>
                          <button 
                            onClick={() => addToCart(item)}
                            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 p-3 sm:p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 group"
                          >
                            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart */}
      {isCartOpen && (
        <Cart 
            cartItems={cartItems}
            onUpdateCart={updateCartItemQuantity}
            onRemoveFromCart={removeFromCart}
            onClearCart={clearCart}
            onCheckout={handleCheckout}
            onClose={() => setIsCartOpen(false)}
          />
      
      )}

      {/* Bottom spacing for mobile navigation */}
      <div className="md:hidden h-20"></div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around py-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                console.log(`Navigating to ${item.path} from mobile nav`);
                router.push(item.path);
              }}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-lg transition-all duration-300 ${
                item.active 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'text-gray-600'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .animate-bounce-in {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .animate-fade-in {
          animation: fadeInUp 0.6s ease-out both;
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: translate(-50%, -20px) scale(0.5); }
          50% { opacity: 1; transform: translate(-50%, 0) scale(1.1); }
          100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}