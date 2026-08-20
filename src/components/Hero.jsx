import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Github, Linkedin, Twitter, Mail, Download } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';
import { useScramble } from '../hooks/useScramble';
import MultilingualName, { MultilingualHello } from './MultilingualName';
import './Hero.css';

/* ── Magnetic button (preserved + improved) ─────────────── */
function MagneticBtn({ children, className, href, style }) {
  const ref     = useRef(null);
  const isMobile = typeof window !== 'undefined' && !window.matchMedia('(pointer:fine)').matches;

  const onMove = (e) => {
    if (isMobile) return;
    const el   = ref.current;
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) * 0.32;
    const dy   = (e.clientY - cy) * 0.32;
    el.style.transform  = `translate(${dx}px, ${dy}px)`;
    el.style.transition = 'transform 0.1s ease';
  };

  const onLeave = () => {
    const el = ref.current;
    el.style.transform  = '';
    el.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
  };

  const Tag = href ? 'a' : 'button';
  return (
    <Tag ref={ref} href={href} className={className} style={style}
         onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </Tag>
  );
}

/* ── Parallax layer ──────────────────────────────────────── */
function ParallaxLayer({ children, factor = 4, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const isMobile = !window.matchMedia('(pointer:fine)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    if (isMobile || isReduced) return;

    let targetX = 0, targetY = 0, currX = 0, currY = 0, rafId;

    const onMove = (e) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      targetX  = ((e.clientX - cx) / cx) * factor;
      targetY  = ((e.clientY - cy) / cy) * factor;
    };

    const tick = () => {
      currX += (targetX - currX) * 0.06;
      currY += (targetY - currY) * 0.06;
      if (ref.current) {
        ref.current.style.transform = `translate(${currX}px, ${currY}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, [factor]);

  return <div ref={ref} className={className}>{children}</div>;
}

export default function Hero({ ready }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, [ready]);

  const firstName = useScramble(personalDetails.name.split(' ')[0], 200, 35, 800);

  const ruledTopRef    = useRef(null);
  const ruledBottomRef = useRef(null);
  useEffect(() => {
    if (!revealed) return;
    setTimeout(() => ruledTopRef.current?.classList.add('line-revealed'),    50);
    setTimeout(() => ruledBottomRef.current?.classList.add('line-revealed'), 1100);
  }, [revealed]);

  return (
    <section id="home" className="hero-section">
      <div ref={ruledTopRef}    className="hero-ruled-top"    aria-hidden="true" />
      <div ref={ruledBottomRef} className="hero-ruled-bottom" aria-hidden="true" />

      {/* ── Background grid layer (slowest parallax) ── */}
      <ParallaxLayer factor={2} className="hero-bg-grid" />

      {/* ── Decorative red accent shape (mid parallax) ── */}
      <ParallaxLayer factor={8} className="hero-red-shape" />

      <div className="container">
        {/* Index label */}
        <div className={`hero-index-label hero-fade-in${revealed ? ' hero-fade-in--go' : ''}`}
             style={{ transitionDelay: '0.5s' }}>
          <span>Portfolio 2025</span>
          <span>—</span>
          <span>{personalDetails.location}</span>
        </div>

        {/* ── Headline ── */}
        <ParallaxLayer factor={4} className="hero-headline-wrap">
          <div className="hero-intro-block" aria-label={`Hello, I'm ${personalDetails.name}`}>

            {/* Line 1: greeting — glitches through languages */}
            <div className="hero-headline-row">
              <span className={`hero-clip-inner hero-greeting d1${revealed ? ' revealed' : ''}`}>
                <MultilingualHello
                  frameDelay={55}
                  restDuration={3500}
                  showScript={false}
                  className="hero-hello"
                />
                <span className="hero-greeting-im">&nbsp;I&rsquo;m</span>
              </span>
            </div>

            {/* Line 2: Disha [space] Rao — single centred line */}
            <div className="hero-headline-row hero-name-row">
              <span className={`hero-clip-inner d2${revealed ? ' revealed' : ''}`}>
                <span className="hero-name-first">{firstName}</span>
                <span className="hero-name-gap" aria-hidden="true" />
                <MultilingualName
                  frameDelay={55}
                  restDuration={3500}
                  showScript={true}
                  className="hero-multilingual"
                />
              </span>
            </div>

          </div>
        </ParallaxLayer>

        {/* ── Lower bar ── */}
        <div className={`hero-lower${revealed ? ' hero-lower--visible' : ''}`}>

          <div className="hero-meta">
            <div className={`hero-availability hero-fade-in${revealed ? ' hero-fade-in--go' : ''}`}
                 style={{ transitionDelay: '0.65s' }}>
              <span className="hero-availability-dot" aria-hidden="true" />
              {personalDetails.availability}
            </div>

            <p className={`hero-role hero-fade-in${revealed ? ' hero-fade-in--go' : ''}`}
               style={{ transitionDelay: '0.78s' }}>
              {personalDetails.role}
            </p>

            <p className={`hero-tagline hero-fade-in${revealed ? ' hero-fade-in--go' : ''}`}
               style={{ transitionDelay: '0.9s' }}>
              {personalDetails.tagline}
            </p>

            <div className={`hero-socials hero-fade-in${revealed ? ' hero-fade-in--go' : ''}`}
                 style={{ transitionDelay: '1.02s' }}>
              {[
                { href: personalDetails.github,           icon: <Github   size={16} />, label: 'GitHub'   },
                { href: personalDetails.linkedin,          icon: <Linkedin size={16} />, label: 'LinkedIn' },
                { href: personalDetails.twitter,           icon: <Twitter  size={16} />, label: 'Twitter'  },
                { href: `mailto:${personalDetails.email}`, icon: <Mail     size={16} />, label: 'Email'    },
              ].map(({ href, icon, label }) => (
                <a key={label} href={href}
                   target={href.startsWith('mailto') ? undefined : '_blank'}
                   rel="noopener noreferrer"
                   className="social-icon-link" aria-label={label}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className={`hero-cta hero-fade-in${revealed ? ' hero-fade-in--go' : ''}`}
               style={{ transitionDelay: '1.1s' }}>
            <div className="hero-cta-group">
              <MagneticBtn href="#projects" className="btn btn-primary">
                View Work <ArrowRight size={16} />
              </MagneticBtn>
              <MagneticBtn href="#contact" className="btn btn-outline">
                Get In Touch
              </MagneticBtn>
              <a
                href="/resume.pdf"
                download="Disha_Rao_Resume.pdf"
                className="btn btn-resume"
              >
                <Download size={15} />
                Resume
              </a>
            </div>
            <span className="hero-scroll-hint">
              <span className="hero-scroll-line" aria-hidden="true" />
              Scroll to explore
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
