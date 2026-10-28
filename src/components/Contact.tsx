import React from 'react';
import { PERSONAL } from '../data/portfolioData';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="section-padding bg-[#0c1220]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-xs font-mono tracking-widest text-blue-400 uppercase">
            05 / Contact
          </span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-4">
            Let's connect
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-10">
            I'm open to internships, collaborations, and conversations about AI, software development,
            or any interesting project. Reach out through any of the links below.
          </p>

          <div className="space-y-3">
            {/* LinkedIn */}
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-5 py-4 rounded-xl glass-card glass-card-hover group"
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-100">LinkedIn</div>
                  <div className="text-xs text-slate-500 mt-0.5">Connect professionally</div>
                </div>
              </div>
              <svg className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-5 py-4 rounded-xl glass-card glass-card-hover group"
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-slate-700/50 border border-slate-600/40 flex items-center justify-center">
                  <svg className="w-5 h-5 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-100">GitHub</div>
                  <div className="text-xs text-slate-500 mt-0.5">@k13592759-max · View repositories</div>
                </div>
              </div>
              <svg className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            {/* Email */}
            <a
              href={`mailto:${PERSONAL.email}`}
              className="flex items-center justify-between w-full px-5 py-4 rounded-xl glass-card glass-card-hover group"
            >
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-violet-600/15 border border-violet-500/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-100">Email</div>
                  <div className="text-xs text-slate-500 mt-0.5">{PERSONAL.email}</div>
                </div>
              </div>
              <svg className="w-4 h-4 text-slate-500 group-hover:text-violet-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
