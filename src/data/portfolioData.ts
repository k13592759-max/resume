// portfolioData.ts — Verified data only.

export const PERSONAL = {
  name: "Krishna Katekhaye",
  headline: "Software Developer & AI Engineer",
  subheadline: "BCA Student · Building AI-driven tools, modern web experiences, and GenAI applications",
  education: "Bachelor of Computer Applications (BCA) — First Year",
  institution: "India",
  location: "India",
  email: "krishnakatekhaye.dev@gmail.com",
  github: "https://github.com/k13592759-max",
  githubUsername: "k13592759-max",
  linkedin: "https://www.linkedin.com/in/krishna-katekhaye-863b8b315/",
  availableFor: "Open to Internships & AI Collaborations",
};

export interface SkillGroup {
  category: string;
  description: string;
  skills: { name: string; note?: string }[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Programming Languages",
    description: "Languages used across coursework and personal projects",
    skills: [
      { name: "Python", note: "AI scripts, data processing, document analysis" },
      { name: "JavaScript (ES6+)", note: "Web interfaces, DOM, async" },
      { name: "TypeScript", note: "Typed React applications" },
      { name: "C", note: "BCA coursework — memory, pointers, algorithms" },
      { name: "HTML5 & CSS3", note: "Semantic markup, layouts, accessibility" },
    ],
  },
  {
    category: "Web Development",
    description: "Frameworks and tools used in personal projects",
    skills: [
      { name: "React", note: "Component-based SPAs, hooks, state management" },
      { name: "Tailwind CSS", note: "Utility-first responsive design systems" },
      { name: "Vite", note: "Fast modern build tooling" },
      { name: "Node.js", note: "Runtime environment for tooling" },
    ],
  },
  {
    category: "AI & GenAI",
    description: "Generative AI tools actively explored and applied",
    skills: [
      { name: "Prompt Engineering", note: "System prompts, few-shot, structured outputs" },
      { name: "Gemini API", note: "LLM integration in projects" },
      { name: "LLM-assisted workflows", note: "AI-augmented development" },
      { name: "GenAI Agents", note: "Actively exploring multi-agent patterns" },
    ],
  },
  {
    category: "Cloud & DevOps",
    description: "Cloud fundamentals and developer tooling",
    skills: [
      { name: "Google Cloud Fundamentals", note: "Verified via Google Skills badge" },
      { name: "Git & GitHub", note: "Version control, branches, GitHub Pages" },
      { name: "GitHub Actions", note: "CI/CD for portfolio deployment" },
      { name: "Docker", note: "Actively learning containerization" },
    ],
  },
  {
    category: "Currently Learning",
    description: "Technologies on my active learning roadmap",
    skills: [
      { name: "RAG (Retrieval-Augmented Generation)" },
      { name: "Vector Databases" },
      { name: "Next.js & Server Components" },
      { name: "Kubernetes" },
    ],
  },
];

export interface GameProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  color: string; // hex accent
}

export const GAME_PROJECTS: GameProject[] = [
  {
    id: "clausewise",
    title: "ClauseWise",
    tagline: "Legal Contract Analysis Tool",
    description: "A local, session-only legal contract analysis and information workspace. Helps users understand agreements before signing — built with Python and a modern web interface.",
    tags: ["Python", "Legal Tech", "Document Analysis", "AI"],
    githubUrl: "https://github.com/k13592759-max/ClauseWise",
    demoUrl: "",
    color: "#3b82f6",
  },
  {
    id: "capstrong",
    title: "Capstrong",
    tagline: "Aarogya Twin — AI Healthcare Platform",
    description: "A comprehensive AI-powered health management platform featuring intelligent agents and an interactive web UI for holistic health guidance.",
    tags: ["JavaScript", "AI Agents", "Healthcare", "Web Platform"],
    githubUrl: "https://github.com/k13592759-max/capstrong",
    demoUrl: "https://k13592759-max.github.io/capstrong/",
    color: "#10b981",
  },
  {
    id: "rebrob",
    title: "Rebrob",
    tagline: "E-Commerce & Product Catalog",
    description: "A modern e-commerce and product catalog application with responsive client architecture and clean product showcase design.",
    tags: ["HTML", "JavaScript", "CSS", "E-Commerce"],
    githubUrl: "https://github.com/k13592759-max/rebrob",
    demoUrl: "",
    color: "#f59e0b",
  },
  {
    id: "3d-main",
    title: "3D Main",
    tagline: "3D Web Experimentation",
    description: "An interactive 3D web experimentation repository exploring viewport rendering, spatial canvas, and visual computing techniques.",
    tags: ["HTML", "WebGL", "3D", "Experiment"],
    githubUrl: "https://github.com/k13592759-max/3d-main",
    demoUrl: "",
    color: "#8b5cf6",
  },
  {
    id: "potfolio",
    title: "Portfolio v1",
    tagline: "Personal Developer Portfolio",
    description: "First-generation personal developer portfolio website built with semantic HTML and modern CSS styling.",
    tags: ["HTML", "CSS", "Portfolio"],
    githubUrl: "https://github.com/k13592759-max/potfolio",
    demoUrl: "https://k13592759-max.github.io/potfolio/",
    color: "#06b6d4",
  },
];

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  verificationUrl?: string;
  type: "badge" | "certification" | "competition" | "community";
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "google-skills-badge",
    title: "Google Skills Verified Badge",
    issuer: "Google Skills (Google Cloud Learning)",
    date: "2024",
    description:
      "Publicly verified technical credential earned through Google's cloud computing and modern technology curriculum. Badge #25567268.",
    verificationUrl:
      "https://www.skills.google/public_profiles/ba86f5f1-7c71-4220-b7f4-fc5ce518fe72/badges/25567268",
    type: "badge",
  },
  {
    id: "genai-exploration",
    title: "GenAI & Hackathon Participant",
    issuer: "Developer Communities",
    date: "2024 – 2025",
    description:
      "Active participant in generative AI hackathons and developer challenges — prototyping AI agents and web-based civic tech solutions.",
    type: "competition",
  },
];

export const ABOUT_PARAGRAPHS = [
  "I'm Krishna Katekhaye, a first-year BCA student in India with a deep interest in software development, Generative AI, and modern web engineering.",
  "My focus is on building real, usable tools — from AI-powered document analysis applications to interactive web platforms. I work primarily in Python and JavaScript/TypeScript, and I'm actively exploring the GenAI ecosystem: prompt engineering, LLM APIs, and agentic patterns.",
  "I believe in learning by shipping. The fastest way to understand a technology is to build something real with it, then improve it. That's the approach I take with every project.",
];
