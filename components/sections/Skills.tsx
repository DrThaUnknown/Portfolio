"use client";

import React from 'react'
import Image from 'next/image';
import { motion } from "framer-motion";
import Planet from '../visual/Planet'
import { PythonIcon, JavaIcon, JavaScriptIcon, AwsIcon, Css3Icon, DjangoIcon, DockerIcon, ExpressIcon, FlaskIcon, FramerMotionIcon, GitIcon, GithubIcon, Html5Icon, LinuxIcon, MongodbIcon, NextjsIcon, NodejsIcon, NpmIcon, NumpyIcon, PandasIcon, PnpmIcon, PostgresqlIcon, ReactIcon, ScikitlearnIcon, TailwindIcon, VercelIcon, VscodeIcon } from "@/app/assets/icons";

const ICON_CLASS = "w-10 h-10 text-neutral-300";

const skills = [
  { name: "Python", Icon: PythonIcon },
  { name: "Java", Icon: JavaIcon },
  { name: "JavaScript", Icon: JavaScriptIcon },
  { name: "AWS", Icon: AwsIcon },
  { name: "CSS3", Icon: Css3Icon },
  { name: "Django", Icon: DjangoIcon },
  { name: "Docker", Icon: DockerIcon },
  { name: "Express", Icon: ExpressIcon },
  { name: "Flask", Icon: FlaskIcon },
  { name: "Framer Motion", Icon: FramerMotionIcon },
  { name: "Git", Icon: GitIcon },
  { name: "GitHub", Icon: GithubIcon },
  { name: "HTML5", Icon: Html5Icon },
  { name: "Linux", Icon: LinuxIcon },
  { name: "MongoDB", Icon: MongodbIcon },
  { name: "Next.js", Icon: NextjsIcon },
  { name: "Node.js", Icon: NodejsIcon },
  { name: "npm", Icon: NpmIcon },
  { name: "NumPy", Icon: NumpyIcon },
  { name: "Pandas", Icon: PandasIcon },
  { name: "pnpm", Icon: PnpmIcon },
  { name: "PostgreSQL", Icon: PostgresqlIcon },
  { name: "React", Icon: ReactIcon },
  { name: "scikit-learn", Icon: ScikitlearnIcon },
  { name: "Tailwind", Icon: TailwindIcon },
  { name: "Vercel", Icon: VercelIcon },
  { name: "VS Code", Icon: VscodeIcon },
];

export default function Skills() {
  return (
    <motion.section className="flex flex-col gap-10 m-20">
      <h2 className="flex justify-center text-4xl font-bold">Skills</h2>

      <div className="flex flex-wrap gap-8 justify-center items-center m-5 max-w-5xl mx-auto">
        {skills.map(({ name, Icon }) => (
          <motion.div
            key={name}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col items-center gap-2"
          >
            <Icon className={ICON_CLASS} aria-label={name} />
            <span className="text-xs text-(--text)">{name}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}