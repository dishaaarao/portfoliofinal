import React, { useState } from 'react';
import Navbar      from './components/Navbar';
import Hero        from './components/Hero';
import About       from './components/About';
import Skills      from './components/Skills';
import Projects    from './components/Projects';
import Experience  from './components/Experience';
import Contact     from './components/Contact';
import Footer      from './components/Footer';
import Cursor      from './components/Cursor';
import GrainOverlay from './components/GrainOverlay';
import PageLoader   from './components/PageLoader';
import Chatbot      from './components/Chatbot';
import ThemePanel   from './components/ThemePanel';
import { useReveal, useSectionLabel } from './hooks/useReveal';

export default function App() {
  const [toasts, setToasts]     = useState([]);
  const [ready, setReady]       = useState(false);   // loader done

  // Global scroll-reveal & section-label line-draws
  useReveal(null, 0.1);
  useSectionLabel();

  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  return (
    <>
      {/* ── Overlay effects (z-index above everything) ── */}
      <Cursor />
      <GrainOverlay />

      {/* ── Page loader ─────────────────────────────── */}
      {!ready && <PageLoader onDone={() => setReady(true)} />}

      {/* ── Main shell ──────────────────────────────── */}
      <div className="app-shell" style={{ visibility: ready ? 'visible' : 'hidden' }}>
        <Navbar />
        <main>
          <Hero       ready={ready} />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact showToast={showToast} />
        </main>
        <Footer />

        {/* Global Toast */}
        <div className="toast-container">
          {toasts.map((t) => (
            <div key={t.id} className="toast">
              <span style={{ color: 'var(--accent)' }}>◈</span>
              <span>{t.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Floating widgets (outside app-shell so always visible) ── */}
      <Chatbot />
      <ThemePanel />
    </>
  );
}
