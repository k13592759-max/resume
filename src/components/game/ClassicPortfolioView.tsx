import React, { useState } from 'react';
import { Gamepad2 } from 'lucide-react';
import { Navbar } from '../Navbar';
import { Hero } from '../Hero';
import { About } from '../About';
import { Projects } from '../Projects';
import { Skills } from '../Skills';
import { Achievements } from '../Achievements';
import { Journey } from '../Journey';
import { Contact } from '../Contact';
import { Footer } from '../Footer';
import { ResumeModal } from '../ResumeModal';
import { useGame } from '../../game/GameContext';

export const ClassicPortfolioView: React.FC = () => {
  const { setGameMode } = useGame();
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030708] text-slate-100 relative overflow-x-hidden selection:bg-emerald-500/25 selection:text-emerald-200">
      {/* Top Floating Return to 3D Game Banner */}
      <div className="fixed top-20 right-6 z-40 animate-bounce">
        <button
          onClick={() => setGameMode('playing')}
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-500 hover:bg-emerald-400 text-void-950 shadow-[0_0_25px_#10B981] transition-all cursor-pointer transform hover:scale-105"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>RETURN TO 3D GAME</span>
        </button>
      </div>

      {/* Navigation */}
      <Navbar
        activeSection="hero"
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Main Content */}
      <main id="main-content" className="relative z-10">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Journey />
        <Contact />
      </main>

      <Footer onReplayIntro={() => setGameMode('intro')} />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
};
