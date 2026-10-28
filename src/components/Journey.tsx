import React from 'react';
import { Terminal, Calendar, GraduationCap, Award, Sparkles, Flag, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA, type TimelineMilestone } from '../data/portfolioData';

export const Journey: React.FC = () => {
  const { timeline } = PORTFOLIO_DATA;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Education':
        return <GraduationCap className="w-4 h-4 text-emerald-400" />;
      case 'Certification':
        return <Award className="w-4 h-4 text-cyan-400" />;
      case 'AI & Tech':
        return <Sparkles className="w-4 h-4 text-emerald-300" />;
      default:
        return <Flag className="w-4 h-4 text-cyan-300" />;
    }
  };

  return (
    <section
      id="journey"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      {/* Chapter Indicator */}
      <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 mb-3">
        <Terminal className="w-3.5 h-3.5" />
        <span>SECTOR: 06 // CHRONOLOGICAL VOYAGE</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
            Trajectory &amp; Milestones
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-mono mt-2">
            The ongoing voyage from academic computer fundamentals to generative AI experimentation and future horizons.
          </p>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative pl-6 sm:pl-8 border-l border-emerald-500/20 ml-2 sm:ml-4 space-y-12">
        {timeline.map((item: TimelineMilestone, idx: number) => (
          <div key={idx} className="relative group">
            {/* Pulsing Timeline Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-void-950 border-2 border-emerald-400 flex items-center justify-center group-hover:scale-125 group-hover:shadow-[0_0_15px_#10B981] transition-all">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>

            {/* Timeline Content Card */}
            <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-emerald-500/15 hover:border-emerald-400/40 transition-all duration-300 shadow-xl">
              {/* Year & Category Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="font-bold">{item.year}</span>
                  <span className="text-slate-500">&bull;</span>
                  <span className="text-slate-400">{item.period}</span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-void-850 border border-slate-700 text-slate-300">
                  {getCategoryIcon(item.category)}
                  <span>{item.category}</span>
                </div>
              </div>

              {/* Title & Context */}
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors font-sans mb-1">
                {item.title}
              </h3>
              <p className="text-xs font-mono text-cyan-400 mb-4">
                {item.institutionOrContext}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-5">
                {item.description}
              </p>

              {/* Key Accomplishments Checklist */}
              <div className="space-y-2 pt-4 border-t border-slate-800/80">
                {item.achievements.map((ach, achIdx) => (
                  <div key={achIdx} className="flex items-start gap-2.5 text-xs text-slate-400 font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
