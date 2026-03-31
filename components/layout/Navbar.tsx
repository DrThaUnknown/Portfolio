"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";

const A = {
  bright:  "var(--primary)",
  dim:     "rgba(255,255,255,0.36)",
  line:    "var(--frame)",
  bg:      "color-mix(in srgb, var(--bg) 78%, rgba(0,0,0,0.5))",
  text:    "rgba(255,255,255,0.66)",
  dark:    "var(--bg-dark)",
};

const NAV_ITEMS = [
  { code: "M-01", label: "HOME",    href: "/" },
  { code: "M-02", label: "ABOUT",   href: "/about" },
  { code: "M-03", label: "CONTACT", href: "/contact" },
];

function NavItem({ code, label, href, active }: { code: string; label: string; href: string; active: boolean }) {
  const lineRef = useRef<HTMLDivElement>(null);

  const onEnter = () => gsap.to(lineRef.current, { scaleX: 1, duration: 0.35, ease: "power2.out", transformOrigin: "left center" });
  const onLeave = () => { if (!active) gsap.to(lineRef.current, { scaleX: 0, duration: 0.28, ease: "power2.in", transformOrigin: "left center" }); };

  useEffect(() => {
    gsap.to(lineRef.current, {
      scaleX: active ? 1 : 0,
      duration: active ? 0.4 : 0.25,
      ease: active ? "expo.out" : "power2.in",
      transformOrigin: "left center",
    });
  }, [active]);

  return (
    <Link href={href} onMouseEnter={onEnter} onMouseLeave={onLeave}
      style={{ display:"flex", flexDirection:"column", gap:3, textDecoration:"none", position:"relative", padding:"0.3rem 0", cursor:"crosshair" }}
    >
      <span style={{ fontFamily:"monospace", fontSize:"0.75rem", letterSpacing:"0.22em", color: active ? A.bright : A.dim, textTransform:"uppercase", transition:"color 0.25s" }}>
        {code}
      </span>
      <span style={{ fontFamily:"monospace", fontSize:"1.05rem", letterSpacing:"0.14em", color: active ? A.bright : A.text, textTransform:"uppercase", transition:"color 0.25s" }}>
        {label}
      </span>
      <div ref={lineRef} style={{ position:"absolute", bottom:0, left:0, width:"100%", height:1, background:"var(--primary)", transform:"scaleX(0)", transformOrigin:"left center" }} />
    </Link>
  );
}

