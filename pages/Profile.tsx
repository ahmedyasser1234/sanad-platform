
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { pageTransition, containerVariants, itemVariants } from '../utils/animations';
import { COLLEGES } from '../constants';
import CharacterMascot from '../components/CharacterMascot';

const Profile: React.FC = () => {
  const { state } = useApp();
  const { user } = state;
  const navigate = useNavigate();

  const personalInfo = {
    fullName: "أحمدياسر صالح",
    nationalId: "21245454545454",
    email: "ahmedyasser697@gmail.com",
    phone: "01091678935",
    city: "الرياض"
  };

  const academicStatus = {
    major: "شبكات الحاسوب",
    college: "كلية الحاسوبات و المعلومات",
    level: "المستوى الرابع",
    status: "منتظم"
  };

  const services = [
    { id: 'ai', name: 'سند AI (المساعد الذكي)', active: true, icon: '🤖' },
    { id: 'lib', name: 'المكتبة الرقمية', active: true, icon: '📚' },
    { id: 'career', name: 'الإرشاد المهني', active: false, icon: '💼' }
  ];

  const valueCommitment = {
    completedPrograms: 4,
    rating: "متميز ✨",
    lastActivity: "لقاء قيمي: الأمانة العلمية"
  };

  const userLevel = Math.floor(user.xp / 100) + 1;
  const progressToNextLevel = user.xp % 100;

  return (
    <motion.div
      variants={pageTransition}
      initial="initial" animate="animate" exit="exit"
      className="min-h-screen pb-20 px-6 font-['Tajawal']"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">
        <section className="glass-card p-8 md:p-12 mb-10 relative overflow-hidden flex flex-col lg:flex-row items-center gap-12">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#00c37a]/10 rounded-full blur-3xl -translate-x-20 -translate-y-20"></div>
          
          <div className="flex flex-col items-center shrink-0 relative z-10">
            <div className="w-44 h-44 rounded-[3.5rem] bg-gradient-to-br from-[#00e28f] to-[#00c37a] p-1.5 shadow-2xl relative">
              <div className="w-full h-full rounded-[3.2rem] bg-white flex items-center justify-center text-8xl shadow-inner">
                👤
              </div>
              <motion.div 
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute -bottom-2 -right-2 bg-slate-800 text-white px-6 py-2 rounded-2xl text-base font-black shadow-xl border-4 border-white"
              >
                مستوى {userLevel}
              </motion.div>
            </div>
            <div className="mt-8">
               <CharacterMascot state={user.streak > 0 ? 'happy' : 'idle'} size="sm" />
            </div>
          </div>

          <div className="flex-1 text-center lg:text-right z-10">
            <h1 className="text-4xl font-black text-slate-800 mb-2">{personalInfo.fullName}</h1>
            <p className="text-[#00c37a] font-bold text-xl mb-6">عضو نشط في مجتمع سند 🇸🇦</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'النقاط', value: user.xp, icon: '💎' },
                { label: 'الأوسمة', value: user.unlockedBadges.length, icon: '🏆' },
                { label: 'أيام الحماس', value: user.streak, icon: '🔥' },
                { label: 'القلوب', value: user.hearts, icon: '❤️' },
              ].map((stat, i) => (
                <div key={i} className="bg-white/40 p-4 rounded-3xl border border-white/50 text-center">
                  <span className="text-2xl mb-1 block">{stat.icon}</span>
                  <div className="text-xl font-black text-slate-800">{stat.value}</div>
                  <div className="text-xs text-slate-400 font-bold">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="w-full max-w-lg">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-black text-slate-500">التقدم للمستوى {userLevel + 1}</span>
                <span className="text-sm font-black text-[#00c37a]">{progressToNextLevel}/١٠٠ XP</span>
              </div>
              <div className="h-4 bg-slate-200 rounded-full overflow-hidden border border-white shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNextLevel}%` }}
                  className="h-full bg-gradient-to-l from-[#00e28f] to-[#00c37a] rounded-full"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <motion.div variants={itemVariants} className="glass-card p-8">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
               <span className="w-2 h-8 bg-[#00c37a] rounded-full"></span>
               معلوماتي الشخصية
            </h2>
            <div className="space-y-4">
               {[
                 { label: 'الرقم الأكاديمي', value: personalInfo.nationalId },
                 { label: 'البريد الإلكتروني', value: personalInfo.email },
                 { label: 'رقم الجوال', value: personalInfo.phone },
                 { label: 'المدينة', value: personalInfo.city },
               ].map((item, i) => (
                 <div key={i} className="flex justify-between items-center p-4 bg-white/30 rounded-2xl border border-white/40">
                    <span className="text-slate-400 font-bold">{item.label}</span>
                    <span className="text-slate-800 font-black">{item.value}</span>
                 </div>
               ))}
               <button className="w-full mt-4 py-3 rounded-2xl border-2 border-[#00c37a] text-[#00c37a] font-black hover:bg-[#00c37a] hover:text-white transition-all">تحديث بياناتي</button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card p-8">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
               <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
               حالتي الأكاديمية
            </h2>
            <div className="space-y-4">
               {[
                 { label: 'الكلية', value: academicStatus.college },
                 { label: 'التخصص', value: academicStatus.major },
                 { label: 'المستوى الدراسي', value: academicStatus.level },
                 { label: 'حالة القيد', value: academicStatus.status, highlight: true },
               ].map((item, i) => (
                 <div key={i} className="flex justify-between items-center p-4 bg-white/30 rounded-2xl border border-white/40">
                    <span className="text-slate-400 font-bold">{item.label}</span>
                    <span className={`font-black ${item.highlight ? 'text-blue-600 bg-blue-50 px-3 py-1 rounded-lg' : 'text-slate-800'}`}>{item.value}</span>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>

        <section className="glass-card p-8 md:p-10 mb-10">
          <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
             <span className="w-2 h-8 bg-amber-400 rounded-full"></span>
             سجل اختبارات الكلية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLLEGES.map((college) => {
              const unlockedIdx = user.unlockedLevels[college.id] ?? 0;
              const total = college.tests.length;
              return (
                <div key={college.id} className="bg-white/50 border border-white p-6 rounded-[2.5rem] flex flex-col items-center text-center">
                   <div className="text-4xl mb-3">{college.icon}</div>
                   <h3 className="font-black text-slate-800 text-sm mb-4">{college.name}</h3>
                   <div className="w-full flex justify-center gap-1 mb-4">
                      {college.tests.map((_, idx) => (
                        <div key={idx} className={`w-3 h-3 rounded-full ${idx <= unlockedIdx ? 'bg-[#00c37a]' : 'bg-slate-200'}`}></div>
                      ))}
                   </div>
                   <button 
                    onClick={() => navigate(`/college/${college.id}/tests`)}
                    className="text-xs font-black text-slate-500 bg-slate-100 hover:bg-[#00c37a] hover:text-white px-5 py-2 rounded-full transition-all"
                   >
                     {unlockedIdx >= total - 1 ? 'عرض النتيجة ✅' : 'إكمال الاختبار 🚀'}
                   </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Profile;
