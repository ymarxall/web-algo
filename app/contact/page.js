'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChevronRightIcon,
  PaperAirplaneIcon,
  UserIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Resend } from 'resend';

const resend = new Resend(re_94ZrFWs2_N2cnhYgsPZQM4FJqcnURG8iJ);

export default function Contact() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [scrolled, setScrolled] = useState(false);

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

  const contactMethods = [
    {
      icon: PaperAirplaneIcon, // Placeholder for Instagram icon
      title: 'Follow Instagram',
      description: 'Stay updated with our latest coffee creations',
      action: () => window.open('https://instagram.com/algokopi', '_blank'),
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: PaperAirplaneIcon,
      title: 'Pesan',
      description: 'Drop us a note and we’ll respond within hours',
      action: () => window.scrollTo({ top: document.getElementById('feedback-form').offsetTop, behavior: 'smooth' }),
      color: 'from-orange-400 to-orange-500'
    },
    {
      icon: MapPinIcon,
      title: 'Lokasi Kami',
      description: 'Visit us at our cozy coffee shop',
      action: () => window.open('https://maps.app.goo.gl/P8qUMMzop322ojBD8', '_blank'),
      color: 'from-orange-600 to-orange-700'
    }
  ];

  const features = [
    {
      icon: PaperAirplaneIcon,
      title: 'Quick Response',
      description: 'Get answers in under 24 hours'
    },
    {
      icon: PaperAirplaneIcon,
      title: 'Customer Love',
      description: 'We prioritize your satisfaction'
    },
    {
      icon: PaperAirplaneIcon,
      title: 'Personal Touch',
      description: 'Tailored support for every coffee lover'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.feedback.trim()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'yusufmarcelino013@gmail.com',
        subject: 'New Feedback from Algo Coffee',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0; border-radius: 10px;">
            <h2 style="color: #f97316; font-size: 24px; font-weight: bold;">New Feedback Submission</h2>
            <p style="color: #4b5563; font-size: 16px;">You have received new feedback from the Algo Coffee contact form:</p>
            <hr style="border-top: 1px solid #e5e7eb; margin: 10px 0;">
            <p style="color: #1f2937; font-size: 16px;"><strong>Name:</strong> ${formData.name}</p>
            <p style="color: #1f2937; font-size: 16px;"><strong>Email:</strong> ${formData.email}</p>
            <p style="color: #1f2937; font-size: 16px;"><strong>Feedback:</strong> ${formData.feedback}</p>
            <hr style="border-top: 1px solid #e5e7eb; margin: 10px 0;">
            <p style="color: #6b7280; font-size: 14px;">This email was sent via the Algo Coffee website.</p>
          </div>
        `
      });
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        feedback: ''
      });
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      setIsSubmitting(false);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

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
          <div className="mb-4">
            <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-orange-200 backdrop-blur-sm border border-orange-200 rounded-full px-6 py-2 mb-4">
              <PaperAirplaneIcon className="w-5 h-5 text-orange-600 mr-2" />
              <span className="text-orange-700 font-semibold">Connect with Us</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-3">
              <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent drop-shadow-2xl">
                LET’S TALK
              </span>
              <span className="block bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 bg-clip-text text-transparent -mt-2">
                COFFEE
              </span>
            </h1>
            <p className="text-base md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              Share your thoughts, ask about our <span className="text-orange-600 font-semibold">menu</span>, 
              or visit our <span className="text-orange-700 font-semibold">coffee shop</span> for a 
              <span className="text-orange-800 font-semibold">unique experience</span>.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm border border-orange-100 rounded-2xl p-4 hover:bg-orange-50 transition-all duration-300 group shadow-sm">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{<feature.icon className="w-8 h-8 text-orange-600" />}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button 
              onClick={() => window.scrollTo({ top: document.getElementById('feedback-form').offsetTop, behavior: 'smooth' })}
              className="group bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-3 px-10 rounded-2xl transition-all duration-300 shadow-2xl shadow-orange-400/25 hover:shadow-orange-500/40 hover:scale-105 flex items-center space-x-3"
            >
              <span className="text-base">Share Your Feedback</span>
              <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-12 px-6 bg-gradient-to-br from-white to-orange-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-center">
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group bg-white backdrop-blur-xl border border-orange-100 rounded-3xl overflow-hidden hover:border-orange-200 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl animate-pulse-once"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`bg-gradient-to-r ${method.color} p-8 relative`}>
                  <div className="absolute inset-0 opacity-20">
                    <div className="text-8xl absolute top-2 right-4">☕</div>
                  </div>
                  <div className="relative flex items-center">
                    <div className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-white">{method.title}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                  <button
                    onClick={method.action}
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <method.icon className="w-4 h-4" />
                    {method.title}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="py-12 px-6 bg-gradient-to-br from-white to-orange-50">
        <div className="max-w-4xl mx-auto">
          <div id="feedback-form" className="bg-white backdrop-blur-xl border border-orange-100 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="font-black text-3xl text-gray-900 mb-4 flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              <PaperAirplaneIcon className="w-8 h-8 text-orange-600 mr-3" />
              Share Your Feedback
            </h3>

            {submitStatus === 'success' && (
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-4 animate-bounce-in">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-bold text-orange-800">Feedback Sent!</p>
                    <p className="text-orange-600 text-sm">Thanks for sharing your thoughts.</p>
                  </div>
                </div>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-4 animate-bounce-in">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">!</span>
                  </div>
                  <div>
                    <p className="font-bold text-red-800">Submission Failed</p>
                    <p className="text-red-600 text-sm">Please fill all fields or try again later.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium text-sm mb-2">
                  Your Name *
                </label>
                <div className="relative">
                  <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-orange-50/50 hover:bg-orange-50"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium text-sm mb-2">
                  Email *
                </label>
                <div className="relative">
                  <PaperAirplaneIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-orange-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-orange-50/50 hover:bg-orange-50"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium text-sm mb-2">
                  Your Feedback *
                </label>
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-orange-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-orange-50/50 hover:bg-orange-50 resize-none"
                  placeholder="Tell us about your experience..."
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-lg hover:shadow-xl hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="w-5 h-5" />
                    Submit Feedback
                  </>
                )}
              </button>
            </div>
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

      <style jsx>{`
        .animate-pulse-once {
          animation: pulseOnce 0.5s ease-in-out;
        }
        @keyframes pulseOnce {
          0% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.5); }
          50% { box-shadow: 0 0 0 10px rgba(249, 115, 22, 0); }
          100% { box-shadow: 0 0 0 0 rgba(249, 115, 22, 0); }
        }
        .animate-bounce-in {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}