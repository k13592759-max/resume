import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { SpotlightCard } from './SpotlightCard';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Cpu, 
  Binary, 
  Layers, 
  GitBranch, 
  ArrowRight, 
  Flame 
} from 'lucide-react';

export const CurrentlyLearning: React.FC = () => {
  const { learningRoadmap } = PORTFOLIO_DATA;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-sky-400" />;
      case 'Binary':
        return <Binary className="w-5 h-5 text-indigo-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-purple-400" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 text-emerald-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-slate-900/[0.02] dark:bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono mb-3">
            <Flame className="w-3.5 h-3.5" />
            <span>05 // GROWTH ROADMAP</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Currently Learning & <span className="text-gradient">Expanding.</span>
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Transparently sharing my technical trajectory. These represent active learning objectives, deliberate study goals, and experiments in progress.
          </p>
        </motion.div>

        {/* Learning Cards Grid with Spotlight and Hover Spring */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningRoadmap.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <SpotlightCard className="glass-panel rounded-2xl p-6 flex flex-col justify-between h-full border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/40 transition-shadow duration-300 relative group">
                <div>
                  
                  {/* Step Index Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {getIcon(item.icon)}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      GOAL 0{index + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>

                  {/* Focus Scope */}
                  <p className="text-xs text-indigo-600 dark:text-sky-300 font-medium mb-3">
                    {item.focus}
                  </p>

                  {/* Objective */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {item.currentObjective}
                  </p>

                </div>

                {/* Status pill */}
                <div className="pt-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-amber-500 dark:text-amber-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Active Study
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>

              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
