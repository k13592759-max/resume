import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { 
  Award, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  BadgeCheck 
} from 'lucide-react';

export const Achievements: React.FC = () => {
  const { achievements } = PORTFOLIO_DATA;

  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      
      {/* Decorative ambient gradient */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-mono mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>04 // VERIFIED ACHIEVEMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Milestones & <span className="text-gradient">Credentials.</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl text-base">
            Documenting verified badges and certifications. Zero unconfirmed awards or inflated claims.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Verified Google Skills Badge Card */}
          {achievements.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 relative group"
            >
              <div>
                
                {/* Header with Verified Badge */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  
                  {/* Google Skills Stylized Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-400 via-indigo-600 to-purple-600 p-[1.5px] shrink-0">
                    <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                      <BadgeCheck className="w-7 h-7 text-sky-400 animate-pulse-subtle" />
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Publicly Verified</span>
                  </div>

                </div>

                {/* Badge Title & Issuer */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                  <span>{item.issuer}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.issueDate}
                  </span>
                </p>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {item.description}
                </p>

                {item.credentialId && (
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 text-xs font-mono text-slate-600 dark:text-slate-400 mb-6">
                    <span className="text-slate-400">ID: </span>
                    <span className="text-slate-900 dark:text-slate-200 font-semibold">{item.credentialId}</span>
                  </div>
                )}

              </div>

              {/* Action Button: Verify on Google */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  Google Cloud Platform
                </span>

                <a
                  href={item.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-md shadow-purple-500/20 transition-all"
                >
                  <span>Verify on Google Skills</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}

          {/* Configurable "Next Milestones" Placeholder Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-dashed border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-amber-400" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Active Learning & Upcoming Certifications
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Currently pursuing coursework in Python fundamentals, foundational cloud concepts, and generative AI prompt workflows. Future verified badges will be documented here directly.
              </p>

              <div className="space-y-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Python Programming Foundations (In Progress)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>Cloud Computing & Web Services Foundations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>Applied Generative AI Workflows</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-[11px]">Easily editable in portfolioData.ts</span>
              <span className="font-mono text-[11px] text-indigo-500 dark:text-sky-400 font-medium">BCA Curriculum</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
