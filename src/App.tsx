import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Achievements } from './components/Achievements';
import { Journey } from './components/Journey';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CinematicIntro } from './components/CinematicIntro';
import { ScrollProgressHUD } from './components/ScrollProgressHUD';
import { ResumeModal } from './components/ResumeModal';
import { WebGLFallback } from './components/3d/WebGLFallback';

// Lazy load the 3D scene to ensure initial DOM render is lightning fast
const Scene3D = lazy(() => import('./components/3d/Scene3D'));

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Scroll listener to update scrollProgress and activeSection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(1, Math.max(0, scrollY / totalHeight)) : 0;
      setScrollProgress(progress);

      // Section tracker
      const sections = ['hero', 'about', 'work', 'skills', 'achievements', 'journey', 'contact'];
      const scrollPosition = scrollY + window.innerHeight * 0.35;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial evaluation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#030708] text-slate-100 selection:bg-emerald-500/25 selection:text-emerald-200 relative overflow-x-hidden">
      {/* 1. Cinematic Intro Screen (Skippable) */}
      <CinematicIntro
        isVisible={showIntro}
        onComplete={() => setShowIntro(false)}
      />

      {/* 2. Main 3D Canvas Scene (Procedural Three.js Universe) */}
      <Suspense fallback={<WebGLFallback />}>
        <Scene3D scrollProgress={scrollProgress} />
      </Suspense>

      {/* 3. Top Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* 4. Side HUD Scroll Tracker */}
      <ScrollProgressHUD
        scrollProgress={scrollProgress}
        activeSection={activeSection}
      />

      {/* 5. Main Narrative Content Sections */}
      <main id="main-content" className="relative z-10">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Projects />
        <Skills />
        <Achievements />
        <Journey />
        <Contact />
      </main>

      {/* 6. Footer */}
      <Footer onReplayIntro={() => setShowIntro(true)} />

      {/* 7. ATS Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
};

export default App;
