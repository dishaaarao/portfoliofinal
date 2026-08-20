import React, { useRef, useEffect, useState } from 'react';
import { skillCategories } from '../data/portfolioData';
import './Skills.css';

/* ─────────────────────────────────────────────────────────
   Canvas Hex Background — small, blurred, subtle
───────────────────────────────────────────────────────── */
function HexCanvas() {
  const canvasRef = useRef(null);
  const S = useRef({ hexes: [], mouse: { x: -999, y: -999 }, ripples: [], raf: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const R   = S.current;
    const SIZE = 12;
    const HEX_W = SIZE * 2;
    const HEX_H = Math.sqrt(3) * SIZE;
    const ACCENT = '230,57,70';

    function buildGrid() {
      R.hexes = [];
      const cols = Math.ceil(canvas.width  / (HEX_W * 0.75)) + 3;
      const rows = Math.ceil(canvas.height / HEX_H) + 3;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          R.hexes.push({
            x: c * HEX_W * 0.75,
            y: r * HEX_H + (c % 2 === 0 ? 0 : HEX_H / 2),
            glow: 0, target: 0,
            timer: Math.random() * 10000,
            interval: 4000 + Math.random() * 8000,
          });
        }
      }
    }

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildGrid();
    }

    function hexPath(cx, cy, s) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        i === 0 ? ctx.moveTo(cx + s * Math.cos(a), cy + s * Math.sin(a))
                : ctx.lineTo(cx + s * Math.cos(a), cy + s * Math.sin(a));
      }
      ctx.closePath();
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      R.hexes.forEach(h => {
        h.timer += 16;
        if (h.timer > h.interval) {
          h.timer = 0;
          h.target = Math.random() > 0.6 ? 0.2 + Math.random() * 0.35 : 0;
        }
        const dx = h.x - R.mouse.x, dy = h.y - R.mouse.y;
        const mGlow = Math.max(0, 1 - Math.sqrt(dx*dx+dy*dy) / 90);
        let rGlow = 0;
        R.ripples.forEach(rp => {
          const ring = Math.abs(Math.sqrt((h.x-rp.x)**2+(h.y-rp.y)**2) - rp.r);
          if (ring < 18) rGlow = Math.max(rGlow, (1-ring/18)*rp.a);
        });
        const tgt = Math.max(h.target, mGlow * 0.7, rGlow);
        h.glow += (tgt - h.glow) * 0.07;
        const g = h.glow;
        hexPath(h.x, h.y, SIZE - 1);
        ctx.strokeStyle = g < 0.02 ? `rgba(${ACCENT},0.10)` : `rgba(${ACCENT},${0.10 + g*0.55})`;
        ctx.lineWidth = 0.5 + g * 0.8;
        ctx.stroke();
        if (g > 0.05) {
          hexPath(h.x, h.y, SIZE - 1);
          ctx.fillStyle = `rgba(${ACCENT},${g*0.08})`;
          ctx.fill();
        }
      });
      R.ripples = R.ripples.filter(rp => rp.a > 0.01);
      R.ripples.forEach(rp => { rp.r += 4; rp.a *= 0.95; });
      R.raf = requestAnimationFrame(draw);
    }

    const onMove  = e => { const rc = canvas.getBoundingClientRect(); R.mouse = { x: e.clientX-rc.left, y: e.clientY-rc.top }; };
    const onClick = e => { const rc = canvas.getBoundingClientRect(); R.ripples.push({ x: e.clientX-rc.left, y: e.clientY-rc.top, r: 0, a: 0.8 }); };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    canvas.addEventListener('mousemove', onMove, { passive: true });
    canvas.addEventListener('click', onClick);
    R.raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(R.raf);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('click', onClick);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="hex-canvas" aria-hidden="true" />;
}

