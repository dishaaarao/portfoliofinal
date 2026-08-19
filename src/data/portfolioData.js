export const personalDetails = {
  name: "Disha Rao",
  role: "Full-Stack Developer & UI/UX Specialist",
  tagline: "Crafting performant, accessible, and visual-first web experiences.",
  availability: "Available for New Opportunities",
  location: "Bangalore, India / Remote",
  email: "disha.rao@example.com",
  github: "https://github.com/disharao",
  linkedin: "https://linkedin.com/in/disharao",
  twitter: "https://twitter.com/disharao_dev",
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

export const projectCategories = ["All", "Full Stack", "Frontend", "UI/UX Design"];

export const projects = [
  {
    id: "yogurberry-brand",
    title: "Yogurberry Interactive Experience",
    category: "Frontend",
    subtitle: "Modern Frozen Yogurt Brand Web App",
    description: "A vibrant, interactive web application featuring custom flavor customizers, store locators, loyalty membership calculator, dynamic wave animations, and glassmorphic UI elements.",
    tags: ["React", "Vite", "CSS Modules", "Custom Animations", "Responsive"],
    githubUrl: "https://github.com/disharao/yogurberry-app",
    liveUrl: "https://yogurberry.example.com",
    featured: true,
    imageBg: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)",
    highlights: [
      "Custom flavor modal picker with ingredient breakdown",
      "Dynamic interactive wave dividers and smooth drip keyframes",
      "Store locator filterable by city and feature tags",
      "Dark & Light mode themes with HSL palette tokens"
    ]
  },
  {
    id: "taskpulse-analytics",
    title: "TaskPulse Analytics Dashboard",
    category: "Full Stack",
    subtitle: "AI-Powered Productivity & Project Insights",
    description: "An intuitive SaaS dashboard providing real-time team workflow telemetry, task completion forecasting, automated report generation, and dark mode design system.",
    tags: ["React", "TypeScript", "Node.js", "Express", "Chart.js"],
    githubUrl: "https://github.com/disharao/taskpulse-dashboard",
    liveUrl: "https://taskpulse.example.com",
    featured: true,
    imageBg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    highlights: [
      "Real-time analytics widgets with drag-and-drop customization",
      "JWT authentication with role-based access control (RBAC)",
      "Automated summary generation for weekly team standups"
    ]
  },
  {
    id: "aurora-design-system",
    title: "Aurora Design System & Components",
    category: "UI/UX Design",
    subtitle: "Accessible React UI Component Library",
    description: "A comprehensive UI component library featuring 30+ accessible components, Figma design kit, theme tokens, interactive documentation, and zero-dependency animations.",
    tags: ["Figma", "React", "Storybook", "Accessibility (a11y)"],
    githubUrl: "https://github.com/disharao/aurora-design-system",
    liveUrl: "https://aurora-ui.example.com",
    featured: true,
    imageBg: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    highlights: [
      "Fully WCAG 2.1 AA compliant component set",
      "Interactive Storybook playground with live token tweaking",
      "Lightweight CSS variable driven dynamic color schemes"
    ]
  },
  {
    id: "crypto-vault-tracker",
    title: "CryptoVault Portfolio Hub",
    category: "Full Stack",
    subtitle: "Real-time Crypto Portfolio & Market Explorer",
    description: "A web platform connecting to live crypto pricing APIs, featuring interactive Candlestick charts, custom price alert notifications, and wallet tracking.",
    tags: ["React", "Tailwind CSS", "WebSocket", "CoinGecko API"],
    githubUrl: "https://github.com/disharao/cryptovault-tracker",
    liveUrl: "https://cryptovault.example.com",
    featured: false,
    imageBg: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    highlights: [
      "Live price streaming via WebSocket connection",
      "Custom alerts sent directly to user browser or email",
      "Exportable CSV tax & transaction summary reports"
    ]
  },
  {
    id: "zenith-agency-portfolio",
    title: "Zenith Creative Agency Site",
    category: "Frontend",
    subtitle: "High-End Motion & Portfolio Web Experience",
    description: "An award-winning agency landing page built with custom micro-interactions, smooth scroll physics, video backgrounds, and dynamic project filtering.",
    tags: ["React", "GSAP", "Vanilla CSS", "Interactive Web GL"],
    githubUrl: "https://github.com/disharao/zenith-agency",
    liveUrl: "https://zenith-agency.example.com",
    featured: false,
    imageBg: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    highlights: [
      "Smooth cursor trailing effect and dynamic magnetic buttons",
      "Page load speed score of 98 on Google Lighthouse",
      "Fluid responsive layout for ultra-wide monitors and mobile devices"
    ]
  }
];

export const experiences = [
  {
    period: "2024 - Present",
    role: "Full-Stack Developer",
    company: "TechNova Solutions",
    location: "Bangalore, India",
    type: "Full-time",
    description: "Architecting and implementing scalable enterprise web applications, driving component library refactoring, and mentoring junior engineers.",
    skills: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"]
  },
  {
    period: "2023 - 2024",
    role: "Frontend Engineer & UI Developer",
    company: "PixelCraft Studios",
    location: "Remote",
    type: "Full-time",
    description: "Designed responsive user interfaces, built reusable component design systems in React, and optimized web performance across client applications.",
    skills: ["React", "JavaScript", "CSS Modules", "Figma", "Redux"]
  },
  {
    period: "2022 - 2023",
    role: "UI/UX Engineering Intern",
    company: "InnovateX Labs",
    location: "Bangalore, India",
    type: "Internship",
    description: "Created high-fidelity wireframes in Figma, converted design mockups into functional React components, and conducted usability testing.",
    skills: ["HTML5", "CSS3", "JavaScript", "Figma", "Git"]
  }
];

export const education = [
  {
    period: "2019 - 2023",
    degree: "Bachelor of Technology in Computer Science & Engineering",
    institution: "Visvesvaraya Technological University",
    details: "Graduated with Honors. Specialization in Web Technologies and Human-Computer Interaction."
  }
];

export const contactDetails = {
  headline: "Let's build something remarkable together",
  subheading: "Whether you have a question, project inquiry, or just want to connect, feel free to drop a message!",
  email: "disha.rao@example.com",
  phone: "+91 98765 43210",
  location: "Bangalore, Karnataka, India"
};
