import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

/**
 * useLenis — initialises Lenis smooth-scroll and wires it to GSAP's
 * ScrollTrigger ticker so both systems stay in sync.
 *
 * Returns the lenis instance so callers can call .scrollTo() if needed.
 */
export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Skip for reduced-motion users
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration:   1.2,
      easing:     (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch:  false,
    });

    lenisRef.current = lenis;

    // Wire into rAF loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    // Expose globally so GSAP ScrollTrigger can hook in
    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return lenisRef;
}
