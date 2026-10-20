import React from 'react';

interface ProjectVisualProps {
  id: string;
  title: string;
  status: string;
}

export const ProjectCardVisual: React.FC<ProjectVisualProps> = ({ id, title, status }) => {
  return (
    <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center p-6 border border-white/5">
      {/* Background gradients */}
      {id === 'ecomind' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-slate-950 to-teal-950/40" />
          <svg className="w-full h-full relative z-10 opacity-70" viewBox="0 0 300 150" fill="none">
            {/* Contour / Terrain lines */}
            <path d="M10 130 Q80 70 150 110 T290 80" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M10 100 Q90 40 170 90 T290 50" stroke="#059669" strokeWidth="2.5" />
            <path d="M20 70 Q110 30 190 70 T290 30" stroke="#34D399" strokeWidth="1.5" />
            {/* Geo AI Nodes */}
            <circle cx="90" cy="40" r="5" fill="#34D399" />
            <circle cx="170" cy="90" r="4" fill="#10B981" />
            <circle cx="230" cy="65" r="4.5" fill="#6EE7B7" />
            <line x1="90" y1="40" x2="170" y2="90" stroke="#34D399" strokeWidth="1" opacity="0.6" />
            <line x1="170" y1="90" x2="230" y2="65" stroke="#10B981" strokeWidth="1" opacity="0.6" />
          </svg>
        </>
      )}

      {id === 'votepath-india' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-slate-950 to-indigo-950/50" />
          <svg className="w-full h-full relative z-10 opacity-70" viewBox="0 0 300 150" fill="none">
            {/* Civic Pillars & Data Pathway */}
            <rect x="50" y="30" width="200" height="90" rx="12" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.4" />
            <path d="M80 75 L120 105 L220 45" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="80" cy="75" r="5" fill="#FBBF24" />
            <circle cx="120" cy="105" r="5" fill="#F59E0B" />
            <circle cx="220" cy="45" r="5" fill="#D97706" />
            <line x1="50" y1="60" x2="250" y2="60" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 4" strokeOpacity="0.3" />
          </svg>
        </>
      )}

      {id === 'stadiumgpt360' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 via-slate-950 to-purple-950/50" />
          <svg className="w-full h-full relative z-10 opacity-75" viewBox="0 0 300 150" fill="none">
            {/* Concentric 360 Arcs & Radar Beam */}
            <ellipse cx="150" cy="75" rx="110" ry="50" stroke="#818CF8" strokeWidth="1.5" strokeDasharray="3 3" />
            <ellipse cx="150" cy="75" rx="75" ry="32" stroke="#6366F1" strokeWidth="2" />
            <ellipse cx="150" cy="75" rx="35" ry="15" fill="#4F46E5" fillOpacity="0.3" stroke="#A5B4FC" strokeWidth="1.5" />
            {/* Center AI beacon */}
            <circle cx="150" cy="75" r="6" fill="#C084FC" />
            <path d="M150 75 L225 43" stroke="#C084FC" strokeWidth="2" />
            <circle cx="225" cy="43" r="4" fill="#E879F9" />
          </svg>
        </>
      )}

      {id === 'coffeemind' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950/70 via-stone-950 to-orange-950/40" />
          <svg className="w-full h-full relative z-10 opacity-70" viewBox="0 0 300 150" fill="none">
            {/* Coffee dripper / precision ratio geometry */}
            <polygon points="110,40 190,40 165,95 135,95" stroke="#D97706" strokeWidth="2" fill="#78350F" fillOpacity="0.2" />
            <circle cx="150" cy="118" r="5" fill="#F59E0B" />
            <circle cx="150" cy="132" r="3" fill="#D97706" />
            <path d="M80 60 Q100 80 80 100" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 3" />
            <path d="M220 60 Q200 80 220 100" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 3" />
          </svg>
        </>
      )}

      {id === 'climatora' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/60 via-slate-950 to-blue-950/50" />
          <svg className="w-full h-full relative z-10 opacity-75" viewBox="0 0 300 150" fill="none">
            {/* Weather fronts & atmospheric waveforms */}
            <path d="M20 110 Q90 50 160 90 T280 40" stroke="#06B6D4" strokeWidth="2.5" />
            <path d="M20 70 Q100 110 180 60 T280 90" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="90" cy="50" r="4" fill="#06B6D4" />
            <circle cx="160" cy="90" r="5" fill="#38BDF8" />
            <circle cx="230" cy="55" r="4" fill="#7DD3FC" />
          </svg>
        </>
      )}

      {/* Floating status tag on the visual banner */}
      <div className="absolute top-3 left-3 z-20">
        <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white/90 border border-white/10 uppercase tracking-wider">
          {title}
        </span>
      </div>

      <div className="absolute bottom-3 right-3 z-20">
        <span
          className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full backdrop-blur-md border ${
            status === 'In Progress'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};
