import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { 
  Hammer, 
  Sparkles, 
  BrainCircuit, 
  Users, 
  MapPin, 
  GraduationCap, 
  Target, 
  Compass, 
  CheckCircle2, 
  FileCode2 
} from 'lucide-react';

export const About: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;

  const valueIcons = [
    <Hammer className="w-5 h-5 text-sky-400" />,
    <Sparkles className="w-5 h-5 text-indigo-400" />,
    <BrainCircuit className="w-5 h-5 text-purple-400" />,
    <Users className="w-5 h-5 text-emerald-400" />,
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      
      {/* Subtle backdrop accent */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-sky-400 text-xs font-mono mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>01 // ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Authentic Curiosity, <span className="text-gradient">Relentless Execution.</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl text-base">
            An honest perspective from an early-career developer navigating the intersection of computer applications and modern generative systems.
          </p>
        </div>

        {/* Bento Grid: Story & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Story Card (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            <div className="glass-panel rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-sky-500/10 via-indigo-500/5 to-transparent rounded-bl-full pointer-events-none" />
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2.5">
                <FileCode2 className="w-5 h-5 text-sky-500 dark:text-sky-400" />
                <span>The Journey So Far</span>
              </h3>

              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {personal.aboutDetailed.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  No inflated senior titles
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Hands-on project learner
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Eager to contribute & grow
                </span>
              </div>
            </div>

            {/* Core Values / Working Principles (4 cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personal.values.map((val, idx) => (
                <div
                  key={val.title}
                  className="glass-panel p-5 rounded-2xl hover:border-indigo-500/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    {valueIcons[idx % valueIcons.length]}
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base mb-1.5">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-normal">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Sidebar Info Card (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Quick Profile Snapshot */}
            <div className="glass-panel rounded-3xl p-6 relative">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-5">
                Profile Snapshot
              </h3>

              <div className="space-y-4">
                
                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500 dark:text-sky-400 shrink-0 mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                      Current Education
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {personal.education}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                      Primary Career Goal
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      AI Developer / Generative AI Engineer
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                      Location
                    </span>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {personal.location} (Remote Ready)
                    </span>
                  </div>
                </div>

              </div>

              {/* Learning Philosophy Quote */}
              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-white/10">
                <blockquote className="text-xs italic text-slate-600 dark:text-slate-400 border-l-2 border-indigo-500 pl-3 py-1">
                  "In the age of generative models, curiosity, critical thinking, and rapid iteration are a developer's highest superpowers."
                </blockquote>
              </div>
            </div>

            {/* What I'm Looking For */}
            <div className="glass-panel rounded-3xl p-6 bg-gradient-to-br from-indigo-900/10 via-purple-900/5 to-transparent">
              <span className="text-[11px] font-mono uppercase tracking-wider text-sky-500 dark:text-sky-400 font-semibold block mb-2">
                Open Collaboration
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                Looking for Summer/Fall Internships & Open Source
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Interested in working with forward-thinking teams experimenting with GenAI tooling, developer workflows, and client applications.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-sky-400 hover:underline"
              >
                <span>Discuss an opportunity</span>
                <span>→</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
