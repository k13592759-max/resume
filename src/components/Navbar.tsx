import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Sparkles, 
  ArrowUpRight, 
  FileText 
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onOpenResume?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onOpenResume }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3 shadow-lg shadow-black/5 dark:shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Name */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
          >
            {/* Futuristic Monogram */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 via-indigo-600 to-purple-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0A0C14] rounded-[10px] flex items-center justify-center">
                <span className="font-mono font-bold text-white text-base tracking-tighter">
                  K<span className="text-sky-400">K</span>
                </span>
              </div>
            </div>

            {/* Name + Subtitle Badge */}
            <div className="flex flex-col">
              <span className="font-semibold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                {PORTFOLIO_DATA.personal.name}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                AI Dev • BCA 1st Year
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-slate-200/50 dark:bg-white/5 border border-slate-300/40 dark:border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-3.5 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-white dark:bg-white/15 text-indigo-600 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/30 dark:hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Resume Button, Theme Toggle & Connect CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            
            {/* View Interactive Resume Button */}
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-200 bg-slate-200/60 dark:bg-white/5 hover:bg-slate-300/60 dark:hover:bg-white/10 border border-slate-300/50 dark:border-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
                title="View ATS Resume & Print Options"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-500 dark:text-sky-400" />
                <span>Resume / CV</span>
              </button>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-200/50 dark:bg-white/5 hover:bg-slate-300/50 dark:hover:bg-white/10 border border-slate-300/40 dark:border-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Let's Connect Button */}
            <button
              onClick={() => handleNavClick('#contact')}
              className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Right Controls: Resume, Theme Toggle & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                aria-label="View Resume"
                className="p-2 rounded-lg text-slate-700 dark:text-slate-200 bg-slate-200/50 dark:bg-white/5 border border-slate-300/40 dark:border-white/10"
              >
                <FileText className="w-4 h-4 text-indigo-500 dark:text-sky-400" />
              </button>
            )}

            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 bg-slate-200/50 dark:bg-white/5 border border-slate-300/40 dark:border-white/10"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 bg-slate-200/50 dark:bg-white/5 border border-slate-300/40 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl glass-panel shadow-2xl border border-slate-200 dark:border-white/10 animate-in fade-in duration-200">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-500/10 text-indigo-600 dark:text-sky-400 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <Sparkles className="w-3.5 h-3.5 text-indigo-500" />}
                  </button>
                );
              })}

              <div className="pt-3 mt-2 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2">
                {onOpenResume && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenResume();
                    }}
                    className="w-full py-2.5 text-center text-xs font-semibold rounded-xl text-slate-800 dark:text-white bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/10 flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <span>View ATS Resume / CV</span>
                  </button>
                )}

                <button
                  onClick={() => handleNavClick('#contact')}
                  className="w-full py-2.5 text-center text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 shadow-md shadow-indigo-500/20"
                >
                  Let's Connect
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
