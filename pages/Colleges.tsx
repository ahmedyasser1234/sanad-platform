
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageTransition, containerVariants, itemVariants } from '../utils/animations';
import { COLLEGES } from '../constants';

const Colleges: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-6xl mx-auto px-4 pb-32 text-slate-800 relative z-10"
      dir="rtl"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4">كلياتنا المتميزة</h1>
        <p className="text-slate-600 text-lg font-bold">اختر الكلية التي تطمح للانضمام إليها وابدأ رحلة التحديات مع منصور!</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {COLLEGES.map((college) => (
          <motion.div
            key={college.id}
            variants={itemVariants}
            onClick={() => navigate(`/college/${college.id}/tests`)}
            className="group cursor-pointer"
          >
            <div className="relative h-64 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white transition-all group-hover:border-[#00c37a]">
              <img src={college.bg} alt={college.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-0 right-0 text-center px-4">
                <span className="text-4xl mb-2 block">{college.icon}</span>
                <h3 className="text-xl font-black text-white">{college.name}</h3>
              </div>
            </div>
            <div className="mt-6 text-center">
               <button className="btn-sanad-interactive font-black px-10 py-3 rounded-full shadow-lg hover:scale-105 active:scale-95 text-lg">
                 عرض المستويات
               </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Colleges;
