export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: 'Active' | 'In Progress' | 'Concept';
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  category: 'AI & GenAI' | 'Civic Tech' | 'Voice AI' | 'Spatial Tech' | 'Sustainability';
  accentColor: string; // Emerald, Cyan, Violet, etc.
  highlights: string[];
  architecture?: string[];
  metrics?: { label: string; value: string }[];
}

export interface SkillItem {
  name: string;
  category: string;
  level: 'Core' | 'Proficient' | 'Hands-on' | 'Actively Exploring' | 'Next Frontier';
  iconName: string;
  detail: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  type: 'Cloud Badge' | 'Competition' | 'Academic' | 'Open Source';
  badgeUrl?: string;
  verificationUrl?: string;
  description: string;
  credentialId?: string;
  verified: boolean;
  highlightPill?: string;
}

export interface TimelineMilestone {
  year: string;
  period: string;
  title: string;
  institutionOrContext: string;
  description: string;
  achievements: string[];
  category: 'Education' | 'AI & Tech' | 'Milestone' | 'Certification';
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Krishna Katekhaye",
    title: "Creative Developer & AI Systems Builder",
    education: "Bachelor of Computer Applications (BCA) — First Year",
    institution: "India",
    location: "India (UTC+5:30)",
    statusText: "Available for Internships & AI Collaborations",
    statusAvailable: true,

    // Contact details & placeholders
    email: "krishnakatekhaye.dev@gmail.com",
    github: "https://github.com/krishnakatekhaye10",
    githubUsername: "krishnakatekhaye10",
    linkedin: "https://linkedin.com/in/krishna-katekhaye", // Editable placeholder
    portfolioDomain: "https://krishnakatekhaye10.github.io",

    tagline: "Exploring the Frontier of AI, Spatial Web & Modern Architecture.",
    shortBio: "BCA student passionate about Artificial Intelligence, Generative AI engineering, modern web technologies, and cloud architectures. I build intuitive digital systems that merge foundational AI models with immersive user interfaces.",
    
    philosophy: [
      {
        title: "Learn by Shipping",
        desc: "Theory provides foundation, but building functional prototypes in code cements real computational intuition."
      },
      {
        title: "AI-Augmented Engineering",
        desc: "Leveraging large language models and intelligent toolchains to accelerate development velocity and architectural experimentation."
      },
      {
        title: "Clean Spatial Systems",
        desc: "Crafting digital experiences with cinematic visual depth, thoughtful typography, and rock-solid web performance."
      }
    ],

