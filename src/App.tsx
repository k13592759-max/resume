import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { CurrentlyLearning } from './components/CurrentlyLearning';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { NotFound } from './components/NotFound';
import { FloatingOrbs } from './components/FloatingOrbs';

export const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isNotFound, setIsNotFound] = useState(false);

  // Monitor scroll to update active section in navbar
  useEffect(() => {
    // Check if path is 404
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      const cleanPath = window.location.pathname.replace(/^\/|\/$/g, '');
      if (cleanPath && !cleanPath.endsWith('.html') && !cleanPath.endsWith('.pdf')) {
        setIsNotFound(true);
        return;
      }
    }

    const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isNotFound) {
    return (
      <div className="min-h-screen bg-[#0A0C14] text-slate-100 flex flex-col justify-between">
        <Navbar activeSection="" />
        <NotFound onReturnHome={() => {
          window.history.pushState({}, '', '/');
          setIsNotFound(false);
        }} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0C14] text-slate-900 dark:text-slate-100 selection:bg-indigo-500/25 selection:text-indigo-600 dark:selection:text-indigo-200 transition-colors duration-300 relative bg-grid-pattern">
      
      {/* Background ambient floating gradient orbs */}
      <FloatingOrbs />

      {/* Top sticky navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main content sections */}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <CurrentlyLearning />
        <Contact />
      </main>

      {/* Site Footer */}
      <Footer />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
