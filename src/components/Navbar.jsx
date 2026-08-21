import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const ids = ['home','about','projects','skills','experience','blogs','contact'];
      const pos = window.scrollY + 120;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id); break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const links = [
    { name: 'Home',       href: '#home'       },
    { name: 'About',      href: '#about'      },
    { name: 'Projects',   href: '#projects'   },
    { name: 'Skills',     href: '#skills'     },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact',    href: '#contact'    },
  ];

  return (
    <header className={`nb${scrolled ? ' nb--scrolled' : ''}`}>
      <div className="nb__inner">
        <a href="#home" className="nb__brand" aria-label="Disha Rao">Disha Rao</a>

        <nav className="nb__nav" aria-label="Main">
          {links.map(l => (
            <a key={l.name} href={l.href}
               className={`nb__link${activeSection === l.href.slice(1) ? ' nb__link--active' : ''}`}
               onClick={() => setMobileOpen(false)}>
              {l.name}
            </a>
          ))}
        </nav>

        <div className="nb__actions">
          <a href="/resume.pdf" download="Disha_Rao_Resume.pdf" className="nb__cv">
            Download CV
          </a>
          <button className="nb__burger" onClick={() => setMobileOpen(o => !o)}
                  aria-label="Toggle menu">
            {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="nb__mobile">
          {links.map(l => (
            <a key={l.name} href={l.href} className="nb__mobile-link"
               onClick={() => setMobileOpen(false)}>{l.name}</a>
          ))}
          <a href="/resume.pdf" download="Disha_Rao_Resume.pdf"
             className="nb__cv" style={{width:'fit-content'}}>Download CV</a>
        </div>
      )}
    </header>
  );
}
