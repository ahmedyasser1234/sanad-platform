
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import CharacterMascot from '../components/CharacterMascot';
import { pageTransition } from '../utils/animations';
import { MascotState } from '../types';
import { speakText, isUsingFallbackAudio } from '../utils/audio';
import { COLLEGES } from '../constants';

const Quiz: React.FC = () => {
  const { collegeId, testIndex } = useParams();
  const navigate = useNavigate();
  const { state, submitAnswer } = useApp();
  
  const college = COLLEGES.find(c => c.id === collegeId);
  const testIdx = parseInt(testIndex || '0');
  const test = college?.tests[testIdx] || college?.tests[0];
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [localScore, setLocalScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [mascotState, setMascotState] = useState<MascotState>('idle');
  const [displayedText, setDisplayedText] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isTalking, setIsTalking] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [showFallbackNote, setShowFallbackNote] = useState(false);
  
  const currentQuestion = test?.questions[currentIdx];
  const speechIntervalRef = useRef<number | null>(null);

  const syncSpeech = async (text: string) => {
    if (isTalking || !text) return;
    setIsTalking(true);
    setDisplayedText("");
    setMascotState('talking');
    
    try {
      const { duration } = await speakText(text);
      
      // Update fallback status
      if (isUsingFallbackAudio()) setShowFallbackNote(true);

      const words = text.trim().split(/\s+/);
      const delayPerWord = (Math.max(duration, 0.5) * 1000) / words.length;
      
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
    if (audioReady && currentQuestion) {
      const timer = setTimeout(() => syncSpeech(currentQuestion.text), 500);
      return () => {
        clearTimeout(timer);
        if (speechIntervalRef.current) clearInterval(speechIntervalRef.current);
      };
    } else if (currentQuestion) {
      setDisplayedText(currentQuestion.text);
    }
  }, [currentIdx, collegeId, testIndex, audioReady]);

  const handleSelect = (idx: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(idx);
    setMascotState('writing');
    setTimeout(() => {
      if (!isAnswerChecked) setMascotState('idle');
    }, 1200);
  };

  const handleCheck = async () => {
    if (selectedOption === null || !collegeId) return;
    setIsAnswerChecked(true);
    const correct = selectedOption === currentQuestion.correctAnswerIndex;
    setIsCorrect(correct);
    
    if (correct) {
      setLocalScore(prev => prev + 1);
      setMascotState('happy');
      if (audioReady) await syncSpeech("كفو يا بطل! إجابة صحيحة مية بالمية! 👏");
    } else {
      setMascotState('sad');
      if (audioReady) await syncSpeech("لا تشيل هم.. ركز في الجاي! 💪");
    }
    
    submitAnswer(collegeId, testIdx, correct);
  };

  const handleNext = () => {
    if (currentIdx < (test?.questions.length || 0) - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsCorrect(null);
      setDisplayedText("");
    } else {
      navigate('/results', { 
        state: { 
          collegeId, 
          testIndex: testIdx,
          score: localScore,
          total: test?.questions.length 
        } 
      });
    }
  };

  if (!test || !currentQuestion) return null;

  return (
    <motion.div
      variants={pageTransition}
      initial="initial" animate="animate" exit="exit"
      className="fixed inset-0 z-[100] flex flex-col font-['Tajawal'] overflow-hidden bg-white/40 backdrop-blur-xl"
      dir="rtl"
    >
      <header className="max-w-5xl mx-auto w-full px-6 pt-10 flex items-center gap-6 z-10">
        <button onClick={() => navigate(`/college/${collegeId}/tests`)} className="text-slate-500 hover:text-slate-800 transition-colors p-2 bg-white/50 rounded-full">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex-1">
          <ProgressBar current={currentIdx + 1} total={test.questions.length} hearts={state.user.hearts} />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 flex flex-col items-center pt-8">
        {!audioReady && (
          <motion.button 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            onClick={() => setAudioReady(true)} 
            className="mb-6 bg-[#00c37a] text-white px-10 py-4 rounded-2xl font-black text-xl shadow-[0_4px_0_0_#008f5d] active:translate-y-1 active:shadow-none transition-all z-20 flex items-center gap-3"
          >
            <span>🔈</span> اضغط لتفعيل صوت منصور
          </motion.button>
        )}

        {showFallbackNote && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-amber-50 text-amber-800 px-4 py-2 rounded-xl text-xs font-bold border border-amber-200 flex items-center gap-2"
          >
            <span>ℹ️</span> يعمل الصوت الآن بجودة اقتصادية لتوفير الموارد.
          </motion.div>
        )}

        <div className="max-w-4xl w-full flex flex-col gap-10 mt-4 pb-48">
          <h1 className="text-3xl font-black text-slate-800 text-right px-4">
            {test.title} - السؤال {currentIdx + 1}
          </h1>

          <div className="flex flex-col gap-12 w-full relative px-4">
            <div className="flex items-start gap-8 justify-start">
              <div className="shrink-0 scale-95 md:scale-105 origin-top">
                <CharacterMascot state={mascotState} size="sm" flipped={true} />
              </div>
              
              <div className="mt-4 relative bg-white border-2 border-slate-200 p-6 px-10 rounded-[2.5rem] flex items-center gap-5 shadow-xl max-w-xl min-h-[100px] flex-1">
                <button 
                  onClick={() => audioReady && !isTalking && syncSpeech(currentQuestion.text)}
                  className={`shrink-0 p-3 rounded-xl transition-all ${audioReady ? 'bg-[#00c37a] text-white shadow-[0_3px_0_0_#008f5d]' : 'bg-slate-100 text-slate-400'}`}
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14 8.83v6.34L11.83 13H9v-2h2.83L14 8.83M16 4l-5 5H7v6h4l5 5V4z" /></svg>
                </button>
                <p className="text-2xl md:text-3xl font-bold text-slate-800 leading-relaxed border-b-2 border-dashed border-slate-200 pb-1 flex-1">
                  {displayedText || (audioReady ? "" : currentQuestion.text)}
                </p>
                <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-white border-t-2 border-r-2 border-slate-200 rotate-45"></div>
              </div>
            </div>

            <div className="flex items-center gap-6 justify-end -mt-6">
              <div className="relative bg-white border-2 border-slate-200 p-6 px-12 rounded-[2.5rem] min-w-[280px] flex items-center justify-center shadow-lg h-24">
                <p className={`text-2xl md:text-3xl font-bold transition-all ${selectedOption !== null ? 'text-[#00c37a]' : 'text-slate-300 tracking-widest'}`}>
                  {selectedOption !== null ? currentQuestion.options[selectedOption] : "__________"}
                </p>
                <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 bg-white border-b-2 border-l-2 border-slate-200 rotate-45"></div>
              </div>
              <div className="w-24 h-24 rounded-full bg-sky-100 border-4 border-white flex items-center justify-center text-5xl shadow-xl shrink-0 overflow-hidden ring-4 ring-sky-500/10">
                <span className="scale-[1.2]">👩‍🎓</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full mt-6 px-4">
            {currentQuestion.options.map((opt, idx) => (
              <button
                key={idx}
                disabled={isAnswerChecked}
                onClick={() => handleSelect(idx)}
                className={`w-full p-6 rounded-2xl border-2 border-b-4 text-center font-bold text-2xl transition-all transform active:scale-[0.99] ${
                  selectedOption === idx 
                  ? 'border-[#00c37a] bg-[#00c37a]/10 text-[#00c37a]' 
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 font-black shrink-0 ${
                    selectedOption === idx ? 'bg-[#00c37a] text-white border-[#00c37a]' : 'border-slate-200 text-slate-400'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className="flex-1 text-right pr-2">{opt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className={`fixed bottom-0 left-0 right-0 p-8 md:p-10 z-[110] transition-all duration-500 border-t-2 backdrop-blur-2xl ${
        isAnswerChecked 
          ? (isCorrect ? 'bg-[#d7ffb8]/90 border-[#a5e575]/40' : 'bg-[#ffdfe0]/90 border-[#f4b4b4]/40') 
          : 'bg-white/60 border-white/20 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]'
      }`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">
          <AnimatePresence>
            {isAnswerChecked ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-6">
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl shrink-0 shadow-lg ${
                  isCorrect ? 'bg-[#00c37a] text-white' : 'bg-[#ea2b2b] text-white'
                }`}>
                  {isCorrect ? '✓' : '✕'}
                </div>
                <div className="text-right">
                  <h2 className={`text-2xl md:text-3xl font-black ${isCorrect ? 'text-[#008f5d]' : 'text-[#ea2b2b]'}`}>
                    {isCorrect ? 'أحسنت يا بطل!' : 'معليش، منصور يعلمك'}
                  </h2>
                  {!isCorrect && <p className="text-[#ea2b2b] font-bold mt-1 text-lg">الجواب الصح هو: {currentQuestion.options[currentQuestion.correctAnswerIndex]}</p>}
                </div>
              </motion.div>
            ) : (
              <button onClick={() => handleNext()} className="px-12 py-4 rounded-2xl font-black text-slate-500 hover:bg-white/40 transition-colors border-2 border-slate-300/30 text-lg">
                تخطي
              </button>
            )}
          </AnimatePresence>

          <button
            onClick={isAnswerChecked ? handleNext : handleCheck}
            disabled={selectedOption === null && !isAnswerChecked}
            className={`btn-sanad-interactive px-16 md:px-24 py-5 rounded-2xl font-black text-2xl min-w-[220px] shadow-lg active:scale-95 disabled:bg-slate-300/50 disabled:shadow-none disabled:text-slate-400 disabled:border-transparent transition-all`}
          >
            {isAnswerChecked ? 'استمر' : 'تحقق'}
          </button>
        </div>
      </footer>
    </motion.div>
  );
};

export default Quiz;
