import { useEffect, useRef, useState } from 'react';
import './Cursor.css';

const LABELS = {
  project:  'VIEW ↗',
  link:     'OPEN ↗',
  button:   'CLICK',
  image:    'EXPLORE',
  drag:     'DRAG',
};

export default function Cursor() {
  const dotRef    = useRef(null);
  const ringRef   = useRef(null);
  const labelRef  = useRef(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Disable on touch-primary devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const lbl   = labelRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX;
    let ringY  = mouseY;
    let rafId;

    // ── Instant dot ──────────────────────────────────────
    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    };

    // ── Lerp ring ────────────────────────────────────────
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      ringX = lerp(ringX, mouseX, 0.11);
      ringY = lerp(ringY, mouseY, 0.11);
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      if (lbl) {
        lbl.style.left = ringX + 'px';
        lbl.style.top  = ringY + 'px';
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // ── Label / state detection ───────────────────────────
    const getLabel = (el) => {
      if (!el) return '';
      if (el.closest('.project-row'))    return LABELS.project;
      if (el.closest('.modal-backdrop')) return LABELS.image;
      if (el.tagName === 'A' || el.closest('a[href]')) return LABELS.link;
      if (el.tagName === 'BUTTON' || el.closest('button')) return LABELS.button;
      if (el.closest('[role="button"]')) return LABELS.button;
      return '';
    };

    const onOver = (e) => {
      const l = getLabel(e.target);
      setLabel(l);
      if (l || e.target.closest('a, button, [role="button"], input, textarea, .filter-btn, .project-row, .contact-method, .skill-row')) {
        document.body.classList.add('cursor-hover');
      }
    };
    const onOut = (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest('a, button, [role="button"], input, textarea, .filter-btn, .project-row, .contact-method, .skill-row')) {
        document.body.classList.remove('cursor-hover');
        setLabel('');
      }
    };

    const onDown = () => document.body.classList.add('cursor-click');
    const onUp   = () => document.body.classList.remove('cursor-click');

    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0'; if (lbl) lbl.style.opacity = '0'; };
    const onEnter = () => { dot.style.opacity = '1'; ring.style.opacity = '1'; };

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseover',  onOver);
    document.addEventListener('mouseout',   onOut);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.body.classList.remove('cursor-hover', 'cursor-click');
    };
  }, []);

  return (
    <>
      <div ref={dotRef}   className="cursor-dot"   aria-hidden="true" />
      <div ref={ringRef}  className="cursor-ring"  aria-hidden="true" />
      <div ref={labelRef} className={`cursor-label${label ? ' cursor-label--visible' : ''}`} aria-hidden="true">
        {label}
      </div>
    </>
  );
}
