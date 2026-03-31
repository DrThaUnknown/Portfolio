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
  bgDark:   "var(--bg-dark)",
};

const LINKS = [
  { id:"GH-01", label:"GITHUB",   value:"github.com/DrThaUnknown",                 href:"https://github.com/DrThaUnknown" },
  { id:"LN-02", label:"LINKEDIN", value:"linkedin.com/in/contreras-linarez-anthony", href:"https://www.linkedin.com/in/contreras-linarez-anthony/" },
  { id:"EM-03", label:"EMAIL",    value:"clanthony.j@gmail.com",                    href:"mailto:clanthony.j@gmail.com" },
];

export default function ContactClient() {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([".ct-label", ".ct-title", ".ct-sub"], { y: -20, opacity: 0 });
      gsap.set(".ct-divider", { scaleX: 0, transformOrigin: "left center" });
      gsap.set([".ct-card", ".ct-avail"], { y: 30, opacity: 0 });

      gsap.timeline({ defaults: { ease: "expo.out" } })
        .to(".ct-label",   { y: 0, opacity: 1, duration: 0.5 })
        .to(".ct-title",   { y: 0, opacity: 1, duration: 0.8 }, "-=0.3")
        .to(".ct-divider", { scaleX: 1, duration: 0.7 },        "-=0.4")
        .to(".ct-sub",     { y: 0, opacity: 1, duration: 0.6 }, "-=0.4");

      gsap.to(".ct-card", { y: 0, opacity: 1, stagger: 0.1, duration: 0.65, ease: "expo.out",
        scrollTrigger: { trigger: ".ct-card", start: "top 90%", toggleActions: "play none none none" } });

      gsap.to(".ct-avail", { y: 0, opacity: 1, duration: 0.7, ease: "expo.out",
        scrollTrigger: { trigger: ".ct-avail", start: "top 90%", toggleActions: "play none none none" } });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{ paddingTop: "calc(90px + 3rem)", paddingBottom: "5rem", minHeight: "100vh" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 clamp(1.25rem, 5vw, 3rem)", display: "flex", flexDirection: "column", gap: "3rem" }}>

        {/* ── Header ─────────────────────────────────────────────── */}
        <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
          <div className="ct-label" style={{ fontFamily:"monospace", fontSize:"0.7rem", letterSpacing:"0.28em", color:A.dim, textTransform:"uppercase" }}>
            {"// SECTION.04"}
          </div>
          <h1 className="ct-title" style={{ fontFamily:"monospace", fontSize:"clamp(2.8rem,7vw,5.5rem)", fontWeight:"bold", letterSpacing:"-0.01em", color:"var(--text)", lineHeight:0.95 }}>
            CONTACT
          </h1>
          <div className="ct-divider" style={{ height:1, background:`linear-gradient(90deg, ${A.lineMid}, transparent)`, marginTop:"0.5rem" }} />
          <p className="ct-sub" style={{ fontSize:"clamp(1rem,2vw,1.2rem)", color:A.text, lineHeight:1.65, maxWidth:520, marginTop:"0.5rem" }}>
            Want to collaborate or have an opportunity? I&apos;m always open to meaningful conversations.
          </p>
        </div>

        {/* ── Open channels ───────────────────────────────────────── */}
        <div>
          <div style={{ fontFamily:"monospace", fontSize:"0.65rem", letterSpacing:"0.25em", color:A.dim, marginBottom:"1rem" }}>{"// OPEN CHANNELS"}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
            {LINKS.map(link => (
              <a key={link.id} href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="ct-card"
                style={{
                  display:"flex", justifyContent:"space-between", alignItems:"center",
                  border:`1px solid ${A.line}`, borderLeft:`2px solid ${A.dim}`,
                  padding:"1.25rem 1.4rem", background:A.bg,
                  textDecoration:"none", transition:"border-color 0.2s, background 0.2s",
                  gap:"1rem",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = "var(--primary)"; (e.currentTarget as HTMLAnchorElement).style.background = A.bgHov; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderLeftColor = A.dim; (e.currentTarget as HTMLAnchorElement).style.background = A.bg; }}
              >
                <div style={{ minWidth:0 }}>
                  <div style={{ fontFamily:"monospace", fontSize:"0.58rem", letterSpacing:"0.2em", color:A.dim, marginBottom:"0.3rem" }}>{link.id} — {link.label}</div>
                  <div style={{ fontFamily:"monospace", fontSize:"clamp(0.85rem,1.8vw,1rem)", color:"var(--primary)", letterSpacing:"0.04em", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{link.value}</div>
                </div>
                <span style={{ color:A.dim, fontSize:"1.1rem", flexShrink:0 }}>↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Availability ────────────────────────────────────────── */}
        <div className="ct-avail" style={{ border:`1px solid ${A.line}`, padding:"1.75rem", background:A.bg, display:"flex", flexDirection:"column", gap:"1.25rem" }}>
          <div style={{ fontFamily:"monospace", fontSize:"0.65rem", letterSpacing:"0.25em", color:A.dim }}>{"// AVAILABILITY"}</div>
          <div style={{ display:"flex", alignItems:"center", gap:"0.85rem" }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 10px #4ade80", flexShrink:0 }} />
            <span style={{ fontFamily:"monospace", fontSize:"clamp(0.9rem,1.8vw,1.05rem)", color:A.text }}>
              Open to internships, full-time, and freelance opportunities
            </span>
          </div>
          <a
            href="/resume.pdf" target="_blank" rel="noopener noreferrer"
            style={{
              alignSelf:"flex-start",
              fontFamily:"monospace", fontSize:"clamp(0.85rem,1.6vw,0.95rem)", letterSpacing:"0.16em",
              color:A.bgDark, background:"var(--primary)",
              border:"1px solid var(--primary)", padding:"0.65rem 1.5rem",
              textDecoration:"none", textTransform:"uppercase", cursor:"pointer",
              transition:"background 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--primary)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--primary)"; (e.currentTarget as HTMLAnchorElement).style.color = A.bgDark; }}
          >
            DOWNLOAD RESUME ↗
          </a>
        </div>

      </div>
    </section>
  );
}
