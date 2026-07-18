'use client';

import { motion } from 'framer-motion';
import { scrollReveal } from '@/lib/animations';

export function ScrollReveal({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={scrollReveal}
    >
      {children}
    </motion.div>
  );
}
