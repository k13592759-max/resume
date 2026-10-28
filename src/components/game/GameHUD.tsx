import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Compass, Layers, ChevronRight, HelpCircle } from 'lucide-react';
import { useGame, ZONES } from '../../game/GameContext';

export const GameHUD: React.FC<{ onOpenTutorial: () => void }> = ({ onOpenTutorial }) => {
  const {
    playerPosition,
    playerRotation,
    nearbyInteractable,
    discoveredZones,
    soundEnabled,
    toggleSound,
    teleportTo,
    setGameMode,
    triggerJump,
    setJoystickVector
  } = useGame();

  const [isMobile, setIsMobile] = useState(false);
  const joystickBaseRef = useRef<HTMLDivElement>(null);
  const [joystickTouchId, setJoystickTouchId] = useState<number | null>(null);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || ('ontouchstart' in window));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile Touch Joystick Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (joystickTouchId !== null) return;
    const touch = e.changedTouches[0];
    setJoystickTouchId(touch.identifier);
    updateKnob(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (joystickTouchId === null) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === joystickTouchId) {
        updateKnob(e.changedTouches[i].clientX, e.changedTouches[i].clientY);
        break;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (joystickTouchId === null) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === joystickTouchId) {
        setJoystickTouchId(null);
        setKnobPos({ x: 0, y: 0 });
        setJoystickVector({ x: 0, y: 0 });
        break;
      }
    }
  };

  const updateKnob = (touchX: number, touchY: number) => {
    if (!joystickBaseRef.current) return;
    const rect = joystickBaseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxRadius = rect.width / 2;

    const dx = touchX - centerX;
    const dy = touchY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= maxRadius) {
      setKnobPos({ x: dx, y: dy });
      setJoystickVector({ x: dx / maxRadius, y: dy / maxRadius });
    } else {
      const angle = Math.atan2(dy, dx);
      const clampedX = Math.cos(angle) * maxRadius;
      const clampedY = Math.sin(angle) * maxRadius;
      setKnobPos({ x: clampedX, y: clampedY });
      setJoystickVector({ x: clampedX / maxRadius, y: clampedY / maxRadius });
    }
  };

  // Convert 3D world coordinates to 2D Minimap coordinates
  // Map radius is ~44 world units mapped to 60px radius
  const radarScale = 60 / 44;
  const playerMapX = 70 + playerPosition[0] * radarScale;
  const playerMapY = 70 + playerPosition[2] * radarScale;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden">
      {/* ======================================================== */}
      {/* TOP COMMAND BAR                                          */}
      {/* ======================================================== */}
      <div className="pointer-events-auto flex items-center justify-between p-3 sm:p-5">
        {/* Left: Brand & Discovery Progress */}
        <div className="flex items-center gap-3">
          <div className="glass-panel px-3.5 py-2 rounded-2xl flex items-center gap-2.5 border border-emerald-500/30">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <span className="block text-[11px] font-mono font-bold text-white tracking-wider">
                KRISHNA: DIGITAL UNIVERSE
              </span>
              <span className="block text-[9px] font-mono text-emerald-400">
                SECTORS DISCOVERED: {discoveredZones.length}/5
              </span>
            </div>
          </div>
        </div>

        {/* Center: Fast-Travel Jump Pills (Desktop & Tablet) */}
        <div className="hidden md:flex items-center gap-1.5 glass-panel px-3 py-1.5 rounded-full border border-emerald-500/20">
          <span className="text-[10px] font-mono text-slate-500 mr-1 flex items-center gap-1">
            <Compass className="w-3 h-3 text-emerald-400" />
            WARP:
          </span>
          {Object.values(ZONES).map((z) => {
            const isDiscovered = discoveredZones.includes(z.id);
            return (
              <button
                key={z.id}
                onClick={() => teleportTo(z.position, z.id)}
                type="button"
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-all cursor-pointer ${
                  isDiscovered
                    ? 'hover:text-emerald-300 hover:bg-emerald-500/15 text-slate-300'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
                title={`Teleport to ${z.name}`}
              >
                {z.name}
              </button>
            );
          })}
        </div>

        {/* Right: Actions, Sound, Classic Portfolio Toggle, Pause */}
        <div className="flex items-center gap-2">
          {/* Classic Portfolio Button (Important: Escape hatch for recruiters) */}
          <button
            onClick={() => setGameMode('classic')}
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 shadow-sm transition-all cursor-pointer"
            title="Switch to Conventional Portfolio View"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>CLASSIC PORTFOLIO</span>
          </button>

          {/* Tutorial Help Button */}
          <button
            onClick={onOpenTutorial}
            type="button"
            className="p-2 rounded-xl glass-panel text-slate-400 hover:text-white border border-slate-700 cursor-pointer"
            title="Controls & Instructions"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            type="button"
            className={`p-2 rounded-xl transition-all border cursor-pointer ${
              soundEnabled
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'glass-panel text-slate-400 border-slate-700'
            }`}
            title={soundEnabled ? 'Mute Audio' : 'Play Ambient Audio'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Pause Button */}
          <button
            onClick={() => setGameMode('paused')}
            type="button"
            className="p-2 rounded-xl glass-panel text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
            title="Pause Menu [ESC]"
          >
            <Pause className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TACTICAL MINIMAP RADAR (Top Right)                       */}
      {/* ======================================================== */}
      <div className="hidden sm:block absolute top-20 right-5 pointer-events-auto">
        <div className="w-[140px] h-[140px] rounded-full glass-panel border border-emerald-500/30 relative overflow-hidden shadow-2xl p-0.5">
          {/* Radar Scanner Sweep */}
          <div className="absolute inset-0 rounded-full animate-spin-very-slow pointer-events-none opacity-30 bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(16,185,129,0.5)_360deg)]" />

          {/* Grid Concentric Rings */}
          <div className="absolute inset-3 rounded-full border border-emerald-500/20 pointer-events-none" />
          <div className="absolute inset-8 rounded-full border border-emerald-500/15 pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-px bg-emerald-500/10" />
            <div className="h-full w-px bg-emerald-500/10 absolute" />
          </div>

          {/* Zone Destination Blips */}
          {Object.values(ZONES).map((z) => {
            const bx = 70 + z.position[0] * radarScale;
            const by = 70 + z.position[2] * radarScale;
            return (
              <div
                key={z.id}
                onClick={() => teleportTo(z.position, z.id)}
                className="absolute w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer hover:scale-150 transition-transform"
                style={{
                  left: `${bx}px`,
                  top: `${by}px`,
                  backgroundColor: z.color,
                  boxShadow: `0 0 8px ${z.color}`
                }}
                title={`Warp to ${z.name}`}
              />
            );
          })}

          {/* Player Indicator Dot & Heading Arrow */}
          <div
            className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border border-emerald-400 z-10 shadow-[0_0_8px_#FFFFFF]"
            style={{
              left: `${Math.max(10, Math.min(130, playerMapX))}px`,
              top: `${Math.max(10, Math.min(130, playerMapY))}px`,
              transform: `translate(-50%, -50%) rotate(${playerRotation}rad)`
            }}
          >
            {/* Arrow pointer */}
            <div className="w-0.5 h-2 bg-emerald-300 absolute -top-1.5 left-1/2 -translate-x-1/2" />
          </div>
        </div>

        <div className="text-[9px] font-mono text-center text-slate-400 mt-1">
          TACTICAL RADAR
        </div>
      </div>

      {/* ======================================================== */}
      {/* INTERACTIVE HUD PROMPT BANNER (Center Bottom)            */}
      {/* ======================================================== */}
      {nearbyInteractable && (
        <div className="pointer-events-auto absolute bottom-24 sm:bottom-12 left-1/2 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <button
            onClick={nearbyInteractable.onInteract}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-void-950/90 hover:bg-void-900 border-2 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all transform hover:scale-105 cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 font-mono font-bold text-xs">
              E
            </div>
            <div>
              <span className="block text-xs font-mono font-bold text-white tracking-wide">
                {nearbyInteractable.prompt}
              </span>
              <span className="block text-[10px] font-mono text-emerald-400">
                [PRESS E OR CLICK TO OPEN TERMINAL]
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* MOBILE TOUCH CONTROLS (Joystick Left + Action Buttons)   */}
      {/* ======================================================== */}
      {isMobile && (
        <div className="pointer-events-auto lg:hidden">
          {/* Virtual Joystick (Bottom Left) */}
          <div
            ref={joystickBaseRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            className="absolute bottom-8 left-8 w-28 h-28 rounded-full bg-void-950/60 border border-emerald-500/30 backdrop-blur-md flex items-center justify-center touch-none shadow-2xl"
          >
            {/* Joystick Knob */}
            <div
              className="w-12 h-12 rounded-full bg-emerald-500/40 border border-emerald-400 shadow-[0_0_12px_#10B981] transition-transform pointer-events-none"
              style={{
                transform: `translate(${knobPos.x}px, ${knobPos.y}px)`
              }}
            />
          </div>

          {/* Action Buttons (Bottom Right) */}
          <div className="absolute bottom-8 right-8 flex flex-col gap-3">
            {/* Interact Button */}
            <button
              onClick={() => {
                if (nearbyInteractable) nearbyInteractable.onInteract();
              }}
              className={`w-14 h-14 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all shadow-xl cursor-pointer ${
                nearbyInteractable
                  ? 'bg-emerald-500 text-void-950 shadow-[0_0_20px_#10B981] animate-bounce'
                  : 'bg-void-900/80 border border-slate-700 text-slate-500'
              }`}
            >
              [E]
            </button>

            {/* Jump Button */}
            <button
              onClick={triggerJump}
              className="w-14 h-14 rounded-full bg-void-900/90 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-mono font-bold text-[11px] shadow-xl cursor-pointer active:scale-95"
            >
              JUMP
            </button>
          </div>
        </div>
      )}

      {/* Desktop Controls Hint (Bottom Left) */}
      <div className="hidden lg:flex absolute bottom-5 left-5 pointer-events-none items-center gap-2 text-[10px] font-mono text-slate-500 glass-panel px-3 py-1.5 rounded-xl border border-slate-800">
        <span className="text-emerald-400">[WASD]</span> MOVE &bull;
        <span className="text-emerald-400">[SPACE]</span> JUMP &bull;
        <span className="text-emerald-400">[E]</span> INTERACT &bull;
        <span className="text-emerald-400">[ESC]</span> PAUSE
      </div>
    </div>
  );
};
