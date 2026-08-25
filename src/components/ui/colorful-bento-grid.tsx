import React from 'react';
import { Gift, ExternalLink, ArrowUpRight, Sparkles, Code2, Layers, BookOpen, Rocket } from 'lucide-react';
import './colorful-bento-grid.css';

export interface BentoProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  linkUrl: string;
  badgeText: string;
}

export const ColorfulBentoGrid: React.FC = () => {
  return (
    <section id="bento-grid" className="bento-section">
      {/* Bento Header */}
      <div className="bento-header">
        <div className="bento-header-top">
          <h2 className="bento-title">
            <span>
              <Gift className="bento-gift-icon" size={36} strokeWidth={2} />
            </span>
            Featured Projects &amp; <br />
            Digital Work.
          </h2>
          <p className="bento-subtitle">
            A curated bento collection of full-stack web applications, Figma UI/UX design systems, and AI platforms built for clients and open-source.
          </p>
        </div>

        <div className="bento-badges">
          <span className="bento-badge-text">✦ 18+ Projects Delivered</span>
          <span className="bento-badge-text">✦ Rated 5/5 by Collaborators</span>
          <span className="bento-badge-text">✦ 100% Client Satisfaction</span>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="bento-grid">
        {/* Card 1 — Aura AI Assistant (Span 2 cols) */}
        <a
          href="https://aura-lilac-xi-14.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="bento-card bento-card-1"
        >
          <div className="bento-card-header">
            <p className="bento-card-sub">⚡ 1,000+ Active Users • Full-Stack &amp; AI</p>
            <h3 className="bento-card-title">Aura — AI Assistant</h3>
          </div>
          <div className="bento-card-img-wrap">
            <img
              src="/lisa-ai.png"
              alt="Aura AI Assistant"
              className="bento-card-img"
            />
          </div>
        </a>

        {/* Card 2 — Yogurberry Brand Design */}
        <a
          href="https://yogurberry.com.au/"
          target="_blank"
          rel="noopener noreferrer"
          className="bento-card bento-card-2"
        >
          <div className="bento-card-header">
            <p className="bento-card-sub">🎨 Figma UI/UX • Brand System</p>
            <h3 className="bento-card-title">Yogurberry Brand</h3>
          </div>
          <div className="bento-card-img-wrap">
            <img
              src="/yogurberry.png"
              alt="Yogurberry Brand Design"
              className="bento-card-img"
            />
          </div>
        </a>

        {/* Card 3 — TechNova Solutions */}
        <a
          href="https://technovasolutions.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="bento-card bento-card-3"
        >
          <div className="bento-card-header">
            <p className="bento-card-sub">💻 Full-Stack Enterprise Architecture</p>
            <h3 className="bento-card-title">TechNova Platform</h3>
          </div>
          <div className="bento-card-img-wrap">
            <img
              src="/technova.png"
              alt="TechNova Solutions"
              className="bento-card-img"
            />
          </div>
        </a>

        {/* Card 4 — Design Tokens & UI Kit */}
        <div className="bento-card bento-card-4">
          <div className="bento-card-header">
            <p className="bento-card-sub">❖ Design Tokens &amp; Components</p>
            <h3 className="bento-card-title bento-card-title-light">UI Design Kit</h3>
          </div>
          <div className="bento-card-footer">
            <span className="bento-card-link-icon">
              <Layers size={14} /> Open System
            </span>
          </div>
        </div>

        {/* Card 5 — Full-Stack Playbooks */}
        <div className="bento-card bento-card-5">
          <div className="bento-card-header">
            <p className="bento-card-sub">🚀 Engineering Architecture</p>
            <h3 className="bento-card-title bento-card-title-light">AI Playbooks</h3>
          </div>
          <div className="bento-card-footer">
            <span className="bento-card-link-icon">
              <Rocket size={14} /> Documentation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorfulBentoGrid;
