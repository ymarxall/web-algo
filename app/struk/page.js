
'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import {
  ChevronLeftIcon,
  ShoppingBagIcon,
  UserIcon,
  PhoneIcon,
  TableCellsIcon,
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
  TableCellsIcon as TableCellsSolidIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';

function StrukContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    tableNumber: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber] = useState(() => {
    const now = new Date();
    return `WA${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
  });

  const whatsappNumber = '62895331665379';

  // Handle scroll for sticky desktop header
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load cart items from URL query or localStorage
  useEffect(() => {
    const cartItemsString = searchParams.get('cartItems');
    if (cartItemsString) {
      try {
        const decodedItems = JSON.parse(decodeURIComponent(cartItemsString));
        console.log('Struk.jsx: Decoded cartItems from URL:', JSON.stringify(decodedItems, null, 2));
        if (Array.isArray(decodedItems) && decodedItems.length > 0) {
          setCartItems(decodedItems);
          return;
        } else {
          console.warn('Struk.jsx: Invalid or empty cartItems from URL:', decodedItems);
          setError('Tidak ada item valid di keranjang. Silakan kembali ke menu untuk menambahkan item.');
        }
      } catch (err) {
        console.error('Struk.jsx: Error parsing cartItems from URL:', err);
        setError('Gagal memuat item keranjang. Silakan coba lagi.');
      }
    }

    const storedItems = localStorage.getItem('cartItems');
    console.log('Struk.jsx: Stored cartItems from localStorage:', storedItems);
    if (storedItems) {
      try {
        const parsedItems = JSON.parse(storedItems);
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
          setCartItems(parsedItems);
        } else {
          console.warn('Struk.jsx: Invalid or empty cartItems from localStorage:', parsedItems);
          setError('Keranjang Anda kosong. Silakan kembali ke menu untuk menambahkan item.');
        }
      } catch (err) {
        console.error('Struk.jsx: Error parsing stored cartItems:', err);
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

  // Calculate total price
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
Nomor Meja: ${customerInfo.tableNumber}
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
    if (!customerInfo.name.trim() || !customerInfo.phone.trim() || !customerInfo.tableNumber.trim()) {
      alert('Mohon lengkapi semua data yang diperlukan (Nama, No. HP, dan Nomor Meja)');
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
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-orange-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-100/40 to-orange-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-50/20 to-orange-100/20 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>

        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-orange-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-orange-500 rounded-full animate-bounce opacity-80" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-40 w-1.5 h-1.5 bg-orange-300 rounded-full animate-bounce opacity-70" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-orange-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Sticky Header for Desktop (appears on scroll) */}
      <div
        className={`hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl shadow-lg border-b border-orange-100 transition-transform duration-300 ${
          scrolled ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto p-4">
          <Image src="/algo.png" alt="Algo Coffee Logo" width={150} height={150} />
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
            <Image src="/algo.png" alt="Algo Coffee Logo" width={150} height={150} />

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
          <div className="mb-4">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-orange-200 backdrop-blur-sm border border-orange-200 rounded-full px-6 py-2 mb-4">
              <ReceiptPercentIcon className="w-5 h-5 text-orange-600 mr-2" />
              <span className="text-orange-700 font-semibold">Finalize Your Order</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-3">
              <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent drop-shadow-2xl">
                COMPLETE
              </span>
              <span className="block bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent -mt-2">
                YOUR ORDER
              </span>
            </h1>
            <p className="text-base md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              Review your <span className="text-orange-600 font-semibold">cart</span>, add your{' '}
              <span className="text-orange-700 font-semibold">details</span>, and submit via{' '}
              <span className="text-orange-800 font-semibold">WhatsApp</span> to enjoy your coffee!
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 bg-gradient-to-br from-white to-orange-50">
        <div className="max-w-7xl mx-auto">
          {error && cartItems.length === 0 ? (
            <div className="bg-white backdrop-blur-xl rounded-3xl shadow-xl border border-orange-100 p-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShoppingBagIcon className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Keranjang Kosong
              </h3>
              <p className="text-gray-600 text-base mb-4">{error}</p>
              <button
                onClick={handleGoBack}
                className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white py-3 px-8 rounded-2xl font-bold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Kembali ke Menu
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Order Details, Summary, and Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Order Details Card */}
                <div className="bg-white backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 animate-pulse-once">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-black text-3xl text-gray-900 flex items-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      <ShoppingBagSolidIcon className="w-8 h-8 text-orange-600 mr-3" />
                      Detail Pesanan
                    </h3>
                    <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                      {totalItems} item{totalItems !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {cartItems.map((item, index) => {
                      const itemPrice = parseInt(item.price.replace(/[^\d]/g, '')) || 0;
                      return (
                        <div
                          key={`${item.id}-${index}`}
                          className="flex items-center gap-4 p-4 bg-orange-50/50 rounded-2xl border border-orange-100 hover:bg-orange-100 transition-all duration-200"
                        >
                          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-orange-200 flex-shrink-0">
                            <img
                              src={item.image || '/api/placeholder/112/112'}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-base mb-1">{item.name}</h4>
                            <p className="text-gray-600 text-sm">{formatPrice(itemPrice)} × {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-orange-600 font-bold text-lg">{formatPrice(itemPrice * item.quantity)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Summary and Order Info Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Order Summary Card */}
                  <div className="bg-white backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 animate-pulse-once">
                    <h3 className="font-black text-2xl text-gray-900 mb-3 flex items-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      <CreditCardIcon className="w-6 h-6 text-orange-600 mr-2" />
                      Ringkasan Pesanan
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-600 text-xs">
                        <span>Subtotal ({totalItems} items)</span>
                        <span className="font-medium">{formatPrice(totalPrice)}</span>
                      </div>
                      <div className="border-t border-orange-200 pt-2">
                        <div className="flex justify-between text-xs">
                          <span className="font-black text-base text-gray-900">Total</span>
                          <span className="font-black text-lg bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                            {formatPrice(finalTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Info Card */}
                  <div className="bg-white backdrop-blur-xl rounded-3xl p-4 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 animate-pulse-once">
                    <h3 className="font-black text-2xl text-gray-900 mb-3 flex items-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      <ClockIcon className="w-6 h-6 text-orange-600 mr-2" />
                      Informasi Pesanan
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="bg-orange-50/50 p-3 rounded-2xl border border-orange-200">
                        <p className="text-xs text-gray-600 mb-1">Nomor Pesanan</p>
                        <p className="font-bold text-orange-700 text-xs">{orderNumber}</p>
                      </div>
                      <div className="bg-orange-50/50 p-3 rounded-2xl border border-orange-200">
                        <p className="text-xs text-gray-600 mb-1">Waktu Pesanan</p>
                        <p className="font-bold text-orange-700 text-xs">{getCurrentDateTime()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Customer Info */}
              <div className="space-y-6">
                <div className="bg-white backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 animate-pulse-once">
                  <h3 className="font-black text-3xl text-gray-900 mb-4 flex items-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    <UserSolidIcon className="w-8 h-8 text-orange-600 mr-3" />
                    Informasi Pelanggan
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium text-sm mb-2">Nama Lengkap *</label>
                      <div className="relative">
                        <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={customerInfo.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-orange-50/50 hover:bg-orange-50 text-sm"
                          placeholder="Masukkan nama lengkap Anda"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium text-sm mb-2">Nomor WhatsApp *</label>
                      <div className="relative">
                        <PhoneIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          value={customerInfo.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-orange-50/50 hover:bg-orange-50 text-sm"
                          placeholder="08xxxxxxxxxx"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium text-sm mb-2">Nomor Meja *</label>
                      <div className="relative">
                        <TableCellsIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={customerInfo.tableNumber}
                          onChange={(e) => handleInputChange('tableNumber', e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-orange-50/50 hover:bg-orange-50 text-sm"
                          placeholder="Masukkan nomor meja Anda"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium text-sm mb-2">Catatan Tambahan (Opsional)</label>
                      <textarea
                        value={customerInfo.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3 border border-orange-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-orange-50/50 hover:bg-orange-50 resize-none text-sm"
                        placeholder="Permintaan khusus atau catatan..."
                      />
                    </div>

                    <button
                      onClick={handleSubmitOrder}
                      disabled={isSubmitting || !customerInfo.name.trim() || !customerInfo.phone.trim() || !customerInfo.tableNumber.trim()}
                      className={`w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                        isSubmitting || !customerInfo.name.trim() || !customerInfo.phone.trim() || !customerInfo.tableNumber.trim()
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-lg hover:shadow-xl hover:scale-105'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Sedang Diproses...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.687" />
                          </svg>
                          Pesan via WhatsApp
                        </>
                      )}
                    </button>
                    <p className="text-center text-sm text-gray-600 mt-2">Anda akan diarahkan ke WhatsApp dengan detail pesanan Anda</p>
                  </div>
                </div>
              </div>
            </div>
          )}
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
                item.active ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg' : 'text-gray-600 hover:text-gray-900 hover:bg-orange-50'
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
        .animate-pulse-once {
          animation: pulseOnce 0.5s ease-in-out;
        }
        @keyframes pulseOnce {
          0% {
            box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.5);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(249, 115, 22, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(249, 115, 22, 0);
          }
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
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default function Struk() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white">Memuat...</div>}>
      <StrukContent />
    </Suspense>
  );
}