    stats: [
      { label: "Academic Journey", value: "BCA 1st Year" },
      { label: "Core Focus", value: "AI & GenAI" },
      { label: "Featured Projects", value: "5 Active" },
      { label: "Verified Badges", value: "Google Cloud" }
    ]
  },

  // 1. Technologies I Have Used (Core & Hands-on)
  skillsUsed: [
    {
      name: "React & TypeScript",
      category: "Frontend Architecture",
      level: "Proficient",
      iconName: "Code2",
      detail: "Component-driven single page applications, strict typing, custom hooks, state synchronization."
    },
    {
      name: "JavaScript (ES6+)",
      category: "Language",
      level: "Core",
      iconName: "FileCode",
      detail: "Asynchronous programming, event loops, DOM manipulation, functional paradigms."
    },
    {
      name: "Python",
      category: "AI & Backend",
      level: "Hands-on",
      iconName: "Terminal",
      detail: "Scripting, algorithmic thinking, data processing, model API integrations."
    },
    {
      name: "C Programming",
      category: "Systems Fundamentals",
      level: "Hands-on",
      iconName: "Binary",
      detail: "Memory concepts, pointers, data structures, and computational foundation through BCA coursework."
    },
    {
      name: "Three.js & 3D Web",
      category: "Creative Tech",
      level: "Hands-on",
      iconName: "Box",
      detail: "Procedural geometry, shaders, lighting, camera interpolation, immersive web experiences."
    },
    {
      name: "Tailwind CSS",
      category: "Styling & UI",
      level: "Proficient",
      iconName: "Palette",
      detail: "Utility-first design systems, responsive layouts, dark themes, micro-interactions."
    },
    {
      name: "HTML5 & CSS3",
      category: "Web Standards",
      level: "Core",
      iconName: "Layout",
      detail: "Semantic structuring, accessibility compliance, CSS Grid, Flexbox, custom variables."
    },
    {
      name: "Git & GitHub",
      category: "Version Control",
      level: "Proficient",
      iconName: "GitBranch",
      detail: "Branch management, pull requests, repository versioning, GitHub Actions CI/CD."
    },
    {
      name: "Google Cloud Fundamentals",
      category: "Cloud",
      level: "Hands-on",
      iconName: "Cloud",
      detail: "Cloud IAM, compute basics, storage buckets, verified through Google Skills curriculum."
    },
    {
      name: "Prompt Engineering & LLM APIs",
      category: "Generative AI",
      level: "Hands-on",
      iconName: "Sparkles",
      detail: "System prompt design, few-shot prompting, structured JSON outputs with Gemini API."
    }
  ] as SkillItem[],

  // 2. Technologies I Am Learning / Actively Exploring (Next Frontier)
  skillsLearning: [
    {
      name: "Generative AI Agents & RAG",
      category: "AI Frontier",
      level: "Actively Exploring",
      iconName: "Cpu",
      detail: "Multi-agent orchestration, LangChain/LlamaIndex, context windows, retrieval-augmented generation."
    },
    {
      name: "Docker & Containerization",
      category: "DevOps & Cloud",
      level: "Actively Exploring",
      iconName: "Container",
      detail: "Packaging applications into repeatable containers, Dockerfiles, isolated environments."
    },
    {
      name: "Vector Databases (Chroma/Pinecone)",
      category: "AI Data Pipelines",
      level: "Actively Exploring",
      iconName: "Database",
      detail: "Vector embeddings, semantic search, cosine similarity indexes for high-precision retrieval."
    },
    {
      name: "Kubernetes & Cloud Orchestration",
      category: "Cloud Native",
      level: "Next Frontier",
      iconName: "Server",
      detail: "Understanding container orchestration, cloud microservices, and scalable cloud architectures."
    },
    {
      name: "Next.js & Server Components",
      category: "Fullstack Web",
      level: "Actively Exploring",
      iconName: "Layers",
      detail: "React Server Components, SSR/SSG workflows, edge computing, robust backend APIs."
    },
    {
      name: "WebXR & Spatial Interfaces",
      category: "Creative Technology",
      level: "Next Frontier",
      iconName: "Globe",
      detail: "Bringing 3D canvases to spatial computing devices, WebXR sessions, and interactive spatial shaders."
    }
  ] as SkillItem[],

  // Selected Work: EcoMind, VotePath India, Local Language Voice AI, StadiumGPT360, Climatora
  projects: [
    {
      id: "ecomind",
      title: "EcoMind",
      tagline: "AI-Powered Environmental Intelligence & Spatial Mapping",
      description: "An exploratory environmental platform examining how AI-driven spatial data and interactive mapping can surface localized climate insights, carbon footprint estimations, and sustainable community actions.",
      status: "In Progress",
      category: "Sustainability",
      accentColor: "#10B981", // Emerald
      tags: ["AI Exploration", "Geospatial Data", "Interactive Mapping", "React", "TypeScript"],
      githubUrl: "https://github.com/krishnakatekhaye10",
      demoUrl: "",
      highlights: [
        "Interactive geospatial mapping to visualize localized environmental data points",
        "Predictive ecological indicators powered by prompt-engineered AI models",
        "Clean, low-power dark interface designed to reduce digital energy consumption"
      ],
      architecture: [
        "Client: React 19 + TypeScript + Leaflet/MapLibre visualization layer",
        "AI Layer: Gemini model integration for contextual sustainability suggestions",
        "Data: Open environmental APIs and localized spatial indexes"
      ],
      metrics: [
        { label: "Domain", value: "Climate Tech" },
        { label: "Status", value: "Active Prototype" },
        { label: "Mapping", value: "Spatial GIS" }
      ]
    },
    {
      id: "votepath-india",
      title: "VotePath India",
      tagline: "Civic Literacy & Multilingual Democratic Guidance Platform",
      description: "A civic digital platform designed to simplify access to verified electoral processes, first-time voter registration pathways, and constitutional civic knowledge across India's diverse linguistic landscape.",
      status: "In Progress",
      category: "Civic Tech",
      accentColor: "#06B6D4", // Cyan
      tags: ["Civic Tech", "Multilingual", "Gemini API", "Accessibility", "Tailwind CSS"],
      githubUrl: "https://github.com/krishnakatekhaye10",
      demoUrl: "",
      highlights: [
        "Step-by-step interactive voter journey tailored for first-time young electors",
        "Multilingual assistance design to lower linguistic barriers in civic literacy",
        "Strictly neutral, verified public data sources with high-contrast accessibility"
      ],
      architecture: [
        "Architecture: Fast Vite + React SPA with zero external tracking",
        "Language Engine: Vernacular prompt synthesis for regional Indian dialects",
        "UI: Accessible design compliant with WCAG high-contrast guidelines"
      ],
      metrics: [
        { label: "Target Audience", value: "New Voters" },
        { label: "Focus", value: "Civic Literacy" },
        { label: "Neutrality", value: "100% Non-Partisan" }
      ]
    },
    {
      id: "local-language-voice-ai",
      title: "Local Language Voice AI",
      tagline: "Speech-to-Speech Conversational Intelligence for Indian Vernaculars",
      description: "A speech-first AI assistant prototype engineered to bridge the digital divide by enabling natural language voice interactions in regional Indian languages, making modern AI accessible beyond English speakers.",
      status: "Active",
      category: "Voice AI",
      accentColor: "#34D399", // Mint Emerald
      tags: ["Voice AI", "Web Speech API", "Vernacular NLP", "Python", "Generative AI"],
      githubUrl: "https://github.com/krishnakatekhaye10",
      demoUrl: "",
      highlights: [
        "Low-latency speech recognition and phonetic transcription pipeline",
        "Conversational LLM reasoning tailored for Indian colloquial idioms and context",
        "Clean audio-visualizer HUD that responds dynamically to user voice input"
      ],
      architecture: [
        "Audio Engine: Web Speech API & Web Audio API real-time frequency analysis",
        "LLM Inference: Prompt chaining for dialect detection and translation",
        "Frontend: Responsive voice interface with audio wave ripples"
      ],
      metrics: [
        { label: "Modality", value: "Speech-to-Speech" },
        { label: "Scope", value: "Indian Languages" },
        { label: "Latency Goal", value: "< 1.2s" }
      ]
    },
    {
      id: "stadiumgpt360",
      title: "StadiumGPT360",
      tagline: "Immersive 360° Stadium Companion & Spatial Conversational AI",
      description: "An innovative conceptual application uniting real-time match context, 360-degree interactive stadium perspectives, and conversational AI to deliver a next-generation fan experience for live sporting venues.",
      status: "Concept",
      category: "Spatial Tech",
      accentColor: "#22D3EE", // Bright Cyan
      tags: ["Three.js", "Spatial 360", "Sports AI", "Interactive 3D", "WebXR Concept"],
      githubUrl: "https://github.com/krishnakatekhaye10",
      demoUrl: "",
      highlights: [
        "360-degree panoramic seat view previews with interactive spatial controls",
        "Conversational AI companion providing live match context and stadium navigation",
        "Lightweight procedural 3D stadium mockups running smoothly on mobile browsers"
      ],
      architecture: [
        "3D Engine: Three.js procedural sphere mapping and orbital camera control",
        "Intelligence: Contextual sports analytics prompt system",
        "UI: Minimal HUD overlay with real-time telemetry markers"
      ],
      metrics: [
        { label: "Environment", value: "360° Spatial" },
        { label: "Render Tech", value: "Three.js / WebGL" },
        { label: "Companion", value: "Live Sports QA" }
      ]
    },
    {
      id: "climatora",
      title: "Climatora",
      tagline: "Climate Anomaly Tracking & Real-Time Weather Data Engine",
      description: "A comprehensive weather intelligence and climate monitoring dashboard that translates complex meteorological telemetry into intuitive visualizations, air quality gauges, and localized anomaly indicators.",
      status: "In Progress",
      category: "Sustainability",
      accentColor: "#059669", // Deep Emerald
      tags: ["Weather Data", "Data Visualization", "Open-Meteo", "React", "TypeScript"],
      githubUrl: "https://github.com/krishnakatekhaye10",
      demoUrl: "",
      highlights: [
        "Real-time microclimate monitoring including AQI, humidity, and barometric pressure",
        "Responsive data curves showing diurnal temperature variance and historical baselines",
        "Optimized bundle size ensuring instant page loads even on constrained mobile connections"
      ],
      architecture: [
        "Data Pipeline: Real-time queries to Open-Meteo and global climate feeds",
        "Visualization: Custom SVG sparklines and interactive telemetry gauges",
        "State: Lightweight reactive state store with automated interval polling"
      ],
      metrics: [
        { label: "Data Source", value: "Open-Meteo APIs" },
        { label: "Refresh Rate", value: "Live / Cached" },
        { label: "Bundle", value: "Ultra Lightweight" }
      ]
    }
  ] as Project[],

  // Achievements & Credentials
  achievements: [
    {
      id: "google-skills-badge-1",
      title: "Google Skills Verified Milestone",
      issuer: "Google Skills (Google Cloud / Google Learning)",
      issueDate: "Verified Milestone",
      type: "Cloud Badge",
      badgeUrl: "https://www.skills.google/public_profiles/ba86f5f1-7c71-4220-b7f4-fc5ce518fe72/badges/25567268",
      verificationUrl: "https://www.skills.google/public_profiles/ba86f5f1-7c71-4220-b7f4-fc5ce518fe72/badges/25567268",
      description: "Publicly verified technical credential earned through the Google Skills cloud computing and modern technological foundations curriculum.",
      credentialId: "Badge #25567268",
      verified: true,
      highlightPill: "Verified Cloud Credential"
    },
    {
      id: "genai-hackathons",
      title: "GenAI & Innovation Challenge Explorer",
      issuer: "Developer Communities & Hackathons",
      issueDate: "2024 - 2025",
      type: "Competition",
      description: "Active participant in generative AI hackathons, ideating and prototyping agentic applications and civic technology solutions.",
      verified: true,
      highlightPill: "Hackathon Participant"
    },
    {
      id: "open-source-foss",
      title: "FOSS Community & Open Knowledge",
      issuer: "FOSS United / Developer Circles",
      issueDate: "Ongoing",
      type: "Open Source",
      description: "Engaging with open-source software enthusiasts, attending developer meetups, and sharing knowledge on modern web and AI tools.",
      verified: true,
      highlightPill: "Community Member"
    }
  ] as Achievement[],

  // Journey / Timeline
  timeline: [
    {
      year: "2024 - Present",
      period: "Current Focus",
      title: "BCA First Year — Computational Foundations",
      institutionOrContext: "Bachelor of Computer Applications, India",
      description: "Commenced undergraduate studies focusing on computer architecture, foundational programming in C, database management, and discrete mathematics.",
      achievements: [
        "Mastering procedural logic and memory structures through C",
        "Building foundational discrete mathematics and algorithmic problem solving",
        "Active self-study in modern TypeScript, React, and web architecture"
      ],
      category: "Education"
    },
    {
      year: "2024",
      period: "Mid 2024",
      title: "Verified Cloud Milestone with Google Skills",
      institutionOrContext: "Google Cloud / Learning Platform",
      description: "Completed hands-on labs and foundational curriculum covering cloud infrastructure, Google Cloud Platform essentials, and security fundamentals.",
      achievements: [
        "Earned verified public badge #25567268 on Google Skills",
        "Understood cloud storage, compute virtual machines, and identity management",
        "Applied cloud thinking to modern web deployment pipelines"
      ],
      category: "Certification"
    },
    {
      year: "2024 - 2025",
      period: "Frontier Exploration",
      title: "Generative AI Systems & Vibe Coding",
      institutionOrContext: "Independent Research & Prototyping",
      description: "Dove deep into generative models, prompt engineering, and LLM APIs. Began developing AI-augmented software and autonomous workflows.",
      achievements: [
        "Integrated Gemini API for multi-lingual reasoning and civic tech solutions",
        "Adopted agentic pair-programming workflows for rapid full-stack iteration",
        "Explored speech synthesis and local language conversational assistants"
      ],
      category: "AI & Tech"
    },
    {
      year: "2025 - Future",
      period: "Roadmap Ahead",
      title: "Next Horizon: Agentic AI & Cloud Architecture",
      institutionOrContext: "Upcoming Goals & Aspirations",
      description: "Targeting deeper mastery of retrieval-augmented generation (RAG), Docker containerization, Kubernetes orchestration, and securing engineering internships.",
      achievements: [
        "Developing production-ready agentic RAG workflows",
        "Deploying microservices with containerization best practices",
        "Contributing meaningfully to open-source software repositories"
      ],
      category: "Milestone"
    }
  ] as TimelineMilestone[]
};
