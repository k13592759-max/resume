export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: 'In Progress' | 'Concept' | 'Active';
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  category: 'AI & Data' | 'Civic Tech' | 'Web Concept' | 'Sustainability';
  accentColor: string;
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    levelTag: 'Actively Exploring' | 'Core Skill' | 'Developing' | 'Essential Tool';
    detail: string;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  badgeUrl: string;
  verificationUrl: string;
  description: string;
  credentialId?: string;
  verified: boolean;
}

export interface LearningGoal {
  title: string;
  focus: string;
  currentObjective: string;
  icon: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Krishna Katekhaye",
    role: "Aspiring AI Developer & Generative AI Engineer",
    education: "Bachelor of Computer Applications (BCA), First Year",
    location: "India",
    availabilityText: "Open to Internships & Freelance Opportunities",
    availabilitySubtext: "Interested in early-stage collaborations, AI experiments, and junior developer roles.",
    
    // =========================================================================
    // EDITABLE CONTACT PLACEHOLDERS: Update these with your real details!
    // =========================================================================
    email: "krishnakatekhaye.dev@gmail.com", // <-- REPLACE with your preferred email
    github: "https://github.com/krishnakatekhaye10",
    linkedin: "https://linkedin.com/in/krishna-katekhaye", // <-- REPLACE with your verified LinkedIn profile URL
    resumePath: "/resume.pdf", // <-- Overwrite public/resume.pdf with your actual resume
    
