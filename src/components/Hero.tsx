import React, { useEffect, useRef } from 'react';
import { PERSONAL } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Subtle parallax orb effect on mouse move
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const orb = el.querySelector<HTMLElement>('[data-orb]');
    if (!orb) return;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      orb.style.transform = `translate(${dx * 18}px, ${dy * 12}px)`;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden dot-grid"
    >
      {/* Background ambient glow orbs */}
      <div
        data-orb
        className="pointer-events-none absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
        aria-hidden="true"
      >
        <div className="absolute w-[480px] h-[480px] rounded-full bg-blue-600/8 blur-[100px] -translate-x-32 -translate-y-20" />
        <div className="absolute w-[360px] h-[360px] rounded-full bg-violet-600/8 blur-[80px] translate-x-40 translate-y-24" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-20 pb-12 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 text-blue-300 text-xs font-medium font-mono mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {PERSONAL.availableFor}
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none mb-5">
          <span className="text-slate-100">Hi, I'm </span>
          <span className="text-gradient-blue-violet">{PERSONAL.name}</span>
        </h1>

        {/* Role / subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-300 mb-4">
          {PERSONAL.headline}
        </p>

        {/* Subtext */}
        <p className="max-w-xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed mb-10">
          {PERSONAL.subheadline}
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => scrollTo('#projects')}
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-blue-900/30"
          >
            Explore Projects
          </button>
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold text-sm transition-colors"
          >
            LinkedIn Profile
          </a>
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-slate-200 font-semibold text-sm transition-colors"
          >
            GitHub
          </a>
        </div>

        {/* Scroll cue */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => scrollTo('#about')}
            aria-label="Scroll to About"
            className="flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
          </button>
        </div>
      </div>
    </section>
  );
};
