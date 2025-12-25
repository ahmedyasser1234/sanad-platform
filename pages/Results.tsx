
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { pageTransition, popIn } from '../utils/animations';
import CharacterMascot from '../components/CharacterMascot';
import { speakText } from '../utils/audio';
import { MascotState } from '../types';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { onTestComplete } = useApp();
  
  const quizData = location.state as { collegeId: string; testIndex: number; score: number; total: number } | null;
  
  const [mascotState, setMascotState] = useState<MascotState>('idle');
  const [displayedText, setDisplayedText] = useState("");
  const [isTalking, setIsTalking] = useState(false);
  const [didPass, setDidPass] = useState(false);
  const speechIntervalRef = useRef<number | null>(null);

  const score = quizData?.score ?? 0;
  const total = quizData?.total ?? 5;
  const percentage = Math.round((score / total) * 100);
  const isPerfect = score === total;

  useEffect(() => {
    if (quizData) {
      const passed = onTestComplete(quizData.collegeId, quizData.testIndex, quizData.score, quizData.total);
      setDidPass(passed);
    }
  }, []);

  const syncSpeech = async (text: string) => {
    if (isTalking) return;
    setIsTalking(true);
    setMascotState(didPass ? 'celebrate' : 'happy');
    
    try {
      const { duration } = await speakText(text);
      const words = text.trim().split(/\s+/);
      const delayPerWord = (Math.max(duration, 1.5) * 1000) / words.length;
      
      let currentWordIndex = 0;
      let accumulatedText = "";
      
      if (speechIntervalRef.current) clearInterval(speechIntervalRef.current);
      
      speechIntervalRef.current = window.setInterval(() => {
        if (currentWordIndex < words.length) {
          accumulatedText += (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex];
          setDisplayedText(accumulatedText);
          currentWordIndex++;
        } else {
          if (speechIntervalRef.current) clearInterval(speechIntervalRef.current);
          setMascotState('idle');
          setIsTalking(false);
        }
      }, delayPerWord);
    } catch (e) {
      setDisplayedText(text);
      setMascotState('idle');
      setIsTalking(false);
    }
  };

  useEffect(() => {
    const feedbackText = isPerfect
      ? `كفووو يا بطل! نتيجة كاملة تبيض الوجه، أنت جاهز للمستوى اللي بعده! 🚀`
      : didPass 
        ? `كفو يا بطل! رفعت راسي وفتحت المستوى الجديد.. لكن تقدر تجيب الكاملة!`
        : `بداية موفقة يا بطل، حاول مرة ثانية عشان تفتح مستويات جديدة! 💪`;
    
    const timer = setTimeout(() => syncSpeech(feedbackText), 800);
    return () => {
      clearTimeout(timer);
      if (speechIntervalRef.current) clearInterval(speechIntervalRef.current);
    };
  }, [didPass, isPerfect]);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial" animate="animate" exit="exit"
      className="min-h-[70vh] pb-12 flex flex-col font-['Tajawal'] relative overflow-hidden"
      dir="rtl"
    >
      <div className="absolute top-1/2 left-10 opacity-20 text-6xl select-none">⭐</div>
      <div className="absolute bottom-20 right-20 opacity-10 text-9xl select-none">⭐</div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 z-10">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 relative px-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="order-3 lg:order-1 relative bg-white p-10 rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.04)] max-w-sm min-w-[300px] border border-white"
          >
            <p className="text-2xl font-black text-slate-800 leading-relaxed text-center">
              {displayedText || "جاري التحميل..."}
            </p>
            <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-8 h-8 bg-white rotate-45 lg:block hidden"></div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rotate-45 lg:hidden block"></div>
          </motion.div>

          <motion.div 
            variants={popIn} 
            className="order-1 lg:order-2 w-full max-w-md bg-white rounded-[4rem] p-12 shadow-[0_30px_60px_rgba(0,0,0,0.06)] border-[4px] border-white flex flex-col items-center text-center z-20"
          >
            <h1 className="text-3xl font-black text-slate-500 mb-12 tracking-tight">نتيجتك النهائية</h1>
            <div className="relative mb-12">
               <svg viewBox="0 0 300 300" className="w-72 h-72 -rotate-90 overflow-visible">
                  <circle cx="150" cy="150" r="125" fill="transparent" stroke="#f1f5f9" strokeWidth="24" />
                  <motion.circle 
                    cx="150" cy="150" r="125" fill="transparent" stroke="#00c37a" strokeWidth="24" 
                    strokeDasharray={785} initial={{ strokeDashoffset: 785 }}
                    animate={{ strokeDashoffset: 785 - (785 * percentage) / 100 }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                    strokeLinecap="round"
                  />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[10rem] font-black leading-none text-[#00c37a] drop-shadow-sm">{score}</span>
                  <span className="text-2xl font-bold text-slate-400 mt-2">من {total}</span>
               </div>
            </div>
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: 'spring' }}
              className="bg-[#eaf9ee] px-10 py-4 rounded-full flex items-center gap-4 border border-[#c6f0d4]"
            >
               <span className="text-2xl font-black text-[#227d42]">بداية الطموح</span>
               <span className="text-3xl">🌱</span>
            </motion.div>
          </motion.div>

          <div className="order-2 lg:order-3 flex-shrink-0">
             <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="drop-shadow-2xl scale-[1.1]">
                <CharacterMascot state={mascotState} size="md" flipped={true} />
              </motion.div>
          </div>
        </div>

        <div className="mt-20 flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center px-6">
           <button onClick={() => navigate(`/`)} className="flex-1 bg-white text-slate-600 px-12 py-5 text-xl font-black rounded-[2.5rem] border-2 border-slate-100 shadow-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
            <span>🏠</span> العودة للرئيسية
          </button>
          {isPerfect ? (
            <button onClick={() => navigate(`/college/${quizData?.collegeId}/tests`)} className="flex-1 bg-[#00c37a] text-white px-12 py-5 text-xl font-black rounded-[2.5rem] shadow-[0_8px_0_0_#008f5d] hover:brightness-110 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3">
              <span>🚀</span> المستوى التالي
            </button>
          ) : (
            <button onClick={() => navigate(`/quiz/${quizData?.collegeId}/${quizData?.testIndex}`)} className="flex-1 bg-amber-500 text-white px-12 py-5 text-xl font-black rounded-[2.5rem] shadow-[0_8px_0_0_#d97706] hover:brightness-110 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-3">
              <span>🔄</span> إعادة الاختبار
            </button>
          )}
        </div>
      </main>
    </motion.div>
  );
};

export default Results;
