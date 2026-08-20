import { useEffect, useRef } from 'react';
import './Marquee.css';

const ITEMS = [
  '✦ CREATIVE DEVELOPER',
  '✦ UI / UX DESIGNER',
  '✦ FULL STACK ENGINEER',
  '✦ REACT SPECIALIST',
  '✦ CREATIVE TECHNOLOGY',
  '✦ PANVEL, NAVI MUMBAI',
];

/**
 * Marquee — two infinite-scroll rows.
 * Row 1 moves left (default), Row 2 moves right (reverse).
 * Speed reacts subtly to scroll velocity via CSS variable --marquee-speed.
 */
export default function Marquee() {
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  const velRef    = useRef(0);
  const lastY     = useRef(0);

  useEffect(() => {
    let rafId;
    const decay = 0.9;

    const onScroll = () => {
      const dy = window.scrollY - lastY.current;
      lastY.current = window.scrollY;
      velRef.current = dy;
    };

    const tick = () => {
      velRef.current *= decay;
      // Clamp velocity effect: base duration 28s, fast scroll → 14s
      const speed = Math.max(14, 28 - Math.abs(velRef.current) * 0.4);
      track1Ref.current?.style.setProperty('--marquee-dur', `${speed}s`);
      track2Ref.current?.style.setProperty('--marquee-dur', `${speed * 1.1}s`);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const items = [...ITEMS, ...ITEMS]; // double for seamless loop

  return (
    <div className="marquee-section" aria-hidden="true">
      {/* Row 1 — left */}
      <div className="marquee-row">
        <div ref={track1Ref} className="marquee-track marquee-track--left">
          {items.map((t, i) => <span key={i} className="marquee-item">{t}</span>)}
        </div>
      </div>

      {/* Row 2 — right */}
      <div className="marquee-row marquee-row--alt">
        <div ref={track2Ref} className="marquee-track marquee-track--right">
          {items.map((t, i) => <span key={i} className="marquee-item">{t}</span>)}
        </div>
      </div>
    </div>
  );
}
