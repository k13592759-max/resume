import React from 'react';

export const WebGLFallback: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030708]">
      {/* Ambient Gradient Glow Orbs */}
      <div 
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse-slow"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[140px] animate-pulse-slow"
        style={{ animationDelay: '3s' }}
        aria-hidden="true"
      />

      {/* Cybernetic Geometric Grid */}
      <div 
        className="absolute inset-0 cyber-grid opacity-40"
        aria-hidden="true"
      />

      {/* Horizon glow line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-emerald-950/20 via-transparent to-transparent pointer-events-none" 
        aria-hidden="true"
      />

      {/* Fallback notification pill for accessibility */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-auto">
        <div className="px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider bg-void-850/80 border border-emerald-500/20 text-slate-400 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block mr-2 animate-ping" />
          FALLBACK VIEW: ACCESSIBLE MODE ACTIVE
        </div>
      </div>
    </div>
  );
};
