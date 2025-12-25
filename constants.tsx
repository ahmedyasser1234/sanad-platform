
import { College, Badge } from './types';

export const INITIAL_HEARTS = 5;
export const XP_PER_CORRECT = 10;
export const PASS_THRESHOLD = 0.8; // 80% to pass

const generateTests = (collegeId: string, collegeName: string) => {
  return [
    {
      id: `${collegeId}-t1`,
      title: "المستوى الأول: الأساسيات",
      description: "مدخل شامل للمفاهيم الأساسية في هذا التخصص.",
      questions: [
        { id: 'q1', text: `ما هو أول شيء يتعلمه طالب في ${collegeName}؟`, options: ['الأخلاقيات والأسس', 'التطبيقات المعقدة'], correctAnswerIndex: 0, explanation: 'دائماً نبدأ بالأسس والأخلاقيات المهنية.', category: collegeId },
        { id: 'q2', text: 'ما أهمية البحث العلمي؟', options: ['تطوير المعرفة', 'تضييع الوقت'], correctAnswerIndex: 0, explanation: 'البحث العلمي هو أساس التطور.', category: collegeId },
        { id: 'q3', text: 'كيف نحافظ على دقة المعلومات؟', options: ['بالتوثيق والمراجعة', 'بالتخمين'], correctAnswerIndex: 0, explanation: 'الدقة تأتي من المراجعة المستمرة.', category: collegeId },
        { id: 'q4', text: 'ما هو العمل الجماعي؟', options: ['تعاون الجميع لتحقيق هدف', 'عمل كل شخص بمفرده'], correctAnswerIndex: 0, explanation: 'العمل الجماعي سر النجاح في هذا المجال.', category: collegeId },
        { id: 'q5', text: 'متى نستخدم التقنية؟', options: ['لتسهيل المهام وزيادة الدقة', 'لاستبدال الإنسان تماماً'], correctAnswerIndex: 0, explanation: 'التقنية وسيلة مساعدة وليست بديلاً عن العقل.', category: collegeId },
      ]
    },
    {
      id: `${collegeId}-t2`,
      title: "المستوى الثاني: التخصص العميق",
      description: "الغوص في تفاصيل المواد التخصصية.",
      questions: [
        { id: 'q6', text: 'ما هي أهم مهارة تخصصية؟', options: ['التحليل النقدي', 'الحفظ فقط'], correctAnswerIndex: 0, explanation: 'التحليل النقدي يساعدك على فهم أعمق.', category: collegeId },
        { id: 'q7', text: 'كيف نتعامل مع المشكلات المعقدة؟', options: ['بتقسيمها لأجزاء صغيرة', 'بتجاهلها'], correctAnswerIndex: 0, explanation: 'التفكيك هو الحل الأمثل للمشاكل الكبيرة.', category: collegeId },
        { id: 'q8', text: 'ما هو دور الإبداع؟', options: ['ابتكار حلول جديدة', 'تكرار القديم'], correctAnswerIndex: 0, explanation: 'الإبداع يفتح آفاقاً جديدة للتطور.', category: collegeId },
        { id: 'q9', text: 'أهمية الوقت في العمل؟', options: ['إدارة المهام بكفاءة', 'لا يهم الوقت'], correctAnswerIndex: 0, explanation: 'الوقت مورد ثمين يجب إدارته بحذر.', category: collegeId },
        { id: 'q10', text: 'كيف نطور المهارات؟', options: ['بالتدريب المستمر', 'بالانتظار'], correctAnswerIndex: 0, explanation: 'التدريب هو مفتاح الإتقان.', category: collegeId },
      ]
    },
    {
      id: `${collegeId}-t3`,
      title: "المستوى الثالث: التطبيق العملي",
      description: "تطبيقات من واقع الحياة المهنية.",
      questions: [
        { id: 'q11', text: 'ماذا نفعل عند الفشل في التجربة؟', options: ['نتعلم من الخطأ ونعيد المحاولة', 'نتوقف تماماً'], correctAnswerIndex: 0, explanation: 'الفشل هو خطوة نحو النجاح إذا تعلمنا منه.', category: collegeId },
        { id: 'q12', text: 'أهمية الأمان في العمل؟', options: ['أولوية قصوى', 'شيء ثانوي'], correctAnswerIndex: 0, explanation: 'السلامة تأتي أولاً في كل التطبيقات.', category: collegeId },
        { id: 'q13', text: 'كيف نتواصل مع الفريق؟', options: ['بوضوح وشفافية', 'بغموض'], correctAnswerIndex: 0, explanation: 'التواصل الواضح يمنع الأخطاء.', category: collegeId },
        { id: 'q14', text: 'ما هو دور الملاحظة؟', options: ['جمع البيانات بدقة', 'النظر السطحي'], correctAnswerIndex: 0, explanation: 'الملاحظة الدقيقة أساس العلم والتطبيق.', category: collegeId },
        { id: 'q15', text: 'كيف نحسن النتائج؟', options: ['بالتحليل والتقييم', 'بتركها للصدفة'], correctAnswerIndex: 0, explanation: 'التقييم المستمر يؤدي للتحسين المستمر.', category: collegeId },
      ]
    },
    {
      id: `${collegeId}-t4`,
      title: "المستوى الرابع: التميز والاحتراف",
      description: "أعلى مستويات المعرفة والقدرة في المجال.",
      questions: [
        { id: 'q16', text: 'ما هو معيار الاحتراف؟', options: ['الإتقان والالتزام', 'السرعة فقط'], correctAnswerIndex: 0, explanation: 'الاحتراف هو مزيج من العلم والخلق.', category: collegeId },
        { id: 'q17', text: 'كيف نقود الآخرين؟', options: ['بالقدوة والتحفيز', 'بالأوامر الصارمة'], correctAnswerIndex: 0, explanation: 'القيادة هي فن التأثير في الآخرين.', category: collegeId },
        { id: 'q18', text: 'ما هي الرؤية المستقبلية؟', options: ['التخطيط للمدى البعيد', 'العيش ليومك فقط'], correctAnswerIndex: 0, explanation: 'الرؤية توجه مسارك المهني للقمة.', category: collegeId },
        { id: 'q19', text: 'أهمية التطوير الذاتي؟', options: ['تعلم مستمر مدى الحياة', 'التوقف بعد التخرج'], correctAnswerIndex: 0, explanation: 'العالم يتغير ويجب أن نتحرك معه.', category: collegeId },
        { id: 'q20', text: 'ماذا يعني التميز؟', options: ['تقديم أفضل من المتوقع', 'تقديم الحد الأدنى'], correctAnswerIndex: 0, explanation: 'التميز هو بصمتك الخاصة في عملك.', category: collegeId },
      ]
    }
  ];
};

