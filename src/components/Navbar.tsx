import React, { useState, useEffect } from 'react';
import { PERSONAL } from '../data/portfolioData';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-5xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        {/* Logo / Name */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNav('#hero'); }}
          className="font-semibold text-sm tracking-wide text-slate-100 hover:text-blue-400 transition-colors"
        >
          {PERSONAL.name.split(' ')[0]}{' '}
          <span className="text-blue-400">{PERSONAL.name.split(' ')[1]}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="text-sm text-slate-400 hover:text-slate-100 transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={PERSONAL.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-md border border-blue-500/40 text-blue-400 text-sm font-medium hover:bg-blue-500/10 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          GitHub
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded text-slate-400 hover:text-slate-100 focus:outline-none"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden glass-nav border-t border-slate-800 px-5 pb-4 pt-2">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  className="w-full text-left py-2 px-2 text-sm text-slate-300 hover:text-white transition-colors rounded"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-2 px-3 py-2 rounded border border-blue-500/30 text-blue-400 text-sm font-medium"
          >
            GitHub Profile
          </a>
        </div>
      )}
    </header>
  );
};
