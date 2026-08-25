import React, { useRef, useState, useEffect } from 'react';
import { personalDetails } from '../data/portfolioData';
import {
  Download, Sparkles, Code2, Palette, Cpu, Terminal, ShieldCheck, Wrench,
  Play, CheckCircle2, Sliders, Layers, Eye, RefreshCw
} from 'lucide-react';
import './About.css';

const interestDetails = [
  {
    name: 'Web Development',
    icon: Code2,
    tag: 'Full-Stack',
    desc: 'Crafting performant React/Next.js frontends with robust Node.js APIs & database architectures.',
    tools: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB']
  },
  {
    name: 'UI / UX Design',
    icon: Palette,
    tag: 'Design Systems',
    desc: 'Designing Figma prototypes, wireframes, accessible component libraries & micro-interactions.',
    tools: ['Figma', 'Prototyping', 'Design Tokens', 'User Research']
  },
  {
    name: 'AI & Machine Learning',
    icon: Cpu,
    tag: 'Intelligent Apps',
    desc: 'Integrating LLM APIs, real-time prompt engineering, and conversational AI into web workflows.',
    tools: ['OpenAI API', 'Gemini AI', 'Prompt Systems', 'Vector Search']
  },
  {
    name: 'DSA & Algorithms',
    icon: Terminal,
    tag: 'Problem Solving',
    desc: 'Writing optimized algorithms, data structures, and high-performance JS/C++ solutions.',
    tools: ['Array/Trees', 'Graph Search', 'Dynamic Programming', 'Optimization']
  },
  {
    name: 'Cybersecurity',
    icon: ShieldCheck,
    tag: 'App Security',
    desc: 'Implementing secure auth, XSS/CSRF mitigation, sanitization, and web security protocols.',
    tools: ['Auth / JWT', 'XSS Prevention', 'CORS & Headers', 'OWASP Top 10']
  },
  {
    name: 'Creative Technology',
    icon: Sparkles,
    tag: 'Interactive Web',
    desc: 'Building glassmorphic interfaces, hand-drawn doodle SVG animations, and scroll interactions.',
    tools: ['SVG Animation', 'GSAP / Lenis', 'CSS Math', 'Interactive UI']
  },
];

function StatCard({ label, value, index }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef(null);

  const numericMatch = value.match(/(\d+)/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/, '');

  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = null;
          const duration = 1200 + index * 150;

          const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(eased * targetNumber));
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(targetNumber);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [targetNumber, index, hasAnimated]);

  return (
    <div
      ref={cardRef}
      className={`about-stat ${hasAnimated ? 'is-animated' : ''}`}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <span className="about-stat__v">
        {hasAnimated ? count : 0}
        <span className="about-stat__suffix">{suffix}</span>
      </span>
      <span className="about-stat__l">{label}</span>
    </div>
  );
}

