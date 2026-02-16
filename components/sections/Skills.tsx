"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // Import Image from next/image

const ICON_CLASS = "w-12 h-12 sm:w-14 sm:h-14";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "Python", src: "/icons/python.svg" },
      { name: "JavaScript", src: "/icons/javascript.svg" },
      { name: "TypeScript", src: "/icons/typescript.svg" },
      { name: "Java", src: "/icons/java.svg" },
      { name: "HTML5", src: "/icons/html5.svg" },
      { name: "CSS3", src: "/icons/css3.svg" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", src: "/icons/react.svg" },
      { name: "Next.js", src: "/icons/nextjs.svg" },
      { name: "Tailwind", src: "/icons/tailwind.svg" },
      { name: "Framer Motion", src: "/icons/framermotion.svg" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", src: "/icons/nodejs.svg" },
      { name: "Express", src: "/icons/express.svg" },
      { name: "Django", src: "/icons/django.svg" },
      { name: "Flask", src: "/icons/flask.svg" },
    ],
  },
  {
    title: "Database & Cloud",
    skills: [
      { name: "PostgreSQL", src: "/icons/postgresql.svg" },
      { name: "MongoDB", src: "/icons/mongodb.svg" },
      { name: "AWS", src: "/icons/aws.svg" },
      { name: "Vercel", src: "/icons/vercel.svg" },
    ],
  },
  {
    title: "Data Science",
    skills: [
      { name: "NumPy", src: "/icons/numpy.svg" },
      { name: "Pandas", src: "/icons/pandas.svg" },
      { name: "scikit-learn", src: "/icons/scitlearn.svg" },
    ],
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: "Git", src: "/icons/git.svg" },
      { name: "GitHub", src: "/icons/github.svg" },
      { name: "Docker", src: "/icons/docker.svg" },
      { name: "Linux", src: "/icons/linux.svg" },
      { name: "VS Code", src: "/icons/vscode.svg" },
      { name: "npm", src: "/icons/npm.svg" },
      { name: "pnpm", src: "/icons/pnpm.svg" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Skills() {
  return (
    <section className="flex flex-col gap-16 my-20 px-5">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-4"
      >
        <h2 className="text-4xl sm:text-5xl font-bold">Technical Skills</h2>
        <p className="text-(--text-muted) text-center max-w-2xl">
          A comprehensive toolkit of technologies and frameworks I use to build scalable, modern applications
        </p>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={categoryVariants}
              className="flex flex-col gap-5 p-6 rounded-2xl bg-(--bg) border border-(--border-muted) hover:border-(--border) hover:bg-(--bg-light) transition-all duration-300"
            >
              {/* Category Title */}
              <h3 className="text-xl font-semibold text-(--highlight) border-b border-(--border-muted) pb-3">
                {category.title}
              </h3>

              {/* Skills in Category */}
              <div className="flex flex-wrap gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ 
                      scale: 1.1,
                      y: -5,
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ 
                      duration: 0.2,
                      delay: skillIndex * 0.02,
                    }}
                    className="flex flex-col items-center gap-2 cursor-pointer group"
                  >
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 bg-(--primary) opacity-0 group-hover:opacity-20 rounded-lg blur-xl transition-opacity"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <Image 
                        src={skill.src} 
                        alt={skill.name} 
                        className={`${ICON_CLASS}`} 
                        width={48} 
                        height={48} 
                      />
                    </div>
                    <span className="text-xs sm:text-sm text-(--text-muted) group-hover:text-(--text) transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
