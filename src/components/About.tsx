import React from 'react';
import { Terminal, BookOpen, Sparkles, Cpu, ShieldCheck, Code2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const About: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section
      id="about"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      {/* Chapter Indicator */}
      <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400 mb-3">
        <Terminal className="w-3.5 h-3.5" />
        <span>SECTOR: 02 // ARCHITECTURE & MINDSET</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
            Bridging Logic, AI, &amp; the Spatial Web
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-mono mt-2">
            First-year BCA student crafting modern systems through experimentation and code.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Personal Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-emerald-500/20 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-sans">
                  The Computational Path
                </h3>
                <span className="text-xs font-mono text-emerald-400">
                  {personal.education} &bull; {personal.institution}
                </span>
              </div>
            </div>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                I am currently in my first year of Bachelor of Computer Applications (BCA) in India. My fascination lies at the intersection of fundamental computer science, procedural 3D graphics, and modern generative AI architectures.
              </p>
              <p>
                Rather than treating university studies solely as textbook theory, I advocate for an aggressive &ldquo;build-to-understand&rdquo; methodology. While mastering core data structures and C programming in the lecture hall, I spend my nights building production-grade web prototypes, integrating LLM APIs, and exploring how spatial interfaces can transform human-computer interaction.
              </p>
              <p>
                My long-term aspiration is to operate as an impactful AI Systems Engineer—someone who possesses the deep foundational rigor to orchestrate scalable cloud backends, while wielding the creative nuance to present complex intelligence through fluid, cinematic web experiences.
              </p>
            </div>
          </div>

          {/* Core Values / Philosophy Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {personal.philosophy.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-xl p-5 border border-emerald-500/15 hover:border-emerald-400/40 transition-all group"
              >
                <div className="w-8 h-8 rounded-lg bg-void-850 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                  {idx === 0 && <Code2 className="w-4 h-4" />}
                  {idx === 1 && <Cpu className="w-4 h-4" />}
                  {idx === 2 && <Sparkles className="w-4 h-4" />}
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5 font-sans">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Telemetry & Quick Metrics */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Metrics */}
          <div className="glass-panel rounded-2xl p-6 border border-emerald-500/20">
            <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>LIVE TELEMETRY / STATS</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {personal.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-void-850/90 border border-slate-800/80 hover:border-emerald-500/30 transition-colors"
                >
                  <span className="block text-xl sm:text-2xl font-black text-white font-mono">
                    {stat.value}
                  </span>
                  <span className="block text-[11px] font-mono text-slate-400 mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Cloud Pillar Card */}
          <div className="glass-panel-cyan rounded-2xl p-6 border border-cyan-500/25">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 mb-1.5">
                  VERIFIED CREDENTIAL
                </span>
                <h4 className="text-sm font-bold text-white font-sans">
                  Google Skills Verified Milestone
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  Publicly verified technical credential earned through the Google Cloud and foundational computing curriculum (Badge #25567268).
                </p>
              </div>
            </div>
          </div>

          {/* Academic Journey Focus */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-void-850 to-void-800 border border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 block mb-2">
              CURRENT SEMESTER STUDY FOCUS
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-md bg-void-900 border border-emerald-500/30 text-emerald-300">
                C Algorithms
              </span>
              <span className="px-2.5 py-1 rounded-md bg-void-900 border border-cyan-500/30 text-cyan-300">
                Database Systems
              </span>
              <span className="px-2.5 py-1 rounded-md bg-void-900 border border-slate-700 text-slate-300">
                Discrete Math
              </span>
              <span className="px-2.5 py-1 rounded-md bg-void-900 border border-slate-700 text-slate-300">
                Operating Systems
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
