"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ScrollDownArrow() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check initial scroll position
    setIsVisible(window.scrollY < 100);

    const handleScroll = () => {
      // Hide arrow when user scrolls down more than 100px
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.85,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 cursor-pointer"
      onClick={scrollToContent}
    >
      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-sm text-(--text-muted) font-medium">Scroll Down</span>
        <svg
          className="w-6 h-6 text-(--text-muted)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </motion.div>
  );
}
