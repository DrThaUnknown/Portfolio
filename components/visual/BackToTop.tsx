"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 320);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-18 right-12 z-[60] flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300"
          style={{
            background:"linear-gradient(180deg, color-mix(in srgb, var(--bg-light) 82%, rgba(255,255,255,0.05)), color-mix(in srgb, var(--bg-dark) 90%, rgba(0,0,0,0.3)))",
            border:"1px solid var(--frame)",
            color:"var(--primary)",
            backdropFilter:"blur(12px)",
            boxShadow:"0 8px 26px rgba(0,0,0,0.45), 0 0 18px var(--planet-glow)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "var(--primary)";
            e.currentTarget.style.boxShadow   = "0 0 22px var(--planet-glow)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "var(--frame)";
            e.currentTarget.style.boxShadow   = "0 8px 26px rgba(0,0,0,0.45), 0 0 18px var(--planet-glow)";
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ filter:"drop-shadow(0 0 10px var(--planet-glow))" }}
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
