'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronRightIcon, 
  ClockIcon, 
  MapPinIcon, 
  PhoneIcon,
  StarIcon,
  BeakerIcon,
  GiftIcon,
  SparklesIcon,
  HeartIcon,
  CakeIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const [activeInfoTab, setActiveInfoTab] = useState('Menu');
  const router = useRouter();

  const infoTabs = ['Menu', 'About', 'Location'];

  const menuCategories = [
    {
      title: 'Coffee',
      icon: BeakerIcon,
      items: [
        { name: 'Coffee Milk', price: 'Rp12,000', description: 'Cold brew coffee perfectly balanced with creamy milk' },
        { name: 'Cappuccino', price: 'Rp13,000', description: 'Espresso topped with velvety steamed milk foam' },
        { name: 'Palm Sugar Milk Coffee', price: 'Rp18,000', description: 'Indonesian coffee sweetened with natural palm sugar' }
      ]
    },
    {
      title: 'Non Coffee',
      icon: SparklesIcon,
      items: [
        { name: 'Tea', price: 'Rp5,000', description: 'Classic black tea with rich aroma and smooth finish' },
        { name: 'Milk Tea', price: 'Rp10,000', description: 'Creamy blend of premium tea and fresh milk' },
        { name: 'Vanilla', price: 'Rp15,000', description: 'Smooth vanilla latte with aromatic vanilla notes' },
        { name: 'Red Velvet', price: 'Rp15,000', description: 'Indulgent red velvet drink with chocolate undertones' },
        { name: 'Thai Tea', price: 'Rp15,000', description: 'Authentic Thai tea with condensed milk and spices' },
        { name: 'Green Tea', price: 'Rp15,000', description: 'Refreshing green tea packed with antioxidants' },
        { name: 'Taro', price: 'Rp15,000', description: 'Creamy purple taro drink with natural sweetness' },
        { name: 'Milo', price: 'Rp13,000', description: 'Rich chocolate malt drink with nostalgic flavor' }
      ]
    },
    {
      title: 'Snack',
      icon: CakeIcon,
      items: [
        { name: 'French Fries', price: 'Rp13,000', description: 'Golden crispy fries seasoned to perfection' },
        { name: 'Sausage', price: 'Rp13,000', description: 'Grilled sausage with savory herbs and spices' },
        { name: 'Nuggets', price: 'Rp13,000', description: 'Crispy chicken nuggets with tender meat inside' },
        { name: 'Mix Platter', price: 'Rp25,000', description: 'Perfect combo of fries, sausage, and nuggets for sharing' }
      ]
    }
  ];

  const aboutInfo = {
    story: "Algo Coffee was born from a passion for exceptional coffee and warm hospitality. Since our founding, we've been committed to serving the finest coffee experiences, sourcing premium beans and crafting each cup with precision and care.",
    mission: "To create memorable moments through exceptional coffee, fostering community connections one cup at a time.",
    features: [
      "Premium quality coffee beans",
      "Artisan brewing techniques", 
      "Cozy atmosphere for relaxation",
      "Fresh pastries baked daily",
      "Friendly and knowledgeable staff"
    ]
  };

  const locationInfo = {
    address: "Jl. Coffee Street No. 123, Surabaya, East Java",
    hours: [
      { day: "Monday - Friday", time: "07:00 - 22:00" },
      { day: "Saturday - Sunday", time: "08:00 - 23:00" }
    ],
    contact: {
      phone: "+62 812-3456-7890",
      email: "hello@algocoffee.com"
    }
  };

  const navItems = [
    { icon: '🏠', path: '/', active: true, label: 'Home' },
    { icon: '📋', path: '/menu', active: false, label: 'Menu' },
    { icon: '📞', path: '/contact', active: false, label: 'Contact' }
  ];

  const renderMenuInfo = () => (
    <div className="space-y-4 sm:space-y-6">
      {menuCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 w-full" style={{ animationDelay: `${categoryIndex * 100}ms` }}>
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-xl flex items-center justify-center mr-3">
              <category.icon className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">{category.title}</h3>
          </div>
          <div className="space-y-3">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex justify-between items-start p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition-all duration-200">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm sm:text-base mb-1">{item.name}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">{item.description}</p>
                </div>
                <div className="ml-4 text-right">
                  <span className="text-base sm:text-lg font-bold text-orange-600">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderAboutInfo = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center">
          <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 mr-3" />
          Our Story
        </h3>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">{aboutInfo.story}</p>
        <div className="bg-orange-50 rounded-xl p-4">
          <p className="text-orange-800 font-medium italic text-sm sm:text-base">"{aboutInfo.mission}"</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center">
          <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mr-3" />
          What Makes Us Special
        </h3>
        <div className="space-y-3">
          {aboutInfo.features.map((feature, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded-xl">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-4"></div>
              <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 rounded-2xl p-4 sm:p-6 border border-amber-200">
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400 mr-3">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            ))}
          </div>
          <span className="font-bold text-gray-800 text-sm sm:text-base">4.9/5</span>
          <span className="text-gray-600 ml-2 text-xs sm:text-sm">(150+ reviews)</span>
        </div>
        <p className="text-gray-700 italic text-sm sm:text-base">"Amazing coffee and cozy atmosphere. The palm sugar coffee is absolutely delicious!"</p>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">- Sarah M., Regular Customer</p>
      </div>
    </div>
  );

  const renderLocationInfo = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center">
          <MapPinIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-3" />
          Visit Us
        </h3>
        <div className="bg-blue-50 rounded-xl p-4 mb-4">
          <p className="text-gray-800 font-medium text-sm sm:text-base">{locationInfo.address}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
            <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-3" />
            <span className="text-gray-700 text-sm sm:text-base">{locationInfo.contact.phone}</span>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
            <span className="text-orange-500 font-bold mr-3 text-base sm:text-lg">@</span>
            <span className="text-gray-700 text-sm sm:text-base">{locationInfo.contact.email}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 flex items-center">
          <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 mr-3" />
          Opening Hours
        </h3>
        <div className="space-y-3">
          {locationInfo.hours.map((schedule, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <span className="font-medium text-gray-800 text-sm sm:text-base">{schedule.day}</span>
              <span className="text-orange-600 font-bold text-sm sm:text-base">{schedule.time}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
          <p className="text-green-800 text-xs sm:text-sm font-medium">
            🟢 Open Now - We're ready to serve you!
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Find Us</h3>
        <div className="bg-gray-100 rounded-xl h-40 sm:h-48 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <MapPinIcon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 opacity-70" />
            <p className="font-medium text-sm sm:text-base">Interactive Map</p>
            <p className="text-xs sm:text-sm">Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-orange-500 to-red-600 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-4 w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-4 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 left-1/3 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full animate-pulse"></div>
        </div>

        {/* Navigation */}
        <div className="relative z-10">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between max-w-6xl mx-auto px-4 sm:px-6 py-6">
            <img src="/algo.png" alt="Algo Coffee Logo" className="h-8 sm:h-10" />
            <div className="flex items-center gap-2">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    console.log(`Navigating to ${item.path}`);
                    router.push(item.path);
                  }}
                  className={`px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm sm:text-base ${
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

          {/* Hero Section */}
          <div className="max-w-full sm:max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6">
                Crafted with <span className="text-yellow-300">Passion</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-orange-100 mb-8 max-w-2xl mx-auto">
                Savor premium coffee and delightful pastries in our cozy atmosphere
              </p>
              <button 
                onClick={() => {
                  console.log('Navigating to /menu from Explore Menu');
                  router.push('/menu');
                }}
                className="bg-white text-orange-600 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:bg-orange-50 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-3 mx-auto"
              >
                Explore Menu
                <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-full sm:max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Promo Section */}
        <div className="mb-10 sm:mb-12 -mt-6 sm:-mt-8 relative z-10">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-orange-200/50 w-full">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="inline-block bg-red-500 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full mb-4">
                  Special Offer
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                  Buy One Get One Free
                </h2>
                <p className="text-gray-600 text-sm sm:text-base mb-6">On all coffee drinks this week!</p>
                <button 
                  onClick={() => {
                    console.log('Navigating to /menu from Grab Offer');
                    router.push('/menu');
                  }}
                  className="bg-orange-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl hover:bg-orange-600 transition-all duration-300"
                >
                  Grab Offer
                </button>
              </div>
              <div className="hidden md:block w-28 h-32 sm:w-32 sm:h-40 ml-4 sm:ml-6 rounded-xl overflow-hidden">
                <img 
                  src="/lengkap.JPG" 
                  alt="Coffee Promotion" 
                  className="w-full h-full object-cover" 
                  onError={(e) => { e.target.src = '/api/placeholder/128/128'; }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info Tabs Navigation */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="bg-white rounded-xl p-1 shadow-md">
            {infoTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveInfoTab(tab)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm ${
                  activeInfoTab === tab
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-10 sm:mb-12">
          {activeInfoTab === 'Menu' && renderMenuInfo()}
          {activeInfoTab === 'About' && renderAboutInfo()}
          {activeInfoTab === 'Location' && renderLocationInfo()}
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 sm:p-6 md:p-8 text-center text-white">
          <GiftIcon className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-90" />
          <h3 className="text-xl sm:text-2xl font-bold mb-3">Ready to Order?</h3>
          <p className="text-orange-100 text-sm sm:text-base mb-6">Explore our full menu and place your order now!</p>
          <button 
            onClick={() => {
              console.log('Navigating to /menu from Order Now');
              router.push('/menu');
            }}
            className="bg-white text-orange-600 font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-xl hover:bg-orange-50 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            Order Now
            <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg w-full">
        <div className="flex justify-between px-2 sm:px-4 py-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                console.log(`Navigating to ${item.path} from mobile nav`);
                router.push(item.path);
              }}
              className={`flex flex-col items-center gap-1 py-2 px-2 sm:px-3 rounded-lg transition-all duration-300 flex-1 ${
                item.active 
                  ? 'bg-orange-100 text-orange-600' 
                  : 'text-gray-600'
              }`}
            >
              <span className="text-lg sm:text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile padding bottom */}
      <div className="md:hidden h-16 sm:h-20"></div>
    </div>
  );
}