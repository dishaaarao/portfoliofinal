import React, { useEffect, useState } from 'react';
import { personalDetails } from '../data/portfolioData';
import './Hero.css';

export default function Hero({ ready }) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, [ready]);
  const c = n => `${n}${go ? ` ${n}--go` : ''}`;

  return (
    <section id="home" className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__wrap">

        {/* ── LEFT ── */}
        <aside className="hero__left">
          <div className={c('hero__role')}>
            <p>Full-Stack Developer</p>
            <p>&amp; UI/UX Designer</p>
          </div>

          <svg className={c('hero__arrow')} viewBox="0 0 130 100"
               fill="none" aria-hidden="true">
            <path className="hero__arrow-path"
              d="M20 80 C 35 25, 85 8, 115 42"
              stroke="var(--accent)" strokeWidth="2.6"
              strokeLinecap="round" fill="none"
              strokeDasharray="190" strokeDashoffset="190"/>
            <polyline points="104,31 115,42 104,55"
              stroke="var(--accent)" strokeWidth="2.6"
              strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>

          <div className={c('hero__stats')}>
            {[
              { v:'3+',  l1:'Projects',    l2:'Completed'  },
              { v:'10+', l1:'Technologies',l2:'Mastered'   },
              { v:'2+',  l1:'Years',       l2:'Learning'   },
            ].map((s,i) => (
              <div key={i} className="hero__stat">
                <span className="hero__stat-v">{s.v}</span>
                <span className="hero__stat-l">{s.l1}<br/>{s.l2}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* ── CENTRE ── */}
        <div className="hero__centre">
          <div className={c('hero__hey')} aria-hidden="true">
            <span className="hero__hey-text">Hey, I'm Disha</span>
          </div>
          <img src="/disha.png" alt="Disha Rao"
               className={c('hero__photo')} draggable={false}/>
        </div>

        {/* ── RIGHT ── */}
        <aside className="hero__right">
          <div className={c('hero__bubble')}>
            <p>Turning ideas into intelligent digital experiences.</p>
          </div>
          <a href={`mailto:${personalDetails.email}`}
             className={c('hero__email')}>
            {personalDetails.email}
          </a>
          <a href="/resume.pdf" download="Disha_Rao_Resume.pdf"
             className={c('hero__dlcv')}>
            Download CV
          </a>
        </aside>

      </div>
    </section>
  );
}
