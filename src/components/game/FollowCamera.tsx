import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGame } from '../../game/GameContext';

export const FollowCamera: React.FC = () => {
  const { playerPosition, isMoving, gameMode } = useGame();
  const { camera } = useThree();

  const cameraOffset = useRef(new THREE.Vector3(0, 3.6, 7.8));
  const currentTarget = useRef(new THREE.Vector3(0, 1.2, 0));
  const mouseLook = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gameMode !== 'playing') return;
      // Normalized offset -1 to 1
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseLook.current.x = nx * 1.5;
      mouseLook.current.y = -ny * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [gameMode]);

  useFrame((_, delta) => {
    const px = playerPosition[0];
    const py = playerPosition[1];
    const pz = playerPosition[2];

    // Compute target position for camera
    const desiredX = px + cameraOffset.current.x + mouseLook.current.x * 0.5;
    const desiredY = py + cameraOffset.current.y + mouseLook.current.y * 0.5;
    const desiredZ = pz + cameraOffset.current.z;

    // Faster damping during movement, slower when stationary for cinematic float
    const followSpeed = isMoving ? 5.5 : 4.0;
    const damping = Math.min(1, delta * followSpeed);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, desiredX, damping);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, desiredY, damping);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, desiredZ, damping);

    // Look at player center with slight forward offset
    const targetLookAtX = px + mouseLook.current.x * 0.4;
    const targetLookAtY = py + 0.6 + mouseLook.current.y * 0.3;
    const targetLookAtZ = pz;

    currentTarget.current.x = THREE.MathUtils.lerp(currentTarget.current.x, targetLookAtX, damping * 1.2);
    currentTarget.current.y = THREE.MathUtils.lerp(currentTarget.current.y, targetLookAtY, damping * 1.2);
    currentTarget.current.z = THREE.MathUtils.lerp(currentTarget.current.z, targetLookAtZ, damping * 1.2);

    camera.lookAt(currentTarget.current);
  });

  return null;
};
