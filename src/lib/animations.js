// src/lib/animations.js
// Standard Animation Vocabulary implementation menggunakan Framer Motion

// Easing
// Ease-out: Mulai cepat, melambat di akhir. Sangat cocok untuk elemen UI yang muncul.
export const easeOut = [0.25, 1, 0.5, 1];
// Ease-in-out: Lambat, cepat, lambat.
export const easeInOut = [0.4, 0, 0.2, 1];
// Spring: Motion berbasis fisika untuk interaksi yang terasa fisik dan natural.
export const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
};
export const bouncySpring = {
  type: 'spring',
  stiffness: 400,
  damping: 15,
};

// Page Transitions (Fade in + y slide ringan)
// Memberikan transisi elegan tanpa mengubah posisi layout utama.
export const pageTransition = {
  initial: { opacity: 0, y: 40, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' }
};

// Scroll Reveal (Fade in + sedikit Slide in dari bawah)
export const scrollReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: easeOut }
  }
};

// Stagger (menganimasi beberapa item berurutan dengan jeda kecil)
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Feedback & Interaction (Hover effect & Press/Tap feedback)
export const tapFeedback = { scale: 0.97, transition: spring };
export const hoverEffect = { y: -4, transition: spring };
