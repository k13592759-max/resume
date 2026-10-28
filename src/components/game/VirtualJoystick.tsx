import React, { useRef, useCallback, useEffect } from 'react';
import { useGame } from '../../game/GameContext';

export const VirtualJoystick: React.FC = () => {
  const { showInteractPrompt } = useGame();
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const activeTouch = useRef<number | null>(null);
  const originRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const MAX_DIST = 36;

  const setJoy = (x: number, y: number) => {
    const fn = (window as unknown as Record<string, unknown>).__setJoy;
    if (typeof fn === 'function') (fn as (x: number, y: number) => void)(x, y);
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Only capture if touch is inside joystick zone (left 1/3 of screen)
    if (t.clientX > window.innerWidth / 2) return;
    activeTouch.current = t.identifier;
    originRef.current = { x: t.clientX, y: t.clientY };
    e.preventDefault();
  }, []);

  useEffect(() => {
    const onTouchMove = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        if (t.identifier !== activeTouch.current) continue;
        const dx = t.clientX - originRef.current.x;
        const dy = t.clientY - originRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const clampedDist = Math.min(dist, MAX_DIST);
        const angle = Math.atan2(dy, dx);
        const cx = Math.cos(angle) * clampedDist;
        const cy = Math.sin(angle) * clampedDist;
        if (thumbRef.current) {
          thumbRef.current.style.transform = `translate(${cx}px, ${cy}px)`;
        }
        setJoy(cx / MAX_DIST, cy / MAX_DIST);
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === activeTouch.current) {
          activeTouch.current = null;
          if (thumbRef.current) thumbRef.current.style.transform = 'translate(0,0)';
          setJoy(0, 0);
        }
      }
    };
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div className="sm:hidden absolute bottom-20 left-6 z-30 select-none">
      {/* Joystick base */}
      <div
        ref={containerRef}
        className="relative w-[88px] h-[88px] rounded-full border border-emerald-500/30 bg-black/40 backdrop-blur-sm flex items-center justify-center"
        onTouchStart={handleTouchStart}
      >
        <div
          ref={thumbRef}
          className="w-10 h-10 rounded-full bg-emerald-500/40 border border-emerald-500/60 transition-transform duration-[50ms]"
        />
      </div>

      {/* E interact button (mobile) */}
      {showInteractPrompt && (
        <button
          className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-emerald-500 text-black font-bold text-xs flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] active:scale-90 transition-transform"
          onTouchStart={(e) => {
            e.preventDefault();
            window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE' }));
          }}
        >
          E
        </button>
      )}
    </div>
  );
};
