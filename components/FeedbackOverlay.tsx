
import React from 'react';
import { motion } from 'framer-motion';
import { shake, pulse } from '../utils/animations';

interface FeedbackOverlayProps {
  isCorrect: boolean;
  explanation: string;
  onNext: () => void;
}

const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({ isCorrect, explanation, onNext }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed bottom-0 left-0 right-0 p-6 md:p-10 z-[60] border-t-2 backdrop-blur-2xl shadow-2xl ${
        isCorrect ? 'bg-green-100/90 border-green-500/30' : 'bg-red-100/90 border-red-500/30'
      }`}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex gap-4 items-start">
          <motion.div 
            variants={isCorrect ? pulse : shake}
            animate="animate"
            className={`w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center shrink-0 ${
              isCorrect ? 'bg-green-500 text-white shadow-lg' : 'bg-red-500 text-white shadow-lg'
            }`}
          >
            {isCorrect ? (
              <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </motion.div>
          <div>
            <h3 className={`text-xl md:text-2xl font-black mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? 'أحسنت! إجابة صحيحة ' : 'حاول مرة أخرى، لا تيأس '}
            </h3>
            <p className={`text-sm md:text-base font-bold leading-relaxed max-w-xl ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {explanation}
            </p>
          </div>
        </div>

        <button
          onClick={onNext}
          className={`px-12 py-4 rounded-2xl text-white font-black text-lg transition-all active:scale-95 shadow-lg whitespace-nowrap ${
            isCorrect ? 'bg-green-600 hover:bg-green-700 shadow-green-500/30' : 'bg-red-600 hover:bg-red-700 shadow-red-500/30'
          }`}
        >
          {isCorrect ? 'استمر' : 'فهمت'}
        </button>
      </div>
    </motion.div>
  );
};

export default FeedbackOverlay;
