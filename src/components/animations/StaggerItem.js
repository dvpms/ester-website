'use client';

import { motion } from 'framer-motion';
import { scrollReveal } from '@/lib/animations';

export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={scrollReveal}
    >
      {children}
    </motion.div>
  );
}
