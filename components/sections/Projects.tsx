"use client";

import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, categories } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const featuredProjects = projects.filter(p => p.featured);
const regularProjects  = projects.filter(p => !p.featured);

function ProjectLink({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
      style={{ color:"var(--primary)", textDecoration:"none", fontFamily:"monospace", letterSpacing:"0.08em" }}
    >
      VIEW PROJECT
      <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
        ↗
      </motion.span>
    </a>
  );
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const containerRef = useRef<HTMLElement>(null);

  const filteredProjects = selectedCategory === "All"
    ? regularProjects
    : regularProjects.filter(p => p.category === selectedCategory);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".projects-header", { y: 60, opacity: 0 });
      gsap.set(".projects-divider", { opacity: 0 });
      gsap.set(".project-card", { y: 60, scale: 0.95, opacity: 0 });

      gsap.timeline({ scrollTrigger: { trigger: ".projects-header", start: "top 85%", toggleActions: "play none none none" } })
        .to(".projects-header", { y: 0, opacity: 1, duration: 0.9, ease: "expo.out" });

      const featuredCards = gsap.utils.toArray<HTMLElement>(".featured-card", containerRef.current!);
      featuredCards.forEach((card, i) => {
        gsap.set(card, { x: i % 2 === 0 ? -100 : 100, opacity: 0 });
        gsap.timeline({ scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" } })
          .to(card, { x: 0, opacity: 1, duration: 0.9, ease: "expo.out" });
      });

      gsap.timeline({ scrollTrigger: { trigger: ".projects-divider", start: "top 85%", toggleActions: "play none none none" } })
        .to(".projects-divider", { opacity: 1, duration: 0.6, ease: "power2.out" });

      gsap.timeline({ scrollTrigger: { trigger: ".project-card", start: "top 85%", toggleActions: "play none none none" } })
        .to(".project-card", { y: 0, scale: 1, opacity: 1, duration: 0.65, stagger: 0.08, ease: "expo.out" });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => clearTimeout(id);
  }, []);

  return (
    <section ref={containerRef} className="my-20 px-5 py-20 overflow-x-hidden">
      <div className="flex flex-col gap-16 max-w-7xl mx-auto">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="projects-header flex flex-col items-center gap-3">
          <div style={{ fontFamily:"monospace", fontSize:"0.7rem", letterSpacing:"0.28em", color:"rgba(212,163,115,0.45)", textTransform:"uppercase" }}>
            {"// FEATURED PROJECTS"}
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold" style={{ letterSpacing:"-0.01em" }}>
            What I&apos;ve Built
          </h2>
          <p className="text-(--text-muted) text-center max-w-2xl text-lg">
            Full-stack development, machine learning, algorithms, and infrastructure work
          </p>
        </div>

        {/* ── Featured cards ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map(project => (
            <div key={project.title}
              className="featured-card relative flex flex-col gap-5 p-8 rounded-2xl bg-(--bg) border transition-all duration-300 cursor-pointer group overflow-hidden"
              style={{ borderColor:"rgba(212,163,115,0.28)" }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,163,115,0.6)"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,163,115,0.28)"}
            >
              {/* Amber top bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ background:"linear-gradient(90deg, var(--primary), transparent)" }} />

              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full"
                  style={{ color:"var(--primary)", background:"rgba(212,163,115,0.1)", border:"1px solid rgba(212,163,115,0.25)" }}>
                  ★ Featured
                </span>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-(--bg-dark) border"
                  style={{ color:"rgba(232,220,200,0.55)", borderColor:"rgba(212,163,115,0.18)" }}>
                  {project.category}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-(--text) group-hover:text-(--primary) transition-colors">
                {project.title}
              </h3>

              <p className="text-sm text-(--text-muted) leading-relaxed grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-3" style={{ borderTop:"1px solid rgba(212,163,115,0.1)" }}>
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 rounded bg-(--bg-dark)"
                    style={{ color:"rgba(232,220,200,0.5)", border:"1px solid rgba(212,163,115,0.14)" }}>
                    {tag}
                  </span>
                ))}
              </div>

              {project.link && <ProjectLink href={project.link} />}
            </div>
          ))}
        </div>

        {/* ── Divider ─────────────────────────────────────────────── */}
        <div className="projects-divider flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background:"rgba(212,163,115,0.18)" }} />
          <span style={{ fontFamily:"monospace", fontSize:"0.65rem", letterSpacing:"0.22em", color:"rgba(212,163,115,0.45)", textTransform:"uppercase" }}>
            All Projects
          </span>
          <div className="flex-1 h-px" style={{ background:"rgba(212,163,115,0.18)" }} />
        </div>

        {/* ── Category filter ─────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(category => (
            <motion.button key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={selectedCategory === category
                ? { background:"var(--primary)", color:"var(--bg-dark)", border:"1px solid var(--primary)" }
                : { background:"var(--bg)", color:"rgba(232,220,200,0.55)", border:"1px solid rgba(212,163,115,0.18)" }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* ── Regular projects grid ────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div key={selectedCategory}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map(project => (
              <div key={project.title}
                className="project-card flex flex-col relative gap-4 p-6 rounded-2xl bg-(--bg) border transition-all duration-300 cursor-pointer group hover:-translate-y-2"
                style={{ borderColor:"rgba(212,163,115,0.14)" }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,163,115,0.38)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,163,115,0.14)"}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-(--bg-dark) border"
                    style={{ color:"rgba(232,220,200,0.5)", borderColor:"rgba(212,163,115,0.18)" }}>
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-(--text) group-hover:text-(--primary) transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-(--text-muted) leading-relaxed grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2" style={{ borderTop:"1px solid rgba(212,163,115,0.1)" }}>
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded bg-(--bg-dark)"
                      style={{ color:"rgba(232,220,200,0.5)", border:"1px solid rgba(212,163,115,0.14)" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {project.link && <ProjectLink href={project.link} />}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20" style={{ fontFamily:"monospace", fontSize:"0.85rem", letterSpacing:"0.12em", color:"rgba(212,163,115,0.35)" }}>
            NO PROJECTS IN THIS CATEGORY
          </div>
        )}
      </div>
    </section>
  );
}
