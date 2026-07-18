'use client';

import { motion } from 'framer-motion';
import { hoverEffect, tapFeedback } from '@/lib/animations';

export function InteractiveCard({ children, className = '', elementType = 'div' }) {
  const MotionComponent = motion[elementType] || motion.div;
  
  return (
    <MotionComponent
      className={className}
      whileHover={hoverEffect}
      whileTap={tapFeedback}
    >
      {children}
    </MotionComponent>
  );
}
