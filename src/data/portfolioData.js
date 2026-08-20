export const personalDetails = {
  name: "Disha Rao",
  role: "Full-Stack Developer & UI/UX Specialist",
  tagline: "Crafting performant, accessible, and visual-first web experiences.",
  availability: "Available for New Opportunities",
  location: "Panvel, Navi Mumbai / Remote",
  email: "raodisha33@gmail.com",
  github: "https://github.com/dishaaarao",
  linkedin: "https://www.linkedin.com/in/disha-rao-940558318",
  twitter: "https://x.com/disharao_2810?s=11",
  aboutShort: "I build modern web applications with pixel-perfect design, resilient backend architecture, and seamless user experiences.",
  aboutLong: [
    "Hello! I'm Disha, a Software Engineer and UI/UX Designer who thrives at the intersection of aesthetic design and production-ready engineering.",
    "With a strong foundation in modern JavaScript frameworks, responsive styling, and API integration, I focus on transforming complex ideas into intuitive, scalable digital products.",
    "When I'm not coding or prototyping interactive interfaces, you'll find me exploring new frontend technologies, mentoring aspiring developers, or fine-tuning micro-animations."
  ],
  stats: [
    { label: "Years Experience", value: "3+" },
    { label: "Projects Completed", value: "18+" },
    { label: "Client Satisfaction", value: "100%" },
    { label: "Code Commits", value: "1.4k+" }
  ]
};

export const skillCategories = [
  {
    name: "Frontend Development",
    icon: "Layout",
    skills: [
      { name: "React.js / Next.js", level: 92, highlight: "Primary Framework" },
      { name: "JavaScript (ES6+) / TypeScript", level: 90, highlight: "Core Language" },
      { name: "HTML5 / Modern CSS3", level: 95, highlight: "Glassmorphic & Responsive" },
      { name: "Tailwind CSS / Styled Components", level: 88, highlight: "Design Systems" },
      { name: "Redux Toolkit / Zustand", level: 85, highlight: "State Management" }
    ]
  },
  {
    name: "Backend & APIs",
    icon: "Server",
    skills: [
      { name: "Node.js / Express.js", level: 86, highlight: "RESTful Services" },
      { name: "MongoDB / PostgreSQL", level: 80, highlight: "Database Architecture" },
      { name: "REST & GraphQL APIs", level: 88, highlight: "API Integration" },
      { name: "Firebase / Supabase", level: 84, highlight: "BaaS Platforms" }
    ]
  },
  {
    name: "UI/UX & Tools",
    icon: "Palette",
    skills: [
      { name: "Figma & Wireframing", level: 90, highlight: "Prototyping" },
      { name: "Git / GitHub / CI-CD", level: 88, highlight: "Version Control" },
      { name: "Vite / Webpack", level: 85, highlight: "Build Tooling" },
      { name: "Jest / React Testing Library", level: 78, highlight: "Quality Assurance" }
    ]
  }
];

export const projectCategories = ["All", "Full Stack", "UI/UX Design"];

