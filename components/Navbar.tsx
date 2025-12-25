
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { to: '/journey/academic', label: 'رحلتي الأكاديمية' },
    { to: '/journey/values', label: 'رحلتي القيمية' },
    { to: '/journey/financial', label: 'رحلتي في المنح والحلول المالية' },
    { to: '/journey/campus', label: 'رحلتي في الحياة الجامعية' },
    { to: '/profile', label: 'الملف الشخصي' },
  ];

  const linkBaseClass = "relative px-3 py-2 font-bold text-sm xl:text-base whitespace-nowrap transition-all duration-300 rounded-xl";
  const linkInactiveClass = "text-slate-700 hover:text-[#00c37a]";
  const linkActiveClass = "text-[#00c37a] bg-white/50 shadow-sm border border-white/20";

  return (
    <nav 
      dir="rtl" 
      className={`w-full fixed top-0 left-0 right-0 z-[150] transition-all duration-500 border-b border-white/20 shadow-md ${
        isScrolled 
          ? 'py-3 bg-white/40 backdrop-blur-2xl' 
          : 'py-5 bg-white/30 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
        {/* Right Side: Logo */}
        <div className="flex items-center shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-l from-[#00e28f] to-[#00c37a] p-2 rounded-xl text-white shadow-sm group-hover:rotate-12 transition-transform">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
              </svg>
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tight hidden sm:block">منصة سند التعليمية</span>
          </Link>
        </div>

        {/* Center Section: Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center justify-center flex-1 gap-1 mx-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`${linkBaseClass} ${isActive ? linkActiveClass : linkInactiveClass}`}
              >
                {item.label}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-l from-[#00e28f] to-[#00c37a] scale-x-0 transition-transform origin-right"
                  initial={false}
                  animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
                />
              </Link>
            );
          })}
        </div>

        {/* Left Side: AI Button (Desktop) */}
        <div className="hidden lg:block shrink-0">
          <Link 
            to="/journey/ai" 
            className="bg-[#00c37a] text-slate-900 px-6 py-3 rounded-2xl font-black shadow-lg flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all"
          >
            <span className="text-lg">🤖</span>
            <span>تحدث مع سند AI</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-slate-800 p-2 focus:outline-none bg-white/40 rounded-xl flex items-center gap-2 font-black"
          >
            <span className="text-sm">القائمة</span>
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Full-Screen Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 h-screen w-full bg-[#fcf8f3] z-[210] p-6 flex flex-col shadow-2xl overflow-y-auto"
          >
            {/* Header Area inside dropdown */}
            <div className="flex justify-between items-center mb-10 bg-white p-5 rounded-[2.5rem] shadow-sm border border-slate-100">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
                <div className="bg-[#00c37a] p-2 rounded-lg text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" /></svg>
                </div>
                <span className="font-black text-slate-800">منصة سند</span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="bg-slate-100 text-slate-500 px-5 py-2.5 rounded-full flex items-center gap-2 font-black active:scale-90 transition-all border border-slate-200"
              >
                <span>إغلاق</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Menu Links List */}
            <div className="flex flex-col gap-4">
              <div className="px-2 mb-2 flex items-center gap-2">
                 <div className="w-1 h-5 bg-[#00c37a] rounded-full"></div>
                 <span className="text-slate-400 font-black text-sm tracking-widest">أقسام الرحلة</span>
              </div>
              
              {menuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-black py-5 px-7 rounded-[2rem] transition-all border-2 flex items-center justify-between group ${
                    location.pathname === item.to 
                      ? 'bg-[#00c37a] text-white border-[#00c37a] shadow-xl' 
                      : 'bg-white text-slate-700 border-slate-50 shadow-md hover:border-[#00c37a]/20'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className={`text-xl ${location.pathname === item.to ? 'opacity-100' : 'opacity-0'}`}>⭐</span>
                </Link>
              ))}

              {/* Action Buttons Section */}
              <div className="mt-8 px-2 flex items-center gap-2">
                 <div className="w-1 h-5 bg-amber-400 rounded-full"></div>
                 <span className="text-slate-400 font-black text-sm tracking-widest">سند معك</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Link 
                  to="/journey/ai"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-[#00c37a] text-slate-900 p-6 rounded-[2rem] font-black text-center shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all"
                >
                  <span className="text-xl">🤖</span>
                  <span>تحدث مع سند AI</span>
                </Link>

                <div className="grid grid-cols-2 gap-4">
                  <Link 
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-white text-slate-700 p-6 rounded-[2rem] font-black text-center shadow-md border-2 border-slate-50 flex flex-col items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <span className="text-2xl">👤</span>
                    <span className="text-sm">ملفي الشخصي</span>
                  </Link>

                  <Link 
                    to="/journey/services"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-white text-slate-700 p-6 rounded-[2rem] font-black text-center shadow-md border-2 border-slate-50 flex flex-col items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <span className="text-2xl">🛠️</span>
                    <span className="text-sm">خدماتي</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Footer inside menu */}
            <div className="mt-12 pb-10 flex flex-col items-center gap-4 text-center">
               <div className="w-full h-px bg-slate-200"></div>
               <p className="text-slate-400 text-xs font-bold leading-relaxed">
                  منصة سند التعليمية - رحلتك نحو القمة 🇸🇦<br/>
                  جميع الحقوق محفوظة © ٢٠٢٥
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
