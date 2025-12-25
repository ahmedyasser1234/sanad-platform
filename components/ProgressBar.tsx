
import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  hearts: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, hearts }) => {
  const percentage = Math.max(5, Math.min(100, (current / total) * 100));

  return (
    <div className="flex items-center gap-4 w-full">
      {/* Progress Bar Container */}
      <div className="flex-1 h-4 bg-[#37464F] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#00e28f] to-[#00c37a] rounded-full relative"
        >
           {/* Glossy shine */}
           <div className="absolute top-1 left-1 right-1 h-1 bg-white/20 rounded-full"></div>
        </motion.div>
      </div>
      
      {/* Heart Indicator */}
      <div className="flex items-center gap-2 shrink-0">
         <span className="text-red-500 text-2xl drop-shadow-sm">❤️</span>
         <span className="text-red-500 font-black text-xl">{hearts}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