export const projects = [
  {
    id: "aura-ai",
    title: "Aura — AI Assistant",
    category: "Full Stack",
    subtitle: "Conversational AI Web Application",
    description: "A sleek AI assistant web app built with a modern React frontend and integrated AI APIs. Features real-time chat, context-aware responses, and a clean minimal UI designed for seamless human–AI interaction.",
    tags: ["React", "AI/LLM API", "Node.js", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/dishaaarao",
    liveUrl: "https://aura-lilac-xi-14.vercel.app/",
    featured: true,
    imageBg: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    highlights: [
      "Real-time AI chat with context-aware responses",
      "Clean minimal UI optimised for conversation flow",
      "Deployed on Vercel with fast cold-start performance"
    ]
  },
  {
    id: "snapscan-gallery",
    title: "SnapScan — Collaborative Gallery",
    category: "Full Stack",
    subtitle: "Real-time Collaborative Photo Gallery",
    description: "A collaborative gallery platform where users can upload, organise, and share photo collections in real time. Features live sync, user tagging, and a responsive masonry grid layout.",
    tags: ["React", "Firebase", "Real-time Sync", "CSS Grid", "Vercel"],
    githubUrl: "https://github.com/dishaaarao",
    liveUrl: "https://snapscan-kappa.vercel.app/",
    featured: true,
    imageBg: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
    highlights: [
      "Real-time collaborative uploads with live sync",
      "Masonry grid layout with smooth image transitions",
      "User tagging and collection organisation"
    ]
  },
  {
    id: "yogurberry-brand",
    title: "Yogurberry — Brand Design",
    category: "UI/UX Design",
    subtitle: "Figma UI/UX Design for Frozen Yogurt Brand",
    description: "Complete UI/UX design project for Yogurberry, an Australian frozen yogurt brand. Designed full brand identity, interactive menu flows, store locator screens, and a loyalty programme experience in Figma.",
    tags: ["Figma", "UI Design", "Brand Identity", "Prototyping", "UX Research"],
    githubUrl: "https://github.com/dishaaarao",
    liveUrl: "https://yogurberry.com.au/",
    featured: true,
    imageBg: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
    highlights: [
      "Full brand identity system with colour, typography, and component tokens",
      "Interactive Figma prototype with menu customiser and store locator flows",
      "Designed loyalty membership screens and onboarding experience"
    ]
  }
];

export const experiences = [
  {
    period: "2024 - Present",
    role: "Web Developer",
    company: "TechNova Solutions",
    companyUrl: "https://technovasolutions.in/",
    location: "Remote",
    type: "Full-time",
    description: "Developing and maintaining responsive web applications for clients, building reusable component libraries, and delivering pixel-perfect UI implementations across multiple client projects.",
    skills: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"]
  },
  {
    period: "2024 (2 months)",
    role: "Figma Designer",
    company: "Yogurberry",
    companyUrl: "https://yogurberry.com.au/",
    location: "Remote",
    type: "Contract",
    description: "Designed the complete UI/UX for Yogurberry's web presence — including brand identity, interactive menu flows, store locator screens, and a loyalty programme experience in Figma.",
    skills: ["Figma", "UI Design", "Prototyping", "Brand Identity", "UX Research"]
  },
  {
    period: "2024",
    role: "Frontend Intern",
    company: "LetsUpgrade — LISA AI",
    companyUrl: "https://lisaapp.in/",
    location: "Remote",
    type: "Internship",
    description: "Worked on LISA AI, an intelligent learning assistant platform by LetsUpgrade. Contributed to building and refining the frontend interface, integrating AI-powered features, and improving user experience across the product.",
    skills: ["React", "JavaScript", "AI Integration", "CSS", "REST APIs"]
  }
];

export const education = [
  {
    period: "2021 - Present",
    degree: "Bachelor of Technology in Computer Science & Engineering",
    institution: "ITM Skills University",
    details: "Currently pursuing B.Tech CSE with a focus on full-stack web development, UI/UX design, and modern software engineering practices."
  },
  {
    period: "2023",
    degree: "12th Standard (HSC)",
    institution: "KSA Barns High School Junior College, Panvel",
    details: "Completed 12th grade (Higher Secondary Certificate) from KSA Barns High School Junior College, Panvel."
  },
  {
    period: "2021",
    degree: "10th Standard (SSC)",
    institution: "KSA Barns High School Junior College, Panvel",
    details: "Completed 10th grade (Secondary School Certificate) from KSA Barns High School Junior College, Panvel."
  }
];

export const contactDetails = {
  headline: "Let's build something remarkable together",
  subheading: "Whether you have a question, project inquiry, or just want to connect, feel free to drop a message!",
  email: "raodisha33@gmail.com",
  phone: "+91 89570 50747",
  location: "Panvel, Navi Mumbai, India"
};
