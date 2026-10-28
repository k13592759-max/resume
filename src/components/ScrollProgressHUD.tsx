import React from 'react';

interface ScrollProgressHUDProps {
  scrollProgress: number; // 0.0 -> 1.0
  activeSection: string;
}

export const ScrollProgressHUD: React.FC<ScrollProgressHUDProps> = ({
  scrollProgress,
  activeSection,
}) => {
  const sections = [
    { id: 'hero', label: '01. HERO' },
    { id: 'about', label: '02. ABOUT' },
    { id: 'work', label: '03. WORK' },
    { id: 'skills', label: '04. SKILLS' },
    { id: 'achievements', label: '05. BADGES' },
    { id: 'journey', label: '06. TIMELINE' },
    { id: 'contact', label: '07. CONTACT' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const percentage = Math.round(scrollProgress * 100);

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-3 pointer-events-auto select-none">
      {/* Chapter Trackers */}
      <div className="flex flex-col items-end gap-2 pr-1">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className="group flex items-center gap-2 cursor-pointer focus:outline-none"
              title={`Jump to ${sec.label}`}
            >
              <span
                className={`text-[10px] font-mono tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'text-emerald-400 font-bold opacity-100 translate-x-0'
                    : 'text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-slate-300 translate-x-1 group-hover:translate-x-0'
                }`}
              >
                {sec.label}
              </span>
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-emerald-400 scale-125 shadow-[0_0_8px_#10B981]'
                    : 'bg-slate-700 group-hover:bg-cyan-400/80 group-hover:scale-110'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Vertical Track Line with Scroll Knob */}
      <div className="relative w-1 h-32 bg-void-800 rounded-full overflow-hidden border border-emerald-500/10 mr-0.5">
        <div
          className="w-full bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-full transition-all duration-150"
          style={{ height: `${Math.max(6, percentage)}%` }}
        />
      </div>

      {/* Percentage Readout */}
      <div className="font-mono text-[9px] text-slate-500 tracking-widest text-right mr-0.5">
        <span className="text-emerald-400/90 font-bold">{percentage}%</span>
      </div>
    </div>
  );
};
