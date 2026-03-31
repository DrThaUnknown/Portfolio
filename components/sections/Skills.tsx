"use client";

import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const WHITE_ICONS = new Set([
  "/icons/nextjs.svg",
  "/icons/framermotion.svg",
  "/icons/django.svg",
  "/icons/flask.svg",
  "/icons/vercel.svg",
  "/icons/github.svg",
  "/icons/express.svg",
]);

const AMBER_ICONS = new Set<string>([]);

const WHITE_FILTER = "brightness(0) invert(1) contrast(1.05)";
const AMBER_FILTER = "brightness(0) invert(1) sepia(1) saturate(4) hue-rotate(2deg) brightness(0.78)";

// Icon coloring per brand visibility needs
function iconStyle(src: string): React.CSSProperties {
  if (WHITE_ICONS.has(src))  return { filter: WHITE_FILTER };
  if (AMBER_ICONS.has(src))  return { filter: AMBER_FILTER };
  return {};
}

// Category icons should all share the same amber tint for consistency
function categoryIconStyle(): React.CSSProperties {
  return { filter: AMBER_FILTER, opacity: 0.9 };
}

interface Skill      { name: string; src: string; }
interface SkillCategory { title: string; icon: string; iconSrc?: string; description: string; skills: Skill[]; }

const skillCategories: SkillCategory[] = [
  {
    title: "Languages", icon: "< >", iconSrc: "/icons/code.svg",
    description: "Core languages I write production code in",
    skills: [
      { name: "Python",     src: "/icons/python.svg" },
      { name: "JavaScript", src: "/icons/javascript.svg" },
      { name: "TypeScript", src: "/icons/typescript.svg" },
      { name: "Java",       src: "/icons/java.svg" },
      { name: "HTML5",      src: "/icons/html5.svg" },
      { name: "CSS3",       src: "/icons/css3.svg" },
    ],
  },
  {
    title: "Frontend", icon: "▪", iconSrc: "/icons/front-end.svg",
    description: "UI frameworks and libraries",
    skills: [
      { name: "React",         src: "/icons/react.svg" },
      { name: "Next.js",       src: "/icons/nextjs.svg" },
      { name: "Tailwind",      src: "/icons/tailwind.svg" },
      { name: "Framer Motion", src: "/icons/framermotion.svg" },
      { name: "Zustand",       src: "/icons/zustand-original.svg" },
      { name: "Vite",          src: "/icons/Vite.js.svg" },
      { name: "Figma",         src: "/icons/Figma.svg" },
    ],
  },
  {
    title: "Backend", icon: "⚙", iconSrc: "/icons/back-end.svg",
    description: "Server-side frameworks and APIs",
    skills: [
      { name: "Node.js", src: "/icons/nodejs.svg" },
      { name: "Express", src: "/icons/express.svg" },
      { name: "Django",  src: "/icons/django.svg" },
      { name: "Flask",   src: "/icons/flask.svg" },
      { name: "FastAPI", src: "/icons/FastAPI.svg" },
      { name: "NestJS",  src: "/icons/nestjs.svg" },
    ],
  },
  {
    title: "Database & Cloud", icon: "☁", iconSrc: "/icons/storage.svg",
    description: "Data storage and cloud infrastructure",
    skills: [
      { name: "PostgreSQL", src: "/icons/postgresql.svg" },
      { name: "MongoDB",    src: "/icons/mongodb.svg" },
      { name: "AWS",        src: "/icons/aws.svg" },
      { name: "Vercel",     src: "/icons/vercel.svg" },
      { name: "Redis",      src: "/icons/Redis.svg" },
      { name: "Supabase",   src: "/icons/supabase.svg" },
      { name: "MySQL",      src: "/icons/MySQL.svg" },
    ],
  },
  {
    title: "Data Science", icon: "σ", iconSrc:"/icons/data.svg",
    description: "Machine learning and data analysis tools",
    skills: [
      { name: "NumPy",       src: "/icons/numpy.svg" },
      { name: "Pandas",      src: "/icons/pandas.svg" },
      { name: "scikit-learn",src: "/icons/scitlearn.svg" },
      { name: "OpenAI API",  src: "/icons/openai.svg" },
      { name: "Claude",      src: "/icons/claude.svg" },
      { name: "Jupyter",     src: "/icons/Jupyter.svg" },
    ],
  },
  {
    title: "Tools & DevOps", icon: "⚒", iconSrc: "/icons/devops.svg",
    description: "Development workflow and infrastructure",
    skills: [
      { name: "Git",    src: "/icons/git.svg" },
      { name: "GitHub", src: "/icons/github.svg" },
      { name: "Docker", src: "/icons/docker.svg" },
      { name: "Linux",  src: "/icons/linux.svg" },
      { name: "VS Code",src: "/icons/vscode.svg" },
      { name: "npm",    src: "/icons/npm.svg" },
      { name: "pnpm",   src: "/icons/pnpm.svg" },
      { name: "GitHub Actions", src: "/icons/github-actions.svg" },
      { name: "PuTTY",  src: "/icons/PuTTY.svg" },
      { name: "Xcode",  src: "/icons/Xcode.svg" },
      { name: "Apple",  src: "/icons/Apple.svg" },
      { name: "Arch Linux",  src: "/icons/Arch%20Linux.svg" },
      { name: "Ubuntu",      src: "/icons/Ubuntu.svg" },
      { name: "Proxmox",     src: "/icons/proxmox-logo-stacked-color.svg" },
      { name: "Raspberry Pi", src: "/icons/Raspberry%20Pi.svg" },
      { name: "Home Server", src: "/icons/host.svg" },
    ],
  },
];