export const COLLEGES: College[] = [
  { 
    id: 'medicine', 
    name: 'كلية الطب', 
    icon: '🏥', 
    bg: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
    tests: generateTests('medicine', 'الطب')
  },
  { 
    id: 'applied-science', 
    name: 'كلية العلوم التطبيقية', 
    icon: '🔬', 
    bg: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000',
    tests: generateTests('applied-science', 'العلوم التطبيقية')
  },
  { 
    id: 'nursing', 
    name: 'كلية التمريض', 
    icon: '🩺', 
    bg: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1000',
    tests: generateTests('nursing', 'التمريض')
  },
  { 
    id: 'business', 
    name: 'كلية الأعمال', 
    icon: '📊', 
    bg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
    tests: generateTests('business', 'إدارة الأعمال')
  }
];

export const JOURNEYS = {
  SANAD_WITH_YOU: {
    id: 'sanad-with-you',
    title: 'سند معك',
    description: 'رفيقك الذكي في رحلتك التعليمية وسوف تقدر كل الخدمات الخاصة في مكان واحد التعليمي والشخصي.',
    cards: [
      { id: 'about', title: 'تعرف على سند 🔍', path: '/journey/about', icon: '🔍' },
      { id: 'services', title: 'خدماتي مع سند 🛠️', path: '/journey/services', icon: '🛠️' },
      { id: 'ai', title: 'تحدث مع سند AI 🚀', path: '/journey/ai', icon: '🤖' }
    ]
  },
  VALUES_JOURNEY: {
    id: 'values',
    title: 'رحلتي القيمية',
    description: 'الأهداف والطموحات تواصلك تؤسس لشخصية قوية ملهمة ومنتجة.',
    cards: [
      { id: 'commitments', title: 'الالتزام القيمي 🤝', path: '/journey/values-commit', icon: '🤝' },
      { id: 'programs', title: 'البرامج القيمية 🌟', path: '/journey/values-programs', icon: '🌟' }
    ]
  },
  ACADEMIC_JOURNEY: {
    id: 'academic',
    title: 'رحلتي الأكاديمية',
    description: 'حل التخصصات ومن خلال الاختبار تساعدك على معرفة الكلية والقدرات والمهارات وتوجهك بشكل سليم.',
    cards: [
      { id: 'registration', title: 'التسجيل والإرشاد 📝', path: '/journey/registration', icon: '📝' },
      { id: 'colleges', title: 'الكليات 🏛️', path: '/colleges', icon: '🏛️' },
      { id: 'skills', title: 'المهارات الأساسية ⚡', path: '/journey/skills', icon: '⚡' }
    ]
  },
  FINANCIAL_JOURNEY: {
    id: 'financial',
    title: 'رحلتي في المنح والحلول المالية',
    description: 'تقدر تعرف أنواع المنح المتاحة، وتفهم التزاماتك المالية، وتكتشف حلول تساعدك في رحلتك الجامعية.',
    cards: [
      { id: 'scholarships', title: 'المنح الدراسية 🎓', path: '/journey/scholarships', icon: '🎓' },
      { id: 'commitments', title: 'الالتزامات المالية 💰', path: '/journey/financial-commit', icon: '💰' },
      { id: 'solutions', title: 'الحلول المالية 🧮', path: '/journey/financial-solutions', icon: '🧮' }
    ]
  },
  CAMPUS_LIFE: {
    id: 'campus',
    title: 'رحلتي في الحياة الجامعية',
    description: 'الحياة الجامعية مليانة فرص للتطوع، القيادة، وتطوير المهارات الشخصية والاجتماعية.',
    cards: [
      { id: 'leadership', title: 'المهارات والقيادة 🧠', path: '/journey/leadership', icon: '🧠' },
      { id: 'volunteer', title: 'العمل التطوعي 🤲', path: '/journey/volunteer', icon: '🤲' },
      { id: 'services', title: 'الخدمات الطلابية 🏫', path: '/journey/student-services', icon: '🏫' }
    ]
  }
};

export const BADGES: Badge[] = [
  { id: 'b1', title: 'بداية الطموح', description: 'أكملت أول سؤال بنجاح!', icon: '🌱' },
  { id: 'b2', title: 'خبير الكليات', description: 'أجبت على أسئلة التخصص بنجاح.', icon: '🎓' },
  { id: 'b3', title: 'مثقف سند', description: 'أنهيت رحلة أكاديمية كاملة.', icon: '✨' }
];
