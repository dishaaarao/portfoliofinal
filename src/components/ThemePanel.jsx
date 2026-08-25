import { useState, useEffect } from 'react';
import './ThemePanel.css';

const ACCENTS = [
  { name: 'Red',     value: '#e63946' },
  { name: 'Cyan',    value: '#00b4d8' },
  { name: 'Violet',  value: '#7c3aed' },
  { name: 'Green',   value: '#22c55e' },
  { name: 'Orange',  value: '#f97316' },
  { name: 'Pink',    value: '#ec4899' },
  { name: 'Gold',    value: '#eab308' },
  { name: 'White',   value: '#f5f0e8' },
];

const BG_MODES = [
  { name: 'Warm Cream', bg: '#f7f3ee', secondary: '#ede8e0' },
  { name: 'Pure White', bg: '#ffffff', secondary: '#f8fafc' },
  { name: 'Soft Paper', bg: '#f4efe6', secondary: '#eae4d8' },
  { name: 'Dark Navy',  bg: '#0d1117', secondary: '#161b22' },
];

function hexToHsl(hex) {
  let r = parseInt(hex.slice(1,3),16)/255;
  let g = parseInt(hex.slice(3,5),16)/255;
  let b = parseInt(hex.slice(5,7),16)/255;
  const max=Math.max(r,g,b), min=Math.min(r,g,b);
  let h,s,l=(max+min)/2;
  if(max===min){ h=s=0; }
  else {
    const d=max-min; s=l>0.5?d/(2-max-min):d/(max+min);
    switch(max){ case r:h=(g-b)/d+(g<b?6:0);break; case g:h=(b-r)/d+2;break; case b:h=(r-g)/d+4;break; }
    h/=6;
  }
  return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
}

export default function ThemePanel() {
  const [open,   setOpen]   = useState(false);
  const [accent, setAccent] = useState('#0d9488');
  const [bgMode, setBgMode] = useState(0);
  const [custom, setCustom] = useState('#0d9488');
  const [isDark, setIsDark] = useState(false);

  const applyLightDark = (dark) => {
    setIsDark(dark);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (!dark) {
      document.documentElement.style.setProperty('--bg-primary',   '#f7f3ee');
      document.documentElement.style.setProperty('--bg-secondary', '#ede8e0');
    }
  };

  const applyAccent = (hex) => {
    setAccent(hex);
    setCustom(hex);
    const [h,s,l] = hexToHsl(hex);
    const root = document.documentElement;
    root.style.setProperty('--accent',       hex);
    root.style.setProperty('--accent-hover', `hsl(${h},${Math.max(s-8,0)}%,${Math.max(l-8,0)}%)`);
    root.style.setProperty('--accent-h',     `${h}`);
    root.style.setProperty('--accent-s',     `${s}%`);
    root.style.setProperty('--accent-l',     `${l}%`);
  };

  const applyBg = (idx) => {
    setBgMode(idx);
    const { bg, secondary } = BG_MODES[idx];
    document.documentElement.style.setProperty('--bg-primary',   bg);
    document.documentElement.style.setProperty('--bg-secondary', secondary);
  };

  // Reset to defaults
  const reset = () => {
    applyAccent('#0d9488');
    applyBg(0);
    applyLightDark(false);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        className={`tp-toggle${open ? ' tp-toggle--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Customise theme"
        title="Theme customizer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
          <line x1="12" y1="2"  x2="12" y2="4"/>
          <line x1="12" y1="20" x2="12" y2="22"/>
          <line x1="2"  y1="12" x2="4"  y2="12"/>
          <line x1="20" y1="12" x2="22" y2="12"/>
        </svg>
      </button>

      {/* Panel */}
      <div className={`tp-panel${open ? ' tp-panel--open' : ''}`} role="dialog" aria-label="Theme customizer">
        <div className="tp-panel__header">
          <span className="tp-panel__title">Customise Theme</span>
          <button className="tp-panel__close" onClick={() => setOpen(false)} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Accent colour */}
        <div className="tp-section">
          <div className="tp-section__label">Accent Colour</div>
          <div className="tp-swatches">
            {ACCENTS.map(a => (
              <button
                key={a.value}
                className={`tp-swatch${accent === a.value ? ' tp-swatch--active' : ''}`}
                style={{ background: a.value }}
                onClick={() => applyAccent(a.value)}
                title={a.name}
                aria-label={a.name}
              >
                {accent === a.value && (
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                    <polyline points="2,6 5,9 10,3"/>
                  </svg>
                )}
              </button>
            ))}
          </div>

          {/* Custom colour picker */}
          <div className="tp-custom-row">
            <label className="tp-custom-label" htmlFor="tp-color-pick">Custom</label>
            <input
              id="tp-color-pick"
              type="color"
              value={custom}
              onChange={e => applyAccent(e.target.value)}
              className="tp-color-input"
            />
            <span className="tp-color-hex">{custom.toUpperCase()}</span>
          </div>
        </div>

        {/* Background mode */}
        <div className="tp-section">
          <div className="tp-section__label">Background</div>
          <div className="tp-bg-options">
            {BG_MODES.map((m, i) => (
              <button
                key={m.name}
                className={`tp-bg-btn${bgMode === i ? ' tp-bg-btn--active' : ''}`}
                onClick={() => applyBg(i)}
              >
                <span className="tp-bg-preview" style={{ background: m.bg, border: `2px solid ${m.secondary}` }} />
                <span>{m.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live preview strip */}
        <div className="tp-preview">
          <div className="tp-preview__bar" style={{ background: accent }} />
          <span className="tp-preview__text" style={{ color: accent }}>Preview</span>
        </div>

        {/* Dark / Light mode */}
        <div className="tp-section">
          <div className="tp-section__label">Mode</div>
          <div className="tp-mode-row">
            <button
              className={`tp-mode-btn${isDark ? ' tp-mode-btn--active' : ''}`}
              onClick={() => applyLightDark(true)}
            >
              🌙 Dark
            </button>
            <button
              className={`tp-mode-btn${!isDark ? ' tp-mode-btn--active' : ''}`}
              onClick={() => applyLightDark(false)}
            >
              ☀️ Light
            </button>
          </div>
        </div>

        {/* Reset */}
        <button className="tp-reset" onClick={reset}>Reset to default</button>
      </div>

      {/* Backdrop */}
      {open && <div className="tp-backdrop" onClick={() => setOpen(false)} />}
    </>
  );
}
