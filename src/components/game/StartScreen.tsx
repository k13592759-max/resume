import React, { useState, useEffect } from 'react';
import { Layers, HelpCircle, Volume2, VolumeX, Sparkles, FastForward, Gamepad2 } from 'lucide-react';
import { useGame } from '../../game/GameContext';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const StartScreen: React.FC<{ onOpenTutorial: () => void }> = ({ onOpenTutorial }) => {
  const { setGameMode, soundEnabled, toggleSound } = useGame();
  const { personal } = PORTFOLIO_DATA;
  const [cinematicStage, setCinematicStage] = useState<'portal' | 'title' | 'menu'>('portal');

  useEffect(() => {
    // Cinematic timeline
    const t1 = setTimeout(() => {
      setCinematicStage('title');
    }, 1800);

    const t2 = setTimeout(() => {
      setCinematicStage('menu');
    }, 3200);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        setCinematicStage('menu');
      }
    };
    window.addEventListener('keydown', handleKey);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  const skipToMenu = () => {
    setCinematicStage('menu');
  };

  const handleStartGame = () => {
    setGameMode('playing');
  };

  const handleOpenClassic = () => {
    setGameMode('classic');
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#030708] px-4 select-none overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-emerald-500/15 blur-[140px] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />

      {/* Cyber Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      {/* ======================================================== */}
      {/* 1. PORTAL STAGE                                          */}
      {/* ======================================================== */}
      {cinematicStage === 'portal' && (
        <div className="flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
          <div className="relative mb-6">
            {/* Pulsing energy line portal */}
            <div className="w-24 h-24 rounded-full border-2 border-emerald-400 animate-spin-very-slow flex items-center justify-center shadow-[0_0_35px_#10B981]">
              <div className="w-16 h-16 rounded-full border border-cyan-400 animate-ping" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center text-emerald-300 font-mono text-xs">
              PORTAL
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">
            CALIBRATING DIGITAL UNIVERSE...
          </span>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. TITLE / MENU STAGE                                    */}
      {/* ======================================================== */}
      {(cinematicStage === 'title' || cinematicStage === 'menu') && (
        <div className="flex flex-col items-center text-center max-w-xl animate-in fade-in zoom-in-95 duration-500">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-void-850/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>3D VIDEO-GAME PORTFOLIO</span>
          </div>

          {/* Game Title */}
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-sans mb-2">
            KRISHNA: <span className="text-gradient-emerald-cyan">DIGITAL UNIVERSE</span>
          </h1>

          {/* Subtitle / Tagline */}
          <p className="text-sm sm:text-base font-mono text-cyan-400 tracking-wide mb-2">
            &ldquo;Explore my world. Discover what I build.&rdquo;
          </p>
          <p className="text-xs text-slate-400 font-sans max-w-md mb-8">
            {personal.education} &bull; AI, Generative AI &amp; Modern Web Systems
          </p>

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
            <button
              onClick={handleStartGame}
              type="button"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl font-mono text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-void-950 shadow-[0_0_30px_rgba(16,185,129,0.45)] hover:shadow-[0_0_40px_rgba(16,185,129,0.65)] transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>ENTER GAME UNIVERSE [PLAY]</span>
            </button>

            <button
              onClick={handleOpenClassic}
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl font-mono text-xs font-medium bg-void-850 hover:bg-void-800 text-slate-200 border border-slate-700 hover:border-emerald-500/40 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>CLASSIC PORTFOLIO (RECRUITER VIEW)</span>
            </button>
          </div>

          {/* Secondary Controls: Tutorial & Sound */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={onOpenTutorial}
              type="button"
              className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>HOW TO PLAY &bull; CONTROLS</span>
            </button>

            <span className="text-slate-700">&bull;</span>

            <button
              onClick={toggleSound}
              type="button"
              className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>SOUND: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                  <span>SOUND: OFF</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Skip button if in portal stage */}
      {cinematicStage === 'portal' && (
        <button
          onClick={skipToMenu}
          className="absolute bottom-6 flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
        >
          <span>SKIP CINEMATIC</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Bottom Footer Note */}
      <div className="absolute bottom-4 text-[10px] font-mono text-slate-600">
        &copy; {new Date().getFullYear()} Krishna Katekhaye &bull; github.com/krishnakatekhaye10
      </div>
    </div>
  );
};
