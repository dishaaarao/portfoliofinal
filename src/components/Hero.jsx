import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Twitter, Mail, Code2, Sparkles } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';
import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-glow-bg"></div>

      <div className="container hero-grid">
        <div className="hero-content">
          <div className="status-badge">
            <span className="status-dot"></span>
            <span>{personalDetails.availability}</span>
          </div>

          <h1 className="hero-title">
            Hi, I'm <span className="text-gradient">{personalDetails.name}</span>
          </h1>

          <div className="hero-role">
            {personalDetails.role}
          </div>

          <p className="hero-tagline">
            {personalDetails.tagline} {personalDetails.aboutShort}
          </p>

          <div className="hero-cta-group">
            <a href="#projects" className="btn btn-primary">
              <span>Explore Projects</span>
              <ArrowRight size={18} />
            </a>

            <a href="#contact" className="btn btn-secondary">
              <Mail size={18} />
              <span>Get In Touch</span>
            </a>
          </div>

          <div className="hero-socials">
            <span className="hero-social-label">Connect:</span>
            <a href={personalDetails.github} target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={personalDetails.twitter} target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Twitter">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-avatar-card glass-card">
            {/* Top Right Floating Badge */}
            <div className="floating-badge badge-top-right">
              <Code2 size={16} color="#8b5cf6" />
              <span>Full Stack Dev</span>
            </div>

            {/* Bottom Left Floating Badge */}
            <div className="floating-badge badge-bottom-left">
              <Sparkles size={16} color="#06b6d4" />
              <span>UI/UX Craftsman</span>
            </div>

            <div className="avatar-circle">
              DR
            </div>

            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{personalDetails.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{personalDetails.location}</p>

            <div className="tech-pills">
              <span className="tech-pill">React.js</span>
              <span className="tech-pill">Next.js</span>
              <span className="tech-pill">TypeScript</span>
              <span className="tech-pill">Node.js</span>
              <span className="tech-pill">UI/UX</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
