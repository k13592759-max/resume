import React from 'react';
import { AgiTerminal } from './AgiTerminal';
import { SpotlightCard } from './SpotlightCard';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Code2, 
  Workflow, 
  Zap 
} from 'lucide-react';

export const AgiLab: React.FC = () => {
  return (
    <section id="agi-lab" className="py-24 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-mono mb-3">
            <Bot className="w-3.5 h-3.5" />
            <span>02 // AGI & PROMPT ENGINEERING LAB</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Generative Systems in <span className="text-gradient">Active Execution.</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl text-base">
            An interactive console illustrating my prompt engineering approach, agentic pairing loops, and vibe coding methodology. Click any command below to inspect live execution traces.
          </p>
        </motion.div>

        {/* 2-Column Layout: Terminal (Left 7 cols) & Methodology Cards (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <AgiTerminal />
          </motion.div>

          {/* Right Column: Engineering Principles */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SpotlightCard className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 hover:border-purple-500/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    Structured Prompt Engineering
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Moving beyond basic chat prompts into few-shot system frameworks, role definitions, and deterministic constraints to extract reliable software architecture.
                </p>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SpotlightCard className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    Vibe Coding with Engineering Rigor
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Using AI agents as rapid pair-programmers to prototype fast, while maintaining clean Git commit histories, zero compilation errors, and strict accessibility.
                </p>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SpotlightCard className="glass-panel p-5 rounded-2xl border border-slate-200/80 dark:border-white/10 hover:border-emerald-500/30">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    Agentic Workflow Integration
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Deeply engaged with tools like Google Antigravity to decompose multi-faceted technical projects into structured, executable developer milestones.
                </p>
              </SpotlightCard>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
