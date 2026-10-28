import React from 'react';
import { ACHIEVEMENTS } from '../data/portfolioData';

const BADGE_TYPE_STYLES: Record<string, string> = {
  badge: 'bg-blue-500/10 text-blue-300 border-blue-500/25',
  certification: 'bg-violet-500/10 text-violet-300 border-violet-500/25',
  competition: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
  community: 'bg-green-500/10 text-green-300 border-green-500/25',
};

const TIMELINE = [
  {
    period: '2024 – Present',
    title: 'Bachelor of Computer Applications (BCA)',
    institution: 'First Year, India',
    description:
      'Undergraduate studies in computer science: C programming, data structures, database management, discrete mathematics, and operating systems fundamentals.',
    category: 'Education',
  },
  {
    period: '2024',
    title: 'Google Skills Verified Badge',
    institution: 'Google Skills (Google Cloud)',
    description:
      'Completed hands-on labs covering Google Cloud infrastructure, cloud storage, compute VMs, and identity management. Earned verified public badge #25567268.',
    category: 'Certification',
  },
  {
    period: '2024 – 2025',
    title: 'Generative AI & Prompt Engineering',
    institution: 'Independent Research',
    description:
      'Deep exploration of LLM APIs (Gemini), prompt engineering patterns, and agentic AI tool-use. Applied in personal projects including legal document analysis and healthcare AI.',
    category: 'AI & Tech',
  },
  {
    period: '2025 – Ahead',
    title: 'Next: RAG Pipelines & Cloud-native Engineering',
    institution: 'Active Learning Roadmap',
    description:
      'Working toward retrieval-augmented generation systems, Docker containerization, and deeper cloud architecture. Targeting engineering internships.',
    category: 'Roadmap',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Education: 'border-blue-500/40 bg-blue-500/8',
  Certification: 'border-violet-500/40 bg-violet-500/8',
  'AI & Tech': 'border-green-500/40 bg-green-500/8',
  Roadmap: 'border-slate-600 bg-slate-700/20',
};

export const Education: React.FC = () => {
  return (
    <section id="education" className="section-padding">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-xs font-mono tracking-widest text-blue-400 uppercase">
            04 / Education & Achievements
          </span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Timeline — left */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-8">
              Journey so far
            </h2>

            <ol className="relative border-l border-slate-800 space-y-8 ml-3">
              {TIMELINE.map((item, i) => (
                <li key={i} className="relative pl-6">
                  {/* Dot */}
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-blue-500 bg-[#0a0f1e]" />

                  <div
                    className={`p-4 rounded-xl border ${CATEGORY_COLORS[item.category] ?? 'border-slate-700 bg-slate-800/20'}`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="text-base font-semibold text-slate-100 leading-snug">
                        {item.title}
                      </h3>
                      <span className="shrink-0 text-xs font-mono text-slate-500 mt-0.5">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-slate-500 mb-2">{item.institution}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Achievements — right */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-slate-100 mb-6">Credentials</h2>

            <div className="space-y-4">
              {ACHIEVEMENTS.map((ach) => (
                <div
                  key={ach.id}
                  className="glass-card rounded-xl p-4 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-100 leading-snug">
                      {ach.title}
                    </h3>
                    <span
                      className={`shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                        BADGE_TYPE_STYLES[ach.type] ?? 'bg-slate-700 text-slate-300 border-slate-600'
                      }`}
                    >
                      {ach.type}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-slate-500">
                    {ach.issuer} · {ach.date}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">{ach.description}</p>

                  {ach.verificationUrl && (
                    <a
                      href={ach.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors mt-1"
                    >
                      Verify credential
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
