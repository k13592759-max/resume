import React, { useState } from 'react';
import { SKILL_GROUPS } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(SKILL_GROUPS[0].category);
  const current = SKILL_GROUPS.find((g) => g.category === activeCategory) ?? SKILL_GROUPS[0];

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-xs font-mono tracking-widest text-blue-400 uppercase">
            02 / Skills
          </span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-2">
          Technologies & Tools
        </h2>
        <p className="text-slate-400 mb-8 text-sm sm:text-base">
          Languages and tools used across coursework, personal projects, and active self-study.
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Category tabs — left sidebar on md+ */}
          <div className="md:col-span-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {SKILL_GROUPS.map((group) => (
              <button
                key={group.category}
                onClick={() => setActiveCategory(group.category)}
                className={`shrink-0 text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === group.category
                    ? 'bg-blue-600/15 text-blue-300 border border-blue-500/30'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent hover:border-slate-700'
                }`}
              >
                {group.category}
              </button>
            ))}
          </div>

          {/* Skills grid — right panel */}
          <div className="md:col-span-3">
            <div className="glass-card rounded-xl p-6">
              <div className="mb-5">
                <h3 className="text-base font-semibold text-slate-100">{current.category}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{current.description}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {current.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group flex items-start gap-3 p-3 rounded-lg border border-slate-800 hover:border-blue-500/25 hover:bg-blue-500/5 transition-all"
                  >
                    <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    <div>
                      <span className="text-sm font-medium text-slate-200 leading-none">
                        {skill.name}
                      </span>
                      {skill.note && (
                        <p className="text-xs text-slate-500 mt-1 leading-snug">{skill.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
