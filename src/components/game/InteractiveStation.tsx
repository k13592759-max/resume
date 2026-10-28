import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGame } from '../../game/GameContext';

interface InteractiveStationProps {
  id: string;
  title: string;
  subtitle: string;
  prompt: string;
  position: [number, number, number];
  color: string;
  onInteract: () => void;
}

export const InteractiveStation: React.FC<InteractiveStationProps> = ({
  id,
  title,
  subtitle: _subtitle,
  prompt,
  position,
  color,
  onInteract
}) => {
  const { playerPosition, setNearbyInteractable, nearbyInteractable } = useGame();
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const beaconRef = useRef<THREE.Mesh>(null);
  const isNearbyRef = useRef(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate holographic ring and pulse core
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.8;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 1.5) * 0.15;
    }
    if (coreRef.current) {
      coreRef.current.position.y = 1.3 + Math.sin(time * 2.0) * 0.12;
      coreRef.current.rotation.y = time * 0.6;
    }
    if (beaconRef.current) {
      beaconRef.current.rotation.y = -time * 0.4;
      beaconRef.current.position.y = 2.4 + Math.sin(time * 1.8) * 0.15;
    }

    // Distance check to player
    const dx = playerPosition[0] - position[0];
    const dz = playerPosition[2] - position[2];
    const dist = Math.sqrt(dx * dx + dz * dz);

    const isClose = dist < 4.5;
    if (isClose !== isNearbyRef.current) {
      isNearbyRef.current = isClose;
      if (isClose) {
        setNearbyInteractable({
          id,
          title,
          prompt,
          onInteract
        });
      } else if (nearbyInteractable?.id === id) {
        setNearbyInteractable(null);
      }
    }
  });

  return (
    <group position={position}>
      {/* Base Pedestal */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[1.2, 1.5, 0.8, 8]} />
        <meshStandardMaterial
          color="#060C0F"
          roughness={0.2}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Floating Hologram Ring */}
      <mesh ref={ringRef} position={[0, 1.3, 0]}>
        <torusGeometry args={[0.9, 0.025, 16, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.8}
        />
      </mesh>

      {/* Floating Interactive Core */}
      <mesh
        ref={coreRef}
        position={[0, 1.3, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onInteract();
        }}
      >
        <octahedronGeometry args={[0.38, 0]} />
        <meshStandardMaterial
          color="#041217"
          emissive={color}
          emissiveIntensity={1.4}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Floating Beacon Diamond Indicator (Pure 3D, zero DOM overhead) */}
      <mesh
        ref={beaconRef}
        position={[0, 2.4, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onInteract();
        }}
      >
        <dodecahedronGeometry args={[0.26, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.0}
          wireframe={true}
        />
      </mesh>

      {/* Vertical Ethereal Light Column */}
      <mesh position={[0, 2.0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 2.5, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.65} />
      </mesh>

      {/* Ground Projection Light */}
      <pointLight position={[0, 1.5, 0]} distance={7} intensity={2.2} color={color} />
    </group>
  );
};
