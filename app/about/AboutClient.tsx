"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const A = {
  bright:   "var(--primary)",
  dim:      "rgba(255,255,255,0.36)",
  line:     "var(--frame)",
  lineMid:  "var(--frame)",
  text:     "rgba(255,255,255,0.72)",
  textMute: "rgba(255,255,255,0.45)",
  bg:       "color-mix(in srgb, var(--bg) 84%, rgba(255,255,255,0.02))",
  bgHov:    "color-mix(in srgb, var(--bg-light) 78%, rgba(255,255,255,0.04))",
};

const TELEMETRY = [
  { label: "INSTITUTION", value: "Mercy University" },
  { label: "DEGREE",      value: "B.S. Computer Science" },
  { label: "STATUS",      value: "In Progress" },
  { label: "LOCATION",    value: "New York, NY" },
];

const PROGRAMS = [
  { name: "HEOP",             desc: "Higher Education Opportunity Program — opened the door to university despite financial barriers, making higher education possible." },
  { name: "CSTEP",            desc: "Collegiate Science & Technology Entry Program — mentorship, research opportunities, and career guidance in tech." },
  { name: "TechWise",         desc: "Explored software and data engineering fields, gaining clarity on where my skills and interests intersect." },
  { name: "CodePath",         desc: "Technical Interview Prep (Intermediate) — collaboration, technical confidence, and real-world problem-solving with peers." },
  { name: "StreetWise",       desc: "Professional development through mentorship: networking authentically, LinkedIn presence, and navigating professional environments." },
];

const SPECIALIZATIONS = [
  "Full-Stack Web Development",
  "Machine Learning & AI Integration",
  "Cloud Infrastructure & DevOps",
  "Algorithms & Data Structures",
];

