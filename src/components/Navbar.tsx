import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, FileText, Sparkles } from 'lucide-react';
import { ambientSound } from '../utils/audio';

interface NavbarProps {
  activeSection: string;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);

  useEffect(() => {
    const unsub = ambientSound.subscribe(setSoundPlaying);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Overview' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Selected Work' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'journey', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    ambientSound.toggle();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3.5 shadow-2xl shadow-black/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-void-850 border border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-400/80 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all">
            <span className="font-mono text-sm font-bold text-gradient-emerald-cyan">
              KK
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-bold text-sm text-slate-100 tracking-tight group-hover:text-emerald-300 transition-colors">
              Krishna Katekhaye
            </span>
            <span className="font-mono text-[10px] text-emerald-400/80 tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AI &bull; SPATIAL REALM
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-void-850/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/15">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-3.5 py-1 text-xs font-mono transition-all rounded-full cursor-pointer ${
                  isActive
                    ? 'text-emerald-300 font-semibold bg-emerald-500/15 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Sound Toggle, Resume, Mobile Menu */}
        <div className="flex items-center gap-2.5">
          {/* Ambient Sound Button */}
          <button
            onClick={toggleSound}
            type="button"
            className={`p-2 rounded-xl text-xs font-mono transition-all border cursor-pointer ${
              soundPlaying
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-void-850/80 text-slate-400 border-slate-700/60 hover:text-slate-200 hover:border-slate-600'
            }`}
            title={soundPlaying ? 'Mute Ambient Audio' : 'Play Ambient Audio'}
            aria-label={soundPlaying ? 'Mute Ambient Audio' : 'Play Ambient Audio'}
          >
            {soundPlaying ? (
              <Volume2 className="w-4 h-4 animate-pulse text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Interactive Resume Modal Button */}
          <button
            onClick={onOpenResume}
            type="button"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400/60 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RESUME</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="md:hidden p-2 rounded-xl bg-void-850/80 text-slate-300 border border-slate-700/60 hover:border-emerald-500/40 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-panel mx-4 mt-3 rounded-2xl p-4 border border-emerald-500/20 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono transition-all text-left ${
                  activeSection === link.id
                    ? 'text-emerald-300 bg-emerald-500/15 font-bold border border-emerald-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {activeSection === link.id && (
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-800 mt-1">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>VIEW INTERACTIVE RESUME</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
