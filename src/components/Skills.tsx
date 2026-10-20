import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { 
  Sparkles, 
  Globe, 
  Terminal, 
  Code2, 
  Layers, 
  Info, 
  Cpu, 
  Check, 
  Clock 
} from 'lucide-react';

export const Skills: React.FC = () => {
  const { skills } = PORTFOLIO_DATA;

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-sky-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-indigo-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-purple-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-amber-400" />;
      default:
        return <Layers className="w-5 h-5 text-sky-400" />;
    }
  };

  const getBadgeStyle = (tag: string) => {
    switch (tag) {
      case 'Core Skill':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Actively Exploring':
        return 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20';
      case 'Essential Tool':
        return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
      case 'Developing':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      default:
        return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      
      {/* Decorative gradient glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>02 // SKILLS & TECHNOLOGIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Practical Tooling, <span className="text-gradient">Real Capabilities.</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl text-base">
            Categorized strictly by confirmed experience and active development. Zero inflated progress bars or fabricated percentages.
          </p>
        </div>

        {/* 4 Categorized Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {skills.map((category) => (
            <div
              key={category.title}
              className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300 relative group"
            >
              <div>
                
                {/* Category Header */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                      {category.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skill Items List */}
                <div className="space-y-4 mt-6">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15 transition-all"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                          {skill.name}
                        </span>
                        
                        {/* Status Level Badge */}
                        <span
                          className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${getBadgeStyle(
                            skill.levelTag
                          )} flex items-center gap-1 shrink-0`}
                        >
                          {skill.levelTag === 'Developing' ? (
                            <Clock className="w-2.5 h-2.5" />
                          ) : (
                            <Check className="w-2.5 h-2.5" />
                          )}
                          <span>{skill.levelTag}</span>
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {skill.detail}
                      </p>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom Subtle Tag */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
                <span>Verified in Projects</span>
                <span>Configurable in portfolioData.ts</span>
              </div>

            </div>
          ))}
        </div>

        {/* Honest Transparency Notice Banner */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 flex items-start sm:items-center gap-3.5 bg-indigo-500/[0.03] dark:bg-white/[0.02]">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-sky-400 shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <strong className="text-slate-900 dark:text-slate-200 font-semibold">Honest Skill Representation: </strong>
            Languages such as <strong>C</strong> and <strong>Python</strong> are actively studied as foundational coursework and developing interests. All skills are updated regularly as my BCA journey and open-source contributions expand.
          </div>
        </div>

      </div>
    </section>
  );
};
