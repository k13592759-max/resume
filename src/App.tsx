import React, { useState, lazy, Suspense, useEffect } from 'react';
import { GameProvider, useGame } from './game/GameContext';
import { StartScreen } from './components/game/StartScreen';
import { GameHUD } from './components/game/GameHUD';
import { GameModalRouter } from './components/game/GameModalRouter';
import { PauseMenu } from './components/game/PauseMenu';
import { ControlsModal } from './components/game/ControlsModal';
import { ClassicPortfolioView } from './components/game/ClassicPortfolioView';
import { WebGLFallback } from './components/3d/WebGLFallback';
import { VirtualJoystick } from './components/game/VirtualJoystick';

// Lazy load 3D canvas
const GameCanvas = lazy(() => import('./components/game/GameCanvas'));

// ─────────────────────────────────────────────
// WebGL Detection
// ─────────────────────────────────────────────
function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!ctx;
  } catch {
    return false;
  }
}

// ─────────────────────────────────────────────
// Inner game app (has access to context)
// ─────────────────────────────────────────────
const GameApp: React.FC = () => {
  const { gameMode, setGameMode } = useGame();
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [webglAvailable] = useState(() => detectWebGL());

  // Escape key → pause
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        if (gameMode === 'playing') setGameMode('paused');
        else if (gameMode === 'paused') setGameMode('playing');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gameMode, setGameMode]);

  // WebGL unavailable — go to classic immediately
  useEffect(() => {
    if (!webglAvailable) setGameMode('classic');
  }, [webglAvailable, setGameMode]);

  // Classic portfolio
  if (gameMode === 'classic') {
    return <ClassicPortfolioView />;
  }

  // Start screen
  if (gameMode === 'intro' || gameMode === 'start') {
    return (
      <>
        <StartScreen onOpenTutorial={() => setTutorialOpen(true)} />
        <ControlsModal isOpen={tutorialOpen} onClose={() => setTutorialOpen(false)} />
      </>
    );
  }

  // Playing or paused — render game
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#030708] select-none touch-none">
      {/* 3D Canvas */}
      <Suspense fallback={<WebGLFallback />}>
        <div className="absolute inset-0">
          <GameCanvas />
        </div>
      </Suspense>

      {/* HUD overlay */}
      {gameMode === 'playing' && (
        <GameHUD onOpenTutorial={() => setTutorialOpen(true)} />
      )}

      {/* Mobile joystick */}
      {gameMode === 'playing' && <VirtualJoystick />}

      {/* Zone modals */}
      <GameModalRouter />

      {/* Pause menu */}
      <PauseMenu />

      {/* Controls help */}
      <ControlsModal isOpen={tutorialOpen} onClose={() => setTutorialOpen(false)} />
    </div>
  );
};

// ─────────────────────────────────────────────
// Root export
// ─────────────────────────────────────────────
export const App: React.FC = () => (
  <GameProvider>
    <GameApp />
  </GameProvider>
);

export default App;
