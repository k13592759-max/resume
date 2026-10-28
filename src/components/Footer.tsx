import React from 'react';
import { ArrowUp, Play } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

interface FooterProps {
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  const { personal } = PORTFOLIO_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-emerald-500/15 bg-void-950/80 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Attribution */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold text-gradient-emerald-cyan">
              KRISHNA KATEKHAYE
            </span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-[11px] font-mono text-slate-400">
              3D DIGITAL PORTFOLIO
            </span>
          </div>
          <p className="text-xs text-slate-400 font-sans flex items-center gap-1">
            Engineered with React, TypeScript, Three.js, and Tailwind CSS.
          </p>
        </div>

        {/* Center: Replay Intro & Quick Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReplayIntro}
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono bg-void-850 hover:bg-void-800 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/30 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span>REPLAY INTRO</span>
          </button>

          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-void-850 text-slate-400 hover:text-white border border-slate-800 hover:border-emerald-500/30 transition-colors"
            title="GitHub"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-void-850 text-slate-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/30 transition-colors"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Scroll to Top */}
        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all cursor-pointer"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-400 gap-3">
        <span>
          &copy; {new Date().getFullYear()} Krishna Katekhaye. All rights reserved.
        </span>
        <span className="flex items-center gap-1">
          Designed for GitHub Pages &bull; Base: &apos;/&apos;
        </span>
      </div>
    </footer>
  );
};
