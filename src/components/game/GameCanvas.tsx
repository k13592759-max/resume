import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ProceduralWorld } from '../3d/ProceduralWorld';
import { PlayerController } from '../3d/PlayerController';

const GameCanvas: React.FC = () => {
  return (
    <Canvas
      camera={{ fov: 65, near: 0.1, far: 500 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'default',
      }}
      dpr={Math.min(window.devicePixelRatio, 1.5)}
      shadows={false}
      className="w-full h-full"
      style={{ background: '#030708' }}
    >
      {/* Fog for atmosphere */}
      <fog attach="fog" args={['#030708', 60, 180]} />

      {/* World */}
      <ProceduralWorld />

      {/* Player + camera */}
      <PlayerController />
    </Canvas>
  );
};

export default GameCanvas;
