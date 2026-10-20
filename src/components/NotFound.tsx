import React from 'react';
import { Home, Compass } from 'lucide-react';

interface NotFoundProps {
  onReturnHome: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onReturnHome }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="glass-panel max-w-md w-full rounded-3xl p-8 text-center relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 mx-auto flex items-center justify-center mb-6">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '10s' }} />
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 mb-3 inline-block">
          ERROR 404 // ROUTE NOT FOUND
        </span>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Page Coordinates Uncharted
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
          The requested page or resource doesn't exist or was relocated in the node network.
        </p>

        <button
          onClick={onReturnHome}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 shadow-md transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return to Portfolio</span>
        </button>

      </div>
    </div>
  );
};
