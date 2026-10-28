import React from 'react';
import { useGame } from '../../game/GameContext';
import { ZONE_POSITIONS } from '../3d/ProceduralWorld';

const ZONE_LABELS: Record<string, string> = {
  origin: 'ORIGIN',
  projects: 'PROJECTS',
  skills: 'SKILLS',
  achievements: 'VAULT',
  contact: 'HUB',
};

const ZONE_COLORS: Record<string, string> = {
  origin: '#10b981',
  projects: '#3b82f6',
  skills: '#8b5cf6',
  achievements: '#f59e0b',
  contact: '#06b6d4',
};

const TOTAL_ZONES = 5;

interface GameHUDProps {
  onOpenTutorial: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({ onOpenTutorial }) => {
  const { discoveredZones, showInteractPrompt, interactTarget, setGameMode, playerPosition } = useGame();

  const discovered = discoveredZones.size;

  return (
    <>
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-start justify-between p-3 sm:p-4 pointer-events-none">
        {/* Title + zone progress */}
        <div className="glass-hud rounded-xl px-4 py-2.5 pointer-events-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-300 tracking-widest">DIGITAL UNIVERSE</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-slate-400">ZONES DISCOVERED</span>
            <div className="flex gap-1">
              {Object.keys(ZONE_POSITIONS).map((zone) => (
                <div
                  key={zone}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: discoveredZones.has(zone) ? ZONE_COLORS[zone] : '#1e293b',
                    boxShadow: discoveredZones.has(zone) ? `0 0 6px ${ZONE_COLORS[zone]}` : 'none',
                  }}
                  title={ZONE_LABELS[zone]}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono text-slate-500">{discovered}/{TOTAL_ZONES}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2 pointer-events-auto">
          <button
            onClick={onOpenTutorial}
            className="glass-hud rounded-lg px-3 py-2 text-[11px] font-mono text-slate-300 hover:text-white transition-colors"
          >
            ?
          </button>
          <button
            onClick={() => setGameMode('paused')}
            className="glass-hud rounded-lg px-3 py-2 text-[11px] font-mono text-slate-300 hover:text-white transition-colors"
          >
            ⏸
          </button>
          <button
            onClick={() => setGameMode('classic')}
            className="glass-hud rounded-lg px-3 py-2 text-[11px] font-mono text-slate-300 hover:text-white transition-colors hidden sm:block"
          >
            CLASSIC VIEW
          </button>
        </div>
      </div>

      {/* Minimap */}
      <Minimap playerPosition={playerPosition} discoveredZones={discoveredZones} />

      {/* Interaction prompt */}
      {showInteractPrompt && interactTarget && (
        <div className="absolute bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="glass-hud rounded-xl px-5 py-3 flex items-center gap-3 animate-fade-up">
            <kbd className="px-2 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
              E
            </kbd>
            <span className="text-sm font-mono text-slate-200">{interactTarget}</span>
          </div>
        </div>
      )}

      {/* Fast-travel panel */}
      <FastTravel />
    </>
  );
};

// ─────────────────────────────────────────────
// Minimap
// ─────────────────────────────────────────────
interface MinimapProps {
  playerPosition: { x: number; z: number };
  discoveredZones: Set<string>;
}

const Minimap: React.FC<MinimapProps> = ({ playerPosition, discoveredZones }) => {
  const MAP_SIZE = 90; // px
  const WORLD_SCALE = MAP_SIZE / 120; // world is ~±60 units

  const toMap = (worldX: number, worldZ: number) => ({
    x: MAP_SIZE / 2 + worldX * WORLD_SCALE,
    y: MAP_SIZE / 2 + worldZ * WORLD_SCALE,
  });

  return (
    <div
      className="absolute bottom-4 right-4 z-30 pointer-events-none"
      style={{ width: MAP_SIZE, height: MAP_SIZE }}
    >
      <div
        className="relative rounded-lg overflow-hidden border border-emerald-500/20 bg-black/60 backdrop-blur-sm"
        style={{ width: MAP_SIZE, height: MAP_SIZE }}
      >
        {/* Zones on map */}
        {Object.entries(ZONE_POSITIONS).map(([zone, pos]) => {
          const { x, y } = toMap(pos[0], pos[2]);
          const color = ZONE_COLORS[zone];
          const found = discoveredZones.has(zone);
          return (
            <div
              key={zone}
              className="absolute rounded-full transition-all duration-300"
              style={{
                left: x - 4,
                top: y - 4,
                width: 8,
                height: 8,
                background: found ? color : '#1e293b',
                boxShadow: found ? `0 0 6px ${color}` : 'none',
              }}
            />
          );
        })}
        {/* Player dot */}
        {(() => {
          const { x, y } = toMap(playerPosition.x, playerPosition.z);
          const clampX = Math.max(4, Math.min(MAP_SIZE - 4, x));
          const clampY = Math.max(4, Math.min(MAP_SIZE - 4, y));
          return (
            <div
              className="absolute rounded-full bg-white"
              style={{
                left: clampX - 3,
                top: clampY - 3,
                width: 6,
                height: 6,
                boxShadow: '0 0 6px white',
              }}
            />
          );
        })()}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Fast Travel
// ─────────────────────────────────────────────
const FastTravel: React.FC = () => {
  const { openModal } = useGame();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="absolute bottom-4 left-4 z-30">
      <button
        onClick={() => setOpen((v) => !v)}
        className="glass-hud rounded-lg px-3 py-2 text-[11px] font-mono text-slate-300 hover:text-white transition-colors flex items-center gap-2"
      >
        <span>⬡</span>
        <span>FAST TRAVEL</span>
      </button>

      {open && (
        <div className="absolute bottom-10 left-0 glass-hud rounded-xl p-3 min-w-[160px] space-y-1">
          {Object.entries(ZONE_LABELS).map(([zone, label]) => (
            <button
              key={zone}
              onClick={() => { openModal(zone as 'project' | 'skills' | 'achievements' | 'contact' | 'origin'); setOpen(false); }}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: ZONE_COLORS[zone] }} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
