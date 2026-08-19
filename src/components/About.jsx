import React from 'react';
import { Zap, Layout, Server, CheckCircle2 } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';
import './About.css';

export default function About() {
  const coreValues = [
    {
      icon: <Zap size={24} />,
      title: "Performance Driven",
      desc: "Optimizing bundle sizes, rendering speeds, and smooth 60fps keyframe animations for lightning-fast loads."
    },
    {
      icon: <Layout size={24} />,
      title: "Pixel-Perfect UI",
      desc: "Translating complex design concepts into responsive, component-driven, and intuitive user interfaces."
    },
    {
      icon: <Server size={24} />,
      title: "Scalable Architecture",
      desc: "Structuring clean, maintainable codebases with robust state management and seamless REST/GraphQL API flow."
    }
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">01. About Me</span>
          <h2 className="section-title">Driven by Design & Code Excellence</h2>
          <p className="section-description">
            A quick glimpse into my background, core values, and what fuels my passion for engineering.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-bio">
            {personalDetails.aboutLong.map((paragraph, index) => (
              <p key={index} className="about-bio-paragraph">
                {paragraph}
              </p>
            ))}

            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <CheckCircle2 size={18} color="var(--accent-primary)" />
                <span>Responsive Web Specialist</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <CheckCircle2 size={18} color="var(--accent-primary)" />
                <span>Modern JavaScript & React</span>
              </div>
            </div>
          </div>

          <div className="about-stats-grid">
            {personalDetails.stats.map((stat, index) => (
              <div key={index} className="stat-card glass-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-features">
          {coreValues.map((value, idx) => (
            <div key={idx} className="feature-card glass-card">
              <div className="feature-icon-wrapper">
                {value.icon}
              </div>
              <h3 className="feature-title">{value.title}</h3>
              <p className="feature-desc">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
