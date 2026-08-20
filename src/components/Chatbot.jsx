import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

/* ─────────────────────────────────────────────────────────
   Knowledge base — answers about Disha
───────────────────────────────────────────────────────── */
const KB = [
  {
    patterns: ['hi', 'hello', 'hey', 'hii', 'helo', 'yo', 'sup'],
    answer: "Hey! 👋 I'm Disha's portfolio assistant. Ask me anything about her skills, projects, experience, or what she's currently working on!"
  },
  {
    patterns: ['who are you', 'what are you', 'who is this', 'about you'],
    answer: "I'm a chatbot built into Disha Rao's portfolio. I can answer questions about her skills, projects, experience, education, and what she's currently learning. Try asking!"
  },
  {
    patterns: ['who is disha', 'about disha', 'tell me about disha', 'introduce'],
    answer: "Disha Rao is a Full-Stack Developer & UI/UX Designer based in Panvel, Navi Mumbai. She's a B.Tech CSE student at ITM Skills University who loves building modern, interactive web experiences. She combines strong engineering skills with a sharp design eye. 🚀"
  },
  {
    patterns: ['skills', 'tech stack', 'technologies', 'what can she do', 'what does she know', 'technical skills', 'expertise'],
    answer: `Disha's technical skills include:\n\n**Frontend:** React.js, Next.js, JavaScript (ES6+), TypeScript, HTML5, CSS3, Tailwind CSS\n**Backend:** Node.js, Express.js, REST APIs, GraphQL\n**Databases:** MongoDB, MySQL\n**UI/UX:** Figma, Wireframing, Prototyping\n**Tools:** Git, VS Code, Postman, Vite\n**Languages:** C++, Python, JavaScript, Java`
  },
  {
    patterns: ['frontend', 'react', 'next', 'css', 'html', 'javascript', 'tailwind'],
    answer: "Disha is highly proficient in frontend development — React.js & Next.js (92%), JavaScript/TypeScript (90%), HTML5/CSS3 (95%), and Tailwind CSS (88%). She specialises in pixel-perfect, responsive, animated UIs. ✨"
  },
  {
    patterns: ['backend', 'node', 'express', 'api', 'server', 'database', 'mongodb'],
    answer: "On the backend, Disha works with Node.js + Express.js (86%), MongoDB & MySQL (80%), REST & GraphQL APIs (88%), and Firebase/Supabase (84%). She's comfortable across the full product lifecycle."
  },
  {
    patterns: ['currently learning', 'currently studying', 'learning', 'focusing', 'focus', 'right now', 'working on'],
    answer: `Disha is currently focusing on:\n\n🔐 **Cybersecurity** — learning ethical hacking & web security\n📊 **DSA** — strengthening Data Structures & Algorithms in C++ & Java\n🤖 **AI/ML** — integrating AI into web apps\n⚡ **System Design** — scalable architecture patterns\n🎨 **Advanced Animations** — GSAP & creative CSS`
  },
  {
    patterns: ['dsa', 'data structures', 'algorithms', 'competitive'],
    answer: "Disha is actively sharpening her DSA skills in C++ and Java — covering arrays, trees, graphs, dynamic programming, and more. She's also preparing for technical interviews. 💡"
  },
  {
    patterns: ['cybersecurity', 'security', 'ethical hacking', 'hacking'],
    answer: "Cybersecurity is one of Disha's current learning focuses. She's exploring web security fundamentals, ethical hacking concepts, and how to build more secure web applications. 🔐"
  },
  {
    patterns: ['projects', 'what has she built', 'portfolio projects', 'work'],
    answer: `Disha's key projects:\n\n🤖 **Aura** — AI-powered assistant app (React, Node, MongoDB) → aura-lilac-xi-14.vercel.app\n📷 **SnapScan** — Collaborative document gallery (React, Firebase) → snapscan-kappa.vercel.app\n🍦 **Yogurberry** — UI/UX Figma design for an Australian frozen yogurt brand → yogurberry.com.au`
  },
  {
    patterns: ['aura', 'ai assistant', 'ai app'],
    answer: "Aura is an AI-powered assistant app built with React.js, Node.js, Express.js and MongoDB. It helps users with daily tasks, smart queries, and personalized suggestions using real-time backend APIs. Live at: aura-lilac-xi-14.vercel.app 🤖"
  },
  {
    patterns: ['snapscan', 'document scanner', 'gallery', 'collaborative'],
    answer: "SnapScan is a collaborative gallery & document scanning web app. It features real-time sync, image processing, OCR text extraction, and a responsive masonry grid. Built with React, Firebase & Node.js. Live at: snapscan-kappa.vercel.app 📷"
  },
  {
    patterns: ['yogurberry', 'figma', 'design', 'ui ux', 'designer'],
    answer: "Disha designed the complete UI/UX for Yogurberry (yogurberry.com.au), an Australian frozen yogurt brand — including brand identity, interactive menu flows, store locator screens, and a loyalty programme experience, all in Figma. 🍦"
  },
  {
    patterns: ['experience', 'work experience', 'job', 'internship', 'company', 'companies'],
    answer: `Disha's work experience:\n\n💼 **TechNova Solutions** — Web Developer (2024–Present, Full-time) → technovasolutions.in\n🎨 **Yogurberry** — Figma Designer (2024, 2 months contract) → yogurberry.com.au\n🤖 **LetsUpgrade — LISA AI** — Frontend Intern (2024) → lisaapp.in`
  },
  {
    patterns: ['technova', 'tech nova'],
    answer: "Disha currently works as a Web Developer at TechNova Solutions (technovasolutions.in). She develops responsive web apps, builds reusable component libraries, and delivers pixel-perfect UI implementations. 💼"
  },
  {
    patterns: ['letsupgrade', 'lisa', 'lisa ai'],
    answer: "Disha interned at LetsUpgrade working on LISA AI (lisaapp.in) — an intelligent learning assistant. She contributed to the frontend interface and integrated AI-powered features. 🤖"
  },
  {
    patterns: ['education', 'college', 'university', 'degree', 'school', 'study', 'student'],
    answer: `Disha's educational background:\n\n🎓 **ITM Skills University** — B.Tech Computer Science & Engineering (2024–2028)\n📚 **KSA Barns High School Junior College, Panvel** — 10th & 12th (SSC & HSC)`
  },
  {
    patterns: ['contact', 'email', 'reach', 'hire', 'connect'],
    answer: "You can reach Disha at:\n\n📧 raodisha33@gmail.com\n💼 linkedin.com/in/disha-rao-940558318\n🐦 x.com/disharao_2810\n🐙 github.com/dishaaarao\n\nOr just head to the Contact section on this page! 👇"
  },
  {
    patterns: ['location', 'where', 'based', 'city'],
    answer: "Disha is based in Panvel, Navi Mumbai, India. She's open to remote work and new opportunities! 📍"
  },
  {
    patterns: ['achievements', 'hackathon', 'awards', 'won'],
    answer: "Disha's achievements:\n\n🏆 2× Hackathon Finalist\n🥉 Secured 3rd place at ITM Demo Day\n\nShe's an active hackathon participant and loves building under time pressure! 💪"
  },
  {
    patterns: ['soft skills', 'personality', 'strengths'],
    answer: "Disha's soft skills include:\n\n🧠 Problem Solving\n💬 Communication\n👥 Leadership\n🔍 Critical Thinking\n\nShe thrives at the intersection of design and engineering!"
  },
  {
    patterns: ['resume', 'cv', 'download'],
    answer: "You can download Disha's resume directly from this portfolio! Click the **Download Resume** button in the hero section or the About section. 📄"
  },
  {
    patterns: ['available', 'hire me', 'open to work', 'freelance', 'opportunity'],
    answer: "Yes! Disha is currently available for new opportunities — full-time roles, freelance projects, and internships. Drop her a message at raodisha33@gmail.com or use the Contact section! 🚀"
  },
  {
    patterns: ['github', 'code', 'open source', 'repositories'],
    answer: "Check out Disha's GitHub at github.com/dishaaarao — you'll find her projects including Aura, SnapScan, and more! 🐙"
  },
  {
    patterns: ['thank', 'thanks', 'thank you', 'awesome', 'cool', 'nice', 'great'],
    answer: "You're welcome! 😊 Feel free to ask anything else about Disha. You can also explore the portfolio sections above!"
  },
  {
    patterns: ['bye', 'goodbye', 'see you', 'cya', 'later'],
    answer: "Goodbye! 👋 Don't forget to check out Disha's projects and drop a message if you'd like to connect!"
  },
];