export default function Navbar() {
  const pathname        = usePathname();
  const navRef          = useRef<HTMLElement>(null);
  const drawerRef       = useRef<HTMLDivElement>(null);
  const overlayRef      = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    gsap.set(nav, { y: -90, opacity: 0 });
    gsap.to(nav,  { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", delay: 0.3 });
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const openDrawer = () => {
    setMobileOpen(true);
    requestAnimationFrame(() => {
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(drawerRef.current,  { x: "100%" });
      gsap.to(overlayRef.current,  { opacity: 1, duration: 0.25 });
      gsap.to(drawerRef.current,   { x: "0%", duration: 0.38, ease: "expo.out" });
    });
  };

  const closeDrawer = () => {
    gsap.to(drawerRef.current,  { x: "100%", duration: 0.3, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: () => setMobileOpen(false) });
  };

  useEffect(() => { closeDrawer(); }, [pathname]);

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed", top: 0, left: 0, right: 0,
          height: 90, zIndex: 30,
          display: "flex", alignItems: "center",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          background: scrolled ? A.bg : "transparent",
          borderBottom: scrolled ? `1px solid ${A.line}` : "1px solid transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          boxShadow: scrolled ? "0 12px 32px rgba(0,0,0,0.18)" : "none",
          transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:"0.85rem", textDecoration:"none", flexShrink:0 }}>
          <Image src="/icons/logo.svg" alt="logo" width={34} height={34} priority style={{ opacity:0.9 }} />
          <div className="hidden sm:flex" style={{ flexDirection:"column", gap:2 }}>
            <span style={{ fontFamily:"monospace", fontSize:"0.68rem", letterSpacing:"0.22em", color:A.dim, textTransform:"uppercase" }}>SYS_ID</span>
            <span style={{ fontFamily:"monospace", fontSize:"1rem", letterSpacing:"0.14em", color:A.bright, textTransform:"uppercase" }}>ANTHONYCODES</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex" style={{ marginLeft:"auto", alignItems:"center", gap:"3rem" }}>
          {NAV_ITEMS.map(item => (
            <NavItem key={item.href} {...item} active={pathname === item.href} />
          ))}
          <a
            href="/resume.pdf" target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily:"monospace", fontSize:"1rem", letterSpacing:"0.16em",
              color: A.dark, background:"var(--primary)",
              border:"1px solid var(--primary)", padding:"0.55rem 1.4rem",
              textDecoration:"none", textTransform:"uppercase", cursor:"crosshair",
              boxShadow:"0 0 18px var(--planet-glow)",
              transition:"background 0.2s, color 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "var(--primary)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "var(--primary)"; (e.currentTarget as HTMLAnchorElement).style.color = A.dark; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 18px var(--planet-glow)"; }}
          >
            RESUME ↗
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={mobileOpen ? closeDrawer : openDrawer}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          style={{
            marginLeft:"auto", fontFamily:"monospace", fontSize:"1rem",
            letterSpacing:"0.15em", color:A.bright, background:"transparent",
            border:`1px solid ${A.line}`, padding:"0.55rem 0.9rem", cursor:"crosshair",
            boxShadow:"0 0 16px rgba(0,0,0,0)",
            transition:"box-shadow 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = "0 0 16px var(--planet-glow)";
            e.currentTarget.style.borderColor = "var(--primary)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = "0 0 16px rgba(0,0,0,0)";
            e.currentTarget.style.borderColor = A.line;
          }}
        >
          {mobileOpen ? "[X]" : "[≡]"}
        </button>
      </nav>

      {/* Mobile overlay + drawer */}
      {mobileOpen && (
        <>
          <div ref={overlayRef} onClick={closeDrawer}
            style={{ position:"fixed", inset:0, zIndex:38, background:"color-mix(in srgb, var(--bg-dark) 68%, transparent)", backdropFilter:"blur(6px)" }}
          />
          <div ref={drawerRef}
            style={{
              position:"fixed", top:0, right:0, bottom:0, zIndex:39,
              width:"min(300px, 85vw)",
              background:"color-mix(in srgb, var(--bg) 86%, rgba(0,0,0,0.5))",
              borderLeft:`1px solid ${A.line}`,
              backdropFilter:"blur(20px)",
              boxShadow:"-18px 0 38px rgba(0,0,0,0.24)",
              display:"flex", flexDirection:"column",
              padding:"6rem 2rem 2rem",
            }}
          >
            <div style={{ fontFamily:"monospace", fontSize:"0.65rem", letterSpacing:"0.25em", color:A.dim, marginBottom:"1.5rem" }}>
              {"// NAVIGATION"}
            </div>
            {NAV_ITEMS.map(item => (
              <Link key={item.href} href={item.href} onClick={closeDrawer}
                style={{
                  display:"flex", justifyContent:"space-between", alignItems:"center",
                  fontFamily:"monospace", fontSize:"1.1rem", letterSpacing:"0.1em",
                  color: pathname === item.href ? A.bright : A.text,
                  textDecoration:"none", padding:"1rem 0",
                  borderBottom:`1px solid ${A.line}`,
                  textTransform:"uppercase", transition:"color 0.2s",
                }}
              >
                <span>{item.label}</span>
                <span style={{ fontSize:"0.62rem", color:A.dim }}>{item.code}</span>
              </Link>
            ))}
            <a
              href="/resume.pdf" target="_blank" rel="noopener noreferrer"
              style={{
                marginTop:"2rem", fontFamily:"monospace", fontSize:"1rem",
                letterSpacing:"0.16em", color:A.dark, background:"var(--primary)",
                border:"1px solid var(--primary)", padding:"0.85rem 1.5rem",
                textDecoration:"none", textAlign:"center", textTransform:"uppercase",
                cursor:"crosshair",
                boxShadow:"0 0 18px var(--planet-glow)",
              }}
            >
              RESUME ↗
            </a>
          </div>
        </>
      )}
    </>
  );
}
