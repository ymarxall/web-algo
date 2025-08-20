
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeftIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  PaperAirplaneIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { 
  PhoneIcon as PhoneSolidIcon,
  EnvelopeIcon as EnvelopeSolidIcon,
  MapPinIcon as MapPinSolidIcon,
  ClockIcon as ClockSolidIcon
} from '@heroicons/react/24/solid';

export default function Contact() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
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

  const navItems = [
    { icon: '🏠', path: '/', active: false, label: 'Home' },
    { icon: '📋', path: '/menu', active: false, label: 'Menu' },
    { icon: '📞', path: '/contact', active: true, label: 'Contact' }
  ];

  const contactInfo = [
    {
      icon: PhoneSolidIcon,
      title: 'Call Us',
      value: '+62 853-4184-7801',
      subtitle: 'Ready to serve you',
      action: 'tel:+6285341847801',
      color: 'bg-green-100 text-green-600',
      description: 'Direct phone for orders'
    },
    {
      icon: EnvelopeSolidIcon,
      title: 'Email Us',
      value: 'hello@algocoffee.com',
      subtitle: 'Send us a message',
      action: 'mailto:hello@algocoffee.com',
      color: 'bg-blue-100 text-blue-600',
      description: 'For questions and suggestions'
    },
    {
      icon: MapPinSolidIcon,
      title: 'Visit Us',
      value: 'Jl. Mon. Emmy Saelan III No.70, Karunrung, Kec. Rappocini, Kota Makassar, Sulawesi Selatan',
      subtitle: 'Algo Coffee & Snacks',
      action: 'https://maps.app.goo.gl/eRGga2qYgDq7iGNk7',
      color: 'bg-red-100 text-red-600',
      description: 'Easy to find and accessible'
    }
  ];

  const openingHours = [
    { day: 'Monday - Sunday', time: '10:00 - 00:00', isToday: true }
  ];

  const isCurrentlyOpen = () => {
    const now = currentTime;
    const hour = now.getHours();
    return hour >= 10 && hour < 24;
  };

  const features = [
    {
      icon: SparklesIcon,
      title: 'Fast Service',
      description: 'Response within 24 hours'
    },
    {
      icon: HeartIcon,
      title: 'Friendly Service',
      description: 'Experienced team'
    },
    {
      icon: StarIcon,
      title: 'Best Quality',
      description: 'Customer satisfaction priority'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                  onClick={() => router.push(item.path)}
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
              <h1 className="text-white text-2xl font-bold mb-1 tracking-tight">Contact Us</h1>
              <p className="text-white/80 text-sm">Get in touch with us</p>
            </div>
          </div>

          {/* Header Info */}
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-white/20 rounded-3xl mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                <ChatBubbleLeftRightIcon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Let's Chat!</h2>
              <p className="text-white/90 text-base leading-relaxed max-w-md mx-auto">
                We'd love to hear from you. Contact us for questions, suggestions, or just to share your coffee stories.
              </p>
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

      <div className="px-4 md:px-8 lg:px-16 xl:px-24 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`w-14 h-14 ${info.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <info.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{info.title}</h3>
                <p className="text-gray-900 font-semibold text-base mb-1">{info.value}</p>
                <p className="text-gray-600 text-sm mb-2">{info.subtitle}</p>
                <p className="text-gray-500 text-sm mb-4">{info.description}</p>
                {info.action && (
                  <button
                    onClick={() => window.open(info.action, '_blank')}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
                  >
                    {info.title.includes('Call') ? (
                      <>
                        <PhoneIcon className="w-4 h-4" />
                        Call Now
                      </>
                    ) : info.title.includes('Email') ? (
                      <>
                        <EnvelopeIcon className="w-4 h-4" />
                        Send Email
                      </>
                    ) : (
                      <>
                        <MapPinIcon className="w-4 h-4" />
                        Open Map
                      </>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Operating Hours */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800 text-lg flex items-center">
                    <ClockSolidIcon className="w-6 h-6 text-orange-500 mr-2" />
                    Opening Hours
                  </h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isCurrentlyOpen() 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {isCurrentlyOpen() ? '🟢 Open' : '🔴 Closed'}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {openingHours.map((schedule, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-4 bg-orange-50 border border-orange-200 rounded-xl"
                    >
                      <span className="font-medium text-orange-800">
                        {schedule.day}
                      </span>
                      <span className="font-bold text-orange-600">
                        {schedule.time}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-blue-800 text-sm font-medium flex items-center">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    Current time: {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>

              {/* Instagram Section */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="relative z-10">
                  <h3 className="font-bold text-lg mb-2 flex items-center">
                    <span className="text-2xl mr-3">📱</span>
                    Follow Our Instagram
                  </h3>
          
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-lg">@algokopi</p>
                      <p className="text-white/80 text-sm">333 followers</p>
                    </div>
                    <button
                      onClick={() => window.open('https://instagram.com/algocoffee', '_blank')}
                      className="bg-white text-purple-600 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      Follow
                    </button>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <h3 className="font-bold text-gray-800 text-lg mb-4 text-center">
                  Why Choose Algo Coffee?
                </h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-2xl">
                      <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mr-4">
                        <feature.icon className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 h-fit">
              <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
                <PaperAirplaneIcon className="w-6 h-6 text-orange-500 mr-2" />
                Send Message
              </h3>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-green-800">Message sent successfully!</p>
                      <p className="text-green-600 text-sm">We'll get back to you soon.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium text-sm mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium text-sm mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <PhoneIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        placeholder="+62 812-3456-7890"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium text-sm mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium text-sm mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Choose subject</option>
                    <option value="general">General Question</option>
                    <option value="feedback">Feedback & Suggestion</option>
                    <option value="complaint">Complaint</option>
                    <option value="reservation">Reservation</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium text-sm mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us what's on your mind..."
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-2xl font-semibold text-white transition-all ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:transform active:scale-95 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                      Send Message
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-3xl p-6 mt-8 shadow-lg border border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center">
              <MapPinIcon className="w-6 h-6 text-orange-500 mr-2" />
              Our Location
            </h3>
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 h-64 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-200/50 to-orange-300/50"></div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MapPinIcon className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="font-bold text-gray-800 text-lg mb-1">Algo Coffee</h4>
                <p className="text-gray-700 mb-1 text-sm px-4">Jl. Mon. Emmy Saelan III No.70, Karunrung</p>
                <p className="text-gray-700 mb-4 text-sm">Kec. Rappocini, Kota Makassar, Sulawesi Selatan</p>
                <button
                  onClick={() => window.open('https://maps.app.goo.gl/eRGga2qYgDq7iGNk7', '_blank')}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Open in Google Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing for mobile navigation */}
      <div className="md:hidden h-20"></div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around py-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.path)}
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
    </div>
  );
}
