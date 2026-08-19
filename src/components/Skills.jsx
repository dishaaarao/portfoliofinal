import React from 'react';
import { Layout, Server, Palette } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import './Skills.css';

export default function Skills() {
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Layout': return <Layout size={22} />;
      case 'Server': return <Server size={22} />;
      case 'Palette': return <Palette size={22} />;
      default: return <Layout size={22} />;
    }
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">02. Skills & Capabilities</span>
          <h2 className="section-title">Technical Expertise Matrix</h2>
          <p className="section-description">
            A comprehensive overview of technologies, frameworks, and design tools I leverage daily.
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-category-card glass-card">
              <div className="skill-category-header">
                <div className="skill-category-icon">
                  {getCategoryIcon(category.icon)}
                </div>
                <h3 className="skill-category-title">{category.name}</h3>
              </div>

              <div className="skills-list">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      {skill.highlight && (
                        <span className="skill-highlight">{skill.highlight}</span>
                      )}
                    </div>
                    <div className="skill-bar-bg">
                      <div
                        className="skill-bar-fill"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
