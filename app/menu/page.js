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
import Image from 'next/image';
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
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-orange-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-100/40 to-orange-200/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-50/20 to-orange-100/20 rounded-full blur-3xl animate-spin" style={{animationDuration: '20s'}}></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-orange-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-orange-500 rounded-full animate-bounce opacity-80" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-orange-300 rounded-full animate-bounce opacity-70" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-orange-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '3s'}}></div>
      </div>

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

      {/* Sticky Header for Desktop (appears on scroll) */}
      <div className={`hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl shadow-lg border-b border-orange-100 transition-transform duration-300 ${
        scrolled ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="flex items-center justify-between max-w-7xl mx-auto p-4">
          <Image 
            src="/algo.png" 
            alt="Algo Coffee Logo" 
            width={150}
            height={150}
          />
          <div className="flex items-center gap-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => router.push(item.path)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${
                  item.active 
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg shadow-orange-400/25' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-orange-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 backdrop-blur-xl bg-white/80 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Image 
              src="/algo.png" 
              alt="Algo Coffee Logo" 
              width={150}
              height={150}
            />

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => router.push(item.path)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center space-x-2 ${
                    item.active 
                      ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg shadow-orange-400/25' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-orange-50'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="relative bg-gradient-to-br from-orange-400 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-6xl">☕</div>
          <div className="absolute top-8 right-8 text-4xl">🍵</div>
          <div className="absolute bottom-4 left-1/4 text-5xl">🥐</div>
          <div className="absolute bottom-8 right-1/4 text-3xl">✨</div>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <FireIcon className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-bold">Explore Our Menu</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4">
            <span className="block bg-gradient-to-r from-white via-orange-100 to-white bg-clip-text text-transparent">
              OUR MENU
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
            Discover our signature drinks and delicious treats crafted with 
            <span className="text-orange-200 font-semibold"> passion</span> and 
            <span className="text-orange-100 font-semibold"> quality</span>
          </p>
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
      </section>

      {/* Category Tabs */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`group whitespace-nowrap py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 hover:scale-105 ${
                  activeCategory === category.name
                    ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg shadow-orange-400/30 transform scale-105'
                    : 'bg-white text-gray-700 hover:text-orange-600 hover:bg-orange-50 shadow-md border border-orange-100'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <section className="py-12 px-6 bg-gradient-to-br from-white to-orange-50">
        <div className="max-w-7xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <MagnifyingGlassIcon className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-gray-900 font-black mb-3 text-2xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                No Items Found
              </h3>
              <p className="text-gray-600 text-base mb-6">Try searching with different keywords</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="group bg-white backdrop-blur-xl border border-orange-100 rounded-3xl overflow-hidden hover:border-orange-200 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Item Header */}
                  <div className={`bg-gradient-to-r ${item.category === 'Coffee' ? 'from-orange-400 via-orange-500 to-red-500' : item.category === 'Non Coffee' ? 'from-orange-300 via-orange-400 to-orange-500' : 'from-white via-orange-200 to-orange-300'} p-6 relative`}>
                    <div className="absolute inset-0 opacity-20">
                      <div className="text-8xl absolute top-2 right-4">{item.category === 'Coffee' ? '☕' : item.category === 'Non Coffee' ? '🌟' : '🍟'}</div>
                    </div>
                    <div className="relative flex items-center">
                      <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
                        {item.category === 'Coffee' ? (
                          <FireIcon className="w-6 h-6 text-white" />
                        ) : item.category === 'Non Coffee' ? (
                          <SparklesIcon className="w-6 h-6 text-white" />
                        ) : (
                          <StarIcon className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <h3 className="text-2xl font-black text-white">{item.name}</h3>
                    </div>
                  </div>

                  {/* Item Content */}
                  <div className="p-6">
                    <div className="relative mb-4">
                      <div className="w-full h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200 shadow-lg">
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
                      {item.isPopular && (
                        <div className="absolute -top-2 -left-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                          <FireIcon className="w-3 h-3" />
                          Popular
                        </div>
                      )}
                      {item.originalPrice && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse flex items-center gap-1">
                          <SparklesIcon className="w-3 h-3" />
                          Discount
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100 hover:border-orange-200 transition-all duration-300 group/item hover:bg-orange-100">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="text-lg font-bold text-gray-900 group-hover/item:text-orange-600 transition-colors duration-200">
                                {item.name}
                              </h4>
                              {item.isPopular && (
                                <div className="flex items-center bg-orange-400/20 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">
                                  <StarIcon className="w-3 h-3 mr-1" />
                                  HOT
                                </div>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                          </div>
                          <button
                            onClick={() => toggleFavorite(item.id)}
                            className="p-2 rounded-2xl hover:bg-red-50 transition-all duration-300 flex-shrink-0 hover:scale-110"
                          >
                            {favorites.has(item.id) ? (
                              <HeartSolidIcon className="w-5 h-5 text-red-500 animate-pulse" />
                            ) : (
                              <HeartIcon className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
                            )}
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <span className="text-xl font-black bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                              {item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-gray-400 line-through text-sm">
                                {item.originalPrice}
                              </span>
                            )}
                          </div>
                          <button 
                            onClick={() => addToCart(item)}
                            className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 group"
                          >
                            <PlusIcon className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
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
      </section>

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

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-orange-100 z-50">
        <div className="flex justify-between px-4 py-4">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-all duration-300 ${
                item.active 
                  ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-orange-50'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-bold">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile padding */}
      <div className="md:hidden h-20"></div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .animate-bounce-in {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}