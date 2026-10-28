import React from 'react';
import { Terminal, ShieldCheck, ExternalLink, Award, Trophy, Users } from 'lucide-react';
import { PORTFOLIO_DATA, type Achievement } from '../data/portfolioData';

export const Achievements: React.FC = () => {
  const { achievements } = PORTFOLIO_DATA;

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'Cloud Badge':
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
      case 'Competition':
        return <Trophy className="w-5 h-5 text-amber-400" />;
      case 'Open Source':
        return <Users className="w-5 h-5 text-emerald-400" />;
      default:
        return <Award className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section
      id="achievements"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      {/* Chapter Indicator */}
      <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400 mb-3">
        <Terminal className="w-3.5 h-3.5" />
        <span>SECTOR: 05 // VERIFIED CREDENTIALS &amp; MILESTONES</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
            Achievements &amp; Validations
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-mono mt-2">
            Verified cloud credentials, community engagements, and technical milestones.
          </p>
        </div>
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((item: Achievement) => (
          <div
            key={item.id}
            className={`glass-panel rounded-2xl p-6 border transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300 shadow-xl ${
              item.verified
                ? 'border-emerald-500/25 hover:border-emerald-400/60'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              {/* Header: Icon, Type & Verified Tag */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-void-850 border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getAchievementIcon(item.type)}
                </div>

                {item.highlightPill && (
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold">
                    {item.highlightPill}
                  </span>
                )}
              </div>

              {/* Title & Issuer */}
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors font-sans mb-1">
                {item.title}
              </h3>
              <p className="text-xs font-mono text-cyan-400 mb-3.5">
                {item.issuer} &bull; {item.issueDate}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-6">
                {item.description}
              </p>
            </div>

            {/* Credential ID & Verification CTA */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3 text-xs font-mono">
              {item.credentialId ? (
                <span className="text-[11px] text-slate-500">
                  {item.credentialId}
                </span>
              ) : (
                <span className="text-[11px] text-slate-500">
                  {item.type}
                </span>
              )}

              {item.verificationUrl ? (
                <a
                  href={item.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
                >
                  <span>VERIFY PUBLIC BADGE</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-slate-500 text-[10px]">VERIFIED MILESTONE</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Verified Google Cloud Note */}
      <div className="mt-8 glass-panel-cyan rounded-2xl p-6 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white font-sans">
              Google Skills Platform Profile
            </h4>
            <p className="text-xs text-slate-300 font-sans mt-0.5">
              Verified skills badge curriculum covering Google Cloud infrastructure, security concepts, and foundational architecture.
            </p>
          </div>
        </div>

        <a
          href="https://www.skills.google/public_profiles/ba86f5f1-7c71-4220-b7f4-fc5ce518fe72/badges/25567268"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 transition-all font-semibold"
        >
          <span>VIEW BADGE #25567268</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
