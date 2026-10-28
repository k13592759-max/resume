import React from 'react';
import { PERSONAL } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 py-8 px-5 sm:px-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <div className="text-center sm:text-left">
          <span className="font-medium text-slate-400">{PERSONAL.name}</span>
          <span className="mx-2">·</span>
          <span>{year}</span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${PERSONAL.email}`}
            className="hover:text-slate-300 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};
