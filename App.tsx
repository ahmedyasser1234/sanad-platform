
import React from 'react';
import { MemoryRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Colleges from './pages/Colleges';
import CollegeTests from './pages/CollegeTests';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Profile from './pages/Profile';
import JourneyDetail from './pages/Journey';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isQuizPage = location.pathname.startsWith('/quiz');

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {!isQuizPage && <Navbar />}
      
      {/* تم إضافة pt-32 للموبايل و pt-44 للشاشات الكبيرة لضمان ابتعاد المحتوى عن الـ Navbar */}
      <main className={`flex-1 relative z-10 ${!isQuizPage ? 'pt-32 md:pt-44' : ''}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/journey/:journeyId" element={<JourneyDetail />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/college/:collegeId/tests" element={<CollegeTests />} />
            <Route path="/quiz/:collegeId/:testIndex" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      {!isQuizPage && (
        <footer 
          dir="rtl"
          className="mt-auto py-16 backdrop-blur-[16px] bg-white/25 border-t border-white/20 shadow-[inset_0_2px_8px_rgba(255,255,255,0.3)] relative overflow-hidden"
        >
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00c37a]/5 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-right">
              
              {/* Column 1: Branding */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-l from-[#00e28f] to-[#00c37a] p-2 rounded-xl text-white shadow-sm">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-black text-slate-800 tracking-tight">منصة سند</span>
                </div>
                <p className="text-slate-600 font-bold text-sm leading-relaxed">
                  نساندك في كل خطوة من رحلتك الجامعية.. من اختيار التخصص حتى التميز والاحتراف.
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2 space-x-reverse">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs">🇸🇦</div>
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs">🎓</div>
                  </div>
                  <span className="text-slate-400 text-xs font-black">رؤية ٢٠٣٠</span>
                </div>
              </div>

              {/* Column 2: Main Journeys */}
              <div className="flex flex-col gap-5">
                <h4 className="text-slate-800 font-black text-lg border-r-4 border-[#00c37a] pr-3 mb-2">رحلاتي التعليمية</h4>
                <nav className="flex flex-col gap-4">
                  <Link to="/journey/academic" className="text-slate-600 font-bold hover:text-[#00c37a] transition-all flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#00c37a] transition-all"></span>
                    رحلتي الأكاديمية
                  </Link>
                  <Link to="/journey/values" className="text-slate-600 font-bold hover:text-[#00c37a] transition-all flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#00c37a] transition-all"></span>
                    رحلتي القيمية
                  </Link>
                  <Link to="/journey/financial" className="text-slate-600 font-bold hover:text-[#00c37a] transition-all flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#00c37a] transition-all"></span>
                    المنح والحلول المالية
                  </Link>
                  <Link to="/journey/campus" className="text-slate-600 font-bold hover:text-[#00c37a] transition-all flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#00c37a] transition-all"></span>
                    الحياة الجامعية
                  </Link>
                </nav>
              </div>

              {/* Column 3: Navigation */}
              <div className="flex flex-col gap-5">
                <h4 className="text-slate-800 font-black text-lg border-r-4 border-[#00c37a] pr-3 mb-2">روابط سريعة</h4>
                <nav className="flex flex-col gap-4">
                  <Link to="/colleges" className="text-slate-600 font-bold hover:text-[#00c37a] transition-all flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#00c37a] transition-all"></span>
                    استكشاف الكليات
                  </Link>
                  <Link to="/profile" className="text-slate-600 font-bold hover:text-[#00c37a] transition-all flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#00c37a] transition-all"></span>
                    ملفي الشخصي
                  </Link>
                  <Link to="/journey/ai" className="text-slate-600 font-bold hover:text-[#00c37a] transition-all flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#00c37a] transition-all"></span>
                    سند الذكاء الاصطناعي
                  </Link>
                </nav>
              </div>

              {/* Column 4: Support & Legal */}
              <div className="flex flex-col gap-5">
                <h4 className="text-slate-800 font-black text-lg border-r-4 border-[#00c37a] pr-3 mb-2">الدعم والخصوصية</h4>
                <nav className="flex flex-col gap-4">
                  <a href="#" className="text-slate-600 font-bold hover:text-[#00c37a] transition-all flex items-center gap-2 group">
                    <span className="text-lg">🛠️</span>
                    الدعم الفني
                  </a>
                  <a href="#" className="text-slate-600 font-bold hover:text-[#00c37a] transition-all flex items-center gap-2 group">
                    <span className="text-lg">📞</span>
                    تواصل معنا
                  </a>
                  <a href="#" className="text-slate-600 font-bold hover:text-[#00c37a] transition-all flex items-center gap-2 group">
                    <span className="text-lg">🛡️</span>
                    سياسة الخصوصية
                  </a>
                </nav>
              </div>

            </div>

            <div className="mt-16 pt-8 border-t border-slate-900/5 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
              <div className="flex flex-col gap-1">
                <p className="text-slate-500 text-xs font-black tracking-widest">
                  جميع الحقوق محفوظة لمنصة سند التعليمية © ٢٠٢٥
                </p>
                <p className="text-slate-400 text-[10px] font-bold">بنيت بكل فخر لطلاب العلم في وطننا المعطاء 🇸🇦</p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/50 border border-white/50 flex items-center justify-center text-slate-400 hover:text-[#00c37a] cursor-pointer transition-all hover:scale-110">𝕏</div>
                <div className="w-10 h-10 rounded-xl bg-white/50 border border-white/50 flex items-center justify-center text-slate-400 hover:text-[#00c37a] cursor-pointer transition-all hover:scale-110">📸</div>
                <div className="w-10 h-10 rounded-xl bg-white/50 border border-white/50 flex items-center justify-center text-slate-400 hover:text-[#00c37a] cursor-pointer transition-all hover:scale-110">💼</div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
