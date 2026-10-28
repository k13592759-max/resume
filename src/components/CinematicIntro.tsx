import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Terminal, FastForward } from 'lucide-react';
import { ambientSound } from '../utils/audio';

interface CinematicIntroProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ isVisible, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [telemetryText, setTelemetryText] = useState('INITIALIZING SPATIAL WORLD...');
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const messages = [
      'INITIALIZING SPATIAL MATRIX...',
      'CALIBRATING THREE.JS OPTICS...',
      'SYNTHESIZING PROCEDURAL GEOMETRY...',
      'ANCHORING NEURAL MONOLITHS...',
      'ESTABLISHING ATMOSPHERIC ILLUMINATION...',
      'WORLD ONLINE. WELCOME, TRAVELER.'
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 4;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setTelemetryText(messages[messages.length - 1]);
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 600);
      } else {
        setProgress(currentProgress);
        const stageIndex = Math.min(
          Math.floor((currentProgress / 100) * messages.length),
          messages.length - 1
        );
        setTelemetryText(messages[stageIndex]);
      }
    }, 90);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible, onComplete]);

  const toggleSound = () => {
    const isNowPlaying = ambientSound.toggle();
    setSoundEnabled(isNowPlaying);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030708] px-6 text-slate-100 select-none overflow-hidden"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/15 blur-[100px] pointer-events-none" />

        {/* Central Geometric Hologram Symbol */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-8"
        >
          <div className="w-20 h-20 rounded-2xl border border-emerald-500/30 bg-void-850/80 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-emerald-500/20">
            <span className="font-mono text-2xl font-bold text-gradient-emerald-cyan">
              KK
            </span>
          </div>
          {/* Animated corner ticks */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
        </motion.div>

        {/* Name and Subtitle */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-8 max-w-md"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            3D DIGITAL PORTFOLIO REALM
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2 font-sans">
            Krishna Katekhaye
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono tracking-wide">
            Creative Developer &bull; AI Systems &bull; Spatial Web
          </p>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-xs sm:max-w-sm">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Terminal className="w-3.5 h-3.5" />
              {telemetryText}
            </span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>

          {/* Glowing track */}
          <div className="w-full h-1.5 bg-void-800 rounded-full overflow-hidden border border-emerald-500/20">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>

        {/* Controls: Audio Toggle & Skip Button */}
        <div className="mt-10 flex items-center gap-4">
          <button
            onClick={toggleSound}
            type="button"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono bg-void-850/80 border border-slate-700/60 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Toggle Ambient Audio"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                <span>SOUND OFF</span>
              </>
            )}
          </button>

          <button
            onClick={onComplete}
            type="button"
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-mono bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 hover:text-white transition-all cursor-pointer group"
          >
            <span>ENTER REALM</span>
            <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Hint for keyboard shortcuts */}
        <div className="absolute bottom-6 text-[11px] font-mono text-slate-500 tracking-wider">
          PRESS <kbd className="px-1.5 py-0.5 rounded bg-void-800 border border-slate-700 text-slate-400">ESC</kbd> OR CLICK TO SKIP INTRO
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
