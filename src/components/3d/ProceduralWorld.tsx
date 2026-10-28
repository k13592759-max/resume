import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProceduralWorldProps {
  scrollProgress: number; // 0 to 1
  isMobile: boolean;
}

export const ProceduralWorld: React.FC<ProceduralWorldProps> = ({ scrollProgress, isMobile }) => {
  // References for animated procedural elements
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const monolithsGroupRef = useRef<THREE.Group>(null);
  const nexusGroupRef = useRef<THREE.Group>(null);
  const matrixGroupRef = useRef<THREE.Group>(null);
  const beaconGroupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const gridFloorRef = useRef<THREE.GridHelper>(null);
  const dynamicLightRef = useRef<THREE.PointLight>(null);

  // Procedural Particles setup
  const particleCount = isMobile ? 300 : 850;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);
    const colorEmerald = new THREE.Color('#10B981');
    const colorCyan = new THREE.Color('#06B6D4');
    const colorWhite = new THREE.Color('#E2E8F0');

    for (let i = 0; i < particleCount; i++) {
      // Spread across a cylindrical / spatial cloud around the world
      const radius = 6 + Math.random() * 26;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.3) * 35;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius;

      // Color distribution: 50% emerald, 40% cyan, 10% white
      const rand = Math.random();
      const c = rand < 0.5 ? colorEmerald : rand < 0.9 ? colorCyan : colorWhite;
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return [pos, cols];
  }, [particleCount]);

  // Animation frame loop
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Hero Core Animation (Rotations & levitation)
    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.x = time * 0.25;
      coreMeshRef.current.rotation.y = time * 0.4;
      coreMeshRef.current.position.y = Math.sin(time * 1.2) * 0.22;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.45;
      ring1Ref.current.rotation.z = time * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.5;
      ring2Ref.current.rotation.x = time * 0.2;
    }

    // 2. Monoliths breathing pulse
    if (monolithsGroupRef.current) {
      monolithsGroupRef.current.rotation.y = Math.sin(time * 0.2) * 0.08;
    }

    // 3. Nexus & Matrix rotations
    if (nexusGroupRef.current) {
      nexusGroupRef.current.rotation.y = time * 0.15;
    }
    if (matrixGroupRef.current) {
      matrixGroupRef.current.rotation.y = -time * 0.12;
      matrixGroupRef.current.position.y = -1.2 + Math.sin(time * 0.9) * 0.15;
    }

    // 4. Beacon Spire pulse
    if (beaconGroupRef.current) {
      beaconGroupRef.current.rotation.y = time * 0.2;
    }

    // 5. Subtle Particle Cloud drift
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.03;
      particlesRef.current.rotation.x = Math.sin(time * 0.05) * 0.02;
    }

    // 6. Dynamic Light following scroll progress and time
    if (dynamicLightRef.current) {
      const angle = time * 0.5 + scrollProgress * Math.PI * 2;
      dynamicLightRef.current.position.x = Math.sin(angle) * 7;
      dynamicLightRef.current.position.z = Math.cos(angle) * 7;
      dynamicLightRef.current.position.y = 1 + Math.sin(time * 0.8) * 1.5;
    }

    // 7. Grid floor subtle shimmer
    if (gridFloorRef.current) {
      gridFloorRef.current.position.z = (time * 0.5) % 2;
    }
  });

  return (
    <>
      {/* Volumetric Exponential Fog */}
      <fogExp2 attach="fog" args={['#030708', 0.024]} />

      {/* Lighting Architecture */}
      <ambientLight intensity={0.65} color="#06222b" />
      
      {/* Emerald Key Light */}
      <directionalLight 
        position={[-8, 12, 10]} 
        intensity={2.8} 
        color="#10B981" 
      />

      {/* Cyan Rim Light */}
      <directionalLight 
        position={[10, -6, -8]} 
        intensity={2.5} 
        color="#06B6D4" 
      />

      {/* Orbiting Dynamic Accent Point Light */}
      <pointLight 
        ref={dynamicLightRef} 
        intensity={3.5} 
        distance={18} 
        color="#22D3EE" 
      />

      {/* Core Ground Light */}
      <pointLight 
        position={[0, -2.5, 0]} 
        intensity={2.0} 
        distance={12} 
        color="#059669" 
      />

      {/* ========================================================= */}
      {/* 1. HERO STATION: The Singularity Crystalline Core         */}
      {/* ========================================================= */}
      <group position={[0, 0, 0]}>
        {/* Central Crystalline Polyhedron */}
        <mesh ref={coreMeshRef}>
          <octahedronGeometry args={[1.35, 1]} />
          <meshStandardMaterial
            color="#0A181C"
            emissive="#10B981"
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0.9}
            wireframe={false}
          />
        </mesh>

        {/* Inner Core Wireframe Accent */}
        <mesh>
          <octahedronGeometry args={[1.38, 1]} />
          <meshBasicMaterial
            color="#34D399"
            wireframe={true}
            transparent={true}
            opacity={0.35}
          />
        </mesh>

        {/* Outer Counter-Rotating Cyber Rings */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.2, 0.028, 16, 64]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#06B6D4"
            emissiveIntensity={1.2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        <mesh ref={ring2Ref}>
          <torusGeometry args={[2.7, 0.024, 16, 64]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#10B981"
            emissiveIntensity={1.0}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 2. ABOUT STATION: The Neural Monoliths (Offset left)      */}
      {/* ========================================================= */}
      <group ref={monolithsGroupRef} position={[-4.5, 1.2, -3]}>
        {/* Floating Architectural Monoliths */}
        {[
          { x: -1.2, y: 0.5, z: 0, h: 3.2, color: '#10B981' },
          { x: 0, y: 1.0, z: -0.5, h: 4.2, color: '#06B6D4' },
          { x: 1.2, y: 0.2, z: 0.2, h: 2.8, color: '#34D399' },
          { x: -0.6, y: -0.8, z: 1.2, h: 2.0, color: '#22D3EE' },
          { x: 0.8, y: -0.5, z: 1.0, h: 2.4, color: '#059669' },
        ].map((m, idx) => (
          <group key={`monolith-${idx}`} position={[m.x, m.y, m.z]}>
            <mesh>
              <boxGeometry args={[0.32, m.h, 0.32]} />
              <meshStandardMaterial
                color="#060E12"
                roughness={0.2}
                metalness={0.92}
                emissive={m.color}
                emissiveIntensity={0.25}
              />
            </mesh>
            {/* Glowing neon vertical strip */}
            <mesh position={[0, 0, 0.165]}>
              <planeGeometry args={[0.08, m.h * 0.8]} />
              <meshBasicMaterial color={m.color} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ========================================================= */}
      {/* 3. SELECTED WORK: The Nexus Gateways (Offset right)       */}
      {/* ========================================================= */}
      <group ref={nexusGroupRef} position={[4.2, -0.6, -2.5]}>
        {/* Portal Gateway Frames */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[2.0, 0.05, 12, 4]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#06B6D4"
            emissiveIntensity={0.9}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[0, 0, -1.2]} rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[2.4, 0.04, 12, 4]} />
          <meshStandardMaterial
            color="#10B981"
            emissive="#10B981"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
        {/* Floating Data Spheres representing the 5 key projects */}
        {[
          { pos: [-1.2, 0.8, 0], col: '#10B981' }, // EcoMind
          { pos: [1.2, 0.8, 0], col: '#06B6D4' },  // VotePath India
          { pos: [0, 1.4, -0.6], col: '#34D399' }, // Voice AI
          { pos: [-0.9, -0.9, 0.4], col: '#22D3EE' }, // StadiumGPT360
          { pos: [0.9, -0.9, 0.4], col: '#059669' },  // Climatora
        ].map((node, i) => (
          <mesh key={`nexus-node-${i}`} position={node.pos as [number, number, number]}>
            <octahedronGeometry args={[0.22, 0]} />
            <meshStandardMaterial
              color={node.col}
              emissive={node.col}
              emissiveIntensity={1.4}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        ))}
      </group>

      {/* ========================================================= */}
      {/* 4. SKILLS STATION: The Knowledge Matrix (Left lower)       */}
      {/* ========================================================= */}
      <group ref={matrixGroupRef} position={[-3.8, -2.0, -1.8]}>
        {/* Technologies Used: Left cluster (Emerald faceted prisms) */}
        <group position={[-1.2, 0, 0]}>
          <mesh position={[0, 0.5, 0]}>
            <dodecahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial
              color="#041E15"
              emissive="#10B981"
              emissiveIntensity={0.7}
              roughness={0.15}
              metalness={0.85}
              wireframe={false}
            />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <dodecahedronGeometry args={[0.72, 0]} />
            <meshBasicMaterial color="#34D399" wireframe={true} transparent opacity={0.4} />
          </mesh>
        </group>

        {/* Technologies Learning: Right cluster (Cyan orbital prisms) */}
        <group position={[1.2, 0, 0]}>
          <mesh position={[0, 0.5, 0]}>
            <icosahedronGeometry args={[0.65, 0]} />
            <meshStandardMaterial
              color="#041824"
              emissive="#06B6D4"
              emissiveIntensity={0.8}
              roughness={0.15}
              metalness={0.85}
            />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <icosahedronGeometry args={[0.67, 0]} />
            <meshBasicMaterial color="#22D3EE" wireframe={true} transparent opacity={0.4} />
          </mesh>
        </group>
      </group>

      {/* ========================================================= */}
      {/* 5. ACHIEVEMENTS STATION: The Beacon Spire (Right upper)   */}
      {/* ========================================================= */}
      <group ref={beaconGroupRef} position={[3.5, 1.8, -4]}>
        {/* Vertical Spire */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.35, 4.5, 6]} />
          <meshStandardMaterial
            color="#081A22"
            emissive="#10B981"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
        {/* Orbiting Achievement Shield Ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.2, 0.035, 16, 32]} />
          <meshStandardMaterial
            color="#06B6D4"
            emissive="#06B6D4"
            emissiveIntensity={1.5}
          />
        </mesh>
        {/* Crown Diamond */}
        <mesh position={[0, 2.4, 0]}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#34D399"
            emissiveIntensity={2.0}
          />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 6. PARTICLES: Subtle Floating Cyber Dust Field            */}
      {/* ========================================================= */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.05 : 0.065}
          vertexColors={true}
          transparent={true}
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>

      {/* ========================================================= */}
      {/* 7. REFLECTIVE CYBER GROUND & HORIZON GRID                 */}
      {/* ========================================================= */}
      {/* Dark Reflective Floor Plane */}
      <mesh position={[0, -4.0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#020507"
          roughness={0.12}
          metalness={0.92}
        />
      </mesh>

      {/* Receding Cybernetic Grid Lines */}
      <primitive
        ref={gridFloorRef}
        object={new THREE.GridHelper(100, 50, '#10B981', '#063842')}
        position={[0, -3.98, 0]}
      />
    </>
  );
};
