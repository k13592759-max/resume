import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, ShieldCheck, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { personal, skillsUsed, skillsLearning, projects, achievements, timeline } = PORTFOLIO_DATA;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-void-950 border border-emerald-500/30 shadow-2xl overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-void-900/90">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-mono font-bold text-white tracking-wider">
              CURRICULUM VITAE // ATS-COMPLIANT SPECIFICATION
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition-all cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT / PDF</span>
            </button>

            <a
              href="/resume.pdf"
              download="Krishna_Katekhaye_Resume.pdf"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-void-850 hover:bg-void-800 text-slate-300 border border-slate-700 transition-all"
              title="Download direct PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD</span>
            </a>

            <button
              onClick={onClose}
              type="button"
              className="p-1.5 rounded-lg bg-void-850 text-slate-400 hover:text-white border border-slate-700 hover:border-emerald-500/40 cursor-pointer ml-2"
              aria-label="Close resume modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div className="overflow-y-auto p-6 sm:p-10 font-sans text-slate-200 space-y-8 bg-void-950">
          {/* Header */}
          <div className="border-b border-slate-800 pb-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                {personal.name}
              </h1>
              <p className="text-sm font-mono text-emerald-400 mt-1">
                {personal.title} &bull; {personal.education}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {personal.location}
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5 text-xs font-mono text-slate-400">
              <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 hover:text-emerald-400">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>{personal.email}</span>
              </a>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-emerald-400">
                <GithubIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>github.com/{personal.githubUsername}</span>
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-cyan-400">
                <LinkedinIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>linkedin.com/in/krishna-katekhaye</span>
              </a>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 border-b border-slate-800 pb-1">
              Education
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <span className="font-bold text-white text-sm">
                {personal.education}
              </span>
              <span className="text-xs font-mono text-slate-400">
                2024 &ndash; 2027 (Expected)
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Core coursework: C Programming, Data Structures, Discrete Mathematics, Relational Database Management Systems.
            </p>
          </div>

          {/* Skills Breakdown */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 border-b border-slate-800 pb-1">
              Technical Competencies
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                <span className="font-mono text-slate-400 min-w-[160px] font-bold">
                  Technologies Used:
                </span>
                <span className="text-slate-300">
                  {skillsUsed.map(s => s.name).join(' • ')}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                <span className="font-mono text-cyan-400 min-w-[160px] font-bold">
                  Currently Learning:
                </span>
                <span className="text-slate-300">
                  {skillsLearning.map(s => s.name).join(' • ')}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4 border-b border-slate-800 pb-1">
              Selected Technical Projects
            </h2>
            <div className="space-y-5">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-bold text-sm text-white">
                      {proj.title} &ndash; <span className="font-normal text-slate-400">{proj.tagline}</span>
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400">
                      {proj.tags.slice(0, 3).join(', ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {proj.description}
                  </p>
                  <ul className="list-disc list-inside text-xs text-slate-400 space-y-0.5 pl-1">
                    {proj.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Achievements */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 border-b border-slate-800 pb-1">
              Verified Credentials &amp; Achievements
            </h2>
            <div className="space-y-3">
              {achievements.map((ach) => (
                <div key={ach.id} className="flex items-start justify-between gap-4 text-xs">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-bold text-white">{ach.title}</span>
                      <span className="text-slate-500">&bull; {ach.issuer}</span>
                    </div>
                    <p className="text-slate-400 mt-0.5">{ach.description}</p>
                  </div>
                  {ach.verificationUrl && (
                    <a
                      href={ach.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline shrink-0 flex items-center gap-1 font-mono"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 border-b border-slate-800 pb-1">
              Timeline Milestones
            </h2>
            <div className="space-y-2 text-xs">
              {timeline.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-2">
                  <span className="font-mono text-slate-500 min-w-[120px]">
                    {item.year}:
                  </span>
                  <div>
                    <span className="font-bold text-white">{item.title}</span>
                    <span className="text-slate-400 ml-1.5">&ndash; {item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
