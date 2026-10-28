import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useGame } from '../../game/GameContext';

interface StartScreenProps {
  onOpenTutorial: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onOpenTutorial }) => {
  const { setGameMode } = useGame();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (titleRef.current && taglineRef.current && buttonsRef.current) {
      tl.fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2 })
        .fromTo(taglineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .fromTo(buttonsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2');
    }
  }, []);

  const handlePlay = () => {
    const tl = gsap.timeline();
    if (containerRef.current) {
      tl.to(containerRef.current, { opacity: 0, duration: 0.6, onComplete: () => setGameMode('playing') });
    } else {
      setGameMode('playing');
    }
  };

  const handleClassic = () => {
    setGameMode('classic');
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#030708]"
    >
      {/* Animated particle field */}
      <ParticleField />

      {/* Central portal ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border border-emerald-500/10 animate-pulse-slow" />
        <div className="absolute w-[380px] h-[380px] rounded-full border border-emerald-500/15 animate-spin-very-slow" />
        <div className="absolute w-[260px] h-[260px] rounded-full border border-cyan-500/20" />
        <div className="absolute w-[140px] h-[140px] rounded-full bg-emerald-500/5 blur-2xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        {/* Mono label */}
        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/8 text-emerald-300 text-xs font-mono tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          INTERACTIVE UNIVERSE
        </div>

        {/* Title */}
        <div ref={titleRef} className="opacity-0 mb-2">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white leading-none">
            KRISHNA
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-[0.3em] text-emerald-400 mt-1">
            DIGITAL UNIVERSE
          </h2>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="opacity-0 text-slate-400 text-sm sm:text-base font-mono mt-4 mb-10"
        >
          "Explore my world. Discover what I build."
        </p>

        {/* Buttons */}
        <div ref={buttonsRef} className="opacity-0 flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <button
            onClick={handlePlay}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_45px_rgba(16,185,129,0.6)] transition-all active:scale-95"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            ENTER UNIVERSE
          </button>

          <button
            onClick={onOpenTutorial}
            className="px-5 py-3.5 rounded-xl border border-slate-700 hover:border-emerald-500/40 text-slate-300 hover:text-white font-medium text-sm transition-colors active:scale-95"
          >
            HOW TO PLAY
          </button>
        </div>

        <button
          onClick={handleClassic}
          className="mt-4 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-2"
        >
          Skip — View Classic Portfolio
        </button>
      </div>

      {/* Bottom credit */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4 text-xs font-mono text-slate-600">
        <span>KRISHNA KATEKHAYE</span>
        <span>·</span>
        <span>BCA STUDENT · AI DEVELOPER</span>
        <span>·</span>
        <span>INDIA</span>
      </div>
    </div>
  );
};

// Lightweight canvas-free particle field using CSS divs
const ParticleField: React.FC = () => {
  const particles = React.useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-emerald-400 animate-pulse"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-emerald-500/5 blur-[80px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-cyan-500/5 blur-[60px] animate-float-slow" />
    </div>
  );
};
