'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react'; // Impor Suspense
import {
  ChevronLeftIcon,
  ShoppingBagIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  PrinterIcon,
  CheckCircleIcon,
  PaperAirplaneIcon,
  ReceiptPercentIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';
import {
  ShoppingBagIcon as ShoppingBagSolidIcon,
  UserIcon as UserSolidIcon,
  PhoneIcon as PhoneSolidIcon,
  MapPinIcon as MapPinSolidIcon,
} from '@heroicons/react/24/solid';

// Komponen terpisah untuk logika yang menggunakan useSearchParams
function StrukContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber] = useState(() => {
    const now = new Date();
    return `WA${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
  });

  const whatsappNumber = '62895331665379';

  // Handle scroll untuk header desktop
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load cartItems dari URL query atau localStorage
  useEffect(() => {
    const cartItemsString = searchParams.get('cartItems');
    if (cartItemsString) {
      try {
        const decodedItems = JSON.parse(decodeURIComponent(cartItemsString));
        console.log('struk.js: Decoded cartItems from URL:', JSON.stringify(decodedItems, null, 2));
        if (Array.isArray(decodedItems) && decodedItems.length > 0) {
          setCartItems(decodedItems);
          return;
        } else {
          console.warn('struk.js: Invalid or empty cartItems from URL:', decodedItems);
          setError('Tidak ada item valid di keranjang. Silakan kembali ke menu untuk menambahkan item.');
        }
      } catch (err) {
        console.error('struk.js: Error parsing cartItems from URL:', err);
        setError('Gagal memuat item keranjang. Silakan coba lagi.');
      }
    }

    const storedItems = localStorage.getItem('cartItems');
    console.log('struk.js: Stored cartItems from localStorage:', storedItems);
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
          setCartItems(parsedItems);
        } else {
          console.warn('struk.js: Invalid or empty cartItems from localStorage:', parsedItems);
          setError('Keranjang Anda kosong. Silakan kembali ke menu untuk menambahkan item.');
        }
      } catch (err) {
        console.error('struk.js: Error parsing stored cartItems:', err);
        setError('Gagal memuat item keranjang. Silakan coba lagi.');
        localStorage.removeItem('cartItems');
      }
    } else {
      setError('Keranjang Anda kosong. Silakan kembali ke menu untuk menambahkan item.');
    }
  }, [searchParams]);

  const navItems = [
    { icon: '🏠', path: '/', active: false, label: 'Home' },
    { icon: '📋', path: '/menu', active: true, label: 'Menu' },
    { icon: '📞', path: '/contact', active: false, label: 'Contact' },
  ];

  // Kalkulasi total
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
    return sum + price * item.quantity;
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryFee = 0;
  const serviceFee = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + deliveryFee + serviceFee;

  const formatPrice = (price) => {
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleInputChange = (field, value) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateWhatsAppMessage = () => {
    const itemsList = cartItems.map((item) => {
      const itemPrice = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
      return `• ${item.name} x${item.quantity} - ${formatPrice(itemPrice * item.quantity)}`;
    }).join('\n');

    const message = `🍵 *PESANAN ALGO COFFEE* 🍵
━━━━━━━━━━━━━━━━━━━━━━━

📋 *No. Pesanan:* ${orderNumber}
📅 *Tanggal:* ${getCurrentDateTime()}

👤 *INFORMASI PELANGGAN*
Nama: ${customerInfo.name}
No. HP: ${customerInfo.phone}
Alamat: ${customerInfo.address}
${customerInfo.notes ? `Catatan: ${customerInfo.notes}` : ''}

🛍️ *DETAIL PESANAN*
${itemsList}

💰 *RINCIAN PEMBAYARAN*
Subtotal: ${formatPrice(totalPrice)}
━━━━━━━━━━━━━━━━━━━━━━━
*TOTAL: ${formatPrice(finalTotal)}*

Terima kasih telah memesan di Algo Coffee! 🙏`;

    return encodeURIComponent(message);
  };

  const handleSubmitOrder = () => {
    if (!customerInfo.name.trim() || !customerInfo.phone.trim() || !customerInfo.address.trim()) {
      alert('Mohon lengkapi semua data yang diperlukan (Nama, No. HP, dan Alamat)');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const message = generateWhatsAppMessage();
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);

      setCartItems([]);
      localStorage.removeItem('cartItems');

      setTimeout(() => {
        router.push('/menu');
      }, 2000);
    }, 1500);
  };

  const handleGoBack = () => {
    router.push('/menu');
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-orange-500 to-red-600 overflow-hidden">
        {/* Dekorasi latar belakang */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-4 w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-4 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 left-1/3 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full animate-pulse"></div>
        </div>

        {/* Navigasi */}
        <div className="relative z-10">
          {/* Navigasi Desktop */}
          <div className="hidden md:flex items-center justify-between max-w-4xl mx-auto px-4 sm:px-6 py-6">
            <div className="text-white text-xl sm:text-2xl font-bold">Algo Coffee</div>
            <div className="flex items-center gap-2">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => router.push(item.path)}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm sm:text-base ${
                    item.active ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Header Mobile */}
          <div className="md:hidden flex items-center justify-between max-w-full mx-auto px-4 py-4">
            <button
              onClick={handleGoBack}
              className="p-2 bg-white/20 rounded-xl backdrop-blur-sm hover:bg-white/30 transition-all"
            >
              <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            <div className="text-center">
              <h1 className="text-white text-lg sm:text-xl font-bold">Order Receipt</h1>
            </div>
            <div className="w-8 sm:w-10"></div>
          </div>

          {/* Informasi Header */}
          <div className="max-w-full mx-auto px-4 sm:px-6 py-4">
            <div className="text-center text-white">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-3xl mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                <ReceiptPercentIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">Lengkapi Pesanan Anda</h2>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                Tinjau detail pesanan Anda dan berikan informasi pengiriman untuk menyelesaikan pembelian.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Header untuk Desktop */}
      <div
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 bg-white shadow-lg transition-transform duration-300 ${
          scrolled ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="text-orange-600 text-xl sm:text-2xl font-bold">Algo Coffee</div>
          <div className="flex items-center gap-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => router.push(item.path)}
                className={`px-3 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm sm:text-base ${
                  item.active ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-full sm:max-w-4xl mx-auto">
          {error && cartItems.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 text-center w-full">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBagIcon className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Keranjang Kosong</h3>
              <p className="text-red-500 text-sm sm:text-base mb-4">{error}</p>
              <button
                onClick={handleGoBack}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-2xl font-medium transition-all transform hover:scale-105 w-full sm:w-auto"
              >
                Kembali ke Menu
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
              {/* Kolom Kiri - Ringkasan Pesanan */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6 w-full">
                {/* Kartu Detail Pesanan */}
                <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-lg border border-gray-100 w-full">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="font-bold text-gray-800 text-base sm:text-lg flex items-center">
                      <ShoppingBagSolidIcon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mr-2" />
                      Detail Pesanan
                    </h3>
                    <div className="bg-orange-100 text-orange-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {totalItems} item{totalItems !== 1 ? 's' : ''}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {cartItems.map((item, index) => {
                      const itemPrice = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
                      return (
                        <div
                          key={`${item.id}-${index}`}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100"
                        >
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200 flex-shrink-0">
                            <img
                              src={item.image || '/api/placeholder/112/112'}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-800 text-sm sm:text-base mb-1">{item.name}</h4>
                            <p className="text-gray-600 text-xs sm:text-sm">{formatPrice(itemPrice)} × {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-orange-600 font-bold text-base sm:text-lg">
                              {formatPrice(itemPrice * item.quantity)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Ringkasan Pesanan */}
                <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-lg border border-gray-100 w-full">
                  <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-4 flex items-center">
                    <CreditCardIcon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mr-2" />
                    Ringkasan Pesanan
                  </h3>

                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600 text-xs sm:text-sm">
                      <span>Subtotal ({totalItems} items)</span>
                      <span className="font-medium">{formatPrice(totalPrice)}</span>
                    </div>

                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="font-bold text-base sm:text-lg text-gray-800">Total</span>
                        <span className="font-bold text-base sm:text-xl text-orange-600">{formatPrice(finalTotal)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informasi Pesanan */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-4 sm:p-6 border border-blue-100 w-full">
                  <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-3 flex items-center">
                    <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mr-2" />
                    Informasi Pesanan
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-3 sm:p-4 rounded-2xl border border-blue-200">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Nomor Pesanan</p>
                      <p className="font-bold text-blue-700 text-xs sm:text-sm">{orderNumber}</p>
                    </div>
                    <div className="bg-white p-3 sm:p-4 rounded-2xl border border-blue-200">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Waktu Pesanan</p>
                      <p className="font-bold text-blue-700 text-xs sm:text-sm">{getCurrentDateTime()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan - Informasi Pelanggan */}
              <div className="space-y-4 sm:space-y-6 w-full">
                <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-lg border border-gray-100 h-fit w-full">
                  <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-4 flex items-center">
                    <UserSolidIcon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 mr-2" />
                    Informasi Pelanggan
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium text-xs sm:text-sm mb-2">
                        Nama Lengkap *
                      </label>
                      <div className="relative">
                        <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={customerInfo.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-xs sm:text-sm"
                          placeholder="Masukkan nama lengkap Anda"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium text-xs sm:text-sm mb-2">
                        Nomor WhatsApp *
                      </label>
                      <div className="relative">
                        <PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          value={customerInfo.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                          className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-xs sm:text-sm"
                          placeholder="08xxxxxxxxxx"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium text-xs sm:text-sm mb-2">
                        Alamat Pengiriman *
                      </label>
                      <div className="relative">
                        <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 top-3" />
                        <textarea
                          value={customerInfo.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          required
                          rows={3}
                          className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none text-xs sm:text-sm"
                          placeholder="Masukkan alamat lengkap Anda"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium text-xs sm:text-sm mb-2">
                        Catatan Tambahan (Opsional)
                      </label>
                      <textarea
                        value={customerInfo.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        rows={2}
                        className="w-full px-4 py-2 sm:py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none text-xs sm:text-sm"
                        placeholder="Permintaan khusus atau catatan..."
                      />
                    </div>

                    <button
                      onClick={handleSubmitOrder}
                      disabled={isSubmitting || !customerInfo.name.trim() || !customerInfo.phone.trim() || !customerInfo.address.trim()}
                      className={`w-full py-3 sm:py-4 rounded-2xl font-semibold text-white transition-all text-xs sm:text-sm ${
                        isSubmitting || !customerInfo.name.trim() || !customerInfo.phone.trim() || !customerInfo.address.trim()
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:transform active:scale-95 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Sedang Diproses...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.687" />
                          </svg>
                          Pesan via WhatsApp
                        </div>
                      )}
                    </button>

                    <p className="text-center text-xs sm:text-sm text-gray-500">
                      Anda akan diarahkan ke WhatsApp dengan detail pesanan Anda
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spasi bawah untuk navigasi mobile */}
      <div className="md:hidden h-16 sm:h-20"></div>

      {/* Navigasi Bawah Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg w-full">
        <div className="flex justify-between px-2 sm:px-4 py-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center gap-1 py-2 px-2 sm:px-3 rounded-lg transition-all duration-300 flex-1 ${
                item.active ? 'bg-orange-100 text-orange-600' : 'text-gray-600'
              }`}
            >
              <span className="text-lg sm:text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Komponen utama yang membungkus StrukContent dengan Suspense
export default function Struk() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">Memuat...</div>}>
      <StrukContent />
    </Suspense>
  );
}