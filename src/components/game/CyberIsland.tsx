import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { InteractiveStation } from './InteractiveStation';
import { useGame, ZONES } from '../../game/GameContext';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const CyberIsland: React.FC = () => {
  const { openModal } = useGame();
  const centralCoreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Floating Cyber Particles
  const particleCount = 650;
  const [particlePositions, particleColors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const c1 = new THREE.Color('#10B981');
    const c2 = new THREE.Color('#06B6D4');

    for (let i = 0; i < particleCount; i++) {
      const radius = 5 + Math.random() * 40;
      const angle = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.2) * 25;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      const c = Math.random() > 0.4 ? c1 : c2;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (centralCoreRef.current) {
      centralCoreRef.current.rotation.y = time * 0.4;
      centralCoreRef.current.position.y = 3.5 + Math.sin(time * 1.5) * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.5;
      ringRef.current.rotation.z = time * 0.3;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.025;
    }
  });

  return (
    <>
      {/* Volumetric Fog & Atmospheric Lighting */}
      <fogExp2 attach="fog" args={['#030708', 0.022]} />
      <ambientLight intensity={0.7} color="#051f26" />
      <directionalLight position={[-15, 20, 15]} intensity={2.6} color="#10B981" />
      <directionalLight position={[15, -10, -15]} intensity={2.2} color="#06B6D4" />

      {/* ============================================================== */}
      {/* 1. FLOATING CYBER ISLAND MAIN PLATFORM                         */}
      {/* ============================================================== */}
      {/* Central Plaza Ground */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[14, 15, 0.4, 32]} />
        <meshStandardMaterial
          color="#060D11"
          roughness={0.12}
          metalness={0.9}
        />
      </mesh>

      {/* Outer Floating Ring Deck */}
      <mesh position={[0, -0.15, 0]}>
        <ringGeometry args={[14.1, 38, 48]} />
        <meshStandardMaterial
          color="#04080B"
          roughness={0.15}
          metalness={0.88}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cyber Perimeter Guard Rails / Barrier Glow */}
      <mesh position={[0, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[41.8, 42.2, 64]} />
        <meshBasicMaterial color="#10B981" transparent opacity={0.6} />
      </mesh>

      {/* Glowing Radial Energy Pathways connecting Center to Wings */}
      {[
        { rot: -0.6, len: 32 },  // Path to Project City
        { rot: 0.6, len: 32 },   // Path to Skill Lab
        { rot: 2.3, len: 30 },   // Path to Vault
        { rot: -2.3, len: 30 },  // Path to Hub
      ].map((path, idx) => (
        <group key={`path-${idx}`} rotation={[0, path.rot, 0]}>
          <mesh position={[0, 0.02, -path.len / 2]}>
            <planeGeometry args={[2.8, path.len]} />
            <meshStandardMaterial
              color="#07181F"
              emissive="#06B6D4"
              emissiveIntensity={0.25}
              roughness={0.2}
            />
          </mesh>
          {/* Glowing central beam */}
          <mesh position={[0, 0.03, -path.len / 2]}>
            <planeGeometry args={[0.2, path.len]} />
            <meshBasicMaterial color="#10B981" />
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 2. ZONE 1 — THE ORIGIN (SPAWN PLAZA AT [0, 0, 0])              */}
      {/* ============================================================== */}
      {/* Central Concentric Hologram Beacon */}
      <group position={[0, 0, 0]}>
        {/* Floating Singularity Diamond */}
        <mesh ref={centralCoreRef} position={[0, 3.5, 0]}>
          <octahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial
            color="#0A181C"
            emissive="#10B981"
            emissiveIntensity={1.4}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Orbiting Ring */}
        <mesh ref={ringRef} position={[0, 3.5, 0]}>
          <torusGeometry args={[1.8, 0.03, 16, 48]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#06B6D4"
            emissiveIntensity={1.8}
          />
        </mesh>

        {/* Central Light Beam */}
        <pointLight position={[0, 3.5, 0]} color="#10B981" intensity={3.5} distance={15} />

        {/* Interactive Origin Terminal */}
        <InteractiveStation
          id="origin-welcome"
          title="THE ORIGIN"
          subtitle="Developer Codex & Overview"
          prompt="PRESS [E] TO VIEW KRISHNA'S CODEX"
          position={[0, 0, -4.5]}
          color="#10B981"
          onInteract={() => openModal('origin')}
        />
      </group>

      {/* ============================================================== */}
      {/* 3. ZONE 2 — PROJECT CITY ([-26, 0, -18])                       */}
      {/* ============================================================== */}
      <group position={ZONES.projects.position}>
        {/* City Platform Ground */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[12, 13, 0.5, 24]} />
          <meshStandardMaterial color="#050C10" roughness={0.15} metalness={0.9} />
        </mesh>

        {/* Cyber Skyscrapers / Tech Towers */}
        {[
          { pos: [-6, 6, -5], h: 12, color: '#10B981' },
          { pos: [6, 8, -6], h: 16, color: '#06B6D4' },
          { pos: [-4, 4.5, 6], h: 9, color: '#34D399' },
          { pos: [5, 5, 5], h: 10, color: '#22D3EE' },
        ].map((tower, idx) => (
          <group key={`tower-${idx}`} position={tower.pos as [number, number, number]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2.5, tower.h, 2.5]} />
              <meshStandardMaterial
                color="#04090D"
                roughness={0.2}
                metalness={0.95}
                emissive={tower.color}
                emissiveIntensity={0.2}
              />
            </mesh>
            {/* Cyber Window Strips */}
            <mesh position={[0, 0, 1.28]}>
              <planeGeometry args={[1.2, tower.h * 0.7]} />
              <meshBasicMaterial color={tower.color} transparent opacity={0.65} />
            </mesh>
          </group>
        ))}

        {/* 5 Interactive Project Terminals */}
        {PORTFOLIO_DATA.projects.map((proj, idx) => {
          // Circular layout of project terminals around the district
          const angle = (idx / PORTFOLIO_DATA.projects.length) * Math.PI * 2;
          const radius = 5.8;
          const px = Math.cos(angle) * radius;
          const pz = Math.sin(angle) * radius;

          return (
            <InteractiveStation
              key={proj.id}
              id={`project-${proj.id}`}
              title={proj.title}
              subtitle={proj.category}
              prompt={`PRESS [E] TO INSPECT ${proj.title.toUpperCase()}`}
              position={[px, 0, pz]}
              color={proj.accentColor}
              onInteract={() => openModal('project', proj.id)}
            />
          );
        })}
      </group>

      {/* ============================================================== */}
      {/* 4. ZONE 3 — SKILL LAB ([26, 0, -18])                           */}
      {/* ============================================================== */}
      <group position={ZONES.skills.position}>
        {/* Lab Platform */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[11, 12, 0.5, 24]} />
          <meshStandardMaterial color="#050C10" roughness={0.15} metalness={0.9} />
        </mesh>

        {/* Research Pavilion Pillars & Canopy */}
        <mesh position={[0, 4.5, 0]}>
          <torusGeometry args={[7, 0.08, 16, 32]} />
          <meshStandardMaterial color="#34D399" emissive="#34D399" emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[0, 4.8, 0]}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#041F17"
            emissive="#34D399"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Interactive Station: Technologies Used */}
        <InteractiveStation
          id="skills-used"
          title="PROVEN STACK"
          subtitle="React, Python, Three.js, C..."
          prompt="PRESS [E] TO ACCESS TECHNOLOGIES USED"
          position={[-3.5, 0, 0]}
          color="#10B981"
          onInteract={() => openModal('skills')}
        />

        {/* Interactive Station: Currently Learning */}
        <InteractiveStation
          id="skills-learning"
          title="AI FRONTIER"
          subtitle="GenAI Agents, RAG, Cloud Native..."
          prompt="PRESS [E] TO ACCESS ACTIVE RESEARCH"
          position={[3.5, 0, 0]}
          color="#06B6D4"
          onInteract={() => openModal('skills')}
        />
      </group>

      {/* ============================================================== */}
      {/* 5. ZONE 4 — ACHIEVEMENT VAULT ([-20, 0, 24])                   */}
      {/* ============================================================== */}
      <group position={ZONES.vault.position}>
        {/* Vault Platform */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[9, 10, 0.5, 24]} />
          <meshStandardMaterial color="#070C12" roughness={0.15} metalness={0.9} />
        </mesh>

        {/* Crystalline Vault Arches */}
        <mesh position={[0, 3, 0]}>
          <torusGeometry args={[4.5, 0.1, 16, 4]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={1.2} />
        </mesh>

        {/* Interactive Station: Verified Badges & Awards */}
        <InteractiveStation
          id="achievement-vault-terminal"
          title="VERIFIED VAULT"
          subtitle="Google Skills Badge & Awards"
          prompt="PRESS [E] TO INSPECT VAULT ARTIFACTS"
          position={[0, 0, 0]}
          color="#F59E0B"
          onInteract={() => openModal('vault')}
        />
      </group>

      {/* ============================================================== */}
      {/* 6. ZONE 5 — CONNECTION HUB ([20, 0, 24])                       */}
      {/* ============================================================== */}
      <group position={ZONES.hub.position}>
        {/* Hub Platform */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[9, 10, 0.5, 24]} />
          <meshStandardMaterial color="#050C10" roughness={0.15} metalness={0.9} />
        </mesh>

        {/* Satellite Dish & Antenna Tower */}
        <mesh position={[0, 4.2, 0]}>
          <cylinderGeometry args={[0.08, 0.25, 4.8, 8]} />
          <meshStandardMaterial color="#081822" emissive="#06B6D4" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0, 6.2, 0]}>
          <torusGeometry args={[1.2, 0.04, 16, 24]} />
          <meshStandardMaterial color="#22D3EE" emissive="#22D3EE" emissiveIntensity={2.0} />
        </mesh>

        {/* Interactive Station: Transmission & Contacts */}
        <InteractiveStation
          id="connection-hub-terminal"
          title="TRANSMISSION HUB"
          subtitle="GitHub, LinkedIn & Direct Mail"
          prompt="PRESS [E] TO TRANSMIT MESSAGE"
          position={[0, 0, 0]}
          color="#22D3EE"
          onInteract={() => openModal('hub')}
        />
      </group>

      {/* ============================================================== */}
      {/* 7. FLOATING DUST PARTICLES                                     */}
      {/* ============================================================== */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particleColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
};
