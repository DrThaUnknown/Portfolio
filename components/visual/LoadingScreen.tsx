"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const STAGES = [
  "INITIALIZING SYSTEMS...",
  "CALIBRATING OPTICS...",
  "ALIGNING RENDER MATRIX...",
  "SYNTHESIZING ATMOSPHERE...",
  "GATHERING STELLAR DATA...",
  "DECRYPTING SECURE CHANNELS...",
  "SYSTEMS NOMINAL",
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const overlayRef     = useRef<HTMLDivElement>(null);
  const starsRef       = useRef<HTMLCanvasElement>(null);
  const ringsRef       = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const mousePosRef    = useRef({ x: 0, y: 0 });
  const progressRef    = useRef(0);

  const [progress,   setProgress]   = useState(0);
  const [statusText, setStatusText] = useState(STAGES[0]);
  const [secured,    setSecured]    = useState(false);
  const [showEnter,  setShowEnter]  = useState(false);

  // ── Mouse tracking ──────────────────────────────────────────────────────────
  useEffect(() => {
    const fn = (e: MouseEvent) => { mousePosRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  // ── Animated twinkling cross-star canvas ────────────────────────────────────
  useEffect(() => {
    const canvas = starsRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;

    type Star = { x: number; y: number; sz: number; op: number; ts: number; to: number };
    let stars: Star[] = [];
    let W = 0, H = 0;

    const createStars = (w: number, h: number) => {
      const count = Math.floor((w * h) / 12000);
      stars = [
        { x:w*0.12, y:h*0.09, sz:22, op:0.75, ts:Math.random()*0.04+0.01, to:Math.random()*100 },
        { x:w*0.34, y:h*0.07, sz:36, op:0.95, ts:Math.random()*0.04+0.01, to:Math.random()*100 },
        { x:w*0.53, y:h*0.19, sz:28, op:0.85, ts:Math.random()*0.04+0.01, to:Math.random()*100 },
        { x:w*0.76, y:h*0.27, sz:18, op:0.65, ts:Math.random()*0.04+0.01, to:Math.random()*100 },
        { x:w*0.91, y:h*0.32, sz:22, op:0.75, ts:Math.random()*0.04+0.01, to:Math.random()*100 },
        { x:w*0.36, y:h*0.57, sz:32, op:0.85, ts:Math.random()*0.04+0.01, to:Math.random()*100 },
        { x:w*0.71, y:h*0.84, sz:25, op:0.72, ts:Math.random()*0.04+0.01, to:Math.random()*100 },
      ];
      for (let i = 0; i < count; i++) {
        stars.push({ x:Math.random()*w, y:Math.random()*h, sz:Math.random()*6+2, op:Math.random()*0.28+0.08, ts:Math.random()*0.015+0.005, to:Math.random()*Math.PI*2 });
      }
    };

    function drawCrossStar(x: number, y: number, size: number, opacity: number) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = `rgba(240,218,175,${opacity})`;
      ctx.shadowBlur = 14;
      ctx.shadowColor = "#d4a373";
      ctx.beginPath();
      ctx.rect(-size, -0.5, size*2, 1);
      ctx.rect(-0.5, -size, 1, size*2);
      ctx.rect(-1.5, -1.5, 3, 3);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0,-2); ctx.lineTo(2,0); ctx.lineTo(0,2); ctx.lineTo(-2,0);
      ctx.fillStyle = `rgba(255,245,210,${Math.min(1, opacity*1.5)})`;
      ctx.fill();
      ctx.restore();
    }

    const render = (time: number) => {
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
        createStars(W, H);
      }
      ctx.clearRect(0, 0, W, H);
      const mx = (mousePosRef.current.x - W/2) * 0.018;
      const my = (mousePosRef.current.y - H/2) * 0.018;
      stars.forEach(s => {
        const op = s.op + Math.sin(time * s.ts * 0.001 + s.to) * s.op * 0.5;
        drawCrossStar(s.x - mx*(s.sz/10), s.y - my*(s.sz/10), s.sz, Math.max(0, op));
      });
      animId = requestAnimationFrame(render);
    };

    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    createStars(W, H);
    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, []);

  // ── Progress simulation ─────────────────────────────────────────────────────
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const update = () => {
      if (progressRef.current < 100) {
        progressRef.current = Math.min(100, progressRef.current + Math.random() * 2 + 0.1);
        const pInt = Math.floor(progressRef.current);
        setProgress(pInt);
        const si = Math.min(STAGES.length-1, Math.floor((progressRef.current/100)*STAGES.length));
        setStatusText(STAGES[si]);
        timeout = setTimeout(update, 30 + Math.random()*80);
      } else {
        setProgress(100);
        setStatusText("AWAITING COMMAND");
        setSecured(true);
        setTimeout(() => setShowEnter(true), 400);
      }
    };

    timeout = setTimeout(update, 700);
    return () => clearTimeout(timeout);
  }, []);

  // ── Enter / warp transition ─────────────────────────────────────────────────
  const handleEnter = () => {
    setShowEnter(false);
    gsap.to(ringsRef.current,   { scale: 6, opacity: 0, duration: 1.1, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 1.3, delay: 0.25, ease: "power2.inOut", onComplete: onDone });
  };

  return (
    <div
      ref={overlayRef}
      style={{ position:"fixed", inset:0, zIndex:9999, background:"var(--bg-dark)", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}
    >
      {/* Animated star canvas */}
      <canvas ref={starsRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} />

      {/* Scanlines */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.08) 50%)", backgroundSize:"100% 4px", opacity:0.4, pointerEvents:"none" }} />

      {/* Frame lines */}
      <div style={{ position:"absolute", top:90, left:0, right:0, height:1, background:"rgba(212,163,115,0.15)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:60, left:0, right:0, height:1, background:"rgba(212,163,115,0.15)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", left:40, top:0, bottom:0, width:1, background:"rgba(212,163,115,0.15)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", right:40, top:0, bottom:0, width:1, background:"rgba(212,163,115,0.15)", pointerEvents:"none" }} />
      {/* Frame corners */}
      {[["top:90px","left:40px","borderTop","borderLeft"],["top:90px","right:40px","borderTop","borderRight"],["bottom:60px","left:40px","borderBottom","borderLeft"],["bottom:60px","right:40px","borderBottom","borderRight"]].map(([y,x,b1,b2],i) => (
        <div key={i} style={{ position:"absolute", width:8, height:8, [b1]:"2px solid var(--primary)", [b2]:"2px solid var(--primary)", ...Object.fromEntries([[y.split(":")[0],y.split(":")[1]],[x.split(":")[0],x.split(":")[1]]]), pointerEvents:"none" }} />
      ))}

      {/* Sector link — top left */}
      <div style={{ position:"absolute", top:30, left:60, display:"flex", flexDirection:"column", gap:4 }}>
        <div style={{ fontFamily:"monospace", fontSize:"0.55rem", letterSpacing:"0.22em", color:"rgba(212,163,115,0.4)", textTransform:"uppercase" }}>SECTOR LINK</div>
        <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background: secured ? "#4ade80" : "#f87171", boxShadow: secured ? "0 0 10px #4ade80" : "0 0 6px #f87171", transition:"all 0.5s" }} />
          <span style={{ fontFamily:"monospace", fontSize:"0.65rem", letterSpacing:"0.18em", color: secured ? "#4ade80" : "var(--primary)", textTransform:"uppercase", transition:"color 0.5s" }}>
            {secured ? "SECURED" : "DISCONNECTED"}
          </span>
        </div>
      </div>

      {/* SYS_ID — top right */}
      <div style={{ position:"absolute", top:30, right:60, textAlign:"right" }}>
        <div style={{ fontFamily:"monospace", fontSize:"0.55rem", letterSpacing:"0.22em", color:"rgba(212,163,115,0.4)", textTransform:"uppercase", marginBottom:4 }}>SYS_ID</div>
        <div style={{ fontFamily:"monospace", fontSize:"0.82rem", letterSpacing:"0.14em", color:"var(--primary)" }}>ANTHONYCODES</div>
      </div>

      {/* ── Center: rings + core + progress ──────────────────────── */}
      <div ref={ringsRef} style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center" }}>

        {/* SVG Orbital rings */}
        <div style={{ position:"relative", width:320, height:320, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", overflow:"visible" }} viewBox="0 0 200 200">
            {/* Outer faint ring */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(212,163,115,0.12)" strokeWidth="0.5" />
            {/* Dashed spinning ring CCW */}
            <circle cx="100" cy="100" r="75" fill="none" stroke="rgba(212,163,115,0.5)" strokeWidth="1"
              strokeDasharray="4 8"
              style={{ transformOrigin:"100px 100px", animation:"spin 25s linear infinite reverse", filter:"drop-shadow(0 0 6px var(--primary))" }}
            />
            {/* Dense dashed ring CW */}
            <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(212,163,115,0.28)" strokeWidth="1.5"
              strokeDasharray="1 4"
              style={{ transformOrigin:"100px 100px", animation:"spin 15s linear infinite" }}
            />
            {/* Cardinal markers */}
            <path d="M100 5 v10 M100 185 v10 M5 100 h10 M185 100 h10" stroke="var(--primary)" strokeWidth="1.5" opacity="0.65" />
            {/* Diagonal ticks */}
            <path d="M30 30 l7 7 M170 170 l-7 -7 M30 170 l7 -7 M170 30 l-7 7" stroke="rgba(212,163,115,0.4)" strokeWidth="1" />
          </svg>

          {/* Core light */}
          <div style={{ position:"absolute", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ position:"absolute", width:80, height:80, borderRadius:"50%", background:"var(--primary)", filter:"blur(30px)", opacity:0.22, animation:"pulse 2s ease-in-out infinite" }} />
            <div style={{ position:"relative", width:8, height:8, borderRadius:"50%", background:"white", boxShadow:"0 0 16px #fff, 0 0 32px var(--primary), 0 0 60px rgba(212,163,115,0.4)" }} />
          </div>
        </div>

        {/* Progress area */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.65rem", marginTop:"0.5rem", width:280 }}>
          {/* Percentage */}
          <div style={{ fontFamily:"monospace", fontSize:"clamp(2rem,5vw,3rem)", fontWeight:300, letterSpacing:"0.1em", color:"var(--primary)", filter:"drop-shadow(0 0 12px var(--primary))", lineHeight:1 }}>
            {progress.toString().padStart(2,"0")}%
          </div>

          {/* Bar */}
          <div style={{ width:"100%", height:1, background:"rgba(212,163,115,0.18)", position:"relative", overflow:"hidden" }}>
            <div ref={progressBarRef} style={{ position:"absolute", inset:0, width:`${progress}%`, background:"var(--primary)", boxShadow:"0 0 8px var(--primary)", transition:"width 0.25s ease-out" }} />
          </div>

          {/* Status text */}
          <div style={{ fontFamily:"monospace", fontSize:"0.65rem", letterSpacing:"0.28em", color:"rgba(212,163,115,0.65)", textTransform:"uppercase", textAlign:"center" }}>
            {statusText}
          </div>

          {/* Enter button */}
          {showEnter && (
            <button
              onClick={handleEnter}
              style={{
                marginTop:"0.35rem", fontFamily:"monospace", fontSize:"0.78rem", letterSpacing:"0.25em",
                textTransform:"uppercase", color:"var(--primary)", background:"transparent",
                border:"1px solid var(--primary)", padding:"0.65rem 2.5rem", cursor:"crosshair",
                transition:"background 0.2s, color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background="var(--primary)"; b.style.color="rgba(5,4,2,1)"; b.style.boxShadow="0 0 20px var(--primary)"; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background="transparent"; b.style.color="var(--primary)"; b.style.boxShadow="none"; }}
            >
              ENTER
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.22; }
          50%       { transform: scale(1.25); opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}
