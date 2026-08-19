import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { experiences, education } from '../data/portfolioData';
import './Experience.css';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">04. Career Journey</span>
          <h2 className="section-title">Work Experience & Education</h2>
          <p className="section-description">
            A timeline of my professional roles, engineering contributions, and academic background.
          </p>
        </div>

        {/* Work History Timeline */}
        <div className="timeline-container">
          {experiences.map((exp, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-node"></div>
              <div className="timeline-card glass-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{exp.role}</h3>
                    <div className="timeline-company">
                      <Briefcase size={16} />
                      <span>{exp.company}</span>
                      <span style={{ color: 'var(--text-muted)' }}>•</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        <MapPin size={13} style={{ display: 'inline', marginRight: '3px' }} />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  <span className="timeline-period">
                    <Calendar size={13} style={{ display: 'inline', marginRight: '4px' }} />
                    {exp.period}
                  </span>
                </div>

                <p className="timeline-desc">{exp.description}</p>

                <div className="project-tags">
                  {exp.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="project-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div className="education-section">
          <h3 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '1.5rem' }}>
            Academic Foundation
          </h3>
          <div className="timeline-container" style={{ maxWidth: '700px' }}>
            {education.map((edu, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-node" style={{ borderColor: 'var(--accent-secondary)', boxShadow: '0 0 10px var(--accent-secondary)' }}></div>
                <div className="timeline-card glass-card">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role" style={{ fontSize: '1.15rem' }}>{edu.degree}</h3>
                      <div className="timeline-company" style={{ color: 'var(--accent-secondary)' }}>
                        <GraduationCap size={16} />
                        <span>{edu.institution}</span>
                      </div>
                    </div>
                    <span className="timeline-period">{edu.period}</span>
                  </div>
                  <p className="timeline-desc" style={{ marginBottom: 0 }}>{edu.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
