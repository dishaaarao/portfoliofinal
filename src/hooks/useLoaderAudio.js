/**
 * useLoaderAudio — synthesized loader sounds via Web Audio API.
 * No external files. All sound is generated in-browser.
 *
 * Returns:
 *   { enabled, toggle, playTick, playComplete, playOpen }
 */
import { useRef, useState, useCallback } from 'react';

export function useLoaderAudio() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef   = useRef(null);

  /* Lazily create AudioContext on first enable (browser requires user gesture) */
  const getCtx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  };

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      if (next) getCtx(); // warm up context on enable
      return next;
    });
  }, []);

  /* ── tick: tiny percussive click as counter increments ─── */
  const playTick = useCallback((progress) => {
    if (!enabled) return;
    const ctx  = getCtx();
    const now  = ctx.currentTime;

    // Pitch rises with progress (220 Hz → 880 Hz)
    const freq = 220 + (progress / 100) * 660;

    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type      = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }, [enabled]);

  /* ── playComplete: satisfying chord stab at 100% ─────── */
  const playComplete = useCallback(() => {
    if (!enabled) return;
    const ctx = getCtx();
    const now = ctx.currentTime;

    // Major chord: root + major third + fifth (C5, E5, G5)
    const freqs = [523.25, 659.25, 783.99];

    freqs.forEach((freq, i) => {
      const osc   = ctx.createOscillator();
      const gain  = ctx.createGain();
      const delay = i * 0.04;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.12, now + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + 0.7);
    });
  }, [enabled]);

  /* ── playOpen: whoosh as panels slide apart ──────────── */
  const playOpen = useCallback(() => {
    if (!enabled) return;
    const ctx = getCtx();
    const now = ctx.currentTime;

    // White noise burst (whoosh)
    const bufferSize = ctx.sampleRate * 0.5;
    const buffer     = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data       = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.15;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    // High-pass filter so it sounds airy, not boomy
    const filter = ctx.createBiquadFilter();
    filter.type            = 'highpass';
    filter.frequency.value = 2000;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start(now);
    source.stop(now + 0.55);
  }, [enabled]);

  return { enabled, toggle, playTick, playComplete, playOpen };
}
