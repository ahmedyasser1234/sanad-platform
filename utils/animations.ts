import { Variants } from 'framer-motion';

// Fixed: Moved transition properties inside individual variants to correctly satisfy the Variants type definition
export const pageTransition: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Fixed: Added Variants type to properly type container stagger transition
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Fixed: Added Variants type for list item animations
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Fixed: Added Variants type to resolve error where "spring" was inferred as generic string instead of AnimationGeneratorType
export const popIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  }
};

// Fixed: Added Variants type for shake feedback animation
export const shake: Variants = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  }
};

// Fixed: Added Variants type for pulse feedback animation
export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: { duration: 0.4, repeat: 1 }
  }
};

// Mascot Animations
// Fixed: Added Variants type to fix 'string' is not assignable to 'Easing' error for ease: "easeInOut" and others
export const mascotVariants: Variants = {
  idle: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  talking: {
    y: [0, -5, 0],
    transition: {
      duration: 0.2,
      repeat: Infinity,
      ease: "linear"
    }
  },
  happy: {
    y: [0, -40, 0],
    scale: [1, 1.1, 1],
    transition: { duration: 0.5, ease: "backOut" }
  },
  sad: {
    rotate: [0, -10, 0],
    y: [0, 10, 0],
    transition: { duration: 0.5 }
  },
  writing: {
    rotate: [0, -2, 2, -2, 0],
    transition: { duration: 0.2, repeat: Infinity }
  }
};

// Mouth animation for talking
// Fixed: Added Variants type for mouth animation labels
export const mouthVariants: Variants = {
  talking: {
    scaleY: [1, 1.5, 0.8, 1.3, 1],
    transition: { duration: 0.2, repeat: Infinity }
  },
  idle: { scaleY: 1 }
};

// Notebook animation for writing
// Fixed: Added Variants type to resolve "spring" literal type error in transitions
export const notebookVariants: Variants = {
  hidden: { opacity: 0, scale: 0, y: 50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};