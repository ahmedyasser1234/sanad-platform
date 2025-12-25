
import React from 'react';
import { motion } from 'framer-motion';

interface AnswerOptionsProps {
  options: string[];
  selectedOption: number | null;
  onSelect: (index: number) => void;
  disabled: boolean;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({ options, selectedOption, onSelect, disabled }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {options.map((option, index) => {
        const isSelected = selectedOption === index;
        return (
          <motion.button
            key={index}
            disabled={disabled}
            onClick={() => onSelect(index)}
            className={`w-full p-4 text-right rounded-2xl border-2 border-b-4 transition-all duration-200 flex items-center gap-4 ${
              isSelected 
                ? 'border-[#1CB0F6] bg-[#1CB0F6]/10 text-[#1CB0F6]' 
                : 'border-[#37464F] hover:bg-[#1A2B34] text-white'
            } ${disabled && !isSelected ? 'opacity-40' : ''}`}
            whileTap={!disabled ? { scale: 0.98 } : {}}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm border-2 shrink-0 transition-colors ${
              isSelected 
                ? 'bg-[#1CB0F6] text-white border-[#1CB0F6]' 
                : 'bg-transparent text-[#37464F] border-[#37464F]'
            }`}>
              {index + 1}
            </div>
            <span className="text-lg font-bold">
              {option}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default AnswerOptions;
