import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { AgiHologramCore } from './AgiHologramCore';
import { NeuralNetworkVisual } from './NeuralNetworkVisual';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Mail, 
  FileText, 
  Sparkles, 
  Code, 
  Cpu, 
  Zap, 
  Box, 
  Activity 
} from 'lucide-react';

interface HeroProps {
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { personal } = PORTFOLIO_DATA;
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [visualMode, setVisualMode] = useState<'3d-cga' | '2d-synapse'>('3d-cga');

  const dynamicWords = [
    'Generative AI',
    'Prompt Engineering',
    'Vibe Coding',
    'Agentic Systems',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [dynamicWords.length]);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
      
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-sky-500/10 via-indigo-500/15 to-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Story */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Availability Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-mono mb-6 backdrop-blur-md shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personal.availabilityText}</span>
              <span className="text-slate-400 dark:text-slate-600">|</span>
              <span className="flex items-center gap-1 text-indigo-600 dark:text-sky-400 font-semibold">
                <Zap className="w-3 h-3 animate-bounce" />
                <span>BCA 1st Year</span>
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
            >
              Building Intelligent Experiences with{' '}
              <span className="text-gradient">AI & Code.</span>
            </motion.h1>

            {/* Supporting Text with Dynamic Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="mb-8"
            >
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-3">
                {personal.bio}
              </p>

              {/* Dynamic rotating highlight tag */}
              <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Specializing in:</span>
                <div className="h-4 overflow-hidden inline-flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeWordIndex}
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -14, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="font-semibold text-indigo-600 dark:text-sky-400"
                    >
                      {dynamicWords[activeWordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons: Explore, Connect, and Interactive Resume */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8"
            >
              
              {/* Button 1: Explore My Projects */}
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection('#projects')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow active:scale-95"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              {/* Button 2: Interactive Resume / CV */}
              {onOpenResume && (
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenResume}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-800 dark:text-white bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-300 dark:border-white/10 shadow-sm transition-shadow active:scale-95"
                  title="View formatted ATS Resume"
                >
                  <FileText className="w-4 h-4 text-indigo-500 dark:text-sky-400" />
                  <span>Interactive Resume</span>
                </motion.button>
              )}

              {/* Button 3: Get In Touch */}
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToSection('#contact')}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 border border-transparent hover:border-slate-300 dark:hover:border-white/10 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Get In Touch</span>
              </motion.button>

            </motion.div>

            {/* Quick verification / Social Proof Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 border-t border-slate-200 dark:border-white/10 w-full flex flex-wrap items-center gap-6"
            >
              
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <Code className="w-4 h-4 text-sky-500" />
                <span>BCA 1st Year (India)</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <Cpu className="w-4 h-4 text-indigo-500" />
                <span>Three.js CGA • GenAI</span>
              </div>

              {/* Quick links to verified profiles */}
              <div className="flex items-center gap-2 ml-auto">
                <motion.a
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </motion.a>
              </div>

            </motion.div>

          </div>

          {/* Right Column: 3D CGA AGI Hologram Core & Neural Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 w-full flex flex-col"
          >
            <div className="relative group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-purple-500/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
              
              {/* Toggle Visualizer Component */}
              {visualMode === '3d-cga' ? (
                <AgiHologramCore />
              ) : (
                <NeuralNetworkVisual />
              )}
            </div>

            {/* Visualizer Mode Switcher Bar */}
            <div className="mt-3 px-2 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVisualMode('3d-cga')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
                    visualMode === '3d-cga'
                      ? 'bg-indigo-500/10 text-indigo-600 dark:text-sky-400 border-indigo-500/30 font-semibold'
                      : 'text-slate-400 border-transparent hover:text-white'
                  }`}
                >
                  <Box className="w-3 h-3" />
                  <span>3D CGA Core</span>
                </button>
                <button
                  onClick={() => setVisualMode('2d-synapse')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
                    visualMode === '2d-synapse'
                      ? 'bg-indigo-500/10 text-indigo-600 dark:text-sky-400 border-indigo-500/30 font-semibold'
                      : 'text-slate-400 border-transparent hover:text-white'
                  }`}
                >
                  <Activity className="w-3 h-3" />
                  <span>Synapse Fabric</span>
                </button>
              </div>

              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-sky-400" />
                WebGL Accelerated
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
