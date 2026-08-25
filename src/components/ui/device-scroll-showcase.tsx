import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Sparkles, Globe, Image as ImageIcon, RefreshCw } from 'lucide-react';
import './device-scroll-showcase.css';

export interface ShowcaseProject {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  image: string;
  liveUrl: string;
  tags: string[];
  accent: string;
}

const showcaseProjects: ShowcaseProject[] = [
  {
    id: 'aura-ai',
    title: 'Aura — AI Assistant',
    category: 'Full-Stack & AI',
    subtitle: 'Conversational AI Web Application built with React frontend & integrated LLM APIs',
    image: '/lisa-ai.png',
    liveUrl: 'https://aura-lilac-xi-14.vercel.app/',
    tags: ['React', 'AI/LLM API', 'Node.js', 'Tailwind CSS', 'Vercel'],
    accent: '#0d9488'
  },
  {
    id: 'snapscan',
    title: 'SnapScan — Collaborative Gallery',
    category: 'Full-Stack Engineering',
    subtitle: 'Real-time collaborative photo gallery platform with live sync & user tagging',
    image: '/technova.png',
    liveUrl: 'https://snapscan-kappa.vercel.app/',
    tags: ['React', 'Firebase', 'Real-Time Sync', 'CSS Grid', 'Vercel'],
    accent: '#f59e0b'
  },
  {
    id: 'yogurberry',
    title: 'Yogurberry — Brand Design',
    category: 'UI/UX Design',
    subtitle: 'Full brand identity system, custom menu customiser & interactive Figma prototypes',
    image: '/yogurberry.png',
    liveUrl: 'https://yogurberry.com.au/',
    tags: ['Figma', 'UI Design', 'Brand Identity', 'Prototyping'],
    accent: '#ff758c'
  }
];

export const DeviceScrollShowcase: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'live' | 'image'>('live');
  const [rotateX, setRotateX] = useState<number>(16);
  const [scale, setScale] = useState<number>(0.94);
  const [isIframeLoading, setIsIframeLoading] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject = showcaseProjects[activeIdx];

  useEffect(() => {
    setIsIframeLoading(true);
  }, [activeIdx, viewMode]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height * 0.5), 0), 1);
      
      const currentRotate = 16 * (1 - progress);
      const currentScale = 0.94 + 0.06 * progress;

      setRotateX(currentRotate);
      setScale(currentScale);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="device-scroll-container">
      {/* Header */}
      <div className="device-scroll-header" data-reveal>
        <span className="section-label">
          <Sparkles size={14} style={{ color: '#0d9488' }} /> Live Working Projects
        </span>
        <h2 className="device-scroll-title">
          Interactive <span className="title-highlight">3D Device Viewport</span>
        </h2>
        <p className="device-scroll-subtitle">
          Test and interact with my live deployed websites directly inside the device viewport below!
        </p>
      </div>

      {/* Project Selector Tabs & Mode Switcher */}
      <div className="device-tabs-row" data-reveal data-reveal-delay="1">
        <div className="device-project-tabs">
          {showcaseProjects.map((p, idx) => (
            <button
              key={p.id}
              className={`device-tab-btn ${idx === activeIdx ? 'is-active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <span className="tab-dot" style={{ background: p.accent }}></span>
              <span>{p.title}</span>
            </button>
          ))}
        </div>

        {/* Live Website / High-Res View Switcher */}
        <div className="device-view-switcher">
          <button
            className={`view-switch-btn ${viewMode === 'live' ? 'is-active' : ''}`}
            onClick={() => setViewMode('live')}
            title="Interact with live working site inside the device frame"
          >
            <Globe size={13} />
            <span>Live Working Site</span>
          </button>
          <button
            className={`view-switch-btn ${viewMode === 'image' ? 'is-active' : ''}`}
            onClick={() => setViewMode('image')}
            title="View high-resolution screenshot"
          >
            <ImageIcon size={13} />
            <span>Snapshot</span>
          </button>
        </div>
      </div>

      {/* 3D Device Container */}
      <div
        className="device-3d-wrapper"
        style={{ perspective: '1200px' }}
        data-reveal
        data-reveal-delay="2"
      >
        <div
          className="device-frame"
          style={{
            transform: `rotateX(${rotateX}deg) scale(${scale})`,
            transition: 'transform 0.15s cubic-bezier(0.2, 0, 0, 1)',
          }}
        >
          {/* Top Browser Bar */}
          <div className="device-topbar">
            <div className="device-camera-notch">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            
            <div className="device-url-bar">
              <span className="url-lock">🔒</span>
              <span className="url-text">{activeProject.liveUrl}</span>
            </div>

            <div className="device-actions">
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="device-visit-btn"
              >
                <span>Open Fullscreen</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Screen Content Viewport */}
          <div className="device-screen">
            {viewMode === 'live' ? (
              <div className="device-iframe-wrapper">
                {isIframeLoading && (
                  <div className="iframe-loader">
                    <RefreshCw size={20} className="spin-loader" />
                    <span>Loading live interactive website...</span>
                  </div>
                )}
                <iframe
                  src={activeProject.liveUrl}
                  title={activeProject.title}
                  className="device-iframe"
                  onLoad={() => setIsIframeLoading(false)}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            ) : (
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="device-screen-img"
              />
            )}
            
            {/* Bottom Overlay Details Card */}
            <div className="device-info-overlay">
              <div className="info-main">
                <span className="info-category">{activeProject.category}</span>
                <h3 className="info-title">{activeProject.title}</h3>
                <p className="info-sub">{activeProject.subtitle}</p>
                
                <div className="info-tags">
                  {activeProject.tags.map(t => (
                    <span key={t} className="info-tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="info-action">
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-live-btn"
                >
                  <span>Launch Live Site</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceScrollShowcase;
