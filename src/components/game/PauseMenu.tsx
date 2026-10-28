import React from 'react';
import { Play, RotateCcw, Layers, HelpCircle, Volume2, VolumeX, X } from 'lucide-react';
import { useGame, ZONES } from '../../game/GameContext';

export const PauseMenu: React.FC<{ onOpenTutorial: () => void }> = ({ onOpenTutorial }) => {
  const { gameMode, setGameMode, teleportTo, soundEnabled, toggleSound } = useGame();

  if (gameMode !== 'paused') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="glass-panel w-full max-w-md rounded-2xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-base font-bold text-white font-mono tracking-wider">
              SIMULATION PAUSED
            </h2>
          </div>
          <button
            onClick={() => setGameMode('playing')}
            className="p-1.5 rounded-lg bg-void-850 text-slate-400 hover:text-white border border-slate-700"
            title="Resume"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setGameMode('playing')}
            type="button"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-void-950 transition-all cursor-pointer"
          >
            <Play className="w-4 h-4" />
            <span>RESUME EXPLORATION</span>
          </button>

          <button
            onClick={() => {
              teleportTo(ZONES.origin.position, 'origin');
              setGameMode('playing');
            }}
            type="button"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-xs font-medium bg-void-900 hover:bg-void-850 text-slate-200 border border-slate-800 hover:border-emerald-500/30 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-emerald-400" />
            <span>RESET TO SPAWN (THE ORIGIN)</span>
          </button>

          <button
            onClick={() => setGameMode('classic')}
            type="button"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-xs font-medium bg-void-900 hover:bg-void-850 text-emerald-300 border border-emerald-500/30 transition-all cursor-pointer"
          >
            <Layers className="w-4 h-4" />
            <span>SWITCH TO CLASSIC PORTFOLIO OVERVIEW</span>
          </button>

          <button
            onClick={onOpenTutorial}
            type="button"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-xs font-medium bg-void-900 hover:bg-void-850 text-slate-300 border border-slate-800 transition-all cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
            <span>VIEW CONTROLS &amp; HOW TO PLAY</span>
          </button>

          <button
            onClick={toggleSound}
            type="button"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-xs font-medium bg-void-900 hover:bg-void-850 text-slate-300 border border-slate-800 transition-all cursor-pointer"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>MUTE AMBIENT SOUNDSCAPE</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-500" />
                <span>ENABLE AMBIENT SOUNDSCAPE</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <span className="text-[10px] font-mono text-slate-500">
            PRESS <kbd className="px-1.5 py-0.5 rounded bg-void-900 border border-slate-700 text-slate-300">ESC</kbd> TO RESUME SIMULATION
          </span>
        </div>
      </div>
    </div>
  );
};
