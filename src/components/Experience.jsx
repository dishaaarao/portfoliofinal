import React from 'react';
import { MapPin } from 'lucide-react';
import { experiences, education } from '../data/portfolioData';
import './Experience.css';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">

        <div style={{ marginBottom: '3rem' }} data-reveal>
          <span className="section-label">Career Journey</span>
          <h2 className="section-title">Work Experience</h2>
        </div>

        {/* Work table */}
        <div className="exp-table" role="list">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="exp-row"
              role="listitem"
              data-reveal="left"
              data-reveal-delay={String(idx + 1)}
            >
              <div className="exp-period">{exp.period}</div>

              <div className="exp-body">
                <h3 className="exp-role">{exp.role}</h3>
                <div className="exp-company">
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="exp-company-link"
                    >
                      {exp.company}
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none"
                           style={{ marginLeft: 4, verticalAlign: 'middle' }}>
                        <path d="M2 10L10 2M10 2H4M10 2V8"
                              stroke="currentColor" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ) : (
                    <span>{exp.company}</span>
                  )}
                  <span style={{ color: 'var(--border-strong)', fontSize: '0.7rem' }}>·</span>
                  <span className="exp-location">
                    <MapPin size={11} style={{ display: 'inline', marginRight: 3, verticalAlign: 'middle' }} />
                    {exp.location}
                  </span>
                </div>
                <p className="exp-desc">{exp.description}</p>
                <div className="exp-tags">
                  {exp.skills.map((skill, si) => (
                    <span key={si} className="exp-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="exp-type">
                <span className="exp-type-badge">{exp.type}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="edu-section">
          <div style={{ marginBottom: '2rem' }} data-reveal>
            <span className="section-label">Academic</span>
            <h2 className="section-title"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>
              Education
            </h2>
          </div>

          <div className="edu-table" role="list">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="edu-row"
                role="listitem"
                data-reveal="left"
                data-reveal-delay="1"
              >
                <div className="edu-period">{edu.period}</div>
                <div>
                  <h3 className="edu-degree">{edu.degree}</h3>
                  <div className="edu-institution">{edu.institution}</div>
                  <p className="edu-details">{edu.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
