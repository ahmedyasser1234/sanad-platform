
import React from 'react';
import { motion } from 'framer-motion';
import { Question } from '../types';
import { itemVariants } from '../utils/animations';

interface QuestionCardProps {
  question: Question;
  selectedOption: number | null;
  onSelect: (index: number) => void;
  disabled: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedOption, onSelect, disabled }) => {
  return (
    <motion.div 
      variants={itemVariants}
      className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border-2 border-slate-100 w-full"
    >
      <div className="mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-green-50 text-[#006C35] text-xs font-bold mb-4 border border-green-100">
          {/* Fix: Added display names for the new question categories */}
          {question.category === 'qudurat' ? 'القدرات العامة' : 
           question.category === 'tahsili' ? 'التحصيلي' : 
           question.category === 'requirements' ? 'شروط القبول' : 
           question.category === 'medicine' ? 'الطب' :
           question.category === 'applied_science' ? 'العلوم التطبيقية' :
           question.category === 'nursing' ? 'التمريض' :
           question.category === 'business' ? 'الأعمال' : 'معلومات عامة'}
        </span>
        <h2 className="text-xl md:text-2xl font-bold leading-relaxed">
          {question.text}
        </h2>
      </div>

      <div className="space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;
          return (
            <button
              key={index}
              disabled={disabled}
              onClick={() => onSelect(index)}
              className={`w-full p-4 md:p-5 text-right rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 group ${
                isSelected 
                  ? 'border-[#006C35] bg-green-50' 
                  : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50'
              } ${disabled && !isSelected ? 'opacity-60 grayscale-[0.2]' : ''}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg border-2 shrink-0 ${
                isSelected ? 'bg-[#006C35] text-white border-[#006C35]' : 'bg-white text-slate-400 border-slate-100 group-hover:border-slate-200'
              }`}>
                {index + 1}
              </div>
              <span className={`text-base md:text-lg font-medium ${isSelected ? 'text-[#006C35]' : 'text-slate-700'}`}>
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuestionCard;
