import React from 'react';
import { motion } from 'framer-motion';

export const FloatingOrbs: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Orb 1 - Sky / Cyan */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 -left-20 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-sky-500/10 to-indigo-500/10 blur-[130px]"
      />

      {/* Orb 2 - Violet / Purple */}
      <motion.div
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 70, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 -right-20 w-[450px] h-[450px] rounded-full bg-gradient-to-bl from-purple-500/10 via-indigo-600/10 to-transparent blur-[140px]"
      />

      {/* Orb 3 - Emerald / Teal accent */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 40, -60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 left-1/3 w-[360px] h-[360px] rounded-full bg-gradient-to-tr from-teal-500/5 via-sky-500/5 to-indigo-500/5 blur-[120px]"
      />
    </div>
  );
};
