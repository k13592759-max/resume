import React from 'react';
import { useGame } from '../../game/GameContext';
import { PERSONAL } from '../../data/portfolioData';

export const PauseMenu: React.FC = () => {
  const { gameMode, setGameMode } = useGame();
  if (gameMode !== 'paused') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="glass-hud rounded-2xl p-8 w-full max-w-sm text-center space-y-4 border border-emerald-500/20">
        <div className="text-xs font-mono text-emerald-400 tracking-widest mb-2">⏸ PAUSED</div>
        <h2 className="text-2xl font-black text-white">DIGITAL UNIVERSE</h2>
        <p className="text-slate-400 text-sm font-mono">{PERSONAL.name}</p>

        <div className="space-y-2 pt-2">
          <button
            onClick={() => setGameMode('playing')}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm tracking-wide transition-all active:scale-95"
          >
            ▶ RESUME
          </button>
          <button
            onClick={() => setGameMode('start')}
            className="w-full py-3 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-sm font-mono transition-all active:scale-95"
          >
            MAIN MENU
          </button>
          <button
            onClick={() => setGameMode('classic')}
            className="w-full py-3 rounded-xl border border-slate-800 text-slate-500 hover:text-slate-300 text-sm font-mono transition-all"
          >
            CLASSIC PORTFOLIO
          </button>
        </div>

        <div className="pt-2 text-xs font-mono text-slate-600">
          ESC to close · E to interact
        </div>
      </div>
    </div>
  );
};
