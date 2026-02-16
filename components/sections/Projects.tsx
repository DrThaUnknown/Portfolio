"use client";
import React, { useState } from 'react'
import { motion } from "framer-motion";

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: string;
  link?: string;
}

const projects: Project[] = [
  {
    title: "Corazones Libres Platform",
    description: "Led the design and development of a nonprofit web platform focused on supporting underserved communities through food assistance and educational initiatives, handling UI/UX design, custom CSS, content structure, and donation flow optimization.",
    tags: ["Web Development", "UI/UX", "WordPress", "CSS", "Nonprofit"],
    category: "Full-Stack & Web",
    link: "https://corazoneslibres.org/",
  },
  {
    title: "Stroke Prediction Model",
    description: "Built and evaluated an ML model using Python, Pandas, and Scikit-learn on a 5,000+ record Kaggle dataset to predict stroke likelihood (~85% accuracy), focusing on feature engineering and model tuning to reduce false predictions.",
    tags: ["Python", "Pandas", "Scikit-learn", "ML"],
    category: "AI & Machine Learning",
    link: "https://github.com/johnnyJCB/ML-AI_Project",
  },
  {
    title: "Sentiment Analysis Platform (VibeChecker)",
    description: "Full-stack React + Django web app using the ChatGPT API and Sentiment140 to analyze emotional tone in real time, with optimized frontend-backend communication for faster responses.",
    tags: ["React", "Django", "ChatGPT API", "Sentiment140"],
    category: "AI & Machine Learning",
    link: "https://github.com/johnnyJCB/Techwise_Project3/tree/MVP_FrontEnd",
  },
  {
    title: "Blackjack Web Game",
    description: "Full-stack game built with React (Vite), Express, and MongoDB featuring authentication, wallet persistence, win streak tracking, dealer logic, and multi-page gameplay flow.",
    tags: ["React", "Vite", "Express", "MongoDB"],
    category: "Full-Stack & Web",
    link: "https://github.com/DrThaUnknown/BlackJack",
  },
  {
    title: "Next.js Developer Portfolio",
    description: "Modern personal portfolio built with Next.js, TypeScript, Framer Motion, and responsive UI/UX principles, emphasizing performance, animation, and clean design.",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind"],
    category: "Full-Stack & Web",
  },
  {
    title: "Playlist Generator",
    description: "Flask-based application using the Last.fm API to generate personalized playlists, handling API data parsing, JSON responses, and dynamic rendering.",
    tags: ["Flask", "Python", "Last.fm API", "REST"],
    category: "Full-Stack & Web",
    link: "https://github.com/DrThaUnknown/CISC-371-Project---Playlist-Generator-Frontend",
  },
  {
    title: "Django Web Application",
    description: "Database-backed Django app with HTML forms, backend validation, and design documentation, focused on clean data modeling and user workflows.",
    tags: ["Django", "Python", "PostgreSQL", "HTML"],
    category: "Full-Stack & Web",
  },
  {
    title: "Graph Algorithms Project",
    description: "Implemented BFS, DFS, shortest path algorithms, and minimum spanning trees using Prim's, Kruskal's, and Borůvka's algorithms in Python.",
    tags: ["Python", "Algorithms", "Data Structures"],
    category: "Algorithms & Systems",
  },
  {
    title: "Boids Simulation",
    description: "Implemented a flocking simulation demonstrating emergent behavior using alignment, cohesion, and separation rules.",
    tags: ["Python", "Simulation", "AI"],
    category: "Algorithms & Systems",
    link: "https://github.com/TirthOfficials/Boids",
  },
  {
    title: "Akinator-Style Guessing Game",
    description: "Logic-based guessing game using decision trees and iterative question narrowing.",
    tags: ["Python", "Decision Trees", "Logic"],
    category: "Algorithms & Systems",
    link: "https://github.com/ezizbagshiyev/team-animal-akinator",
  },
  {
    title: "Self-Hosted Game Server Stack",
    description: "Set up and managed multiple game servers (Minecraft Forge, Terraria, Project Zomboid) on Ubuntu Server via SSH, including performance tuning and mod management.",
    tags: ["Linux", "SSH", "Ubuntu", "DevOps"],
    category: "Infrastructure & DevOps",
  },
  {
    title: "Raspberry Pi Automation Server",
    description: "Self-hosted n8n automation workflows for task scheduling and integrations.",
    tags: ["Raspberry Pi", "n8n", "Automation"],
    category: "Infrastructure & DevOps",
  },
];

const categories = [
  "All",
  "AI & Machine Learning",
  "Full-Stack & Web",
  "Algorithms & Systems",
  "Infrastructure & DevOps",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const projectVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section className='my-20 px-5 p-30'>
      <div className='flex flex-col gap-16 max-w-7xl mx-auto'>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='flex flex-col items-center gap-4'
        >
          <h2 className="text-4xl sm:text-5xl font-bold">Featured Projects</h2>
          <p className="text-(--text-muted) text-center max-w-2xl">
            A collection of projects showcasing full-stack development, machine learning, algorithms, and infrastructure work
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='flex flex-wrap justify-center gap-3'
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-(--primary) text-(--bg-dark) border border-(--primary)'
                  : 'bg-(--bg) text-(--text-muted) border border-(--border-muted) hover:border-(--border) hover:text-(--text)'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={projectVariants}
              whileHover={{ 
              y: -8,
              transition: { duration: 0.3 }
              }}
              className='flex flex-col gap-4 p-6 rounded-2xl bg-(--bg) border border-(--border-muted) hover:border-(--border) hover:bg-(--bg-light) transition-all duration-300 cursor-pointer group'
            >
              {/* Category Badge */}
              <div className='flex items-center justify-between'>
              <span className='text-xs font-medium text-(--highlight) bg-(--bg-dark) px-3 py-1 rounded-full border border-(--border-muted)'>
                {project.category}
              </span>
              </div>

              {/* Project Title */}
              <h3 className="text-xl font-bold text-(--text) group-hover:text-(--primary) transition-colors">
              {project.title}
              </h3>

              {/* Description */}
              <p className='text-sm text-(--text-muted) leading-relaxed flex-grow'>
              {project.description}
              </p>

              {/* Tags */}
              <div className='flex flex-wrap gap-2 pt-2 border-t border-(--border-muted)'>
              {project.tags.map((tag) => (
                <span 
                key={tag}
                className='text-xs text-(--text-muted) bg-(--bg-dark) px-2 py-1 rounded'
                >
                {tag}
                </span>
              ))}
              </div>

              {/* Hover Effect Arrow */}
              {project.link && (
              <motion.div
                initial={{ x: -5, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                className='flex items-center gap-2 text-sm text-(--primary) font-medium'
              >
                <a href={project.link} className='block text-center text-sm font-medium text-(--primary)'>View Details</a>
                <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                >
                →
                </motion.span>
              </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center text-(--text-muted) py-20'
          >
            No projects found in this category.
          </motion.div>
        )}
      </div>
    </section>
  )
}