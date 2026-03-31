"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PLANETS,
  PLANET_ORDER,
  type PlanetConfig,
  type PlanetKey,
} from "@/data/planets";
import { usePlanetTheme } from "@/components/providers/PlanetThemeProvider";
import Planet from "../visual/Planet";
import ConnectButton from "../visual/ConnectButton";

gsap.registerPlugin(ScrollTrigger);

const TELEMETRY = [
  { label: "STATUS", value: "ONLINE", color: "#4ade80" },
  { label: "ROLE", value: "FRONT-END DEV", color: "var(--primary)" },
  { label: "LOCATION", value: "NEW YORK, NY", color: "var(--primary)" },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const introTlRef = useRef<gsap.core.Timeline | null>(null);
  const { activePlanet, planet, setActivePlanet } = usePlanetTheme();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-telem", { y: -16, opacity: 0 });
      gsap.set(".hero-word", { y: 80, opacity: 0, rotateX: -45, transformPerspective: 800 });
      gsap.set(".hero-subtitle", { y: 28, opacity: 0 });
      gsap.set(".hero-mobile-systems", { y: 20, opacity: 0 });
      gsap.set(".hero-cta", { y: 10, opacity: 0 });
      gsap.set(".hero-orb-wrap", { opacity: 0, scale: 0.88 });
      gsap.set(".hero-scan", { y: -18, opacity: 0 });

      introTlRef.current = gsap.timeline({ defaults: { ease: "expo.out" }, paused: true })
        .to(".hero-telem", { y: 0, opacity: 1, duration: 0.65 })
        .to(".hero-word", { y: 0, opacity: 1, rotateX: 0, stagger: 0.12, duration: 0.9 }, "-=0.3")
        .to(".hero-subtitle", { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .to(".hero-mobile-systems", { y: 0, opacity: 1, duration: 0.65 }, "-=0.45")
        .to(".hero-cta", { y: 0, opacity: 1, duration: 0.6 }, "-=0.42")
        .to(".hero-orb-wrap", { opacity: 1, scale: 1, duration: 1.3 }, "-=1.05")
        .to(".hero-scan", { y: 0, opacity: 1, duration: 0.7 }, "-=1.05");

      gsap.to(".hero-content-fade", {
        opacity: 0.18,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "55% top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const playIntro = () => {
      if (introTlRef.current && !introTlRef.current.isActive()) {
        introTlRef.current.restart();
      }
    };

    if (document.body.dataset.appLoaded === "true") playIntro();
    document.addEventListener("app:loaded", playIntro);
    return () => document.removeEventListener("app:loaded", playIntro);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ padding: "0 clamp(1.5rem, 6vw, 5rem)" }}
      >
        <HeroScanMatrix planet={planet} />

        <div className="hero-content-fade w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-10">
          <div className="flex flex-col gap-6 lg:gap-7 relative">
            <div className="absolute pointer-events-none" style={{ top: -32, left: -32 }} aria-hidden>
              <div style={{ position: "absolute", top: 14, left: 4, width: 26, height: 1, background: "var(--primary)", opacity: 0.4 }} />
              <div style={{ position: "absolute", left: 14, top: 4, height: 26, width: 1, background: "var(--primary)", opacity: 0.4 }} />
            </div>

            <div
              className="hero-telem flex flex-wrap gap-5 lg:gap-9 pb-4"
              style={{ borderBottom: "1px solid var(--frame)" }}
            >
              {TELEMETRY.map(item => (
                <div key={item.label} className="flex flex-col gap-1">
                  <span style={{ fontFamily: "monospace", fontSize: "0.58rem", letterSpacing: "0.24em", color: "rgba(255,255,255,0.42)", textTransform: "uppercase" }}>
                    {item.label}
                  </span>
                  <span style={{ fontFamily: "monospace", fontSize: "0.76rem", color: item.color, letterSpacing: "0.07em" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <h1
              className="font-bold leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(3.2rem, 7.5vw, 7rem)" }}
            >
              <span className="hero-word inline-block">Hey,</span>{" "}
              <br className="hidden sm:block" />
              <span className="hero-word inline-block">I&apos;m</span>{" "}
              <span
                className="hero-word inline-block"
                style={{ color: "var(--primary)", textShadow: "0 0 48px var(--planet-glow)" }}
              >
                Anthony
              </span>
            </h1>

            <h2
              className="hero-subtitle max-w-xl"
              style={{ fontSize: "clamp(1rem,2.2vw,1.45rem)", color: "rgba(255,255,255,0.58)", lineHeight: 1.65 }}
            >
              CS student and aspiring developer building web apps, ML models,
              and interactive interfaces with a strong focus on polished user experience.
            </h2>

            <div className="hero-cta">
              <ConnectButton />
            </div>

            <div className="hero-mobile-systems lg:hidden flex flex-col items-center gap-4">
              {/* Scaled planet for mobile — absolute centering so scale doesn't misalign */}
              <div style={{ position: "relative", width: "19.2rem", height: "19.2rem", maxWidth: "82vw", maxHeight: "82vw", margin: "0 auto", overflow: "hidden", WebkitMaskImage: "radial-gradient(circle closest-side, black 58%, transparent 82%)", maskImage: "radial-gradient(circle closest-side, black 58%, transparent 82%)", flexShrink: 0 }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) scale(0.62)", transformOrigin: "center center", width: "31rem", height: "31rem" }}>
                  <Planet key={`mobile-${planet.key}`} planet={planet} showBackdrop={false} />
                </div>
              </div>
              <PlanetSelector activePlanet={activePlanet} onPick={setActivePlanet} />
            </div>
          </div>

          <div className="hero-orb-wrap hidden lg:flex flex-col justify-center items-center gap-6">
            <AstrometricDisplay planet={planet} />
            <PlanetSelector activePlanet={activePlanet} onPick={setActivePlanet} />
          </div>
        </div>
      </section>
    </>
  );
}

function HeroScanMatrix({ planet }: { planet: PlanetConfig }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const scanRefs = useRef<(HTMLDivElement | null)[]>([]);
  const noteRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const lines = [
      `OBJ    ${planet.scan.code} / ${planet.scan.designation}`,
      `BIOME  ${planet.scan.biome}`,
      `TEMP   ${planet.scan.temperature}`,
      `GRAV   ${planet.scan.gravity}`,
      `RISK   ${planet.scan.hazard}`,
      `AIR    ${planet.scan.atmosphere}`,
      `STAT   ${planet.scan.status}`,
    ];

    scanRefs.current.forEach(ref => {
      if (ref) ref.textContent = "";
    });
    noteRefs.current.forEach(ref => {
      if (ref) ref.textContent = "";
    });

    const timeline = gsap.timeline();

    if (panelRef.current) {
      timeline.fromTo(
        panelRef.current,
        { borderColor: "rgba(255,255,255,0.08)", boxShadow: "0 0 0 rgba(0,0,0,0)" },
        { borderColor: "var(--primary)", boxShadow: "0 0 28px var(--planet-glow)", duration: 0.35, ease: "power2.out" },
        0,
      );
    }

    lines.forEach((line, index) => {
      const ref = scanRefs.current[index];
      if (!ref) return;

      const state = { value: 0 };
      timeline.to(
        state,
        {
          value: line.length,
          duration: Math.max(0.35, line.length * 0.016),
          ease: "none",
          onUpdate: () => {
            if (ref) {
              ref.textContent = line.slice(0, Math.floor(state.value));
            }
          },
        },
        index === 0 ? 0.08 : ">-0.12",
      );
    });

    planet.scan.factoids.slice(0, 2).forEach((fact, index) => {
      const ref = noteRefs.current[index];
      if (!ref) return;
      const line = `NOTE ${index + 1} ${fact}`;
      const state = { value: 0 };
      timeline.to(
        state,
        {
          value: line.length,
          duration: Math.max(0.55, line.length * 0.014),
          ease: "none",
          onUpdate: () => {
            if (ref) {
              ref.textContent = line.slice(0, Math.floor(state.value));
            }
          },
        },
        ">-0.08",
      );
    });

    return () => {
      timeline.kill();
    };
  }, [planet]);

  return (
    <div
      ref={panelRef}
      className="hero-scan hidden xl:block"
      style={{
        position: "absolute",
        top: "calc(5px)",
        right: "clamp(1.5rem, 4vw, 3.5rem)",
        width: "min(300px, 22vw)",
        zIndex: 8,
        pointerEvents: "none",
        border: "1px solid var(--frame)",
        background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.18))",
        backdropFilter: "blur(14px)",
        padding: "1rem 1rem 0.9rem",
      }}
    >
      <div style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.22em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginBottom: "0.85rem" }}>
        Scan Matrix
      </div>
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={index}
          ref={element => {
            scanRefs.current[index] = element;
          }}
          style={{
            fontFamily: "monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.08em",
            color: index === 0 ? "var(--primary)" : "rgba(255,255,255,0.72)",
            minHeight: "1.1rem",
            marginBottom: index === 6 ? "0.7rem" : "0.45rem",
          }}
        />
      ))}
      <div style={{ paddingTop: "0.7rem", borderTop: "1px solid var(--frame)" }}>
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            ref={element => {
              noteRefs.current[index] = element;
            }}
            style={{
              fontFamily: "monospace",
              fontSize: "0.62rem",
              lineHeight: 1.55,
              letterSpacing: "0.05em",
              color: "rgba(255,255,255,0.56)",
              minHeight: index === 0 ? "2rem" : "2.4rem",
              marginBottom: index === 0 ? "0.3rem" : 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function AstrometricDisplay({ planet }: { planet: PlanetConfig }) {
  const displayRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const midRingRef = useRef<HTMLDivElement>(null);
  const innerRingRef = useRef<HTMLDivElement>(null);
  const arcRingRef = useRef<HTMLDivElement>(null);
  const pulseRingRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (outerRingRef.current) gsap.to(outerRingRef.current, { rotate: 360, duration: 36, ease: "none", repeat: -1 });
      if (midRingRef.current) gsap.to(midRingRef.current, { rotate: -360, duration: 28, ease: "none", repeat: -1 });
      if (innerRingRef.current) gsap.to(innerRingRef.current, { rotate: 360, duration: 18, ease: "none", repeat: -1 });
      if (arcRingRef.current) gsap.to(arcRingRef.current, { rotate: -360, duration: 10, ease: "none", repeat: -1 });
      if (pulseRingRef.current) gsap.to(pulseRingRef.current, { scale: 1.08, opacity: 0.2, duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
      if (sweepRef.current) gsap.fromTo(sweepRef.current, { rotate: -24 }, { rotate: 22, duration: 4.8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, displayRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!displayRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(displayRef.current, { scale: 0.985, filter: "brightness(1.25)" }, { scale: 1, filter: "brightness(1)", duration: 0.65, ease: "power2.out" });
    const labels = displayRef.current.querySelectorAll(".planet-copy");
    if (labels.length) {
      tl.fromTo(labels, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power2.out" }, 0);
    }
    return () => {
      tl.kill();
    };
  }, [planet.key]);

  const bd = planet.orbital.backdrop;
  const bdDiamRem = bd ? 15.5 * planet.orbital.displayScale * bd.size : 0;
  const bdXOff = bd ? (parseFloat(bd.x) / 100 * 31 - 15.5) : 0;
  const bdYOff = bd ? (parseFloat(bd.y) / 100 * 31 - 15.5) : 0;

  return (
    <div
      ref={displayRef}
      style={{
        position: "relative",
        width: "min(84vw, 920px)",
        aspectRatio: "1 / 1",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "visible",
      }}
    >
      {/* ── Backdrop planet — rendered first so it sits behind all rings ── */}
      {bd && (
        <div style={{
          position: "absolute",
          left: `calc(50% + ${bdXOff.toFixed(2)}rem)`,
          top: `calc(50% + ${bdYOff.toFixed(2)}rem)`,
          transform: "translate(-50%, -50%)",
          width: `${bdDiamRem.toFixed(2)}rem`,
          height: `${bdDiamRem.toFixed(2)}rem`,
          borderRadius: "50%",
          background: bd.background,
          opacity: bd.opacity,
          boxShadow: `0 0 44px ${bd.glow}`,
          filter: `blur(${bd.blur}px)`,
          overflow: "hidden",
          pointerEvents: "none",
        }}>
          {bd.texture?.length ? (
            <div style={{ position: "absolute", inset: "-6%", borderRadius: "50%", backgroundImage: bd.texture.join(","), mixBlendMode: "soft-light", opacity: 0.9 }} />
          ) : null}
          {bd.atmosphere ? (
            <div style={{ position: "absolute", inset: "-8%", borderRadius: "50%", backgroundImage: bd.atmosphere, mixBlendMode: "screen", opacity: 0.55, filter: "blur(12px)" }} />
          ) : null}
          {bd.rimColor ? (
            <div style={{ position: "absolute", inset: "-2%", borderRadius: "50%", border: `1px solid ${bd.rimColor}` }} />
          ) : null}
        </div>
      )}

      {(["tl", "tr", "bl", "br"] as const).map(pos => <AstroCorner key={pos} pos={pos} />)}

      <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid var(--frame)" }} />

      <div
        ref={outerRingRef}
        style={{
          position: "absolute",
          width: "86%",
          height: "86%",
          borderRadius: "50%",
          background: "conic-gradient(from 0deg, transparent 0deg 18deg, rgba(255,255,255,0.14) 18deg 26deg, transparent 26deg 70deg, var(--primary) 70deg 75deg, transparent 75deg 140deg, rgba(255,255,255,0.08) 140deg 148deg, transparent 148deg 220deg, rgba(255,255,255,0.18) 220deg 228deg, transparent 228deg 360deg)",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))",
          opacity: 0.72,
        }}
      />

      <div
        ref={midRingRef}
        style={{
          position: "absolute",
          width: "70%",
          height: "70%",
          borderRadius: "50%",
          background: "repeating-conic-gradient(from 0deg, rgba(255,255,255,0.1) 0deg 4deg, transparent 4deg 18deg)",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 1px), #000 calc(100% - 1px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 1px), #000 calc(100% - 1px))",
          opacity: 0.36,
        }}
      />

      <div
        ref={arcRingRef}
        style={{
          position: "absolute",
          width: "58%",
          height: "58%",
          borderRadius: "50%",
          background: "conic-gradient(from 0deg, transparent 0deg 210deg, rgba(255,255,255,0.08) 210deg 236deg, var(--primary) 236deg 270deg, rgba(255,255,255,0.08) 270deg 290deg, transparent 290deg 360deg)",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px))",
          filter: "drop-shadow(0 0 16px var(--planet-glow))",
          opacity: 0.85,
        }}
      />

      <div
        ref={innerRingRef}
        style={{
          position: "absolute",
          width: "42%",
          height: "42%",
          borderRadius: "50%",
          border: "1px dashed rgba(255,255,255,0.18)",
          opacity: 0.5,
        }}
      />

      <div
        ref={pulseRingRef}
        style={{
          position: "absolute",
          width: "34%",
          height: "34%",
          borderRadius: "50%",
          border: "1px solid var(--primary)",
          boxShadow: "0 0 24px var(--planet-glow)",
          opacity: 0.08,
        }}
      />

      <div
        ref={sweepRef}
        style={{
          position: "absolute",
          width: "72%",
          height: 2,
          background: "linear-gradient(90deg, rgba(0,0,0,0), rgba(255,255,255,0.16), var(--primary), rgba(0,0,0,0))",
          filter: "blur(1px) drop-shadow(0 0 10px var(--planet-glow))",
          opacity: 0.72,
        }}
      />

      <div style={{ position: "absolute", inset: "18%", borderRadius: "50%", background: `radial-gradient(circle, ${planet.palette.glow} 0%, rgba(0,0,0,0) 70%)`, filter: "blur(30px)", opacity: 0.42 }} />

      <div style={{ position: "relative", zIndex: 2 }}>
        <Planet key={planet.key} planet={planet} showBackdrop={false} />
      </div>

      <div className="planet-copy" style={{ position: "absolute", top: "7.5%", left: "50%", transform: "translateX(-50%)", textAlign: "center", pointerEvents: "none", whiteSpace: "nowrap" }}>
        <div style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.18em", color: "var(--primary)" }}>
          OBJ: {planet.scan.code}
        </div>
        <div style={{ fontFamily: "monospace", fontSize: "0.52rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.42)", marginTop: 4 }}>
          {planet.scan.designation}
        </div>
      </div>

      <div className="planet-copy" style={{ position: "absolute", bottom: "6.5%", left: "50%", transform: "translateX(-50%)", textAlign: "center", pointerEvents: "none", whiteSpace: "nowrap" }}>
        <div style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.35)" }}>
          SCAN: {planet.scan.status.toUpperCase()}
        </div>
      </div>

      <div className="planet-copy" style={{ position: "absolute", right: "10%", bottom: "18%", textAlign: "right", pointerEvents: "none" }}>
        <div style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.38)", textTransform: "uppercase" }}>
          Click World
        </div>
        <div style={{ fontFamily: "monospace", fontSize: "0.58rem", letterSpacing: "0.18em", color: "var(--primary)", textTransform: "uppercase" }}>
          Open Systems
        </div>
      </div>
    </div>
  );
}

