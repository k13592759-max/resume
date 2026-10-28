import React from 'react';
import { ArrowDown, Sparkles, ExternalLink, Mail, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { personal } = PORTFOLIO_DATA;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 select-none"
    >
      {/* Top HUD Telemetry & Sector Marker */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-[11px] font-mono tracking-wider text-slate-500">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-400">SECTOR: 01 // THE SINGULARITY CORE</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-full bg-void-850/80 border border-emerald-500/20 text-emerald-400 flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            {personal.statusText}
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400">{personal.location}</span>
        </div>
      </div>

      {/* Main Hero Centerpiece */}
      <div className="my-auto py-12 max-w-3xl">
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-void-850/80 border border-emerald-500/25 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-mono text-emerald-300 tracking-wide">
            {personal.education}
          </span>
        </div>

        {/* Name Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 font-sans">
          <span>I&apos;m </span>
          <span className="text-gradient-emerald-cyan">
            {personal.name}
          </span>
        </h1>

        {/* Subtitle / Role */}
        <p className="text-xl sm:text-2xl font-light text-slate-200 tracking-wide mb-6 font-sans">
          {personal.title}
        </p>

        {/* Short Bio */}
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mb-10 font-sans">
          {personal.shortBio}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollToSection('work')}
            type="button"
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-mono text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-void-950 shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_rgba(16,185,129,0.6)] transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>EXPLORE SELECTED WORK</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            type="button"
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-medium bg-void-850/80 hover:bg-void-800 text-slate-200 border border-emerald-500/25 hover:border-emerald-400/50 backdrop-blur-md transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>GET IN TOUCH</span>
          </button>

          <button
            onClick={onOpenResume}
            type="button"
            className="flex items-center gap-2 px-4 py-3 rounded-xl font-mono text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>VIEW RESUME</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Social Links Bar */}
        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-800/60 text-slate-400 text-xs font-mono">
          <span className="text-slate-500">CONNECT:</span>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GITHUB</span>
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LINKEDIN</span>
          </a>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-6">
        <div className="flex items-center gap-3">
          <div className="w-5 h-8 rounded-full border border-emerald-500/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-2 rounded-full bg-emerald-400 animate-bounce" />
          </div>
          <span className="tracking-widest text-[10px] text-slate-400">
            SCROLL TO COMMENCE JOURNEY
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-[10px] tracking-wider text-slate-500">
          <span>AI / GENAI</span>
          <span>&bull;</span>
          <span>SPATIAL THREE.JS</span>
          <span>&bull;</span>
          <span>MODERN CLOUD</span>
        </div>
      </div>
    </section>
  );
};
