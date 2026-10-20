import React, { useState } from 'react';
import { PORTFOLIO_DATA, type Project } from '../data/portfolioData';
import { ProjectCardVisual } from './ProjectCardVisual';
import { GithubIcon } from './SocialIcons';
import { 
  FolderGit2, 
  ExternalLink, 
  Clock, 
  Sparkles, 
  X, 
  CheckCircle2, 
  ArrowUpRight 
} from 'lucide-react';

export const Projects: React.FC = () => {
  const { projects } = PORTFOLIO_DATA;
  const [filter, setFilter] = useState<'All' | 'In Progress' | 'Concept'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((p) => {
    if (filter === 'All') return true;
    return p.status === filter;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-sky-400 text-xs font-mono mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>03 // FEATURED PROJECTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Curated Concepts & <span className="text-gradient">Active Builds.</span>
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl text-base">
              Hands-on exploration of generative AI, civic literacy, and web utilities. Each project is grounded in source code on GitHub.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl glass-panel self-start md:self-auto border border-slate-200 dark:border-white/10">
            {(['All', 'In Progress', 'Concept'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all duration-200 ${
                  filter === tab
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab === 'All' ? 'All Projects' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel rounded-3xl overflow-hidden flex flex-col justify-between hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300 group"
            >
              <div>
                
                {/* Visual Banner */}
                <div className="p-3">
                  <ProjectCardVisual
                    id={project.id}
                    title={project.title}
                    status={project.status}
                  />
                </div>

                {/* Project Body */}
                <div className="p-6 pt-3">
                  
                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-sky-500 dark:text-sky-400 font-semibold">
                      {project.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                        project.status === 'In Progress'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                          : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
                      }`}
                    >
                      <Clock className="w-2.5 h-2.5" />
                      <span>{project.status}</span>
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-indigo-500 dark:text-indigo-300 font-medium mb-3">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 border-t border-slate-200/60 dark:border-white/5 mt-auto flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-sky-400 flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Concept Notes</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl text-slate-800 dark:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300/60 dark:border-white/10 transition-all"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>

                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm"
                    >
                      <span>Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-2.5 py-1.5 text-[11px] font-mono text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      title="Currently in development"
                    >
                      Details →
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* View All on GitHub Banner CTA */}
        <div className="mt-14 p-8 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Explore More Repositories on GitHub
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Check out experiments, code snippets, and active BCA coursework repos.
            </p>
          </div>

          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-sm text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-lg transition-all duration-200 shrink-0"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View All Projects on GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Project Concept Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative bg-white dark:bg-[#0E111E]">
            
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-sky-400 border border-indigo-500/20">
                {selectedProject.status}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {selectedProject.category}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {selectedProject.title}
            </h3>
            
            <p className="text-sm font-medium text-indigo-500 dark:text-indigo-300 mb-4">
              {selectedProject.tagline}
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            {/* Key Objectives */}
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
              Core Exploration Objectives:
            </h4>
            <div className="space-y-2.5 mb-6">
              {selectedProject.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 text-xs font-medium rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                Close
              </button>

              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Open Repository</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