function PlanetSelector({
  activePlanet,
  onPick,
}: {
  activePlanet: PlanetKey;
  onPick: (key: PlanetKey) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.55rem" }}>
      <div style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.26em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
        {"// ACTIVE SYSTEM"}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", justifyContent: "center" }}>
        {PLANET_ORDER.map(planetKey => {
          const p = PLANETS[planetKey];
          const active = planetKey === activePlanet;
          return (
            <button
              key={planetKey}
              onClick={() => onPick(planetKey)}
              style={{
                display: "flex", alignItems: "center", gap: "0.38rem",
                padding: "0.38rem 0.75rem",
                border: `1px solid ${active ? p.palette.primary : "var(--frame)"}`,
                background: active ? `color-mix(in srgb, ${p.palette.bgLight} 60%, transparent)` : "transparent",
                color: active ? p.palette.primary : "rgba(255,255,255,0.44)",
                fontFamily: "monospace", fontSize: "0.62rem", letterSpacing: "0.12em",
                textTransform: "uppercase", cursor: "pointer",
                boxShadow: active ? `0 0 14px ${p.palette.glow}` : "none",
                transition: "border-color 0.2s, background 0.2s, color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = p.palette.primary;
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.72)";
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--frame)";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.44)";
                }
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: p.palette.primary, boxShadow: `0 0 8px ${p.palette.glow}`, flexShrink: 0 }} />
              {p.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AstroCorner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 14,
    height: 14,
    border: "1px solid var(--frame)",
  };

  if (pos === "tl") return <div style={{ ...base, top: 0, left: 0, borderRight: "none", borderBottom: "none" }} />;
  if (pos === "tr") return <div style={{ ...base, top: 0, right: 0, borderLeft: "none", borderBottom: "none" }} />;
  if (pos === "bl") return <div style={{ ...base, bottom: 0, left: 0, borderRight: "none", borderTop: "none" }} />;
  return <div style={{ ...base, bottom: 0, right: 0, borderLeft: "none", borderTop: "none" }} />;
}
