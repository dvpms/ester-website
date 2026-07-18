'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { pageTransition, easeOut } from '@/lib/animations';

export function PageTransitionWrapper({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        variants={pageTransition}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
