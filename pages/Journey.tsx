
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { JOURNEYS } from '../constants';
import { pageTransition, containerVariants, itemVariants } from '../utils/animations';

const JourneyDetail: React.FC = () => {
  const { journeyId } = useParams();
  
  const journeyKey = Object.keys(JOURNEYS).find(k => (JOURNEYS as any)[k].id === journeyId);
  const journey = journeyKey ? (JOURNEYS as any)[journeyKey] : null;

  if (!journey) return <div className="text-white text-center py-20">عذراً، لم نجد هذه الرحلة.</div>;

  return (
    <motion.div 
      variants={pageTransition}
      initial="initial" animate="animate" exit="exit"
      className="max-w-6xl mx-auto px-4 pb-16 relative z-10"
    >
      <header className="text-center mb-16">
        <motion.h1 variants={itemVariants} className="text-5xl font-black text-slate-800 mb-6 drop-shadow-sm">
          {journey.title}
        </motion.h1>
        <motion.p variants={itemVariants} className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-bold">
          {journey.description}
        </motion.p>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden" animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
      >
        {journey.cards.map((card: any) => (
          <Link key={card.id} to={card.path}>
            <motion.div 
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-md p-10 rounded-[3rem] hover:scale-[1.03] transition-transform cursor-pointer border-2 border-white/50 group shadow-xl"
            >
              <div className="flex items-center gap-8 text-right" dir="rtl">
                <div className="w-24 h-24 bg-[#00c37a]/10 rounded-[2rem] flex items-center justify-center text-5xl group-hover:rotate-12 transition-transform">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-800 mb-2">{card.title}</h3>
                  <p className="text-slate-500 font-bold">استكشف المزيد من التفاصيل والخدمات..</p>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      <div className="mt-20 text-center">
        <Link to="/" className="inline-flex items-center gap-3 bg-white text-slate-600 border-2 border-slate-100 hover:bg-slate-50 px-8 py-4 rounded-2xl font-black transition-colors shadow-md">
          <svg className="w-6 h-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
          العودة للرئيسية
        </Link>
      </div>
    </motion.div>
  );
};

export default JourneyDetail;
