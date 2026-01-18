"use client";

import React from "react";
import { motion } from "framer-motion";

const ICON_CLASS = "w-10 h-10";

const skills = [
  { name: "Python", src: "/icons/python.svg" },
  { name: "Java", src: "/icons/java.svg" },
  { name: "JavaScript", src: "/icons/javascript.svg" },
  { name: "TypeScript", src: "/icons/typescript.svg" },
  { name: "AWS", src: "/icons/aws.svg" },
  { name: "CSS3", src: "/icons/css3.svg" },
  { name: "HTML5", src: "/icons/html5.svg" },
  { name: "Django", src: "/icons/django.svg" },
  { name: "Docker", src: "/icons/docker.svg" },
  { name: "Express", src: "/icons/express.svg" },
  { name: "Flask", src: "/icons/flask.svg" },
  { name: "Framer Motion", src: "/icons/framermotion.svg" },
  { name: "Git", src: "/icons/git.svg" },
  { name: "GitHub", src: "/icons/github.svg" },
  { name: "Linux", src: "/icons/linux.svg" },
  { name: "MongoDB", src: "/icons/mongodb.svg" },
  { name: "Next.js", src: "/icons/nextjs.svg" },
  { name: "Node.js", src: "/icons/nodejs.svg" },
  { name: "npm", src: "/icons/npm.svg" },
  { name: "NumPy", src: "/icons/numpy.svg" },
  { name: "Pandas", src: "/icons/pandas.svg" },
  { name: "pnpm", src: "/icons/pnpm.svg" },
  { name: "PostgreSQL", src: "/icons/postgresql.svg" },
  { name: "React", src: "/icons/react.svg" },
  { name: "scikit-learn", src: "/icons/scitlearn.svg" },
  { name: "Tailwind", src: "/icons/tailwind.svg" },
  { name: "Vercel", src: "/icons/vercel.svg" },
  { name: "VS Code", src: "/icons/vscode.svg" },
];

export default function Skills() {
  return (
    <motion.section className="flex flex-col gap-10 m-20">
      <h2 className="flex justify-center text-4xl font-bold">Skills</h2>

      <div className="flex flex-wrap gap-8 justify-center items-center m-5 max-w-5xl mx-auto">
        {skills.map(({ name, src }) => (
          <motion.div
            key={name}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col items-center gap-2"
          >
            <img src={src} alt={name} width={40} height={40} className={ICON_CLASS} />
            <span className="text-xs text-[var(--text)]">{name}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
