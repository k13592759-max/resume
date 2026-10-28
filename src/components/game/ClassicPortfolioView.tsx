import React from 'react';
import { useGame } from '../../game/GameContext';
import { Navbar } from '../Navbar';
import { Hero } from '../Hero';
import { About } from '../About';
import { Skills } from '../Skills';
import { Projects } from '../Projects';
import { Education } from '../Education';
import { Contact } from '../Contact';
import { Footer } from '../Footer';

export const ClassicPortfolioView: React.FC = () => {
  const { setGameMode } = useGame();

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-100">
      {/* Game mode re-entry banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-emerald-500/10 border-b border-emerald-500/20 py-2 px-4 flex items-center justify-between">
        <span className="text-xs font-mono text-emerald-300">
          Classic Portfolio View
        </span>
        <button
          onClick={() => setGameMode('start')}
          className="text-xs font-mono text-emerald-400 hover:text-emerald-300 px-3 py-1 rounded border border-emerald-500/30 hover:bg-emerald-500/10 transition-colors"
        >
          ⬡ Enter 3D Universe
        </button>
      </div>

      <div className="pt-9">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};
