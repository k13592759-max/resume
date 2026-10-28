import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { FollowCamera } from './FollowCamera';
import { PlayerAvatar } from './PlayerAvatar';
import { CyberIsland } from './CyberIsland';
import { WebGLFallback } from '../3d/WebGLFallback';

export const GameCanvas: React.FC = () => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl') || c.getContext('webgl2');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || ('ontouchstart' in window));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!hasWebGL) {
    return <WebGLFallback />;
  }

  const dpr = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5);

  return (
    <div className="fixed inset-0 z-0 bg-[#030708] overflow-hidden select-none">
      <Suspense fallback={<WebGLFallback />}>
        <Canvas
          camera={{ position: [0, 4.5, 9], fov: isMobile ? 65 : 55, near: 0.1, far: 120 }}
          dpr={dpr}
          gl={{
            antialias: !isMobile,
            alpha: false,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <FollowCamera />
          <PlayerAvatar />
          <CyberIsland />
        </Canvas>
      </Suspense>

      {/* Atmospheric Vignette Overlay */}
      <div
        className="absolute inset-0 pointer-events-none [background:radial-gradient(ellipse_at_center,transparent_50%,#030708_98%)] opacity-85"
        aria-hidden="true"
      />
    </div>
  );
};

export default GameCanvas;
