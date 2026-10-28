import React from 'react';
import { X, Gamepad2, Smartphone, Monitor, CheckCircle2 } from 'lucide-react';

interface ControlsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ControlsModal: React.FC<ControlsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="glass-panel w-full max-w-xl rounded-2xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white font-mono tracking-wider">
              PILOT MANUAL &bull; CONTROLS
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-void-850 text-slate-400 hover:text-white border border-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Desktop Controls */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              <span>DESKTOP CONTROLS</span>
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-void-900 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">MOVE FORWARD / BACK:</span>
                <span className="px-2 py-0.5 rounded bg-void-850 border border-slate-700 text-emerald-300 font-bold">W / S or &uarr; &darr;</span>
              </div>
              <div className="p-3 rounded-xl bg-void-900 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">STRAFE LEFT / RIGHT:</span>
                <span className="px-2 py-0.5 rounded bg-void-850 border border-slate-700 text-emerald-300 font-bold">A / D or &larr; &rarr;</span>
              </div>
              <div className="p-3 rounded-xl bg-void-900 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">JUMP / BOOST:</span>
                <span className="px-2 py-0.5 rounded bg-void-850 border border-slate-700 text-cyan-300 font-bold">SPACE</span>
              </div>
              <div className="p-3 rounded-xl bg-void-900 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">INTERACT TERMINAL:</span>
                <span className="px-2 py-0.5 rounded bg-void-850 border border-emerald-500/40 text-emerald-400 font-bold">E / CLICK</span>
              </div>
              <div className="p-3 rounded-xl bg-void-900 border border-slate-800 flex items-center justify-between col-span-2">
                <span className="text-slate-400">CAMERA LOOK / ORBIT:</span>
                <span className="px-2 py-0.5 rounded bg-void-850 border border-slate-700 text-slate-300">MOUSE DRAG / MOVE</span>
              </div>
            </div>
          </div>

          {/* Mobile Controls */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              <span>MOBILE &amp; TABLET TOUCH CONTROLS</span>
            </h3>
            <div className="space-y-2 text-xs font-sans text-slate-300">
              <div className="flex items-start gap-2 p-3 rounded-xl bg-void-900 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong className="font-mono text-white">Virtual Joystick (Bottom Left):</strong> Drag with your thumb in any direction for smooth 360-degree analog navigation.</span>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-xl bg-void-900 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong className="font-mono text-white">Action Buttons (Bottom Right):</strong> Tap [E] to interact with any nearby station, and [JUMP] to hop over energy conduits.</span>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-xl bg-void-900 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong className="font-mono text-white">Minimap Fast-Travel:</strong> Tap any colored beacon on the top-right radar to instantly warp to that zone!</span>
              </div>
            </div>
          </div>

          {/* Recruiter Note */}
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center justify-between">
            <span>Prefer a standard portfolio without controls?</span>
            <span className="text-white font-bold underline">Click CLASSIC PORTFOLIO in the top bar</span>
          </div>
        </div>
      </div>
    </div>
  );
};
