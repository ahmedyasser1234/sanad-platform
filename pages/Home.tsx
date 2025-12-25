
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageTransition, containerVariants, itemVariants } from '../utils/animations';
import { JOURNEYS } from '../constants';

const Home: React.FC = () => {
  return (
    <motion.div 
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-[50vh] pb-32 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-14 text-center">
          <motion.h1 
            variants={itemVariants} 
            className="text-5xl md:text-7xl font-black text-slate-800 mb-6 tracking-tight"
          >
            منصة <span className="text-[#00c37a]">سند</span> التعليمية
          </motion.h1>
          <motion.p 
            variants={itemVariants} 
            className="text-xl text-slate-600 font-bold max-w-2xl mx-auto leading-relaxed"
          >
            رفيقك الذكي في رحلتك التعليمية.. استكشف الكليات، طور مهاراتك، وانطلق نحو مستقبلك بثقة.
          </motion.p>
        </header>

        {/* Dashboard Sections Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
        >
          {Object.values(JOURNEYS).map((journey) => (
            <motion.div 
              key={journey.id}
              variants={itemVariants} 
              className="bg-white/80 backdrop-blur-md rounded-[3rem] pt-8 pb-24 px-8 shadow-xl border-2 border-white/50 flex flex-col justify-start hover:shadow-2xl transition-all h-full min-h-[450px]"
            >
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-2 h-8 bg-[#00c37a] rounded-full"></div>
                 <h2 className="text-2xl font-black text-slate-800">{journey.title}</h2>
              </div>
              
              <p className="text-slate-500 text-sm mb-8 leading-relaxed font-bold">
                {journey.description}
              </p>
              
              <div className="flex flex-col gap-4">
                {journey.cards.map((card) => (
                  <Link 
                    key={card.id} 
                    to={card.path} 
                    className="block group"
                  >
                    <div className="btn-sanad-interactive w-full p-4 font-black rounded-2xl flex items-center justify-between shadow-md">
                      <span className="text-lg">{card.title}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">❮</span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
