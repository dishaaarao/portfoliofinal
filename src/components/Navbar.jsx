import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections  = ['home','about','skills','projects','experience','blogs','contact'];
      const scrollPos = window.scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { name: 'Home',       href: '#home'       },
    { name: 'About',      href: '#about'      },
    { name: 'Projects',   href: '#projects'   },
    { name: 'Blogs',      href: '#blogs'      },
    { name: 'Contact',    href: '#contact'    },
  ];

  return (
    <header className={`navbar-header${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-container">

        {/* Brand — cursive signature style */}
        <a href="#home" className="navbar-brand" aria-label="Disha Rao home">
          Disha Rao
        </a>

        {/* Desktop nav */}
        <nav className="navbar-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`navbar-link${activeSection === link.href.slice(1) ? ' active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="navbar-actions">
          <a
            href="/resume.pdf"
            download="Disha_Rao_Resume.pdf"
            className="navbar-cv-btn"
          >
            <Download size={14} />
            Download CV
          </a>

          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="navbar-mobile-menu">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`navbar-mobile-link${activeSection === link.href.slice(1) ? ' active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="/resume.pdf" download="Disha_Rao_Resume.pdf" className="navbar-cv-btn" style={{ width: 'fit-content' }}>
            <Download size={14} /> Download CV
          </a>
        </div>
      )}
    </header>
  );
}
