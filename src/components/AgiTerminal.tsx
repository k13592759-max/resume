import React, { useState } from 'react';
import { Terminal, Play, Sparkles, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export const AgiTerminal: React.FC = () => {
  const [activePreset, setActivePreset] = useState<string>('agentic_loop');
  const [copied, setCopied] = useState(false);

  const presets: Record<string, { title: string; output: string[] }> = {
    agentic_loop: {
      title: 'run_agentic_loop --task="build_ui" --engine="gemini-3.8-flash"',
      output: [
        '› [SYSTEM] Initializing Agentic Developer Loop v2.4...',
        '› [ORCHESTRATOR] Subagent "FrontendEngineer" initialized with React 19 & TypeScript.',
        '› [SYNAPSE] Context window: 128k tokens | Temperature: 0.2 (deterministic mode)',
        '› [PROMPT_FLOW] Evaluating architectural constraints: Accessible, Tailwind v3, Zero backend bloat.',
        '› [EXECUTION] Components generated: AgiHologramCore, SpotlightCard, ResumeModal.',
        '› [VALIDATION] TypeScript verification: 0 errors. Build time: 1.80s.',
        '✔ [STATUS] Pipeline concluded successfully with 100% test integrity.',
      ],
    },
    prompt_pipeline: {
      title: 'evaluate_prompt --strategy="structured_chain_of_thought"',
      output: [
        '› [INPUT] System prompt with strict role identity and boundary guards.',
        '› [REASONING] Applying few-shot patterns for civic tech information architecture.',
        '› [VERIFICATION] Checking output against candidate project specs: EcoMind, VotePath.',
        '› [SANITY_CHECK] Refusing to fabricate unverified certifications or awards.',
        '✔ [CONFIDENCE] 0.985 semantic alignment with user portfolio requirements.',
      ],
    },
    vibe_coding_eval: {
      title: 'vibe_code --focus="speed_with_rigor"',
      output: [
        '› [PHILOSOPHY] Rapid prototyping powered by modern LLMs and agentic assistants.',
        '› [TOOLCHAIN] Antigravity + VS Code + Git version control hygiene.',
        '› [EXECUTION] Turning conceptual ideas into deployed, responsive web interfaces.',
        '› [LEARNING_LOOP] Iterate fast, inspect bundle sizes, document cleanly in README.',
        '✔ [RESULT] Modern high-performance developer portfolio ready for production.',
      ],
    },
  };

  const current = presets[activePreset];

  const handleCopy = () => {
    navigator.clipboard.writeText(current.output.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 shadow-2xl relative overflow-hidden bg-black/60 backdrop-blur-xl">
      
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 ml-2">
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span>krishna@antigravity:~/agi-studio</span>
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 transition-colors"
          title="Copy terminal output"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Preset Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {Object.keys(presets).map((key) => (
          <button
            key={key}
            onClick={() => setActivePreset(key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              activePreset === key
                ? 'bg-indigo-600/80 text-white border border-indigo-400/50 shadow-md shadow-indigo-500/20'
                : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5 hover:border-white/15'
            }`}
          >
            <Play className={`w-3 h-3 ${activePreset === key ? 'text-white' : 'text-slate-400'}`} />
            <span>{key}</span>
          </button>
        ))}
      </div>

      {/* Terminal Command Line */}
      <div className="p-3 rounded-xl bg-black/70 border border-white/10 mb-4 font-mono text-xs text-sky-400 flex items-center gap-2">
        <span className="text-emerald-400 font-bold">$</span>
        <span>{current.title}</span>
      </div>

      {/* Terminal Output Stream */}
      <div className="space-y-2 font-mono text-xs sm:text-sm text-slate-300 min-h-[140px]">
        {current.output.map((line, idx) => (
          <motion.div
            key={`${activePreset}-${idx}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: idx * 0.06 }}
            className={`flex items-start gap-2 ${
              line.startsWith('✔')
                ? 'text-emerald-400 font-semibold'
                : line.startsWith('› [ORCHESTRATOR]')
                ? 'text-purple-400'
                : line.startsWith('› [SYNAPSE]')
                ? 'text-sky-400'
                : 'text-slate-300'
            }`}
          >
            <span>{line}</span>
          </motion.div>
        ))}
      </div>

      {/* Terminal Footer Telemetry */}
      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-sky-400" />
          <span>REAL-TIME AGENTIC PIPELINE</span>
        </span>
        <span>LATENCY: 14ms • BUFFER: OK</span>
      </div>

    </div>
  );
};
