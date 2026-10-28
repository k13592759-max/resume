import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useGame } from '../../game/GameContext';
import { ZONE_POSITIONS } from './ProceduralWorld';

// Input state (module-level so it doesn't cause re-renders)
const keys: Record<string, boolean> = {};

export const PlayerController: React.FC = () => {
  const { setPlayerPos, showPrompt, hidePrompt, openModal, discoverZone, setCurrentZone, gameMode } = useGame();

  const playerRef = useRef<THREE.Group>(null);
  const velocityRef = useRef(new THREE.Vector3());
  const cameraAngleRef = useRef(0); // horizontal angle
  const cameraPitchRef = useRef(0.4); // vertical angle
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const joyRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const nearestZoneRef = useRef<string | null>(null);
  const { camera } = useThree();

  const SPEED = 8;
  const CAMERA_DISTANCE = 12;
  const CAMERA_HEIGHT = 5;

  // ── Key listeners ──
  useEffect(() => {
    if (gameMode !== 'playing') return;

    const down = (e: KeyboardEvent) => {
      keys[e.code] = true;
      if (e.code === 'KeyE' && nearestZoneRef.current) {
        const zone = nearestZoneRef.current;
        discoverZone(zone);
        if (zone === 'origin') openModal('origin');
        else if (zone === 'projects') openModal('project');
        else if (zone === 'skills') openModal('skills');
        else if (zone === 'achievements') openModal('achievements');
        else if (zone === 'contact') openModal('contact');
      }
    };
    const up = (e: KeyboardEvent) => { keys[e.code] = false; };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); };
  }, [gameMode, discoverZone, openModal]);

  // ── Mouse look ──
  useEffect(() => {
    if (gameMode !== 'playing') return;
    const onMove = (e: MouseEvent) => {
      if (e.buttons !== 1 || lastMouseRef.current === null) {
        lastMouseRef.current = { x: e.clientX, y: e.clientY };
        return;
      }
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      cameraAngleRef.current -= dx * 0.005;
      cameraPitchRef.current = Math.max(0.15, Math.min(0.85, cameraPitchRef.current + dy * 0.004));
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseDown = (e: MouseEvent) => { lastMouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onMouseDown);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mousedown', onMouseDown); };
  }, [gameMode]);

  // ── Touch camera drag ──
  useEffect(() => {
    if (gameMode !== 'playing') return;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && touchStartRef.current) {
        const dx = e.touches[0].clientX - touchStartRef.current.x;
        const dy = e.touches[0].clientY - touchStartRef.current.y;
        cameraAngleRef.current -= dx * 0.008;
        cameraPitchRef.current = Math.max(0.15, Math.min(0.85, cameraPitchRef.current + dy * 0.005));
        touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    return () => { window.removeEventListener('touchstart', onTouchStart); window.removeEventListener('touchmove', onTouchMove); };
  }, [gameMode]);

  // ── Expose joystick setter globally ──
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__setJoy = (x: number, y: number) => {
      joyRef.current = { x, y };
    };
    return () => { delete (window as unknown as Record<string, unknown>).__setJoy; };
  }, []);

  // ── Per-frame update ──
  useFrame((_, delta) => {
    if (!playerRef.current || gameMode !== 'playing') return;
    const player = playerRef.current;
    const dt = Math.min(delta, 0.1);

    // Input direction (keyboard or joystick)
    let moveX = 0;
    let moveZ = 0;

    if (keys['KeyW'] || keys['ArrowUp']) moveZ -= 1;
    if (keys['KeyS'] || keys['ArrowDown']) moveZ += 1;
    if (keys['KeyA'] || keys['ArrowLeft']) moveX -= 1;
    if (keys['KeyD'] || keys['ArrowRight']) moveX += 1;

    // Joystick overrides if held
    if (Math.abs(joyRef.current.x) > 0.1 || Math.abs(joyRef.current.y) > 0.1) {
      moveX = joyRef.current.x;
      moveZ = joyRef.current.y;
    }

    if (moveX !== 0 || moveZ !== 0) {
      const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
      moveX /= len; moveZ /= len;

      // Camera-relative movement
      const camAngle = cameraAngleRef.current;
      const worldX = moveX * Math.cos(camAngle) + moveZ * Math.sin(camAngle);
      const worldZ = -moveX * Math.sin(camAngle) + moveZ * Math.cos(camAngle);

      velocityRef.current.x = worldX * SPEED;
      velocityRef.current.z = worldZ * SPEED;

      // Face movement direction
      player.rotation.y = Math.atan2(velocityRef.current.x, velocityRef.current.z);
    } else {
      velocityRef.current.x *= 0.85;
      velocityRef.current.z *= 0.85;
    }

    // Move player, clamp to platform radius
    player.position.x += velocityRef.current.x * dt;
    player.position.z += velocityRef.current.z * dt;
    const dist = Math.sqrt(player.position.x ** 2 + player.position.z ** 2);
    if (dist > 50) {
      player.position.x = (player.position.x / dist) * 50;
      player.position.z = (player.position.z / dist) * 50;
    }

    // Update camera in third-person arc
    const angle = cameraAngleRef.current;
    const pitch = cameraPitchRef.current;
    const cx = player.position.x + Math.sin(angle) * CAMERA_DISTANCE * Math.cos(pitch);
    const cy = player.position.y + CAMERA_HEIGHT + Math.sin(pitch) * CAMERA_DISTANCE * 0.5;
    const cz = player.position.z + Math.cos(angle) * CAMERA_DISTANCE * Math.cos(pitch);
    camera.position.lerp(new THREE.Vector3(cx, cy, cz), 0.1);
    camera.lookAt(player.position.x, player.position.y + 1.5, player.position.z);

    // Sync player position to context (throttled)
    setPlayerPos(player.position.x, player.position.z);

    // Zone proximity detection
    let nearest: string | null = null;
    let nearestDist = 99999;
    for (const [zoneId, pos] of Object.entries(ZONE_POSITIONS)) {
      const d = Math.sqrt((player.position.x - pos[0]) ** 2 + (player.position.z - pos[2]) ** 2);
      if (d < 7 && d < nearestDist) {
        nearestDist = d;
        nearest = zoneId;
      }
    }
    if (nearest !== nearestZoneRef.current) {
      nearestZoneRef.current = nearest;
      if (nearest) {
        const labels: Record<string, string> = {
          origin: '[E] Meet Krishna',
          projects: '[E] Explore Projects',
          skills: '[E] View Skills',
          achievements: '[E] Open Achievement Vault',
          contact: '[E] Connect',
        };
        showPrompt(labels[nearest] ?? '[E] Interact');
        setCurrentZone(nearest);
        discoverZone(nearest);
      } else {
        hidePrompt();
        setCurrentZone(null);
      }
    }
  });

  return (
    <group ref={playerRef} position={[0, 0, 8]}>
      {/* Player avatar — simple geometric character */}
      <mesh position={[0, 0.9, 0]}>
        <capsuleGeometry args={[0.3, 1, 8, 16]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.3} roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.9, 0]}>
        <sphereGeometry args={[0.28, 12, 12]} />
        <meshStandardMaterial color="#0d2a1e" roughness={0.1} metalness={0.9} emissive="#10b981" emissiveIntensity={0.2} />
      </mesh>
      {/* Visor */}
      <mesh position={[0, 1.9, 0.2]}>
        <sphereGeometry args={[0.2, 8, 8, 0, Math.PI]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
