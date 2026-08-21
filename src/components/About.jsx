import React from 'react';
import { personalDetails } from '../data/portfolioData';
import './About.css';

const interests = [
  'Web Development','UI / UX Design','AI & Machine Learning',
  'DSA & Algorithms','Cybersecurity','Creative Technology',
];

export default function About() {
  return (
    <section id="about" className="section about-s">
      <div className="container">
        <div className="about-grid">

          {/* Left */}
          <div className="about-intro" data-reveal>
            <span className="section-label">A little about me</span>
            <h2 className="about-heading">
              I build intelligent<br/>digital experiences.
            </h2>
            <p className="about-para">
              I'm Disha — a passionate Full-Stack Developer & UI/UX Designer
              interested in building intelligent, useful and visually engaging
              digital products. I enjoy working across frontend development,
              backend systems, AI integration and creative technology.
            </p>
            <p className="about-para">
              Currently pursuing B.Tech in Computer Science at ITM Skills
              University, I combine my love for design and engineering to
              ship modern web products that feel as good as they work.
            </p>
            <a href="/resume.pdf" download="Disha_Rao_Resume.pdf"
               className="about-cv-btn">Download CV</a>
          </div>

          {/* Right */}
          <div className="about-right" data-reveal data-reveal-delay="1">
            <p className="about-interests-label">Interests &amp; Areas</p>
            <div className="about-chips">
              {interests.map(i => (
                <span key={i} className="about-chip">{i}</span>
              ))}
            </div>

            <div className="about-stats">
              {personalDetails.stats.map((s,i) => (
                <div key={i} className="about-stat">
                  <span className="about-stat__v">{s.value}</span>
                  <span className="about-stat__l">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