const topSkills: Skill[] = [
  { name: "Python",     src: "/icons/python.svg" },
  { name: "React",      src: "/icons/react.svg" },
  { name: "Next.js",    src: "/icons/nextjs.svg" },
  { name: "TypeScript", src: "/icons/typescript.svg" },
  { name: "Django",     src: "/icons/django.svg" },
  { name: "Tailwind",   src: "/icons/tailwind.svg" },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const displayedCategories = activeCategory
    ? skillCategories.filter(c => c.title === activeCategory)
    : skillCategories;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".skills-header", { y: 60, opacity: 0 });
      gsap.set(".top-skill",     { scale: 0, opacity: 0 });
      gsap.set(".skill-category",{ y: 60, opacity: 0, rotateY: -12, transformPerspective: 800 });

      gsap.timeline({ scrollTrigger: { trigger: ".skills-header", start: "top 85%", toggleActions: "play none none none" } })
        .to(".skills-header", { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" });

      gsap.timeline({ scrollTrigger: { trigger: ".top-skill", start: "top 85%", toggleActions: "play none none none" } })
        .to(".top-skill", { scale: 1, opacity: 1, duration: 0.55, stagger: 0.08, ease: "back.out(1.7)" });

      gsap.timeline({ scrollTrigger: { trigger: ".skill-category", start: "top 85%", toggleActions: "play none none none" } })
        .to(".skill-category", { y: 0, opacity: 1, rotateY: 0, transformPerspective: 800, duration: 0.75, stagger: 0.1, ease: "expo.out" });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(id);
  }, []);

  return (
    <section ref={containerRef} className="flex flex-col gap-16 my-20 px-5">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="skills-header flex flex-col items-center gap-3">
        <div style={{ fontFamily:"monospace", fontSize:"0.7rem", letterSpacing:"0.28em", color:"rgba(212,163,115,0.45)", textTransform:"uppercase" }}>
          {"// TECHNICAL SKILLS"}
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold" style={{ letterSpacing:"-0.01em" }}>
          What I Build With
        </h2>
        <p className="text-(--text-muted) text-center max-w-2xl text-lg">
          Technologies and frameworks I use to build scalable, modern applications
        </p>
      </div>

      {/* ── Top skills ──────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1" style={{ background:"rgba(212,163,115,0.18)" }} />
          <span style={{ fontFamily:"monospace", fontSize:"0.65rem", letterSpacing:"0.22em", color:"rgba(212,163,115,0.45)", textTransform:"uppercase" }}>
            Strongest With
          </span>
          <div className="h-px flex-1" style={{ background:"rgba(212,163,115,0.18)" }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {topSkills.map(skill => (
            <div key={skill.name}
              className="top-skill flex flex-col items-center gap-3 p-4 rounded-2xl bg-(--bg) border hover:-translate-y-1.5 hover:scale-105 transition-all duration-300 group cursor-default"
              style={{ borderColor:"rgba(212,163,115,0.14)" }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,163,115,0.45)"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,163,115,0.14)"}
            >
              <div className="relative">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity duration-300"
                  style={{ background:"var(--primary)" }} />
                <Image src={skill.src} alt={skill.name} width={40} height={40}
                  className="w-10 h-10 relative" style={iconStyle(skill.src)} />
              </div>
              <span className="text-sm font-medium text-(--text)">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Category filter ─────────────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
        <motion.button
          onClick={() => setActiveCategory(null)}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
          style={activeCategory === null
            ? { background:"var(--primary)", color:"var(--bg-dark)", border:"1px solid var(--primary)" }
            : { background:"var(--bg)", color:"rgba(232,220,200,0.55)", border:"1px solid rgba(212,163,115,0.18)" }}
        >
          All
        </motion.button>
        {skillCategories.map(cat => (
          <motion.button key={cat.title}
            onClick={() => setActiveCategory(activeCategory === cat.title ? null : cat.title)}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
            style={activeCategory === cat.title
              ? { background:"var(--primary)", color:"var(--bg-dark)", border:"1px solid var(--primary)" }
              : { background:"var(--bg)", color:"rgba(232,220,200,0.55)", border:"1px solid rgba(212,163,115,0.18)" }}
          >
            {cat.iconSrc
              ? <Image src={cat.iconSrc} alt="" width={14} height={14} className="mr-1.5 inline-block align-middle" style={categoryIconStyle()} />
              : <span className="mr-1.5">{cat.icon}</span>
            }{cat.title}
          </motion.button>
        ))}
      </div>

      {/* ── Skills grid ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory ?? "all"}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCategories.map(category => (
                <div key={category.title}
                  className="skill-category flex flex-col gap-4 p-6 rounded-2xl bg-(--bg) border transition-all duration-300"
                  style={{ borderColor:"rgba(212,163,115,0.14)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,163,115,0.35)"}
                  onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,163,115,0.14)"}
                >
                  {/* Card header */}
                  <div className="flex items-center gap-3 pb-3" style={{ borderBottom:"1px solid rgba(212,163,115,0.12)" }}>
                    {category.iconSrc
                      ? <Image src={category.iconSrc} alt={category.title} width={22} height={22} style={{ ...categoryIconStyle(), flexShrink:0 }} />
                      : <span style={{ color:"var(--primary)", fontSize:"1.1rem" }}>{category.icon}</span>
                    }
                    <div>
                      <h3 className="text-lg font-semibold text-(--text)">{category.title}</h3>
                      <p style={{ fontSize:"0.7rem", color:"rgba(232,220,200,0.4)", letterSpacing:"0.04em" }}>{category.description}</p>
                    </div>
                  </div>

                  {/* Skill rows */}
                  <div className="flex flex-col gap-2">
                    {category.skills.map(skill => (
                      <div key={skill.name}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-(--bg) border hover:-translate-y-0.5 hover:bg-(--bg-light) transition-all duration-300 group cursor-default"
                        style={{ borderColor:"rgba(212,163,115,0.12)" }}
                        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,163,115,0.38)"}
                        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,163,115,0.12)"}
                      >
                        <div className="relative shrink-0">
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 rounded-lg blur-lg transition-opacity"
                            style={{ background:"var(--primary)" }} />
                          <Image src={skill.src} alt={skill.name} width={28} height={28}
                            className="w-7 h-7" style={iconStyle(skill.src)} />
                        </div>
                        <span className="text-sm font-medium text-(--text) leading-tight">{skill.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2" style={{ borderTop:"1px solid rgba(212,163,115,0.1)" }}>
                    <span style={{ fontFamily:"monospace", fontSize:"0.6rem", letterSpacing:"0.18em", color:"rgba(212,163,115,0.35)" }}>
                      {category.skills.length} TECHNOLOGIES
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Total count ─────────────────────────────────────────── */}
      <div className="flex justify-center">
        <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-(--bg) border"
          style={{ borderColor:"rgba(212,163,115,0.18)" }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"var(--primary)", boxShadow:"0 0 8px var(--primary)" }} />
          <span style={{ fontFamily:"monospace", fontSize:"0.72rem", letterSpacing:"0.1em", color:"rgba(232,220,200,0.55)" }}>
            <span style={{ color:"var(--primary)", fontWeight:"bold" }}>
              {skillCategories.reduce((a, c) => a + c.skills.length, 0)}
            </span>{" "}technologies across{" "}
            <span style={{ color:"var(--primary)", fontWeight:"bold" }}>{skillCategories.length}</span> categories
          </span>
        </div>
      </div>
    </section>
  );
}
