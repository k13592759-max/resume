import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ProceduralWorld } from './ProceduralWorld';
import { CameraController } from './CameraController';
import { WebGLFallback } from './WebGLFallback';

interface Scene3DProps {
  scrollProgress: number; // 0.0 -> 1.0
}

export const Scene3D: React.FC<Scene3DProps> = ({ scrollProgress }) => {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // WebGL & Environment checks
  useEffect(() => {
    // 1. WebGL Support Test
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') || canvas.getContext('webgl2');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }

    // 2. Mobile Detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // 3. Reduced Motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    // 4. Mouse movement tracking for 3D parallax
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1]
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x: nx, y: ny });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!hasWebGL) {
    return <WebGLFallback />;
  }

  // Cap DPR for battery and performance efficiency (1.0 on mobile, 1.5 max on desktop)
  const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030708]"
      aria-hidden="true"
    >
      <Suspense fallback={<WebGLFallback />}>
        <Canvas
          camera={{ position: [0, 0, 6.2], fov: isMobile ? 65 : 55, near: 0.1, far: 80 }}
          dpr={dpr}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <CameraController
            scrollProgress={scrollProgress}
            mousePosition={mousePos}
            reducedMotion={reducedMotion}
          />

          <ProceduralWorld
            scrollProgress={scrollProgress}
            isMobile={isMobile}
          />
        </Canvas>
      </Suspense>

      {/* Subtle Vignette & Gradient Overlays for Cinematic Tone */}
      <div 
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#030708]/60 via-transparent to-[#030708]/80"
        aria-hidden="true" 
      />
      <div 
        className="absolute inset-0 pointer-events-none [background:radial-gradient(ellipse_at_center,transparent_40%,#030708_95%)]"
        aria-hidden="true" 
      />
    </div>
  );
};

export default Scene3D;
