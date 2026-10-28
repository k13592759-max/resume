import React from 'react';
import { useGame } from '../../game/GameContext';

export const WebGLFallback: React.FC = () => {
  const { setGameMode } = useGame();
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#030708]">
      <div className="text-center p-8 max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6 text-2xl">
          ⚡
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Loading Universe…</h2>
        <p className="text-slate-400 text-sm mb-6">Preparing your 3D environment.</p>
        <div className="flex gap-2 justify-center">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-emerald-500/40 animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
        <button
          onClick={() => setGameMode('classic')}
          className="mt-6 text-xs font-mono text-slate-500 hover:text-slate-300 underline transition-colors"
        >
          Skip — View Classic Portfolio
        </button>
      </div>
    </div>
  );
};
