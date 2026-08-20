import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';
import './Hero.css';

export default function Hero({ ready }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, [ready]);

  const cls = (base) => `${base}${revealed ? ` ${base}--in` : ''}`;

  return (
    <section id="home" className="hero-section">

      {/* Subtle grid lines — same as reference */}
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-body">

        {/* ── LEFT ─────────────────────────────────────── */}
        <div className="hero-left">

          <div className={cls('hero-role')}>
            <p>Full-Stack Developer</p>
            <p>&amp; UI/UX Designer</p>
          </div>

          {/* Curved arrow SVG */}
          <svg className={cls('hero-arrow')} viewBox="0 0 130 90"
               fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path className="hero-arrow__path"
              d="M15 70 C 30 20, 80 10, 110 40"
              stroke="var(--accent)" strokeWidth="2.8"
              strokeLinecap="round" fill="none"
              strokeDasharray="180" strokeDashoffset="180" />
            <polyline className="hero-arrow__head"
              points="100,30 110,40 100,52"
              stroke="var(--accent)" strokeWidth="2.8"
              strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>

          {/* Stats row */}
          <div className={cls('hero-stats')}>
            {[
              { value: '2+',  label1: 'Yrs',        label2: 'Experience'  },
              { value: '10+', label1: 'Projects',    label2: 'Built'       },
              { value: '3',   label1: 'Internships', label2: 'Completed'   },
            ].map((s, i) => (
              <div key={i} className="hero-stat">
                <span className="hero-stat__val">{s.value}</span>
                <span className="hero-stat__lbl">{s.label1}<br />{s.label2}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CENTRE ───────────────────────────────────── */}
        <div className="hero-centre">
          {/* "Hey, There" behind photo */}
          <div className={cls('hero-hey')} aria-hidden="true">
            <span className="hero-hey__text">Hey, There</span>
          </div>

          {/* Cutout photo — mix-blend removes dark bg */}
          <img
            src="/remove.jpeg"
            alt="Disha Rao"
            className={cls('hero-photo')}
            draggable={false}
          />
        </div>

        {/* ── RIGHT ────────────────────────────────────── */}
        <div className="hero-right">

          {/* Oval tagline bubble */}
          <div className={cls('hero-bubble')}>
            <p>Crafting performant,<br />accessible and<br />visual-first experiences.</p>
          </div>

          {/* Email pill */}
          <a href={`mailto:${personalDetails.email}`}
             className={cls('hero-email')}>
            {personalDetails.email}
          </a>

          {/* Download CV */}
          <a href="/resume.pdf" download="Disha_Rao_Resume.pdf"
             className={cls('hero-cv-btn')}>
            <Download size={14} />
            Download CV
          </a>

        </div>
      </div>
    </section>
  );
}
