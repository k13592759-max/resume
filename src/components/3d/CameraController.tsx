import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraControllerProps {
  scrollProgress: number; // Normalized scroll progress 0.0 -> 1.0
  mousePosition: { x: number; y: number }; // Normalized -1.0 -> 1.0
  reducedMotion: boolean;
}

interface Waypoint {
  t: number;
  pos: [number, number, number];
  target: [number, number, number];
}

// 7 Camera Waypoints calibrated to the 7 content chapters
const WAYPOINTS: Waypoint[] = [
  // 0: Hero — Centered on Singularity Crystalline Core
  { t: 0.0, pos: [0, 0, 6.2], target: [0, 0, 0] },
  // 1: About — Glide Left to Neural Monoliths
  { t: 0.16, pos: [-2.8, 0.8, 5.0], target: [-2.0, 0.6, -1.0] },
  // 2: Selected Work — Arc Right to the Nexus Gateways
  { t: 0.36, pos: [2.6, -0.4, 4.8], target: [2.0, -0.3, -1.0] },
  // 3: Skills — Lower Left to Knowledge Matrix
  { t: 0.55, pos: [-2.4, -1.4, 4.6], target: [-1.6, -1.2, -1.0] },
  // 4: Achievements — Elevate Right to Beacon Spire
  { t: 0.72, pos: [2.2, 1.2, 5.2], target: [1.6, 1.0, -1.2] },
  // 5: Journey — Symmetrical descent over the Chrono Arc
  { t: 0.87, pos: [0, 1.4, 5.6], target: [0, 0.3, -1.5] },
  // 6: Contact — High celestial vista surveying the entire realm
  { t: 1.0, pos: [0, 2.8, 7.2], target: [0, -0.2, -2.5] },
];

export const CameraController: React.FC<CameraControllerProps> = ({
  scrollProgress,
  mousePosition,
  reducedMotion,
}) => {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const desiredPos = useRef(new THREE.Vector3(0, 0, 6.2));
  const desiredTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    // 1. Clamp progress between 0 and 1
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

    // 2. Find surrounding waypoints for smooth interpolation
    let startIndex = 0;
    for (let i = 0; i < WAYPOINTS.length - 1; i++) {
      if (clampedProgress >= WAYPOINTS[i].t && clampedProgress <= WAYPOINTS[i + 1].t) {
        startIndex = i;
        break;
      }
    }
    const p1 = WAYPOINTS[startIndex];
    const p2 = WAYPOINTS[Math.min(startIndex + 1, WAYPOINTS.length - 1)];

    // Range progress segment
    const segmentSpan = p2.t - p1.t;
    const localT = segmentSpan === 0 ? 0 : (clampedProgress - p1.t) / segmentSpan;
    // Smoothstep easing for waypoints transition
    const easeT = localT * localT * (3 - 2 * localT);

    // 3. Interpolate Base Position
    const baseX = THREE.MathUtils.lerp(p1.pos[0], p2.pos[0], easeT);
    const baseY = THREE.MathUtils.lerp(p1.pos[1], p2.pos[1], easeT);
    const baseZ = THREE.MathUtils.lerp(p1.pos[2], p2.pos[2], easeT);

    // 4. Mouse Parallax (Gentle offset based on cursor, disabled if reduced-motion)
    const parallaxX = reducedMotion ? 0 : mousePosition.x * 0.45;
    const parallaxY = reducedMotion ? 0 : -mousePosition.y * 0.35;

    desiredPos.current.set(baseX + parallaxX, baseY + parallaxY, baseZ);

    // 5. Interpolate Target LookAt
    const targetX = THREE.MathUtils.lerp(p1.target[0], p2.target[0], easeT);
    const targetY = THREE.MathUtils.lerp(p1.target[1], p2.target[1], easeT);
    const targetZ = THREE.MathUtils.lerp(p1.target[2], p2.target[2], easeT);
    desiredTarget.current.set(targetX, targetY, targetZ);

    // 6. Smooth Damping to Camera
    // Using exponential lerp for organic, buttery inertia
    const damping = Math.min(1, delta * 3.2);
    camera.position.lerp(desiredPos.current, damping);
    currentTarget.current.lerp(desiredTarget.current, damping);

    camera.lookAt(currentTarget.current);
  });

  return null;
};