export default function About() {
  const [mode, setMode] = useState('dev'); // 'dev' | 'design'
  const [selectedInterest, setSelectedInterest] = useState(interestDetails[0]);
  const [codeOutput, setCodeOutput] = useState(null);
  const [isRunningCode, setIsRunningCode] = useState(false);

  const handleRunCode = () => {
    setIsRunningCode(true);
    setCodeOutput(null);
    setTimeout(() => {
      setIsRunningCode(false);
      setCodeOutput('⚡ Compiled successfully: 0 errors | 100% test coverage | Status: Ready to ship!');
    }, 600);
  };

  return (
    <section id="about" className={`section about-s mode-${mode}`}>
      <div className="container">
        
        {/* Top Unique Persona Mode Switcher */}
        <div className="about-mode-bar" data-reveal>
          <span className="about-mode-label">Interactive View Mode:</span>
          <div className="about-mode-toggle">
            <button
              className={`about-mode-btn ${mode === 'dev' ? 'is-active' : ''}`}
              onClick={() => setMode('dev')}
            >
              <Code2 size={15} />
              <span>Developer Mode</span>
            </button>
            <button
              className={`about-mode-btn ${mode === 'design' ? 'is-active' : ''}`}
              onClick={() => setMode('design')}
            >
              <Palette size={15} />
              <span>Designer Mode</span>
            </button>
          </div>
        </div>

        <div className="about-grid">

          {/* Left Column — Bio & Interactive Card */}
          <div className="about-intro" data-reveal>
            <div className="about-badge-row">
              <span className="section-label">
                {mode === 'dev' ? 'Developer Profile' : 'Designer Profile'}
              </span>
              <div className="about-status-pill">
                <span className="about-status-dot"></span>
                <span className="about-status-text">Available for Opportunities</span>
              </div>
            </div>

            <h2 className="about-heading">
              {mode === 'dev' ? (
                <>
                  Engineering <span className="about-highlight-word">scalable
                    <svg className="about-brush-underline" viewBox="0 0 200 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M 4 10 Q 50 2, 100 8 T 196 6" stroke="#0d9488" strokeWidth="3.5" strokeLinecap="round" />
                    </svg>
                  </span><br />
                  web solutions.
                </>
              ) : (
                <>
                  Designing <span className="about-highlight-word">intuitive
                    <svg className="about-brush-underline" viewBox="0 0 200 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M 4 10 Q 50 2, 100 8 T 196 6" stroke="#8b5cf6" strokeWidth="3.5" strokeLinecap="round" />
                    </svg>
                  </span><br />
                  digital experiences.
                </>
              )}
            </h2>

            <p className="about-para">
              I'm <strong className="about-name-accent">Disha Rao</strong> — a B.Tech Computer Science student at ITM Skills University
              {mode === 'dev'
                ? ' who loves architecting fast web applications, clean REST APIs, and integrating AI models into practical software.'
                : ' with a deep passion for UI/UX prototyping, design systems, visual hierarchy, and polished user journeys.'}
            </p>

            {/* Interactive Mode Card (Terminal in Dev Mode, Figma Inspector in Design Mode) */}
            <div className="about-mode-card">
              {mode === 'dev' ? (
                <div className="about-terminal-box">
                  <div className="about-terminal-header">
                    <div className="about-terminal-dots">
                      <span className="dot dot-red"></span>
                      <span className="dot dot-yellow"></span>
                      <span className="dot dot-green"></span>
                    </div>
                    <span className="about-terminal-title">disha_profile.js</span>
                    <button className="about-run-btn" onClick={handleRunCode} disabled={isRunningCode}>
                      {isRunningCode ? <RefreshCw size={12} className="spin" /> : <Play size={12} />}
                      <span>{isRunningCode ? 'Running...' : 'Run'}</span>
                    </button>
                  </div>
                  <div className="about-terminal-body">
                    <pre>
                      <code>
                        <span className="code-kw">const</span> <span className="code-var">developer</span> = &#123;<br />
                        &nbsp;&nbsp;<span className="code-key">name</span>: <span className="code-str">"Disha Rao"</span>,<br />
                        &nbsp;&nbsp;<span className="code-key">focus</span>: <span className="code-str">"Full-Stack &amp; AI Apps"</span>,<br />
                        &nbsp;&nbsp;<span className="code-key">coreStack</span>: [<span className="code-str">"React"</span>, <span className="code-str">"Node.js"</span>, <span className="code-str">"AI APIs"</span>],<br />
                        &nbsp;&nbsp;<span className="code-key">shipCode</span>: () =&gt; <span className="code-str">"Pixel-perfect &amp; performant"</span><br />
                        &#125;;
                      </code>
                    </pre>
                    {codeOutput && (
                      <div className="about-terminal-output">
                        <CheckCircle2 size={13} className="output-icon" />
                        <span>{codeOutput}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="about-figma-box">
                  <div className="about-figma-header">
                    <div className="about-figma-badge">
                      <Layers size={13} />
                      <span>Design Inspector</span>
                    </div>
                    <span className="about-figma-meta">1920 × 1080 • 100%</span>
                  </div>
                  <div className="about-figma-body">
                    <div className="about-figma-swatches">
                      <div className="swatch swatch-1" title="Primary Teal">#0D9488</div>
                      <div className="swatch swatch-2" title="Accent Violet">#8B5CF6</div>
                      <div className="swatch swatch-3" title="Dark Ink">#111827</div>
                      <div className="swatch swatch-4" title="Cream Canvas">#F5F4EF</div>
                    </div>
                    <div className="about-figma-spec">
                      <div className="spec-item">
                        <span className="spec-label">Font Family</span>
                        <span className="spec-val">Outfit / Inter</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Grid Overlay</span>
                        <span className="spec-val">40px Blueprint</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Aesthetic</span>
                        <span className="spec-val">Hand-Drawn + Modern</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="about-actions">
              <a
                href="/resume.pdf"
                download="Disha_Rao_Resume.pdf"
                className="about-cv-btn"
              >
                <Download size={16} className="about-cv-icon" />
                <span>Download CV</span>
                <span className="about-cv-shine"></span>
              </a>
            </div>
          </div>

          {/* Right Column — Interactive Chips + Inspection Modal + Stats */}
          <div className="about-right" data-reveal data-reveal-delay="1">
            
            {/* Interests & Interactive Inspector */}
            <div className="about-interests-box">
              <p className="about-interests-label">
                <Sparkles size={13} className="about-label-icon" />
                Click an area to inspect details
              </p>
              
              <div className="about-chips">
                {interestDetails.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedInterest.name === item.name;
                  return (
                    <button
                      key={item.name}
                      className={`about-chip ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setSelectedInterest(item)}
                    >
                      <Icon size={14} className="about-chip-icon" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Interactive Detail Inspector Card */}
              {selectedInterest && (
                <div className="about-inspector-card">
                  <div className="inspector-head">
                    <div className="inspector-title-row">
                      {React.createElement(selectedInterest.icon, { size: 16, className: 'inspector-icon' })}
                      <h4>{selectedInterest.name}</h4>
                    </div>
                    <span className="inspector-tag">{selectedInterest.tag}</span>
                  </div>
                  <p className="inspector-desc">{selectedInterest.desc}</p>
                  <div className="inspector-tools">
                    <span className="tools-label"><Wrench size={11} /> Featured Tools:</span>
                    <div className="tools-pills">
                      {selectedInterest.tools.map(t => (
                        <span key={t} className="tool-pill">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Live Stats */}
            <div className="about-stats-container">
              <p className="about-stats-title">Key Impact &amp; Metrics</p>
              <div className="about-stats">
                {personalDetails.stats.map((s, i) => (
                  <StatCard key={i} label={s.label} value={s.value} index={i} />
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
