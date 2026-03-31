"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollDownArrow() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.scrollY < 120;
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.85,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30"
    >
      <button
        onClick={scrollToContent}
        aria-label="Scroll down to projects"
        className="group flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span
            className="text-xs font-medium uppercase tracking-[0.22em]"
            style={{ fontFamily:"monospace", color:"rgba(212,163,115,0.75)" }}
          >
            Scroll <span style={{ color:"var(--primary)" }}>Down</span>
          </span>
          <svg
            className="w-7 h-7"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="var(--primary)"
            aria-hidden="true"
            style={{ filter:"drop-shadow(0 0 10px rgba(212,163,115,0.55))" }}
          >
            <path d="M12 5v14" />
            <path d="M18 13l-6 6-6-6" />
          </svg>
          <div
            style={{
              width: 1,
              height: 34,
              background:"linear-gradient(180deg, rgba(212,163,115,0) 0%, rgba(212,163,115,0.35) 70%, rgba(212,163,115,0.8) 100%)",
              transform:"translateY(-6px)",
            }}
          />
        </motion.div>
      </button>
    </motion.div>
  );
}
