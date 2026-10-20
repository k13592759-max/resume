import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { NeuralNetworkVisual } from './NeuralNetworkVisual';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { 
  ArrowRight, 
  Mail, 
  Download, 
  Sparkles, 
  Code, 
  Cpu, 
  Compass 
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { personal } = PORTFOLIO_DATA;

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
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs font-mono mb-6 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personal.availabilityText}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
              Building Intelligent Experiences with{' '}
              <span className="text-gradient">AI & Code.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8">
              {personal.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8">
              
              {/* Button 1: Explore My Projects */}
              <button
                onClick={() => scrollToSection('#projects')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 hover:from-sky-400 hover:via-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 active:scale-95"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Button 2: Get In Touch */}
              <button
                onClick={() => scrollToSection('#contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-800 dark:text-white bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 border border-slate-300 dark:border-white/10 shadow-sm transition-all duration-200 active:scale-95"
              >
                <span>Get In Touch</span>
                <Mail className="w-4 h-4 text-indigo-500 dark:text-sky-400" />
              </button>

              {/* Download Resume Button */}
              <a
                href={personal.resumePath}
                download="Krishna_Katekhaye_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-medium text-xs sm:text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5 border border-transparent hover:border-slate-300 dark:hover:border-white/10 transition-all"
                title="Download Krishna's resume PDF"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>Download Resume</span>
              </a>

            </div>

            {/* Quick verification / Social Proof Pills */}
            <div className="pt-6 border-t border-slate-200 dark:border-white/10 w-full flex flex-wrap items-center gap-6">
              
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <Code className="w-4 h-4 text-sky-500" />
                <span>BCA 1st Year (India)</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <Cpu className="w-4 h-4 text-indigo-500" />
                <span>GenAI & Prompt Exploration</span>
              </div>

              {/* Quick links to verified profiles */}
              <div className="flex items-center gap-2 ml-auto">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: AI / Node Dynamic Visual */}
          <div className="lg:col-span-5 w-full">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-purple-500/20 blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />
              <NeuralNetworkVisual />
            </div>

            <div className="mt-3 px-2 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-sky-400" />
                Generative AI • Code • Vibe Coding
              </span>
              <span className="flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-indigo-400" />
                Building Practical Solutions
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