export default function AboutClient() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([".ab-label", ".ab-title", ".ab-sub"], { y: -20, opacity: 0 });
      gsap.set(".ab-divider", { scaleX: 0, transformOrigin: "left center" });
      gsap.set([".ab-block", ".ab-telem", ".ab-spec", ".ab-card"], { y: 30, opacity: 0 });

      gsap.timeline({ defaults: { ease: "expo.out" } })
        .to(".ab-label",   { y: 0, opacity: 1, duration: 0.5 })
        .to(".ab-title",   { y: 0, opacity: 1, duration: 0.8 }, "-=0.3")
        .to(".ab-divider", { scaleX: 1, duration: 0.7 },        "-=0.4")
        .to(".ab-sub",     { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");

      gsap.utils.toArray<Element>(".ab-block").forEach(el => {
        gsap.to(el, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } });
      });

      gsap.to(".ab-telem", { y: 0, opacity: 1, stagger: 0.08, duration: 0.55, ease: "expo.out",
        scrollTrigger: { trigger: ".ab-telem", start: "top 90%", toggleActions: "play none none none" } });

      gsap.to(".ab-spec", { y: 0, opacity: 1, stagger: 0.06, duration: 0.5, ease: "power3.out",
        scrollTrigger: { trigger: ".ab-spec", start: "top 90%", toggleActions: "play none none none" } });

      gsap.to(".ab-card", { y: 0, opacity: 1, stagger: 0.09, duration: 0.6, ease: "expo.out",
        scrollTrigger: { trigger: ".ab-card", start: "top 90%", toggleActions: "play none none none" } });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ paddingTop: "calc(90px + 3rem)", paddingBottom: "5rem", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(1.25rem, 5vw, 3rem)", display: "flex", flexDirection: "column", gap: "3rem" }}>

        {/* ── Header ─────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div className="ab-label" style={{ fontFamily:"monospace", fontSize:"0.7rem", letterSpacing:"0.28em", color:A.dim, textTransform:"uppercase" }}>
            {"// SECTION.03"}
          </div>
          <h1 className="ab-title" style={{ fontFamily:"monospace", fontSize:"clamp(2.8rem,7vw,5.5rem)", fontWeight:"bold", letterSpacing:"-0.01em", color:"var(--text)", lineHeight:0.95 }}>
            ABOUT
          </h1>
          <div className="ab-divider" style={{ height:1, background:`linear-gradient(90deg, ${A.lineMid}, transparent)`, marginTop:"0.5rem" }} />
            <p className="ab-sub" style={{ fontSize:"clamp(1rem,2vw,1.2rem)", color:A.text, lineHeight:1.65, maxWidth:560, marginTop:"0.5rem" }}>
            I'm a Developer, passionate about creating meaningful and practical solutions, whether it's designing user-friendly interfaces or building reliable systems.
            </p>
        </div>

        {/* ── Identity paragraphs ─────────────────────────────────── */}
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
          <div style={{ fontFamily:"monospace", fontSize:"0.65rem", letterSpacing:"0.25em", color:A.dim }}>{"// IDENTITY"}</div>
          {[
            `I moved to the U.S. from the Dominican Republic at 10 without speaking English. That experience taught me how to learn fast, adapt, and keep moving when the path isn't obvious — the same mindset I bring to software.`,
            `I discovered programming through a gifted book and kept going because it felt like cooking: you experiment, you adjust, and you make something real. That curiosity turned into a commitment to building products that are both functional and thoughtful.`,
            `What I bring: resourcefulness, clear communication, and a builder's mindset. If there's a problem, I'll learn what I need and deliver a solution that's easy to use and easy to maintain.`,
          ].map((para, i) => (
            <div key={i} className="ab-block" style={{ borderLeft:`2px solid ${A.dim}`, paddingLeft:"1.25rem", color:A.text, fontSize:"clamp(0.9rem,1.6vw,1.05rem)", lineHeight:1.75 }}>
              {para}
            </div>
          ))}
        </div>

        {/* ── Telemetry grid ──────────────────────────────────────── */}
        <div>
          <div style={{ fontFamily:"monospace", fontSize:"0.65rem", letterSpacing:"0.25em", color:A.dim, marginBottom:"1rem" }}>{"// TELEMETRY"}</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))", gap:"0.75rem" }}>
            {TELEMETRY.map(t => (
              <div key={t.label} className="ab-telem" style={{ border:`1px solid ${A.line}`, borderLeft:`2px solid ${A.dim}`, padding:"1rem 1.1rem", background:A.bg }}>
                <div style={{ fontFamily:"monospace", fontSize:"0.58rem", letterSpacing:"0.2em", color:A.dim, marginBottom:"0.35rem", textTransform:"uppercase" }}>{t.label}</div>
                <div style={{ fontFamily:"monospace", fontSize:"0.9rem", color:"var(--primary)", letterSpacing:"0.04em" }}>{t.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Specializations ─────────────────────────────────────── */}
        <div>
          <div style={{ fontFamily:"monospace", fontSize:"0.65rem", letterSpacing:"0.25em", color:A.dim, marginBottom:"1rem" }}>{"// SPECIALIZATIONS"}</div>
          <div style={{ display:"flex", flexDirection:"column" }}>
            {SPECIALIZATIONS.map((s, i) => (
              <div key={i} className="ab-spec" style={{ display:"flex", alignItems:"center", gap:"0.9rem", padding:"0.6rem 0", borderBottom:`1px solid ${A.line}`, color:A.text, fontSize:"clamp(0.9rem,1.6vw,1.05rem)", fontFamily:"monospace" }}>
                <span style={{ color:"var(--primary)", fontSize:"1rem" }}>›</span>{s}
              </div>
            ))}
          </div>
        </div>

        {/* ── Programs ────────────────────────────────────────────── */}
        <div>
          <div style={{ fontFamily:"monospace", fontSize:"0.65rem", letterSpacing:"0.25em", color:A.dim, marginBottom:"1rem" }}>{"// PROGRAMS & COMMUNITIES"}</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:"0.75rem" }}>
            {PROGRAMS.map(p => (
              <div key={p.name} className="ab-card"
                style={{ border:`1px solid ${A.line}`, borderLeft:`2px solid ${A.dim}`, padding:"1.25rem", background:A.bg, transition:"border-color 0.2s, background 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderLeftColor = "var(--primary)"; (e.currentTarget as HTMLDivElement).style.background = A.bgHov; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderLeftColor = A.dim; (e.currentTarget as HTMLDivElement).style.background = A.bg; }}
              >
                <div style={{ fontFamily:"monospace", fontSize:"0.85rem", color:"var(--primary)", letterSpacing:"0.08em", marginBottom:"0.5rem" }}>{p.name}</div>
                <p style={{ fontSize:"0.85rem", color:A.textMute, lineHeight:1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
