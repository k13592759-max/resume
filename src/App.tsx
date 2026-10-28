import React, { useState, lazy, Suspense } from 'react';
import { GameProvider, useGame } from './game/GameContext';
import { StartScreen } from './components/game/StartScreen';
import { GameHUD } from './components/game/GameHUD';
import { GameModals } from './components/game/modals/GameModals';
import { PauseMenu } from './components/game/PauseMenu';
import { ControlsModal } from './components/game/ControlsModal';
import { ClassicPortfolioView } from './components/game/ClassicPortfolioView';
import { WebGLFallback } from './components/3d/WebGLFallback';

// Lazy load the 3D Game Canvas for fast initial mount
const GameCanvas = lazy(() => import('./components/game/GameCanvas'));

const GameApp: React.FC = () => {
  const { gameMode } = useGame();
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  // If user requested traditional recruiter overview
  if (gameMode === 'classic') {
    return <ClassicPortfolioView />;
  }

  // If on Start Screen or Cinematic Intro
  if (gameMode === 'intro' || gameMode === 'start') {
    return (
      <>
        <StartScreen onOpenTutorial={() => setIsTutorialOpen(true)} />
        <ControlsModal
          isOpen={isTutorialOpen}
          onClose={() => setIsTutorialOpen(false)}
        />
      </>
    );
  }

  // Active Playable Game Mode ('playing' or 'paused')
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#030708] select-none">
      {/* 1. Playable 3D Video Game Canvas */}
      <Suspense fallback={<WebGLFallback />}>
        <GameCanvas />
      </Suspense>

      {/* 2. Interactive Gaming HUD (Minimap, Joystick, Prompts, Fast-Travel) */}
      <GameHUD onOpenTutorial={() => setIsTutorialOpen(true)} />

      {/* 3. In-Game Interactive Terminal Modals */}
      <GameModals />

      {/* 4. Pause Menu */}
      <PauseMenu onOpenTutorial={() => setIsTutorialOpen(true)} />

      {/* 5. Controls & How to Play Tutorial Modal */}
      <ControlsModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <GameProvider>
      <GameApp />
    </GameProvider>
  );
};

export default App;
