'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronRightIcon,
  BeakerIcon,
  GiftIcon,
  SparklesIcon,
  CakeIcon,
  FireIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Handle scroll for desktop header
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuCategories = [
    {
      title: 'Non Coffee',
      icon: SparklesIcon,
      color: 'from-orange-300 via-orange-400 to-orange-500',
      bgPattern: '🌟',
      items: [
        { name: 'Tea', price: 'Rp5,000', description: 'Classic black tea with rich aroma and smooth finish', popular: false },
        { name: 'Milk Tea', price: 'Rp10,000', description: 'Creamy blend of premium tea and fresh milk', popular: true },
        { name: 'Vanilla', price: 'Rp15,000', description: 'Smooth vanilla latte with aromatic vanilla notes', popular: false },
        { name: 'Red Velvet', price: 'Rp15,000', description: 'Indulgent red velvet drink with chocolate undertones', popular: true },
        { name: 'Thai Tea', price: 'Rp15,000', description: 'Authentic Thai tea with condensed milk and spices', popular: true },
        { name: 'Green Tea', price: 'Rp15,000', description: 'Refreshing green tea packed with antioxidants', popular: false },
        { name: 'Taro', price: 'Rp15,000', description: 'Creamy purple taro drink with natural sweetness', popular: false },
        { name: 'Milo', price: 'Rp13,000', description: 'Rich chocolate malt drink with nostalgic flavor', popular: false }
      ]
    },
    {
      title: 'Coffee',
      icon: BeakerIcon,
      color: 'from-orange-400 via-orange-500 to-red-500',
      bgPattern: '☕',
      items: [
        { name: 'Coffee Milk', price: 'Rp12,000', description: 'Cold brew coffee perfectly balanced with creamy milk', popular: true },
        { name: 'Cappuccino', price: 'Rp13,000', description: 'Espresso topped with velvety steamed milk foam', popular: false },
        { name: 'Palm Sugar Milk Coffee', price: 'Rp18,000', description: 'Indonesian coffee sweetened with natural palm sugar', popular: true }
      ]
    },
    {
      title: 'Snack',
      icon: CakeIcon,
      color: 'from-white via-orange-200 to-orange-300',
      bgPattern: '🍟',
      items: [
        { name: 'French Fries', price: 'Rp13,000', description: 'Golden crispy fries seasoned to perfection', popular: true },
        { name: 'Sausage', price: 'Rp13,000', description: 'Grilled sausage with savory herbs and spices', popular: false },
        { name: 'Nuggets', price: 'Rp13,000', description: 'Crispy chicken nuggets with tender meat inside', popular: true },
        { name: 'Mix Platter', price: 'Rp25,000', description: 'Perfect combo of fries, sausage, and nuggets for sharing', popular: true }
      ]
    }
  ];

  const navItems = [
    { icon: '🏠', path: '/', active: true, label: 'Home' },
    { icon: '📋', path: '/menu', active: false, label: 'Menu' },
    { icon: '📞', path: '/contact', active: false, label: 'Contact' }
  ];

  const features = [
    { icon: '⚡', title: 'Fast Service', desc: 'Quick delivery in 5 mins' },
    { icon: '🌱', title: 'Fresh Beans', desc: 'Premium quality ingredients' },
    { icon: '🎯', title: 'Perfect Taste', desc: 'Crafted by expert baristas' }
  ];

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

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 pt-8">
        <div className="text-center max-w-6xl mx-auto">
          {/* Main Title */}
          <div className="mb-4">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-orange-200 backdrop-blur-sm border border-orange-200 rounded-full px-6 py-2 mb-4">
              <FireIcon className="w-5 h-5 text-orange-600 mr-2" />
              <span className="text-orange-700 font-semibold">Premium Coffee Experience</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-3">
              <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent drop-shadow-2xl">
                ALGO
              </span>
              <span className="block bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent -mt-2">
                COFFEE
              </span>
            </h1>
            <p className="text-base md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              Where every cup tells a story of <span className="text-orange-600 font-semibold">passion</span>, 
              <span className="text-orange-700 font-semibold"> quality</span>, and 
              <span className="text-orange-800 font-semibold"> innovation</span>
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm border border-orange-100 rounded-2xl p-4 hover:bg-orange-50 transition-all duration-300 group shadow-sm">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => router.push('/menu')}
              className="group bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-3 px-10 rounded-2xl transition-all duration-300 shadow-2xl shadow-orange-400/25 hover:shadow-orange-500/40 hover:scale-105 flex items-center space-x-3"
            >
              <span className="text-base">Explore Menu</span>
              <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="relative py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-4 text-6xl">🎁</div>
              <div className="absolute top-8 right-8 text-4xl">✨</div>
              <div className="absolute bottom-4 left-1/4 text-5xl">🔥</div>
              <div className="absolute bottom-8 right-1/4 text-3xl">💎</div>
            </div>

            <div className="relative text-center">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                <GiftIcon className="w-5 h-5 text-white mr-2" />
                <span className="text-white font-bold">LIMITED TIME OFFER</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
                BUY 1 GET 1 
                <span className="block text-yellow-200">FREE</span>
              </h2>
              <p className="text-xl text-orange-100 mb-8">On all coffee drinks this week only!</p>
              <button 
                onClick={() => router.push('/menu')}
                className="bg-white text-orange-600 font-black py-4 px-10 rounded-2xl hover:bg-orange-50 transition-all duration-300 text-lg shadow-2xl hover:scale-105"
              >
                CLAIM OFFER NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-12 px-6 bg-gradient-to-br from-white to-orange-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Our Menu
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our signature drinks and delicious treats crafted with love
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {menuCategories.map((category, categoryIndex) => (
              <div 
                key={categoryIndex} 
                className={`group bg-white backdrop-blur-xl border border-orange-100 rounded-3xl overflow-hidden hover:border-orange-200 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl ${category.title === 'Coffee' ? 'min-h-[450px]' : ''}`}
                style={{ animationDelay: `${categoryIndex * 200}ms` }}
              >
                {/* Category Header */}
                <div className={`bg-gradient-to-r ${category.color} p-8 relative`}>
                  <div className="absolute inset-0 opacity-20">
                    <div className="text-8xl absolute top-2 right-4">{category.bgPattern}</div>
                  </div>
                  <div className="relative flex items-center">
                    <div className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-white">{category.title}</h3>
                  </div>
                </div>

                {/* Items */}
                <div className="p-8">
                  <div className="space-y-4">
                    {category.items.slice(0, 4).map((item, itemIndex) => (
                      <div key={itemIndex} className="bg-orange-50 rounded-2xl p-5 border border-orange-100 hover:border-orange-200 transition-all duration-300 group/item hover:bg-orange-100">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="text-lg font-bold text-gray-900 group-hover/item:text-orange-600 transition-colors duration-200">
                                {item.name}
                              </h4>
                              {item.popular && (
                                <div className="flex items-center bg-orange-400/20 text-orange-700 text-xs font-bold px-2 py-1 rounded-full">
                                  <StarIcon className="w-3 h-3 mr-1" />
                                  HOT
                                </div>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                          </div>
                          <div className="ml-4">
                            <span className="text-xl font-black bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                              {item.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-6 bg-gradient-to-r from-orange-200 to-orange-300 hover:from-orange-300 hover:to-orange-400 text-orange-800 font-bold py-3 rounded-xl transition-all duration-300 border border-orange-200 hover:border-orange-300">
                    View All {category.title}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white to-orange-50 backdrop-blur-xl border border-orange-100 rounded-3xl p-16 shadow-xl">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
              <GiftIcon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-4xl md:text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Ready to Order?
              </span>
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of coffee lovers who trust Algo Coffee for their daily dose of happiness
            </p>
            <button 
              onClick={() => router.push('/menu')}
              className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-5 px-12 rounded-2xl transition-all duration-300 shadow-2xl shadow-orange-400/25 hover:shadow-orange-500/40 hover:scale-105 flex items-center space-x-3 mx-auto text-lg"
            >
              <span>ORDER NOW</span>
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

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
    </div>
  );
}