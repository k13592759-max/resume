import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGame, ZONES } from '../../game/GameContext';

export const PlayerAvatar: React.FC = () => {
  const {
    setPlayerPosition,
    setPlayerRotation,
    setIsMoving,
    joystickVector,
    teleportTarget,
    clearTeleportTarget,
    hasJumped,
    clearJump,
    discoverZone,
    gameMode
  } = useGame();

  const groupRef = useRef<THREE.Group>(null);
  const droneMeshRef = useRef<THREE.Group>(null);
  const thrusterLeftRef = useRef<THREE.Mesh>(null);
  const thrusterRightRef = useRef<THREE.Mesh>(null);

  // Movement physics state
  const pos = useRef(new THREE.Vector3(0, 1.2, 0));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const rotation = useRef(0);
  const verticalVelocity = useRef(0);
  const isGrounded = useRef(true);

  // Keyboard input state
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (gameMode !== 'playing') return;

      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = true;
          break;
        case 'Space':
          keys.current.jump = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = false;
          break;
        case 'Space':
          keys.current.jump = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameMode]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // 1. Check for instantaneous Teleport
    if (teleportTarget) {
      pos.current.set(teleportTarget[0], teleportTarget[1] + 1.2, teleportTarget[2]);
      velocity.current.set(0, 0, 0);
      verticalVelocity.current = 0;
      clearTeleportTarget();
    }

    // 2. Gather Inputs (Keyboard + Virtual Joystick)
    let moveX = 0;
    let moveZ = 0;

    if (gameMode === 'playing') {
      if (keys.current.forward) moveZ -= 1;
      if (keys.current.backward) moveZ += 1;
      if (keys.current.left) moveX -= 1;
      if (keys.current.right) moveX += 1;

      // Add touch joystick input
      if (Math.abs(joystickVector.x) > 0.05 || Math.abs(joystickVector.y) > 0.05) {
        moveX += joystickVector.x;
        moveZ += joystickVector.y;
      }
    }

    // Normalize input
    const inputLength = Math.sqrt(moveX * moveX + moveZ * moveZ);
    const moving = inputLength > 0.1;
    setIsMoving(moving);

    const speed = 14.0;
    const accel = 10.0;
    const friction = 7.0;

    if (moving) {
      const targetDirX = moveX / inputLength;
      const targetDirZ = moveZ / inputLength;

      // Desired velocity
      const targetVx = targetDirX * speed;
      const targetVz = targetDirZ * speed;

      velocity.current.x = THREE.MathUtils.lerp(velocity.current.x, targetVx, accel * delta);
      velocity.current.z = THREE.MathUtils.lerp(velocity.current.z, targetVz, accel * delta);

      // Smoothly rotate avatar towards movement direction
      const targetAngle = Math.atan2(targetDirX, targetDirZ);
      // Smooth angle interpolation
      let angleDiff = targetAngle - rotation.current;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      rotation.current += angleDiff * Math.min(1, 12 * delta);
    } else {
      // Apply friction
      velocity.current.x = THREE.MathUtils.lerp(velocity.current.x, 0, friction * delta);
      velocity.current.z = THREE.MathUtils.lerp(velocity.current.z, 0, friction * delta);
    }

    // 3. Jump Physics
    const jumpRequested = keys.current.jump || hasJumped;
    if (jumpRequested && isGrounded.current && gameMode === 'playing') {
      verticalVelocity.current = 8.5;
      isGrounded.current = false;
      if (hasJumped) clearJump();
    }

    // Apply gravity
    if (!isGrounded.current) {
      verticalVelocity.current -= 22 * delta;
      pos.current.y += verticalVelocity.current * delta;

      // Base hover height
      if (pos.current.y <= 1.2) {
        pos.current.y = 1.2;
        verticalVelocity.current = 0;
        isGrounded.current = true;
      }
    }

    // 4. Update horizontal position
    pos.current.x += velocity.current.x * delta;
    pos.current.z += velocity.current.z * delta;

    // Platform Boundary Clamping (Keep within cyber island radius ~44)
    const distFromOrigin = Math.sqrt(pos.current.x * pos.current.x + pos.current.z * pos.current.z);
    const maxRadius = 42.0;
    if (distFromOrigin > maxRadius) {
      const angle = Math.atan2(pos.current.z, pos.current.x);
      pos.current.x = Math.cos(angle) * maxRadius;
      pos.current.z = Math.sin(angle) * maxRadius;
      velocity.current.multiplyScalar(0.2); // dampen
    }

    // 5. Visual Bobbing & Banking
    const hoverOffset = Math.sin(time * 3.5) * 0.08;
    const currentY = pos.current.y + hoverOffset;

    groupRef.current.position.set(pos.current.x, currentY, pos.current.z);
    groupRef.current.rotation.y = rotation.current;

    // Banking roll effect when turning
    if (droneMeshRef.current) {
      const targetRoll = -velocity.current.x * 0.035;
      const targetPitch = velocity.current.z * 0.025;
      droneMeshRef.current.rotation.z = THREE.MathUtils.lerp(droneMeshRef.current.rotation.z, targetRoll, 10 * delta);
      droneMeshRef.current.rotation.x = THREE.MathUtils.lerp(droneMeshRef.current.rotation.x, targetPitch, 10 * delta);
    }

    // Thruster rotations
    if (thrusterLeftRef.current) {
      thrusterLeftRef.current.rotation.x = time * 8;
    }
    if (thrusterRightRef.current) {
      thrusterRightRef.current.rotation.x = -time * 8;
    }

    // 6. Broadcast position to Game Context (for minimap & interactions)
    setPlayerPosition([pos.current.x, pos.current.y, pos.current.z]);
    setPlayerRotation(rotation.current);

    // 7. Check Proximity to Discover Zones
    Object.values(ZONES).forEach((zone) => {
      const zx = zone.position[0];
      const zz = zone.position[2];
      const d = Math.sqrt((pos.current.x - zx) ** 2 + (pos.current.z - zz) ** 2);
      if (d < 8.0) {
        discoverZone(zone.id);
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 1.2, 0]}>
      <group ref={droneMeshRef}>
        {/* Central Drone Chassis: Aerodynamic Hex-Diamond */}
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[0.42, 1]} />
          <meshStandardMaterial
            color="#081419"
            roughness={0.15}
            metalness={0.92}
            emissive="#10B981"
            emissiveIntensity={0.3}
          />
        </mesh>

        {/* Visor Sensor / Cyber Eye */}
        <mesh position={[0, 0.05, 0.38]}>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshBasicMaterial color="#06B6D4" />
        </mesh>

        {/* Eye Beam Light */}
        <spotLight
          position={[0, 0.05, 0.45]}
          target-position={[0, -0.5, 3]}
          color="#22D3EE"
          intensity={2.8}
          distance={10}
          angle={0.45}
          penumbra={0.5}
        />

        {/* Side Thrusters Left / Right */}
        <group position={[-0.55, -0.05, 0]}>
          <mesh ref={thrusterLeftRef}>
            <torusGeometry args={[0.18, 0.035, 12, 24]} />
            <meshStandardMaterial
              color="#10B981"
              emissive="#10B981"
              emissiveIntensity={1.8}
            />
          </mesh>
          <pointLight color="#10B981" intensity={1.2} distance={2.5} />
        </group>

        <group position={[0.55, -0.05, 0]}>
          <mesh ref={thrusterRightRef}>
            <torusGeometry args={[0.18, 0.035, 12, 24]} />
            <meshStandardMaterial
              color="#10B981"
              emissive="#10B981"
              emissiveIntensity={1.8}
            />
          </mesh>
          <pointLight color="#10B981" intensity={1.2} distance={2.5} />
        </group>

        {/* Underbody Levitation Glow */}
        <pointLight position={[0, -0.25, 0]} color="#34D399" intensity={2.0} distance={3} />
      </group>

      {/* Ground Projection Target Shadow */}
      <mesh position={[0, -1.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.65, 24]} />
        <meshBasicMaterial
          color="#10B981"
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