    headline: "Building Intelligent Experiences with AI & Code.",
    bio: "I'm Krishna, a BCA student exploring Generative AI, prompt engineering, and modern web development. I turn ideas into useful digital experiences through experimentation, coding, and AI-powered tools.",
    aboutDetailed: [
      "I am currently in my first year of Bachelor of Computer Applications (BCA) in India, focused on modern computing fundamentals while actively exploring the rapidly evolving frontier of artificial intelligence.",
      "Rather than waiting for senior years to build, I embrace a 'learn by doing' mindset — experimenting with generative AI models, refining prompt workflows, and writing practical code for the web.",
      "My primary goal is to grow into an impactful Generative AI Engineer, bridging the gap between cutting-edge foundational models and clean, reliable user-facing applications."
    ],
    values: [
      {
        title: "Learning by Building",
        description: "Focusing on tangible code, working prototypes, and hands-on experiments rather than passive theory."
      },
      {
        title: "AI-Augmented Development",
        description: "Leveraging LLMs and modern AI tools to accelerate problem-solving, code iteration, and design."
      },
      {
        title: "Honest Foundations",
        description: "Strengthening fundamental core programming in C and Python while adopting modern web practices."
      },
      {
        title: "Collaborative Mindset",
        description: "Eager to contribute to open-source, intern with innovative engineering teams, and learn from seniors."
      }
    ]
  },

  skills: [
    {
      title: "AI & Development",
      description: "Harnessing foundational models and next-generation tooling to engineer intelligent workflows.",
      iconName: "Sparkles",
      skills: [
        {
          name: "Generative AI Exploration",
          levelTag: "Actively Exploring",
          detail: "Experimenting with LLM capabilities, context windows, and multimodal AI paradigms."
        },
        {
          name: "Prompt Engineering",
          levelTag: "Core Skill",
          detail: "Structuring system prompts, few-shot prompting, and iterative reasoning workflows."
        },
        {
          name: "AI-Assisted Development / Vibe Coding",
          levelTag: "Core Skill",
          detail: "Rapid prototyping and rapid architectural synthesis using modern AI developer assistants."
        }
      ]
    },
    {
      title: "Web Development",
      description: "Crafting structured, responsive, and visually appealing client-side interfaces.",
      iconName: "Globe",
      skills: [
        {
          name: "HTML5",
          levelTag: "Core Skill",
          detail: "Semantic markup, accessibility-focused layout, and modern web standards."
        },
        {
          name: "CSS3 & Modern Styling",
          levelTag: "Core Skill",
          detail: "Flexbox, CSS Grid, responsive design, animations, and Tailwind utility styling."
        },
        {
          name: "JavaScript (ES6+)",
          levelTag: "Core Skill",
          detail: "DOM manipulation, asynchronous operations, event handling, and clean script logic."
        }
      ]
    },
    {
      title: "Developer Tools & Workflow",
      description: "Utilizing modern developer environments for version control and productive coding.",
      iconName: "Terminal",
      skills: [
        {
          name: "Git",
          levelTag: "Essential Tool",
          detail: "Local version control, commits, branching, and repository history management."
        },
        {
          name: "GitHub",
          levelTag: "Essential Tool",
          detail: "Remote repositories, collaborative workflows, and project publishing."
        },
        {
          name: "VS Code",
          levelTag: "Essential Tool",
          detail: "Primary development IDE with custom extensions, terminal integration, and shortcuts."
        },
        {
          name: "Google Antigravity",
          levelTag: "Essential Tool",
          detail: "Advanced agentic pair-programming workspace for AI-powered full-stack creation."
        }
      ]
    },
    {
      title: "Programming Fundamentals",
      description: "Building foundational algorithmic thinking and computational understanding.",
      iconName: "Code2",
      skills: [
        {
          name: "C Programming",
          levelTag: "Developing",
          detail: "Academic foundation covering memory basics, data types, control flow, and structures."
        },
        {
          name: "Python",
          levelTag: "Developing",
          detail: "Learning syntax, scripting basics, and Python's role in modern AI and data pipelines."
        }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "ecomind",
      title: "EcoMind",
      tagline: "Eco-focused digital project exploring AI and mapping technologies",
      description: "An exploratory environmental platform examining how AI-driven spatial data and interactive mapping can surface localized climate insights and sustainability actions.",
      status: "In Progress",
      category: "Sustainability",
      accentColor: "#10B981", // Emerald
      tags: ["AI Exploration", "Mapping Tech", "Environmental Data", "Web UI"],
      githubUrl: "https://github.com/krishnakatekhaye10",
      demoUrl: "",
      highlights: [
        "Investigating geospatial APIs and visualization techniques",
        "Exploring predictive environmental metrics with AI assistance",
        "Designed to raise ecological awareness through clean digital experiences"
      ]
    },
    {
      id: "votepath-india",
      title: "VotePath India",
      tagline: "Civic information and democratic literacy project",
      description: "A civic digital platform designed to simplify access to verified electoral processes, voter registration pathways, and constitutional civic knowledge for Indian citizens.",
      status: "In Progress",
      category: "Civic Tech",
      accentColor: "#F59E0B", // Amber
      tags: ["Civic Tech", "Information Architecture", "Public Data", "Accessibility"],
      githubUrl: "https://github.com/krishnakatekhaye10",
      demoUrl: "",
      highlights: [
        "Synthesizing structured guidance for first-time young voters",
        "Focus on multilingual, transparent, and neutral civic resources",
        "Responsive, high-contrast UI tailored for mobile accessibility"
      ]
    },
    {
      id: "stadiumgpt360",
      title: "StadiumGPT360",
      tagline: "Sports-focused AI project concept & interactive assistant",
      description: "An innovative conceptual application uniting real-time match context, stadium seating perspectives, and interactive conversational AI for sports enthusiasts.",
      status: "Concept",
      category: "AI & Data",
      accentColor: "#6366F1", // Indigo
      tags: ["AI Concept", "Sports Tech", "LLM Prompting", "Interactive UI"],
      githubUrl: "https://github.com/krishnakatekhaye10",
      demoUrl: "",
      highlights: [
        "Prompt architectures for live sports analytics and match queries",
        "Virtual fan experience mockups with 360-degree viewing concepts",
        "Exploring low-latency streaming query responses"
      ]
    },
    {
      id: "coffeemind",
      title: "CoffeeMind",
      tagline: "Coffee curation and brew craft digital experience",
      description: "A digital lifestyle project dedicated to coffee lovers, cataloging bean origins, flavor profiles, precise brewing ratios, and personalized coffee recommendations.",
      status: "In Progress",
      category: "Web Concept",
      accentColor: "#D97706", // Warm amber
      tags: ["Digital Product", "Brew Calculator", "UI/UX Design", "JavaScript"],
      githubUrl: "https://github.com/krishnakatekhaye10",
      demoUrl: "",
      highlights: [
        "Dynamic ratio calculators for AeroPress, Pour-over, and French press",
        "Aesthetic minimalist card interface inspired by modern specialty cafes",
        "Organized flavor notes database"
      ]
    },
    {
      id: "climatora",
      title: "Climatora",
      tagline: "Climate data exploration and weather visualization",
      description: "A weather and climate monitoring dashboard concept providing intuitive visual representations of temperature trends, humidity variations, and climate anomaly patterns.",
      status: "In Progress",
      category: "Sustainability",
      accentColor: "#06B6D4", // Cyan
      tags: ["Weather Data", "Data Visualization", "API Integration", "Frontend"],
      githubUrl: "https://github.com/krishnakatekhaye10",
      demoUrl: "",
      highlights: [
        "Clean visualization of live weather and air quality indices",
        "Exploring climate data APIs and responsive charting",
        "Focused on lightweight mobile load times"
      ]
    }
  ] as Project[],

  achievements: [
    {
      id: "google-skills-badge-1",
      title: "Google Skills Verified Badge",
      issuer: "Google Skills (Google Cloud / Learning)",
      issueDate: "Verified Milestone",
      badgeUrl: "https://www.skills.google/public_profiles/ba86f5f1-7c71-4220-b7f4-fc5ce518fe72/badges/25567268",
      verificationUrl: "https://www.skills.google/public_profiles/ba86f5f1-7c71-4220-b7f4-fc5ce518fe72/badges/25567268",
      description: "Publicly verified technical achievement badge earned through the Google Skills learning curriculum.",
      credentialId: "Badge #25567268",
      verified: true
    }
  ] as Achievement[],

  learningRoadmap: [
    {
      title: "Generative AI Application Engineering",
      focus: "LangChain, RAG architectures, and API integrations with modern LLMs.",
      currentObjective: "Building lightweight client-side applications that interface with foundational model APIs.",
      icon: "Cpu"
    },
    {
      title: "Python Programming & Data Foundations",
      focus: "Python OOP, data structures, and scientific computing basics.",
      currentObjective: "Deepening algorithmic problem solving and writing clean, idiomatic Python scripts.",
      icon: "Binary"
    },
    {
      title: "Production Web Development",
      focus: "React, TypeScript, state management, and modern component design.",
      currentObjective: "Transitioning from static web basics to full interactive single-page web applications.",
      icon: "Layers"
    },
    {
      title: "Git, GitHub & Collaborative Workflows",
      focus: "Version control hygiene, branch workflows, and open-source contributions.",
      currentObjective: "Documenting projects with clean READMEs, open issues, and pull request workflows.",
      icon: "GitBranch"
    }
  ] as LearningGoal[]
};
