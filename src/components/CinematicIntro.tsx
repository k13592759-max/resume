import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, ArrowRight } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
  isVisible: boolean;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete, isVisible }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'unveiling' | 'finished'>('loading');

  useEffect(() => {
    if (!isVisible) return;

    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setPhase('unveiling');
            setTimeout(() => {
              setPhase('finished');
              onComplete();
            }, 850);
          }, 300);
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 8;
        return Math.min(100, prev + increment);
      });
    }, 70);

    return () => clearInterval(interval);
  }, [isVisible, onComplete]);

  if (!isVisible || phase === 'finished') return null;

  const handleSkip = () => {
    setPhase('unveiling');
    setTimeout(() => {
      setPhase('finished');
      onComplete();
    }, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-auto flex flex-col justify-between overflow-hidden">
        
        {/* Top Shutter Panel */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: phase === 'unveiling' ? '-100%' : '0%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="absolute top-0 left-0 right-0 h-1/2 bg-[#06080F] border-b border-indigo-500/20 z-20 flex items-end justify-center pb-8"
        >
          {/* Subtle top grid and gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Bottom Shutter Panel */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: phase === 'unveiling' ? '100%' : '0%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#06080F] border-t border-indigo-500/20 z-20 flex items-start justify-center pt-8"
        >
          {/* Subtle bottom grid and gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* Central HUD Content (Crosses both shutter halves) */}
        <motion.div
          animate={{
            opacity: phase === 'unveiling' ? 0 : 1,
            scale: phase === 'unveiling' ? 1.08 : 1,
          }}
          transition={{ duration: 0.4 }}
          className="relative z-30 m-auto flex flex-col items-center text-center px-4 max-w-md w-full"
        >
          
          {/* Stylized Glowing Monogram */}
          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-sky-400 via-indigo-600 to-purple-600 p-[2px] shadow-2xl shadow-indigo-500/40 mb-6"
          >
            <div className="w-full h-full bg-[#0A0C14] rounded-[14px] flex items-center justify-center">
              <span className="font-mono font-extrabold text-white text-2xl sm:text-3xl tracking-tighter">
                K<span className="text-sky-400">K</span>
              </span>
            </div>
          </motion.div>

          {/* Subtitle / System Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-sky-400 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            <span>KRISHNA KATEKHAYE // AI DEV</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            Initializing Intelligent Interface
          </h2>

          <p className="text-xs font-mono text-slate-400 mb-6">
            BCA 1st Year • Generative AI • Three.js CGA • React 19
          </p>

          {/* Charging Progress Bar */}
          <div className="w-full max-w-xs space-y-2">
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-[1px]">
              <motion.div
                className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <Zap className="w-3 h-3" />
                <span>{progress === 100 ? 'SYSTEM READY' : 'SYNAPSE BOOTING...'}</span>
              </span>
              <span className="text-sky-400 font-bold">{progress}%</span>
            </div>
          </div>

          {/* Telemetry chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-[10px] font-mono text-slate-500">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
              WebGL: ACTIVE
            </span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
              MODELS: READY
            </span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">
              LATENCY: 0.1ms
            </span>
          </div>

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="mt-8 text-xs font-mono text-slate-400 hover:text-white inline-flex items-center gap-1.5 transition-colors group px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            <span>Skip Cinematic Intro</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>

        </motion.div>

        {/* Central horizontal laser split beam when opening */}
        {phase === 'unveiling' && (
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent z-40"
          />
        )}

      </div>
    </AnimatePresence>
  );
};