/* ─────────────────────────────────────────────────────────
   Skill Flip Card
───────────────────────────────────────────────────────── */
function SkillFlipCard({ skill, category }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="sfc-wrap sfc-wrap--in"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      tabIndex={0}
      role="button"
      aria-label={`${skill.name} — ${skill.level}%`}
    >
      <div className={`sfc${flipped ? ' sfc--flipped' : ''}`}>
        {/* Front */}
        <div className="sfc__face sfc__face--front">
          <svg className="sfc__hex-icon" viewBox="0 0 24 24" aria-hidden="true">
            <polygon points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7"
              fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span className="sfc__name">{skill.name}</span>
          {skill.highlight && <span className="sfc__tag">{skill.highlight}</span>}
          <span className="sfc__hint">flip →</span>
        </div>
        {/* Back */}
        <div className="sfc__face sfc__face--back">
          <div className="sfc__back-hex" aria-hidden="true">
            <svg viewBox="0 0 80 80">
              <polygon points="40,4 72,22 72,58 40,76 8,58 8,22"
                fill="none" stroke="rgba(230,57,70,0.3)" strokeWidth="1.5" />
              <polygon points="40,14 62,26 62,54 40,66 18,54 18,26"
                fill="none" stroke="rgba(230,57,70,0.15)" strokeWidth="1" />
            </svg>
            <span className="sfc__back-pct">{skill.level}<small>%</small></span>
          </div>
          <span className="sfc__cat">{category}</span>
          <div className="sfc__bar">
            <div className="sfc__bar-fill"
              style={{ width: flipped ? `${skill.level}%` : '0%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Infinite Marquee Row
   direction: 'left' (→ RTL)  |  'right' (→ LTR)
   Duplicates items so the loop is seamless.
───────────────────────────────────────────────────────── */
function MarqueeRow({ skills, category, direction = 'left', speed = 38, inView }) {
  const trackRef = useRef(null);
  // Duplicate items 3× so there's always enough to fill & loop
  const items = [...skills, ...skills, ...skills];

  return (
    <div
      className={`marquee-row${inView ? ' marquee-row--in' : ''}`}
      style={{ '--marquee-speed': `${speed}s` }}
    >
      {/* Fade masks on left/right edges */}
      <div className="marquee-fade marquee-fade--left"  aria-hidden="true" />
      <div className="marquee-fade marquee-fade--right" aria-hidden="true" />

      <div
        ref={trackRef}
        className={`marquee-track marquee-track--${direction}`}
      >
        {items.map((skill, i) => (
          <div key={i} className="marquee-item">
            <SkillFlipCard skill={skill} category={category} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Category section — header + marquee
───────────────────────────────────────────────────────── */
function SkillSection({ cat, catIndex }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const direction = catIndex % 2 === 0 ? 'left' : 'right'; // alternating

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="skill-section">
      {/* Header */}
      <div
        className={`skill-section__head${inView ? ' skill-section__head--in' : ''}`}
        style={{ transitionDelay: `${catIndex * 0.08}s` }}
      >
        <span className="skill-section__num">0{catIndex + 1}</span>
        <h3 className="skill-section__title">{cat.name}</h3>
        <div className="skill-section__line" />
        <span className="skill-section__dir">
          {direction === 'left' ? '← →' : '→ ←'}
        </span>
      </div>

      {/* Marquee */}
      <MarqueeRow
        skills={cat.skills}
        category={cat.name}
        direction={direction}
        speed={32 + catIndex * 4}   // slightly different speed per row
        inView={inView}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────── */
export default function Skills() {
  const headerRef = useRef(null);
  const [headerIn, setHeaderIn] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeaderIn(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="section skills-section">
      <HexCanvas />
      <div className="hex-vignette" aria-hidden="true" />

      <div className="skills-container">
        {/* Header — inside normal container padding */}
        <div className="container">
          <div ref={headerRef} className={`skills-header${headerIn ? ' skills-header--in' : ''}`}>
            <span className="section-label">Skills &amp; Capabilities</span>
            <h2 className="skills-heading">
              <span className="skills-heading__line">Technical</span>
              <span className="skills-heading__line skills-heading__line--outline">Expertise</span>
            </h2>
            <p className="skills-subhead">hover cards to flip · rows scroll infinitely</p>
          </div>
        </div>

        {/* Marquee rows — full bleed (no container) */}
        {skillCategories.map((cat, ci) => (
          <SkillSection key={ci} cat={cat} catIndex={ci} />
        ))}
      </div>
    </section>
  );
}
