
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { COLLEGES } from '../constants';
import { pageTransition, containerVariants, itemVariants } from '../utils/animations';

const CollegeTests: React.FC = () => {
  const { collegeId } = useParams();
  const navigate = useNavigate();
  const { state } = useApp();
  
  const college = COLLEGES.find(c => c.id === collegeId);
  if (!college) return null;

  const unlockedIndex = state.user.unlockedLevels[collegeId || ''] ?? 0;

  return (
    <motion.div
      variants={pageTransition}
      initial="initial" animate="animate" exit="exit"
      className="max-w-4xl mx-auto px-6 pb-32 relative z-10"
      dir="rtl"
    >
      <header className="text-center mb-16">
        <div className="text-6xl mb-4">{college.icon}</div>
        <h1 className="text-5xl font-black text-slate-800 mb-6 drop-shadow-sm">
          {college.name}
        </h1>
        <p className="text-xl text-slate-600 font-bold max-w-2xl mx-auto">
          أكمل الاختبارات بالتتابع لتصل للاحتراف. كل اختبار يفتح لك آفاقاً جديدة!
        </p>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden" animate="show"
        className="flex flex-col items-center gap-12"
      >
        {college.tests.map((test, index) => {
          const isUnlocked = index <= unlockedIndex;
          const isNext = index === unlockedIndex;
          
          return (
            <motion.div 
              key={test.id}
              variants={itemVariants}
              className="w-full max-w-lg relative"
              style={{ x: index % 2 === 0 ? 40 : -40 }}
            >
              <div 
                onClick={() => isUnlocked && navigate(`/quiz/${collegeId}/${index}`)}
                className={`relative p-8 rounded-[3rem] border-4 transition-all flex items-center justify-between shadow-2xl cursor-pointer overflow-hidden ${
                  isUnlocked 
                    ? 'bg-white border-[#00c37a] hover:scale-105' 
                    : 'bg-slate-200 border-slate-300 opacity-70 grayscale cursor-not-allowed'
                }`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
                
                <div className="flex items-center gap-6">
                   <div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-4xl shadow-lg ${
                     isUnlocked ? 'bg-gradient-to-br from-[#00e28f] to-[#00c37a] text-white' : 'bg-slate-400 text-slate-200'
                   }`}>
                     {isUnlocked ? (index + 1) : '🔒'}
                   </div>
                   <div className="text-right">
                     <h3 className={`text-2xl font-black ${isUnlocked ? 'text-slate-800' : 'text-slate-500'}`}>
                       {test.title}
                     </h3>
                     <p className={`text-sm font-bold ${isUnlocked ? 'text-slate-500' : 'text-slate-400'}`}>
                       {isUnlocked ? 'اضغط للبدء' : 'أكمل الاختبار السابق للفتح'}
                     </p>
                   </div>
                </div>

                {isNext && isUnlocked && (
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="bg-[#00c37a] text-white text-[10px] font-black px-4 py-1 rounded-full animate-pulse"
                  >
                    تحدي نشط
                  </motion.div>
                )}
              </div>

              {index < college.tests.length - 1 && (
                <div className="absolute left-1/2 -bottom-12 w-1 h-12 border-l-4 border-dashed border-slate-300 -translate-x-1/2"></div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-20 text-center">
        <button onClick={() => navigate('/colleges')} className="btn-sanad-interactive px-10 py-4 rounded-2xl font-black flex items-center gap-3 mx-auto">
           <span>🏛️</span> العودة للكليات
        </button>
      </div>
    </motion.div>
  );
};

export default CollegeTests;
