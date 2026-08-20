import React, { useRef, useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';
import { useCountUp } from '../hooks/useReveal';
import './About.css';

/* ─────────────────────────────────────────────────────────
   3D Portrait
───────────────────────────────────────────────────────── */
function Portrait3D() {
  const wrapRef = useRef(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (!window.matchMedia('(pointer:fine)').matches) return;

    let tX = 0, tY = 0, cX = 0, cY = 0, raf;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tY =  ((e.clientX - r.left)  / r.width  - 0.5) * 20;
      tX = -((e.clientY - r.top)   / r.height - 0.5) * 14;
    };
    const onLeave = () => { tX = 0; tY = 0; };
    const tick = () => {
      cX += (tX - cX) * 0.08;
      cY += (tY - cY) * 0.08;
      el.style.transform = `rotateX(${cX}deg) rotateY(${cY}deg)`;
      const g = el.querySelector('.portrait-glare');
      if (g) g.style.transform = `translate(${cY * 2}px,${-cX * 2}px)`;
      raf = requestAnimationFrame(tick);
    };
    el.addEventListener('mousemove', onMove, { passive: true });
    el.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="portrait-scene">
      <div className="portrait-glow-ring" aria-hidden="true" />
      <div ref={wrapRef} className="portrait-3d">
        <div className="portrait-img-wrap">
          <img
            src="/disha.png"
            alt="Disha Rao"
            className="portrait-img"
            draggable={false}
            onError={e => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'flex';
            }}
          />
          <div className="portrait-initials" style={{ display: 'none' }}>
            <span>DR</span>
          </div>
        </div>
        <div className="portrait-scanlines" aria-hidden="true" />
        <div className="portrait-glare"    aria-hidden="true" />
        <div className="portrait-frame-tl" aria-hidden="true" />
        <div className="portrait-frame-br" aria-hidden="true" />
        <div className="portrait-label"    aria-hidden="true">
          <span className="portrait-label__dot" />
          <span>Full-Stack Dev · UI/UX</span>
        </div>
      </div>
      <div className="portrait-shadow" aria-hidden="true" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Stat tile (simple count-up, no stacking)
───────────────────────────────────────────────────────── */
function StatTile({ stat, index }) {
  const tileRef = useRef(null);
  const numRef  = useRef(null);
  const [active, setActive] = useState(false);
  const raw    = parseInt(stat.value.replace(/\D/g, ''), 10);
  const suffix = stat.value.replace(/[0-9]/g, '');

  useCountUp(numRef, active ? raw : 0, 1400);

  useEffect(() => {
    const el = tileRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setActive(true), index * 120); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div ref={tileRef} className={`stat-tile${active ? ' stat-tile--in' : ''}`}>
      <div className="stat-tile__top" aria-hidden="true" />
      <div className="stat-tile__value">
        <span ref={numRef} className="count-up">0</span>
        <span className="stat-tile__suffix">{suffix}</span>
      </div>
      <div className="stat-tile__label">{stat.label}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main
───────────────────────────────────────────────────────── */
export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">

        {/* ── Top: label + heading full-width ── */}
        <div className="about-header" data-reveal>
          <span className="section-label">About Me</span>
          <h2 className="about-heading">
            <span className="about-heading__line">Design &amp; Code</span>
            <span className="about-heading__line about-heading__line--outline">in one mind.</span>
          </h2>
        </div>

        {/* ── Main grid: photo | bio ── */}
        <div className="about-main-grid">

          {/* Left: portrait */}
          <div className="about-photo-col">
            <Portrait3D />
          </div>

          {/* Right: bio + checklist */}
          <div className="about-bio-col">
            {personalDetails.aboutLong.map((para, i) => (
              <p key={i} className="about-bio-paragraph"
                 data-reveal data-reveal-delay={i + 1}>
                {para}
              </p>
            ))}

            <ul className="about-checklist" data-reveal data-reveal-delay="4">
              {['Responsive Web Specialist',
                'Modern JavaScript & React Expert',
                'UI/UX Prototyping & Design Systems'].map((item) => (
                <li key={item}>
                  <span className="about-check-icon" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Download Resume button */}
            <a
              href="/resume.pdf"
              download="Disha_Rao_Resume.pdf"
              className="btn btn-resume about-resume-btn"
              data-reveal
              data-reveal-delay="5"
            >
              <Download size={15} />
              Download Resume
            </a>
          </div>
        </div>

        {/* ── Stats row: full-width 4-col grid ── */}
        <div className="about-stats-grid">
          {personalDetails.stats.map((stat, i) => (
            <StatTile key={stat.label} stat={stat} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
