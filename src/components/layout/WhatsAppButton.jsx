'use client';

// src/components/layout/WhatsAppButton.jsx

import { motion, AnimatePresence } from 'framer-motion';
import { RiWhatsappLine } from 'react-icons/ri';
import { useState, useEffect } from 'react';
import { profile } from '@/data/profile';


export function WhatsAppButton({
  prefilledMessage = 'Halo Esther, saya tertarik dengan properti yang Anda tawarkan. Bisa dibantu?',
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = `${profile.socials.whatsapp}?text=${encodeURIComponent(prefilledMessage)}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <span className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping" />
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hubungi Esther via WhatsApp"
            className="relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-card-hover transition-all duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-green-400 focus-visible:outline-offset-2"
          >
            <RiWhatsappLine className="text-white text-2xl" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
