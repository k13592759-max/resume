import React from 'react';

interface ControlsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ControlsModal: React.FC<ControlsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="glass-hud rounded-2xl w-full max-w-md border border-emerald-500/20 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">How to Play</span>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl">×</button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Desktop Controls</p>
            <div className="space-y-2 text-sm">
              <ControlRow keys={['W', 'A', 'S', 'D']} action="Move" />
              <ControlRow keys={['↑', '↓', '←', '→']} action="Move (arrow keys)" />
              <ControlRow keys={['Mouse drag']} action="Rotate camera" />
              <ControlRow keys={['E']} action="Interact with zone" />
              <ControlRow keys={['ESC']} action="Pause menu" />
            </div>
          </div>
          <div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Mobile Controls</p>
            <div className="space-y-2 text-sm">
              <ControlRow keys={['Joystick']} action="Move" />
              <ControlRow keys={['Drag right side']} action="Rotate camera" />
              <ControlRow keys={['E button']} action="Interact" />
            </div>
          </div>
          <div className="pt-2 p-3 rounded-lg bg-emerald-500/8 border border-emerald-500/20 text-xs text-emerald-300 font-mono leading-relaxed">
            Walk up to any glowing zone structure and press <strong>E</strong> to discover its content. Use Fast Travel (bottom-left) to jump between zones instantly.
          </div>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all active:scale-95"
          >
            LET'S EXPLORE
          </button>
        </div>
      </div>
    </div>
  );
};

const ControlRow: React.FC<{ keys: string[]; action: string }> = ({ keys, action }) => (
  <div className="flex items-center justify-between">
    <span className="text-slate-400">{action}</span>
    <div className="flex gap-1">
      {keys.map((k) => (
        <kbd key={k} className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono">{k}</kbd>
      ))}
    </div>
  </div>
);
