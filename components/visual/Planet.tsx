"use client";

import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import type { PlanetConfig, PlanetMoonConfig } from "@/data/planets";

const BASE_DIAMETER_REM = 15.5;
const WRAPPER_REM = 31;

export default function Planet({ planet, showBackdrop = true }: { planet: PlanetConfig; showBackdrop?: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ringBackRef = useRef<HTMLDivElement>(null);
  const ringFrontRef = useRef<HTMLDivElement>(null);
  const moonRefs = useRef<(HTMLDivElement | null)[]>([]);

  const diameterRem = BASE_DIAMETER_REM * planet.orbital.displayScale;
  const ringWidthRem = planet.orbital.ring ? diameterRem * planet.orbital.ring.width : 0;
  const ringHeightRem = planet.orbital.ring ? diameterRem * planet.orbital.ring.height : 0;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (ringBackRef.current && ringFrontRef.current) {
        gsap.to([ringBackRef.current, ringFrontRef.current], {
          rotate: "+=360",
          duration: 95,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
      }

      moonRefs.current.forEach(ref => {
        if (!ref) return;
        const duration = Number(ref.dataset.duration) || 30;
        gsap.to(ref, {
          rotate: "+=360",
          duration,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [planet.key]);

  const ringMask = "radial-gradient(ellipse at center, transparent 0 42%, black 48% 65%, transparent 71%)";

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        opacity: { duration: 1.4 },
        y: { duration: 1.2, ease: "easeOut" },
        scale: { duration: 1.2, ease: "easeOut" },
      }}
      style={{
        position: "relative",
        width: `${WRAPPER_REM}rem`,
        height: `${WRAPPER_REM}rem`,
      }}
    >
      {showBackdrop && planet.orbital.backdrop && (
        <div
          style={{
            position: "absolute",
            width: `${diameterRem * planet.orbital.backdrop.size}rem`,
            height: `${diameterRem * planet.orbital.backdrop.size}rem`,
            borderRadius: "50%",
            left: planet.orbital.backdrop.x,
            top: planet.orbital.backdrop.y,
            transform: "translate(-50%, -50%)",
            background: planet.orbital.backdrop.background,
            opacity: planet.orbital.backdrop.opacity,
            boxShadow: `0 0 44px ${planet.orbital.backdrop.glow}`,
            filter: `blur(${planet.orbital.backdrop.blur}px)`,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {planet.orbital.backdrop.texture?.length ? (
            <div
              style={{
                position: "absolute",
                inset: "-6%",
                borderRadius: "50%",
                backgroundImage: planet.orbital.backdrop.texture.join(","),
                mixBlendMode: "soft-light",
                opacity: 0.9,
              }}
            />
          ) : null}

          {planet.orbital.backdrop.atmosphere ? (
            <div
              style={{
                position: "absolute",
                inset: "-8%",
                borderRadius: "50%",
                backgroundImage: planet.orbital.backdrop.atmosphere,
                mixBlendMode: "screen",
                opacity: 0.55,
                filter: "blur(12px)",
              }}
            />
          ) : null}

          {planet.orbital.backdrop.rimColor ? (
            <div
              style={{
                position: "absolute",
                inset: "-2%",
                borderRadius: "50%",
                border: `1px solid ${planet.orbital.backdrop.rimColor}`,
              }}
            />
          ) : null}
        </div>
      )}

      {planet.orbital.ring && (
        <div
          ref={ringBackRef}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: `${ringWidthRem}rem`,
            height: `${ringHeightRem}rem`,
            transform: `translate(-50%, -50%) rotate(${planet.orbital.ring.tilt}deg)`,
            borderRadius: "999px",
            background: planet.orbital.ring.background,
            opacity: planet.orbital.ring.opacity * 0.72,
            filter: `blur(${planet.orbital.ring.blur}px)`,
            clipPath: `inset(${planet.orbital.ring.backInset})`,
            WebkitMaskImage: ringMask,
            maskImage: ringMask,
            pointerEvents: "none",
          }}
        />
      )}

      {planet.orbital.moons?.filter(moon => !moon.front).map((moon, index) => (
        <OrbitingMoon
          key={`moon-back-${index}`}
          moon={moon}
          diameterRem={diameterRem}
          orbitRef={element => {
            moonRefs.current[index] = element;
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: `${diameterRem}rem`,
          height: `${diameterRem}rem`,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          overflow: "hidden",
          background: planet.render.baseGradient,
          boxShadow: `0 0 42px ${planet.palette.glow}, 0 0 120px ${planet.palette.glow}`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-20%",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${planet.palette.glow} 0%, rgba(0,0,0,0) 62%)`,
            opacity: 0.42,
            filter: "blur(22px)",
            pointerEvents: "none",
          }}
        />

        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: "-8%",
            borderRadius: "50%",
            backgroundImage: planet.render.surfaceTexture.join(","),
            mixBlendMode: "soft-light",
            opacity: 0.95,
            pointerEvents: "none",
          }}
        />

        {planet.render.cloudLayer && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "-7%",
              borderRadius: "50%",
              backgroundImage: planet.render.cloudLayer,
              mixBlendMode: "screen",
              opacity: 0.5,
              filter: "blur(8px)",
              pointerEvents: "none",
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            inset: "16% auto auto 16%",
            width: "38%",
            height: "38%",
            borderRadius: "50%",
            background: planet.render.specular,
            filter: "blur(12px)",
            opacity: 0.62,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: "-8% -10% -8% 44%",
            background: planet.render.shadowInset,
            filter: "blur(18px)",
            pointerEvents: "none",
          }}
        />

        {planet.orbital.ring && (
          <div
            style={{
              position: "absolute",
              inset: "12% -20% 44% -20%",
              background: planet.orbital.ring.shadow,
              transform: `rotate(${planet.orbital.ring.tilt}deg)`,
              filter: "blur(10px)",
              pointerEvents: "none",
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            inset: "-4%",
            borderRadius: "50%",
            border: `1px solid ${planet.render.rimColor}`,
            boxShadow: planet.render.rimGlow,
            pointerEvents: "none",
          }}
        />
      </div>

      {planet.orbital.ring && (
        <div
          ref={ringFrontRef}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: `${ringWidthRem}rem`,
            height: `${ringHeightRem}rem`,
            transform: `translate(-50%, -50%) rotate(${planet.orbital.ring.tilt}deg)`,
            borderRadius: "999px",
            background: planet.orbital.ring.background,
            opacity: planet.orbital.ring.opacity,
            filter: `blur(${planet.orbital.ring.blur}px)`,
            clipPath: `inset(${planet.orbital.ring.frontInset})`,
            WebkitMaskImage: ringMask,
            maskImage: ringMask,
            pointerEvents: "none",
          }}
        />
      )}

      {planet.orbital.moons?.filter(moon => moon.front).map((moon, index) => (
        <OrbitingMoon
          key={`moon-front-${index}`}
          moon={moon}
          diameterRem={diameterRem}
          orbitRef={element => {
            moonRefs.current[planet.orbital.moons ? planet.orbital.moons.length + index : index] = element;
          }}
        />
      ))}
    </motion.div>
  );
}

function OrbitingMoon({
  moon,
  diameterRem,
  orbitRef,
}: {
  moon: PlanetMoonConfig;
  diameterRem: number;
  orbitRef: (element: HTMLDivElement | null) => void;
}) {
  const moonSize = diameterRem * moon.size;

  return (
    <div
      ref={orbitRef}
      data-duration={moon.duration}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: `${diameterRem * moon.orbitWidth}rem`,
        height: `${diameterRem * moon.orbitHeight}rem`,
        transform: `translate(-50%, -50%) rotate(${moon.angle}deg)`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          width: `${moonSize}rem`,
          height: `${moonSize}rem`,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: moon.gradient,
          boxShadow: `0 0 16px ${moon.glow}`,
        }}
      />
    </div>
  );
}
