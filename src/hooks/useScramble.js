import { useState, useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

/**
 * useScramble — returns a scrambled version of `text` that resolves
 * character-by-character after `delay` ms.
 *
 * @param {string}  text      — final resolved text
 * @param {number}  delay     — ms before scramble starts
 * @param {number}  speed     — ms per iteration tick
 * @param {number}  revealMs  — total ms to reveal all characters
 */
export function useScramble(text, delay = 300, speed = 40, revealMs = 900) {
  const [display, setDisplay] = useState(() => scramble(text));
  const frameRef = useRef(null);
  const resolvedRef = useRef(0);

  useEffect(() => {
    let startTimeout;

    const run = () => {
      const total = text.length;
      const msPerChar = revealMs / total;
      let tick = 0;

      const iterate = () => {
        resolvedRef.current = Math.min(Math.floor(tick * msPerChar / speed), total);
        const next = text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < resolvedRef.current) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');

        setDisplay(next);
        tick++;

        if (resolvedRef.current < total) {
          frameRef.current = setTimeout(iterate, speed);
        } else {
          setDisplay(text);
        }
      };

      iterate();
    };

    startTimeout = setTimeout(run, delay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(frameRef.current);
    };
  }, [text, delay, speed, revealMs]);

  return display;
}

function scramble(text) {
  return text
    .split('')
    .map((c) => (c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]))
    .join('');
}
