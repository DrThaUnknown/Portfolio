export interface Project {
  title: string;
  description: string;
  tags: string[];
  category: string;
  link?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: "Corazones Libres Platform",
    description:
      "Led design and development of a nonprofit web platform supporting underserved communities through food assistance and educational initiatives. Handled UI/UX, custom CSS, content structure, and donation flow — resulting in a streamlined experience for donors and volunteers.",
    tags: ["Web Development", "UI/UX", "WordPress", "CSS", "Nonprofit"],
    category: "Full-Stack & Web",
    link: "https://corazoneslibres.org/",
    featured: true,
  },
  {
    title: "Stroke Prediction Model",
    description:
      "Built an ML classification model using Python, Pandas, and Scikit-learn on a 5,000+ record Kaggle dataset. Achieved ~85% accuracy through feature engineering and hyperparameter tuning to reduce false-negative stroke predictions.",
    tags: ["Python", "Pandas", "Scikit-learn", "ML"],
    category: "AI & Machine Learning",
    link: "https://github.com/johnnyJCB/ML-AI_Project",
  },
  {
    title: "Sentiment Analysis Platform (VibeChecker)",
    description:
      "Full-stack React + Django web app that analyzes emotional tone in real time using the ChatGPT API and Sentiment140 dataset. Optimized frontend-backend communication to cut response latency for live analysis.",
    tags: ["React", "Django", "ChatGPT API", "Sentiment140"],
    category: "AI & Machine Learning",
    link: "https://github.com/johnnyJCB/Techwise_Project3/tree/MVP_FrontEnd",
    featured: true,
  },
  {
    title: "Blackjack Web Game",
    description:
      "Full-stack multiplayer card game with React (Vite), Express, and MongoDB. Features authentication, persistent wallet balances, win-streak tracking, and dealer AI logic across a multi-page gameplay flow.",
    tags: ["React", "Vite", "Express", "MongoDB"],
    category: "Full-Stack & Web",
    link: "https://github.com/DrThaUnknown/BlackJack",
  },
  {
    title: "Next.js Developer Portfolio",
    description:
      "This site — built with Next.js 16, TypeScript, Tailwind CSS 4, and Framer Motion. Focused on performance, smooth animations, responsive design, and clean component architecture.",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Tailwind"],
    category: "Full-Stack & Web",
  },
  {
    title: "Playlist Generator",
    description:
      "Flask-based app that generates personalized playlists via the Last.fm API. Handles API data parsing, paginated JSON responses, and dynamic rendering of music recommendations.",
    tags: ["Flask", "Python", "Last.fm API", "REST"],
    category: "Full-Stack & Web",
    link: "https://github.com/DrThaUnknown/CISC-371-Project---Playlist-Generator-Frontend",
  },
  {
    title: "Django Web Application",
    description:
      "Database-backed Django app with HTML forms, server-side validation, and design documentation. Focused on clean data modeling, user workflows, and maintainable code structure.",
    tags: ["Django", "Python", "PostgreSQL", "HTML"],
    category: "Full-Stack & Web",
  },
  {
    title: "Graph Algorithms Project",
    description:
      "Implemented BFS, DFS, Dijkstra's shortest path, and minimum spanning tree algorithms (Prim's, Kruskal's, Boruvka's) in Python with performance benchmarking across graph sizes.",
    tags: ["Python", "Algorithms", "Data Structures"],
    category: "Algorithms & Systems",
  },
  {
    title: "Boids Simulation",
    description:
      "Flocking simulation demonstrating emergent behavior through alignment, cohesion, and separation rules. Visualizes how simple local rules produce complex group dynamics.",
    tags: ["Python", "Simulation", "AI"],
    category: "Algorithms & Systems",
    link: "https://github.com/TirthOfficials/Boids",
  },
  {
    title: "Akinator-Style Guessing Game",
    description:
      "Logic-based guessing game using binary decision trees and iterative question narrowing to identify animals. Explores tree traversal and information-theoretic question ordering.",
    tags: ["Python", "Decision Trees", "Logic"],
    category: "Algorithms & Systems",
    link: "https://github.com/ezizbagshiyev/team-animal-akinator",
  },
  {
    title: "Self-Hosted Game Server Stack",
    description:
      "Set up and managed Minecraft Forge, Terraria, and Project Zomboid servers on Ubuntu via SSH. Handled performance tuning, mod management, automated backups, and multi-user access control.",
    tags: ["Linux", "SSH", "Ubuntu", "DevOps"],
    category: "Infrastructure & DevOps",
  },
  {
    title: "Raspberry Pi Automation Server",
    description:
      "Self-hosted n8n automation platform on a Raspberry Pi running scheduled workflows, API integrations, and task orchestration — a lightweight alternative to cloud-based automation services.",
    tags: ["Raspberry Pi", "n8n", "Automation"],
    category: "Infrastructure & DevOps",
  },
];

export const categories = [
  "All",
  "AI & Machine Learning",
  "Full-Stack & Web",
  "Algorithms & Systems",
  "Infrastructure & DevOps",
];
