import React from 'react';
import { PERSONAL, ABOUT_PARAGRAPHS } from '../data/portfolioData';

const HIGHLIGHTS = [
  { label: 'Degree', value: 'BCA — First Year' },
  { label: 'Location', value: 'India' },
  { label: 'Focus', value: 'AI & Software Dev' },
  { label: 'Status', value: 'Available for Internships' },
];

const INTERESTS = [
  'Generative AI & LLMs',
  'Modern Web Engineering',
  'Python & AI tooling',
  'Cloud-native development',
  'Open-source software',
];

export const About: React.FC = () => {
  return (
    <section id="about" className="section-padding bg-[#0c1220]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-xs font-mono tracking-widest text-blue-400 uppercase">
            01 / About
          </span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left — bio text */}
          <div className="lg:col-span-3 space-y-5">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 leading-tight">
              Building at the intersection of{' '}
              <span className="text-gradient-blue-violet">software and intelligence</span>
            </h2>

            <div className="space-y-4 text-slate-400 leading-relaxed">
              {ABOUT_PARAGRAPHS.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Interests list */}
            <div className="pt-2">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
                Interests
              </p>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((item) => (
                  <span key={item} className="tag-pill">{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — quick stats card */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-xl p-6 space-y-5">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
                Quick Profile
              </p>

              <div className="space-y-4">
                {HIGHLIGHTS.map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-4 py-2.5 border-b border-slate-800 last:border-b-0">
                    <span className="text-xs font-mono text-slate-500 shrink-0">{label}</span>
                    <span className="text-sm text-slate-200 text-right">{value}</span>
                  </div>
                ))}
              </div>

              {/* Profile links */}
              <div className="pt-2 space-y-2">
                <a
                  href={PERSONAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg border border-slate-700 hover:border-blue-500/40 text-slate-300 hover:text-blue-300 text-sm transition-colors group"
                >
                  <span className="font-medium">LinkedIn</span>
                  <svg className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href={PERSONAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg border border-slate-700 hover:border-blue-500/40 text-slate-300 hover:text-blue-300 text-sm transition-colors group"
                >
                  <span className="font-medium">GitHub</span>
                  <svg className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
