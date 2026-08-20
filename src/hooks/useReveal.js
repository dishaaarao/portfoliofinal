import { useEffect, useRef } from 'react';

/**
 * useReveal — attaches an IntersectionObserver to all [data-reveal] elements
 * inside the container ref (or document if no ref given).
 * Adds `.is-visible` when element crosses the threshold.
 */
export function useReveal(containerRef = null, threshold = 0.12) {
  useEffect(() => {
    const root = containerRef?.current ?? document;
    const targets = root.querySelectorAll
      ? root.querySelectorAll('[data-reveal], [data-reveal="left"], [data-reveal="right"], [data-reveal="scale"], [data-reveal="fade"]')
      : document.querySelectorAll('[data-reveal], [data-reveal="left"], [data-reveal="right"], [data-reveal="scale"], [data-reveal="fade"]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // fire once only
          }
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [containerRef, threshold]);
}

/**
 * useSectionLabel — animates .section-label::before line draws
 * by adding .label-visible on intersection.
 */
export function useSectionLabel() {
  useEffect(() => {
    const labels = document.querySelectorAll('.section-label');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('label-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    labels.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/**
 * useCountUp — counts a numeric target when element enters viewport.
 * @param {React.RefObject} ref   — ref to the element containing the number
 * @param {number}          target — final integer value
 * @param {number}          duration — ms
 */
export function useCountUp(ref, target, duration = 1400) {
  useEffect(() => {
    if (!ref.current) return;
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            const start = performance.now();
            const step = (now) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // ease-out-expo
              const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              ref.current.textContent = Math.round(eased * target);
              if (progress < 1) requestAnimationFrame(step);
              else ref.current.textContent = target;
            };
            requestAnimationFrame(step);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, target, duration]);
}

/**
 * useSkillReveal — stagger-reveals .skill-row items inside a container.
 */
export function useSkillReveal(containerRef) {
  useEffect(() => {
    if (!containerRef.current) return;
    const rows = containerRef.current.querySelectorAll('.skill-row');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            rows.forEach((row, i) => {
              setTimeout(() => row.classList.add('row-visible'), i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef]);
}

/**
 * useFormReveal — stagger-reveals .form-group items.
 */
export function useFormReveal(containerRef) {
  useEffect(() => {
    if (!containerRef.current) return;
    const fields = containerRef.current.querySelectorAll('.form-group');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fields.forEach((f, i) => {
              setTimeout(() => f.classList.add('field-visible'), i * 90);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef]);
}