function getReply(input) {
  const text = input.toLowerCase().trim();
  for (const entry of KB) {
    if (entry.patterns.some(p => text.includes(p))) {
      return entry.answer;
    }
  }
  return "Hmm, I'm not sure about that! 🤔 Try asking about Disha's **skills**, **projects**, **experience**, **education**, or what she's **currently learning**.";
}

/* Format answer — bold **text** and newlines */
function formatMessage(text) {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <span key={i}>
        {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
        {i < text.split('\n').length - 1 && <br />}
      </span>
    );
  });
}

const SUGGESTIONS = [
  "What are her skills?",
  "What is she learning?",
  "Show me her projects",
  "Work experience",
  "How to contact her?",
];

export default function Chatbot() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! 👋 I'm Disha's assistant. Ask me about her skills, projects, experience, or what she's currently focusing on!" }
  ]);
  const [input, setInput]     = useState('');
  const [typing, setTyping]   = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    setMessages(prev => [...prev, { from: 'user', text: msg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: getReply(msg) }]);
    }, 600 + Math.random() * 400);
  };

  const onKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <>
      {/* Floating toggle button */}
      <button
        className={`cb-toggle${open ? ' cb-toggle--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Chat with Disha\'s assistant'}
      >
        {open
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        }
        {!open && <span className="cb-toggle__ping" aria-hidden="true" />}
      </button>

      {/* Chat window */}
      <div className={`cb-window${open ? ' cb-window--open' : ''}`} role="dialog" aria-label="Chat assistant">
        {/* Header */}
        <div className="cb-header">
          <div className="cb-header__avatar">DR</div>
          <div>
            <div className="cb-header__name">Disha's Assistant</div>
            <div className="cb-header__status"><span className="cb-header__dot" />Online</div>
          </div>
          <button className="cb-header__close" onClick={() => setOpen(false)} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Messages */}
        <div className="cb-messages">
          {messages.map((m, i) => (
            <div key={i} className={`cb-msg cb-msg--${m.from}`}>
              {m.from === 'bot' && <div className="cb-msg__avatar">DR</div>}
              <div className="cb-msg__bubble">{formatMessage(m.text)}</div>
            </div>
          ))}
          {typing && (
            <div className="cb-msg cb-msg--bot">
              <div className="cb-msg__avatar">DR</div>
              <div className="cb-msg__bubble cb-msg__bubble--typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div className="cb-suggestions">
          {SUGGESTIONS.map(s => (
            <button key={s} className="cb-suggestion" onClick={() => send(s)}>{s}</button>
          ))}
        </div>

        {/* Input */}
        <div className="cb-input-row">
          <input
            ref={inputRef}
            className="cb-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Ask something about Disha..."
            maxLength={200}
          />
          <button
            className="cb-send"
            onClick={() => send()}
            disabled={!input.trim()}
            aria-label="Send"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}
