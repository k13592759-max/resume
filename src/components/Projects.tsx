import React, { useState } from 'react';
import { Terminal, ExternalLink, Sparkles, Layers, ChevronRight, X, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA, type Project } from '../data/portfolioData';
import { GithubIcon } from './SocialIcons';

export const Projects: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const categories = ['All', 'AI & GenAI', 'Civic Tech', 'Voice AI', 'Spatial Tech', 'Sustainability'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="work"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 flex flex-col justify-center"
    >
      {/* Chapter Indicator */}
      <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 mb-3">
        <Terminal className="w-3.5 h-3.5" />
        <span>SECTOR: 03 // SELECTED WORK &amp; EXPERIMENTS</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
            Featured Systems &amp; Artifacts
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-mono mt-2">
            Five core projects exploring GenAI interfaces, civic tech, regional voice, spatial 3D, and climate intelligence.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-void-850/80 border border-slate-800 backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              type="button"
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="glass-panel rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/50 transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300 shadow-xl"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-void-850 border border-slate-700 text-slate-300">
                  {project.category}
                </span>

                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    project.status === 'Active'
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      : project.status === 'In Progress'
                      ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors font-sans mb-1.5">
                {project.title}
              </h3>
              <p className="text-xs font-mono text-emerald-400/90 mb-3.5 leading-snug">
                {project.tagline}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 font-sans">
                {project.description}
              </p>

              {/* Highlights Checklist */}
              <div className="space-y-2 mb-6">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer: Tags & Actions */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-void-900 border border-slate-800 text-slate-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveProjectModal(project)}
                  type="button"
                  className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer group/btn"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>ARCHITECTURE</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-void-850 hover:bg-void-800 text-slate-300 hover:text-white border border-slate-700 hover:border-emerald-500/40 transition-colors"
                    title={`View ${project.title} on GitHub`}
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
                      title="Live Demonstration"
                      aria-label="Live Demonstration"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Project Architecture Deep-Dive Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel max-w-2xl w-full rounded-2xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-void-850 text-slate-400 hover:text-white border border-slate-700 hover:border-emerald-500/40 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SYSTEM SPECIFICATION</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-1 font-sans">
              {activeProjectModal.title}
            </h3>
            <p className="text-xs font-mono text-cyan-400 mb-6">
              {activeProjectModal.tagline}
            </p>

            <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
              {activeProjectModal.description}
            </p>

            {/* Architecture breakdown */}
            {activeProjectModal.architecture && (
              <div className="mb-6 p-4 rounded-xl bg-void-900 border border-slate-800">
                <h4 className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ARCHITECTURE STACK</span>
                </h4>
                <ul className="space-y-2 text-xs font-mono text-slate-300">
                  {activeProjectModal.architecture.map((layer, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400">&bull;</span>
                      <span>{layer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Metrics */}
            {activeProjectModal.metrics && (
              <div className="grid grid-cols-3 gap-3 mb-6">
                {activeProjectModal.metrics.map((m, i) => (
                  <div key={i} className="p-3 rounded-xl bg-void-850 border border-slate-800 text-center">
                    <span className="block text-xs font-bold text-white font-mono">
                      {m.value}
                    </span>
                    <span className="block text-[10px] font-mono text-slate-400 mt-0.5">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <a
                href={activeProjectModal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-emerald-500 hover:bg-emerald-400 text-void-950 font-bold transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>VIEW REPOSITORY</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
