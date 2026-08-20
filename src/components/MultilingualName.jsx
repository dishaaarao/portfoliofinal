import { useEffect, useState, useRef } from 'react';
import './MultilingualName.css';

/* ─────────────────────────────────────────────────────────
   Shared glitch engine — reused by both components
   Phase 1: rapidly cycles through variants (frameDelay ms each)
   Phase 2: rests on English for restDuration ms, then repeats
───────────────────────────────────────────────────────── */
function useGlitchCycle(variants, englishEntry, frameDelay, restDuration, startDelay) {
  const [current, setCurrent]     = useState(englishEntry);
  const [glitching, setGlitching] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const runCycle = () => {
      let i = 0;
      setGlitching(true);

      const step = () => {
        if (i < variants.length) {
          setCurrent(variants[i]);
          i++;
          timerRef.current = setTimeout(step, frameDelay);
        } else {
          setCurrent(englishEntry);
          setGlitching(false);
          timerRef.current = setTimeout(runCycle, restDuration);
        }
      };

      timerRef.current = setTimeout(step, 0);
    };

    timerRef.current = setTimeout(runCycle, startDelay);
    return () => clearTimeout(timerRef.current);
  }, []);

  return { current, glitching };
}

/* ─────────────────────────────────────────────────────────
   "Hello" in every language
───────────────────────────────────────────────────────── */
export const HELLO_VARIANTS = [
  { script: 'Hindi',      text: 'नमस्ते',    lang: 'hi' },
  { script: 'Telugu',     text: 'నమస్కారం',  lang: 'te' },
  { script: 'Tamil',      text: 'வணக்கம்',   lang: 'ta' },
  { script: 'Kannada',    text: 'ನಮಸ್ಕಾರ',   lang: 'kn' },
  { script: 'Malayalam',  text: 'ഹലോ',       lang: 'ml' },
  { script: 'Bengali',    text: 'হ্যালো',     lang: 'bn' },
  { script: 'Gujarati',   text: 'હેલો',       lang: 'gu' },
  { script: 'Punjabi',    text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', lang: 'pa' },
  { script: 'Arabic',     text: 'مرحبا',      lang: 'ar', dir: 'rtl' },
  { script: 'Hebrew',     text: 'שלום',       lang: 'he', dir: 'rtl' },
  { script: 'Russian',    text: 'Привет',     lang: 'ru' },
  { script: 'Greek',      text: 'Γειά σου',   lang: 'el' },
  { script: 'Japanese',   text: 'こんにちは',  lang: 'ja' },
  { script: 'Korean',     text: '안녕하세요',  lang: 'ko' },
  { script: 'Chinese',    text: '你好',        lang: 'zh' },
  { script: 'Thai',       text: 'สวัสดี',     lang: 'th' },
  { script: 'French',     text: 'Bonjour',    lang: 'fr' },
  { script: 'Spanish',    text: 'Hola',       lang: 'es' },
  { script: 'Italian',    text: 'Ciao',       lang: 'it' },
  { script: 'German',     text: 'Hallo',      lang: 'de' },
];

const ENGLISH_HELLO = { script: 'English', text: "Hello,", lang: 'en' };

export function MultilingualHello({
  frameDelay   = 55,
  restDuration = 3500,
  showScript   = false,
  className    = '',
}) {
  const { current, glitching } = useGlitchCycle(
    HELLO_VARIANTS, ENGLISH_HELLO, frameDelay, restDuration, 1200
  );

  return (
    <span
      className={`mlname ${glitching ? 'mlname--glitch' : 'mlname--rest'} ${className}`}
      lang={current.lang}
      dir={current.dir || 'ltr'}
      aria-label="Hello"
      aria-live="off"
    >
      <span className="mlname__text">{current.text}</span>
      {showScript && (
        <span className="mlname__script">
          {glitching ? current.script : 'English'}
        </span>
      )}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
   "Rao" in every language
───────────────────────────────────────────────────────── */
export const RAO_VARIANTS = [
  { script: 'Devanagari', text: 'राव',    lang: 'hi' },
  { script: 'Telugu',     text: 'రావు',   lang: 'te' },
  { script: 'Kannada',    text: 'ರಾವ್',   lang: 'kn' },
  { script: 'Tamil',      text: 'ராவ்',   lang: 'ta' },
  { script: 'Malayalam',  text: 'റാവു',   lang: 'ml' },
  { script: 'Gujarati',   text: 'રાવ',    lang: 'gu' },
  { script: 'Bengali',    text: 'রাও',    lang: 'bn' },
  { script: 'Punjabi',    text: 'ਰਾਓ',   lang: 'pa' },
  { script: 'Arabic',     text: 'راو',    lang: 'ar', dir: 'rtl' },
  { script: 'Hebrew',     text: 'ראו',    lang: 'he', dir: 'rtl' },
  { script: 'Cyrillic',   text: 'Рао',    lang: 'ru' },
  { script: 'Greek',      text: 'Ράο',    lang: 'el' },
  { script: 'Japanese',   text: 'ラオ',    lang: 'ja' },
  { script: 'Korean',     text: '라오',    lang: 'ko' },
  { script: 'Chinese',    text: '饒',     lang: 'zh' },
  { script: 'Thai',       text: 'ราว',    lang: 'th' },
  { script: 'Armenian',   text: 'Ռաո',    lang: 'hy' },
  { script: 'Georgian',   text: 'რაო',    lang: 'ka' },
  { script: 'Amharic',    text: 'ራኦ',    lang: 'am' },
  { script: 'Tibetan',    text: 'རཱ་ཝ།',  lang: 'bo' },
];

const ENGLISH_RAO = { script: 'English', text: 'Rao', lang: 'en' };

export default function MultilingualName({
  frameDelay   = 55,
  restDuration = 3500,
  showScript   = true,
  className    = '',
}) {
  const { current, glitching } = useGlitchCycle(
    RAO_VARIANTS, ENGLISH_RAO, frameDelay, restDuration, 1600
  );

  return (
    <span
      className={`mlname ${glitching ? 'mlname--glitch' : 'mlname--rest'} ${className}`}
      lang={current.lang}
      dir={current.dir || 'ltr'}
      aria-label="Rao"
      aria-live="off"
    >
      <span className="mlname__text">{current.text}</span>
      {showScript && (
        <span className="mlname__script">
          {glitching ? current.script : 'English'}
        </span>
      )}
    </span>
  );
}

export function StaticMultilingualName({ variant = 0, className = '' }) {
  const v = RAO_VARIANTS[variant % RAO_VARIANTS.length];
  return (
    <span className={`mlname ${className}`} lang={v.lang} dir={v.dir || 'ltr'}>
      {v.text}
    </span>
  );
}
