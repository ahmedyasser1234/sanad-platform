import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mascotVariants, mouthVariants, notebookVariants } from '../utils/animations';
import { MascotState } from '../types';

interface CharacterMascotProps {
  state: MascotState;
  size?: 'sm' | 'md' | 'lg';
  flipped?: boolean;
}

const CharacterMascot: React.FC<CharacterMascotProps> = ({
  state,
  size = 'md',
  flipped = false,
}) => {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-80 h-[450px]',
    lg: 'w-[450px] h-[600px]',
  };

  return (
    <div className={`relative ${sizeClasses[size]} flex items-center justify-center select-none`}>
      <motion.div
        variants={mascotVariants}
        animate={state}
        className="w-full h-full relative z-10"
      >
        <svg
          viewBox="0 0 400 550"
          className="w-full h-full drop-shadow-[0_15px_20px_rgba(0,0,0,0.3)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shadow */}
          <ellipse cx="200" cy="520" rx="120" ry="25" fill="rgba(0,0,0,0.2)" />

          <defs>
            <pattern id="shemagh" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="#D14343" />
              <path
                d="M0 0 L20 20 M20 0 L0 20"
                stroke="white"
                strokeWidth="2"
                opacity="0.25"
              />
            </pattern>
          </defs>

          <g transform={flipped ? 'scale(-1,1) translate(-400,0)' : 'scale(1,1)'}>
            {/* Body */}
            <g>
              <rect x="120" y="250" width="160" height="200" rx="35" fill="#1F1F1F" />
              <rect x="196" y="250" width="8" height="200" fill="#F4B740" />

              {/* Hands */}
              <rect x="98" y="275" width="26" height="115" rx="13" fill="#F1B28C" />
              <rect x="276" y="275" width="26" height="115" rx="13" fill="#F1B28C" />

              {/* Legs */}
              <rect x="160" y="450" width="36" height="55" rx="18" fill="#8B5E3C" />
              <rect x="204" y="450" width="36" height="55" rx="18" fill="#8B5E3C" />
            </g>

            {/* Head – scaled */}
            <g transform="translate(110 55) scale(1.18)">
              {/* Shemagh */}
              <g transform="scale(1.05) translate(-5 -5)">
                <path
                  d="
                    M-30 80
                    Q80 -10 190 80
                    L165 215
                    Q80 240 -5 215
                    Z
                  "
                  fill="url(#shemagh)"
                />
                <path
                  d="
                    M-20 95
                    Q80 15 175 95
                    L155 205
                    Q80 225 0 205
                    Z
                  "
                  fill="rgba(0,0,0,0.08)"
                />
              </g>

              {/* Face */}
              <circle cx="80" cy="130" r="62" fill="#F1B28C" />

              {/* Agal */}
              <path
                d="M15 70 Q80 40 145 70"
                stroke="#111"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M22 82 Q80 55 138 82"
                stroke="#111"
                strokeWidth="9"
                fill="none"
                strokeLinecap="round"
              />

              {/* LEFT EYE */}
              <circle cx="55" cy="130" r="9" fill="white" />
              <motion.circle
                cx="55"
                cy="130"
                r="4.5"
                fill="#111"
                animate={{ cx: [52, 58, 55] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                }}
              />

              {/* RIGHT EYE */}
              <circle cx="110" cy="130" r="9" fill="white" />
              <motion.circle
                cx="110"
                cy="130"
                r="4.5"
                fill="#111"
                animate={{ cx: [107, 113, 110] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                }}
              />

              {/* Mouth */}
              <motion.path
                variants={mouthVariants}
                animate={state === 'talking' ? 'talking' : 'idle'}
                d="M65 155 Q80 168 95 155"
                stroke="#5A2D1C"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          </g>
        </svg>

        {/* Notebook */}
        <AnimatePresence>
          {state === 'writing' && (
            <motion.div
              variants={notebookVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={`absolute -bottom-10 ${
                flipped ? '-left-10' : '-right-10'
              } z-50 flex items-center gap-4`}
            >
              <div className="bg-white p-5 rounded-[2rem] shadow-2xl border-4 border-slate-200 w-36 h-52 flex flex-col gap-4">
                <div className="w-full h-3 bg-slate-100 rounded-full" />
                <div className="w-5/6 h-3 bg-slate-100 rounded-full" />
                <div className="w-4/6 h-3 bg-slate-100 rounded-full" />
                <motion.div
                  animate={{
                    x: flipped ? [-50, 0, -50] : [0, 50, 0],
                    y: [0, 25, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
                  className={`mt-auto ${flipped ? 'self-start' : 'self-end'} text-5xl`}
                >
                  ✏️
                </motion.div>
              </div>
              <div className="text-7xl drop-shadow-2xl">🗒️</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CharacterMascot;
