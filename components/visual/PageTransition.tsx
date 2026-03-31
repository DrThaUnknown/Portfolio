"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { usePlanetTheme } from "@/components/providers/PlanetThemeProvider";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { activePlanet } = usePlanetTheme();
  const ease = (t: number) => t * (2 - t);

  return (
    <motion.div
      key={`${pathname}-${activePlanet}`}
      style={{ position: "relative" }}
      initial={{ opacity: 0, y: 28, scale: 0.985, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.55, ease }}
    >
      {/* Sweep line accent */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          insetInline: "1.5rem",
          top: "-0.25rem",
          height: 2,
          background: "linear-gradient(90deg, transparent, var(--primary), transparent)",
          filter: "drop-shadow(0 0 10px var(--primary))",
          transformOrigin: "left center",
          pointerEvents: "none",
          opacity: 0.6,
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease }}
      />

      {/* Soft top glow */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          insetInline: "1rem",
          top: "-1.5rem",
          height: "110px",
          background: "radial-gradient(60% 140% at 50% 0%, rgba(212,163,115,0.25), rgba(8,6,4,0))",
          pointerEvents: "none",
          opacity: 0.75,
          filter: "blur(10px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        transition={{ duration: 0.7, ease: ease, delay: 0.05 }}
      />

      {children}
    </motion.div>
  );
}
