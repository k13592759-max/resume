import React, { useState } from 'react';
import { Terminal, CheckCircle2, Compass, Sparkles, Layers, Box, Cpu, FileCode, Binary, GitBranch, Cloud, Palette, Layout, Container, Database, Server, Globe } from 'lucide-react';
import { PORTFOLIO_DATA, type SkillItem } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const { skillsUsed, skillsLearning } = PORTFOLIO_DATA;
  const [activeTab, setActiveTab] = useState<'both' | 'used' | 'learning'>('both');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Code2':
      case 'FileCode':
        return <FileCode className="w-4 h-4" />;
      case 'Binary':
        return <Binary className="w-4 h-4" />;
      case 'Box':
        return <Box className="w-4 h-4" />;
      case 'Palette':
        return <Palette className="w-4 h-4" />;
      case 'Layout':
        return <Layout className="w-4 h-4" />;
      case 'GitBranch':
        return <GitBranch className="w-4 h-4" />;
      case 'Cloud':
        return <Cloud className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4" />;
      case 'Container':
        return <Container className="w-4 h-4" />;
      case 'Database':
        return <Database className="w-4 h-4" />;
      case 'Server':
        return <Server className="w-4 h-4" />;
      case 'Globe':
        return <Globe className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      {/* Chapter Indicator */}
      <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400 mb-3">
        <Terminal className="w-3.5 h-3.5" />
        <span>SECTOR: 04 // TECHNICAL TAXONOMY &amp; TOOLCHAIN</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
            Skills &amp; Capabilities
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-mono mt-2">
            Clear separation between active hands-on technologies and next-frontier learning objectives.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-void-850/80 border border-slate-800 backdrop-blur-md">
          <button
            onClick={() => setActiveTab('both')}
            type="button"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'both'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Disciplines
          </button>
          <button
            onClick={() => setActiveTab('used')}
            type="button"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'used'
                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Technologies Used</span>
          </button>
          <button
            onClick={() => setActiveTab('learning')}
            type="button"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'learning'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Currently Learning</span>
          </button>
        </div>
      </div>

      {/* Skills Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* PANEL 1: Technologies I Have Used (Emerald Accent) */}
        {(activeTab === 'both' || activeTab === 'used') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-sans">
                    Technologies I Have Used
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">
                    Core, Proficient &amp; Hands-on Production Tools
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                {skillsUsed.length} STACK NODES
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {skillsUsed.map((skill: SkillItem) => (
                <div
                  key={skill.name}
                  className="glass-panel rounded-xl p-4 border border-emerald-500/15 hover:border-emerald-400/40 transition-all group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-void-850 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      {getIcon(skill.iconName)}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {skill.level}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors font-sans">
                    {skill.name}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500 block mb-1.5">
                    {skill.category}
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {skill.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PANEL 2: Technologies I Am Learning (Cyan Accent) */}
        {(activeTab === 'both' || activeTab === 'learning') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-sans">
                    Technologies I Am Learning
                  </h3>
                  <span className="text-xs font-mono text-cyan-400">
                    Active Research, RAG Pipelines &amp; Cloud Native
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {skillsLearning.length} FRONTIER NODES
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {skillsLearning.map((skill: SkillItem) => (
                <div
                  key={skill.name}
                  className="glass-panel-cyan rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-400/40 transition-all group"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-void-850 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      {getIcon(skill.iconName)}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {skill.level}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors font-sans">
                    {skill.name}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500 block mb-1.5">
                    {skill.category}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {skill.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Continuous Learning Philosophy Note */}
            <div className="p-4 rounded-xl bg-void-850/60 border border-slate-800 text-xs font-mono text-slate-400 flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                &ldquo;Engineering is not static memorization. As foundation models evolve, the best developers continuously expand into multi-agent systems and cloud native pipelines.&rdquo;
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
