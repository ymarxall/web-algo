// components/Footer.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// --- SVG Icon Components (for better readability) ---

const HomeIcon = ({ isActive }) => (
  <svg className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    {isActive && <polyline points="9 22 9 12 15 12 15 22"></polyline>}
  </svg>
);

const MenuIcon = ({ isActive }) => (
  <svg className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    {isActive ? <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path> : <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>}
  </svg>
);

const CartIcon = ({ isActive }) => (
  <svg className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    {isActive && <path d="M16 11h-4M14 9v4" strokeWidth="2.5"></path>}
  </svg>
);

const ProfileIcon = ({ isActive }) => (
  <svg className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r={isActive ? '4' : '3'} fill={isActive ? 'currentColor' : 'none'}></circle>
  </svg>
);

// --- Main Footer Component ---

export default function Footer({ 
  activeTab = 'home', // Default active tab
  leftMargin = 16, 
  rightMargin = 16 
}) {
  const [active, setActive] = useState(activeTab);
  const router = useRouter();

  const navItems = [
    { id: 'home', label: 'Home', path: '/', icon: HomeIcon },
    { id: 'menu', label: 'Menu', path: '/menu', icon: MenuIcon },
    { id: 'cart', label: 'Cart', path: '/cart', icon: CartIcon },
    { id: 'profile', label: 'Profile', path: '/profile', icon: ProfileIcon },
  ];

  const handleNavClick = (item) => {
    setActive(item.id);
    router.push(item.path);
  };

  const activeIndex = navItems.findIndex(item => item.id === active);

  return (
    <>
      {/* This div creates a subtle gradient fade at the bottom of the screen */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/70 to-transparent pointer-events-none z-40" />
      
      <footer 
        className="fixed bottom-0 z-50"
        style={{
          left: `${leftMargin}px`,
          right: `${rightMargin}px`,
        }}
      >
        <div className="mb-4 max-w-sm mx-auto">
          {/* Main container with glassmorphism effect */}
          <div className="bg-white/80 backdrop-blur-lg border border-gray-200/50 shadow-2xl shadow-orange-900/10 rounded-full overflow-hidden">
            
            {/* Animated indicator bar */}
            <div className="relative h-1 bg-gray-200/50">
              <div 
                className="absolute top-0 h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500 ease-in-out shadow-md"
                style={{
                  width: `calc(100% / ${navItems.length})`, // Dynamic width
                  transform: `translateX(${activeIndex * 100}%)` // Slide effect
                }}
              />
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-around items-center py-2 px-2">
              {navItems.map((item) => {
                const isActive = active === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`relative flex flex-col items-center justify-center p-2 rounded-full transition-all duration-300 transform outline-none min-w-[70px] h-[60px] ${
                      isActive 
                        ? 'text-white bg-gradient-to-br from-orange-500 to-red-400 shadow-lg scale-105 -translate-y-1' 
                        : 'text-gray-500 hover:text-orange-600 hover:bg-orange-50/50 active:scale-95'
                    }`}
                  >
                    <div className={`transition-all duration-300 ${isActive ? 'drop-shadow-sm' : ''}`}>
                      <Icon isActive={isActive} />
                    </div>
                    
                    <span className={`text-xs font-bold mt-1 transition-all duration-300 ${
                      isActive ? 'text-white opacity-100' : 'text-gray-600 opacity-90'
                    }`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Safe area for devices with a home indicator (like iPhones) */}
        <div className="h-safe-area-inset-bottom bg-transparent" />
      </footer>
    </>
  );
}