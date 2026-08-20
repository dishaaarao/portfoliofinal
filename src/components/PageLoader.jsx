import { useEffect, useRef, useState, useCallback } from 'react';
import { useLoaderAudio } from '../hooks/useLoaderAudio';
import './PageLoader.css';

/* Speaker icon — inline SVG so no extra deps */
function SpeakerOn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  );
}

function SpeakerOff() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="23" y1="9" x2="17" y2="15"/>
      <line x1="17" y1="9" x2="23" y2="15"/>
    </svg>
  );
}

/**
 * Premium PageLoader with synthesized audio
 * ─────────────────────────────────────────
 * Phase 1 (0–100%): counter + progress bar + optional sound
 * Phase 2 (done):   panels split apart, whoosh sound
 */
export default function PageLoader({ onDone }) {
  const [pct,   setPct]   = useState(0);
  const [phase, setPhase] = useState('counting'); // 'counting' | 'opening' | 'gone'
  const pctRef = useRef(0);

  const { enabled, toggle, playTick, playComplete, playOpen } = useLoaderAudio();

  /* Track previous pct to fire ticks only at certain intervals */
  const lastTickRef = useRef(-1);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 14) + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setPct(100);
        pctRef.current = 100;

        // Play completion chord
        playComplete();

        setTimeout(() => {
          setPhase('opening');
          playOpen();

          setTimeout(() => {
            setPhase('gone');
            onDone?.();
          }, 900);
        }, 280);

      } else {
        setPct(current);
        pctRef.current = current;

        // Fire a tick every ~10% steps to avoid spamming
        const step = Math.floor(current / 10);
        if (step !== lastTickRef.current) {
          lastTickRef.current = step;
          playTick(current);
        }
      }
    }, 70);

    return () => clearInterval(interval);
  }, [playTick, playComplete, playOpen]);

  if (phase === 'gone') return null;

  return (
    <div className={`pl-root${phase === 'opening' ? ' pl-root--opening' : ''}`} aria-hidden="true">
      {/* Left panel */}
      <div className="pl-panel pl-panel--left" />
      {/* Right panel */}
      <div className="pl-panel pl-panel--right" />

      {/* Mute / unmute toggle — top right corner */}
      <button
        className={`pl-sound-btn${enabled ? ' pl-sound-btn--on' : ''}`}
        onClick={toggle}
        aria-label={enabled ? 'Mute loader sound' : 'Enable loader sound'}
        title={enabled ? 'Sound ON' : 'Sound OFF'}
      >
        {enabled ? <SpeakerOn /> : <SpeakerOff />}
        <span className="pl-sound-label">{enabled ? 'SOUND ON' : 'SOUND OFF'}</span>
      </button>

      {/* Content layer — fades out when opening */}
      <div className={`pl-content${phase === 'opening' ? ' pl-content--hide' : ''}`}>
        <div className="pl-name">
          <span className="pl-name-row">DISHA</span>
          <span className="pl-name-row pl-name-row--outline">RAO</span>
        </div>

        <div className="pl-meta">
          <span>CREATIVE DEVELOPER</span>
          <span className="pl-meta-sep">—</span>
          <span>2025</span>
        </div>

        <div className="pl-counter">{String(pct).padStart(2, '0')}</div>

        <div className="pl-bar-track">
          <div className="pl-bar-fill" style={{ width: `${pct}%` }} />
        </div>

        {/* Hint text below bar */}
        <p className="pl-sound-hint">
          {enabled
            ? '— audio enabled —'
            : 'click 🔊 for sound experience'}
        </p>
      </div>
    </div>
  );
}
