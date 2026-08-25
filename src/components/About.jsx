import React, { useState } from 'react';
import { Download, Sparkles, Code2, Palette, Cpu, Terminal, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './About.css';

const expertiseList = [
  {
    id: 'web',
    title: 'Web Development',
    category: 'Full-Stack Engineering',
    icon: Code2,
    desc: 'Crafting performant React/Next.js applications backed by clean Node.js APIs and scalable database design.',
    tools: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB']
  },
  {
    id: 'uiux',
    title: 'UI / UX Design',
    category: 'Design Systems & Figma',
    icon: Palette,
    desc: 'Designing intuitive wireframes, interactive Figma prototypes, component tokens, and accessible user flows.',
    tools: ['Figma', 'Prototyping', 'Design Tokens', 'User Research']
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    category: 'Intelligent Workflows',
    icon: Cpu,
    desc: 'Integrating LLM APIs, prompt engineering, and conversational AI into practical, user-facing products.',
    tools: ['OpenAI API', 'Gemini AI', 'Prompt Systems', 'Vector Search']
  },
  {
    id: 'dsa',
    title: 'DSA & Algorithms',
    category: 'Core Engineering',
    icon: Terminal,
    desc: 'Writing optimized data structures, algorithmic complexity analysis, and problem-solving in JS & C++.',
    tools: ['Data Structures', 'Search & Sort', 'Optimization']
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    category: 'Application Security',
    icon: ShieldCheck,
    desc: 'Implementing secure auth, XSS/CSRF mitigation, sanitization, and web security best practices.',
    tools: ['JWT Auth', 'XSS Prevention', 'Sanitization']
  },
];

export default function About() {
  const [activeItem, setActiveItem] = useState(expertiseList[0]);

  return (
    <section id="about" className="section about-s">
      <div className="container">
        <div className="about-grid">

          {/* Left Column — Clean Bio */}
          <div className="about-left" data-reveal>
            <div className="about-badge-row">
              <span className="section-label">A little about me</span>
              <span className="about-status-pill">
                <span className="about-status-dot"></span>
                Available for New Opportunities
              </span>
            </div>

            <h2 className="about-heading">
              I build <span className="about-highlight-word">intelligent
                <svg className="about-brush-underline" viewBox="0 0 200 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M 4 10 Q 50 2, 100 8 T 196 6" stroke="#0d9488" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </span><br />
              digital experiences.
            </h2>

            <p className="about-para">
              I'm <strong className="about-name-accent">Disha Rao</strong> — a Computer Science student at ITM Skills University &amp; Full-Stack Developer passionate about bridging engineering and design.
            </p>

            <p className="about-para">
              I specialize in building production-ready web products with responsive UI, resilient APIs, and seamless user experiences.
            </p>

            <div className="about-actions">
              <a href="/resume.pdf" download="Disha_Rao_Resume.pdf" className="about-cv-btn">
                <Download size={16} className="about-cv-icon" />
                <span>Download CV</span>
                <span className="about-cv-shine"></span>
              </a>
            </div>
          </div>

          {/* Right Column — Animated Card Showcase */}
          <div className="about-right" data-reveal data-reveal-delay="1">
            
            <div className="about-card">
              <div className="about-card-header">
                <span className="about-card-tag">
                  <Sparkles size={13} style={{ color: '#0d9488' }} /> What I Do
                </span>
                <span className="about-card-sub">Select an area</span>
              </div>

              {/* Interactive Tabs */}
              <div className="about-tabs">
                {expertiseList.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem.id === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`about-tab-btn ${isActive ? 'is-active' : ''}`}
                      onClick={() => setActiveItem(item)}
                    >
                      <Icon size={14} className="tab-icon" />
                      <span>{item.title}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Active Tab Card Content with 3D Card Animation */}
              <div className="about-tab-card-wrapper" style={{ perspective: 1000 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, y: 12, rotateX: -12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, rotateX: 12, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="about-tab-content"
                  >
                    <div className="tab-meta">
                      <span className="tab-category">{activeItem.category}</span>
                    </div>
                    <p className="tab-desc">{activeItem.desc}</p>

                    <div className="tab-tools">
                      {activeItem.tools.map((tool, idx) => (
                        <motion.span
                          key={tool}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05, duration: 0.2 }}
                          className="tool-tag"
                        >
                          {tool}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Streamlined Stats Row */}
            <div className="about-metrics-row">
              <div className="metric-item">
                <span className="metric-num">18+</span>
                <span className="metric-lbl">Projects Built</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-item">
                <span className="metric-num">3+</span>
                <span className="metric-lbl">Years Experience</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-item">
                <span className="metric-num">100%</span>
                <span className="metric-lbl">Satisfaction</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
