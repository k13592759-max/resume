import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Zone positions in the world
export const ZONE_POSITIONS: Record<string, [number, number, number]> = {
  origin: [0, 0, 0],
  projects: [30, 0, 0],
  skills: [-28, 0, 8],
  achievements: [0, 0, -30],
  contact: [20, 0, -22],
};

export const ZONE_COLORS: Record<string, string> = {
  origin: '#10b981',
  projects: '#3b82f6',
  skills: '#8b5cf6',
  achievements: '#f59e0b',
  contact: '#06b6d4',
};

// ─────────────────────────────────────────────
// The complete procedural world
// ─────────────────────────────────────────────
export const ProceduralWorld: React.FC = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} color="#0d1a2a" />
      <directionalLight position={[20, 30, 10]} intensity={0.8} color="#a0c4ff" castShadow={false} />
      <pointLight position={[0, 8, 0]} intensity={1.2} color="#10b981" distance={40} decay={2} />
      <pointLight position={[30, 6, 0]} intensity={1.0} color="#3b82f6" distance={35} decay={2} />
      <pointLight position={[-28, 6, 8]} intensity={1.0} color="#8b5cf6" distance={35} decay={2} />
      <pointLight position={[0, 6, -30]} intensity={1.0} color="#f59e0b" distance={35} decay={2} />
      <pointLight position={[20, 6, -22]} intensity={1.0} color="#06b6d4" distance={35} decay={2} />

      {/* Main floating platform */}
      <MainPlatform />

      {/* Glowing energy pathways */}
      <EnergyPaths />

      {/* Zone structures */}
      <OriginZone />
      <ProjectZone />
      <SkillZone />
      <AchievementZone />
      <ContactZone />

      {/* Decorative elements */}
      <FloatingParticles />
      <DistantIslands />
      <SkyElements />
    </>
  );
};

// ─────────────────────────────────────────────
// Main Platform
// ─────────────────────────────────────────────
const MainPlatform: React.FC = () => {
  return (
    <group>
      {/* Central island */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <cylinderGeometry args={[52, 56, 1.2, 64]} />
        <meshStandardMaterial color="#0a1520" roughness={0.8} metalness={0.2} />
      </mesh>
      {/* Platform edge glow ring */}
      <mesh position={[0, 0.1, 0]}>
        <ringGeometry args={[50.5, 52, 128]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      {/* Grid pattern on floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[100, 100, 40, 40]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.04} wireframe />
      </mesh>
    </group>
  );
};

// ─────────────────────────────────────────────
// Energy Paths connecting zones
// ─────────────────────────────────────────────
const EnergyPaths: React.FC = () => {
  const paths: [THREE.Vector3, THREE.Vector3, string][] = [
    [new THREE.Vector3(0, 0.05, 0), new THREE.Vector3(30, 0.05, 0), '#10b981'],
    [new THREE.Vector3(0, 0.05, 0), new THREE.Vector3(-28, 0.05, 8), '#8b5cf6'],
    [new THREE.Vector3(0, 0.05, 0), new THREE.Vector3(0, 0.05, -30), '#f59e0b'],
    [new THREE.Vector3(0, 0.05, 0), new THREE.Vector3(20, 0.05, -22), '#06b6d4'],
  ];

  return (
    <group>
      {paths.map(([from, to, color], i) => {
        const dir = to.clone().sub(from);
        const len = dir.length();
        const mid = from.clone().add(to).multiplyScalar(0.5);
        const angle = Math.atan2(dir.x, dir.z);
        return (
          <mesh
            key={i}
            position={[mid.x, 0.05, mid.z]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry args={[0.3, 0.04, len]} />
            <meshBasicMaterial color={color} transparent opacity={0.5} />
          </mesh>
        );
      })}
    </group>
  );
};

// ─────────────────────────────────────────────
// ZONE 1 — Origin
// ─────────────────────────────────────────────
const OriginZone: React.FC = () => {
  const glowRef = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (glowRef.current) {
      glowRef.current.rotation.y += d * 0.4;
    }
  });

  return (
    <group position={ZONE_POSITIONS.origin}>
      {/* Central spire */}
      <mesh position={[0, 3, 0]}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.6} roughness={0.1} metalness={0.9} />
      </mesh>
      {/* Rotating orbit ring */}
      <mesh ref={glowRef} position={[0, 3, 0]}>
        <torusGeometry args={[3, 0.05, 8, 64]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.7} />
      </mesh>
      {/* Pedestal */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.5, 2, 1, 8]} />
        <meshStandardMaterial color="#0d1f15" roughness={0.4} metalness={0.6} emissive="#10b981" emissiveIntensity={0.1} />
      </mesh>
      {/* Zone label platform */}
      <ZoneLabelPad label="ORIGIN" color="#10b981" />
      {/* Perimeter pillars */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <mesh key={i} position={[Math.sin(rad) * 5, 1, Math.cos(rad) * 5]}>
            <cylinderGeometry args={[0.12, 0.12, 2, 6]} />
            <meshStandardMaterial color="#0d1f15" emissive="#10b981" emissiveIntensity={0.3} metalness={0.8} />
          </mesh>
        );
      })}
    </group>
  );
};

// ─────────────────────────────────────────────
// ZONE 2 — Projects
// ─────────────────────────────────────────────
const ProjectZone: React.FC = () => {
  const terminalRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (terminalRef.current) {
      terminalRef.current.children.forEach((child, i) => {
        child.position.y = 1.5 + Math.sin(Date.now() * 0.001 + i * 1.2) * 0.15;
      });
    }
  });

  return (
    <group position={ZONE_POSITIONS.projects}>
      {/* Building cluster */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[4, 4, 4]} />
        <meshStandardMaterial color="#0a1525" roughness={0.3} metalness={0.7} emissive="#3b82f6" emissiveIntensity={0.08} />
      </mesh>
      <mesh position={[0, 4.05, 0]}>
        <boxGeometry args={[4.1, 0.1, 4.1]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
      </mesh>
      {/* Floating project terminals */}
      <group ref={terminalRef}>
        {[
          [-4, 1.5, -3], [4, 1.5, -3], [-4, 1.5, 3],
          [4, 1.5, 3], [0, 1.5, -5],
        ].map(([x, y, z], i) => (
          <HolographicTerminal key={i} position={[x, y, z]} color="#3b82f6" index={i} />
        ))}
      </group>
      <ZoneLabelPad label="PROJECT CITY" color="#3b82f6" />
    </group>
  );
};

// ─────────────────────────────────────────────
// ZONE 3 — Skills
// ─────────────────────────────────────────────
const SkillZone: React.FC = () => {
  const orbitRef = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (orbitRef.current) orbitRef.current.rotation.y += d * 0.25;
  });

  return (
    <group position={ZONE_POSITIONS.skills}>
      {/* Lab structure */}
      <mesh position={[0, 1.5, 0]}>
        <dodecahedronGeometry args={[2.2, 0]} />
        <meshStandardMaterial color="#1a0a2e" roughness={0.2} metalness={0.8} emissive="#8b5cf6" emissiveIntensity={0.12} wireframe={false} />
      </mesh>
      {/* Orbiting skill nodes */}
      <group ref={orbitRef} position={[0, 2.5, 0]}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh key={i} position={[Math.sin(rad) * 4, Math.sin(i) * 0.8, Math.cos(rad) * 4]}>
              <sphereGeometry args={[0.25, 8, 8]} />
              <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.8} roughness={0} metalness={1} />
            </mesh>
          );
        })}
      </group>
      <ZoneLabelPad label="SKILL LAB" color="#8b5cf6" />
    </group>
  );
};

// ─────────────────────────────────────────────
// ZONE 4 — Achievements
// ─────────────────────────────────────────────
const AchievementZone: React.FC = () => {
  const vaultRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (vaultRef.current) {
      vaultRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group position={ZONE_POSITIONS.achievements}>
      {/* Vault dome */}
      <mesh ref={vaultRef} position={[0, 2.5, 0]}>
        <sphereGeometry args={[2.5, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1a1000" roughness={0.1} metalness={0.9} emissive="#f59e0b" emissiveIntensity={0.1} side={THREE.DoubleSide} />
      </mesh>
      {/* Floor */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[2.5, 3, 1, 12]} />
        <meshStandardMaterial color="#1a1000" roughness={0.3} metalness={0.7} emissive="#f59e0b" emissiveIntensity={0.08} />
      </mesh>
      {/* Floating badge icons */}
      {[0, 120, 240].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <mesh key={i} position={[Math.sin(rad) * 2, 2.5 + Math.sin(Date.now() * 0.001 + i) * 0.2, Math.cos(rad) * 2]}>
            <octahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.9} roughness={0} metalness={1} />
          </mesh>
        );
      })}
      <ZoneLabelPad label="ACHIEVEMENT VAULT" color="#f59e0b" />
    </group>
  );
};

// ─────────────────────────────────────────────
// ZONE 5 — Contact
// ─────────────────────────────────────────────
const ContactZone: React.FC = () => {
  const antennaRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (antennaRef.current) {
      const t = Date.now() * 0.002;
      (antennaRef.current.material as THREE.MeshBasicMaterial).opacity = 0.4 + Math.sin(t) * 0.3;
    }
  });

  return (
    <group position={ZONE_POSITIONS.contact}>
      {/* Station body */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[2, 2.5, 3, 8]} />
        <meshStandardMaterial color="#001a20" roughness={0.2} metalness={0.8} emissive="#06b6d4" emissiveIntensity={0.1} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 4.5, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 3, 6]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
      </mesh>
      {/* Signal ring */}
      <mesh ref={antennaRef} position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 2, 32]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <ZoneLabelPad label="CONNECTION HUB" color="#06b6d4" />
    </group>
  );
};

// ─────────────────────────────────────────────
// Reusable sub-components
// ─────────────────────────────────────────────
interface HolographicTerminalProps {
  position: [number, number, number];
  color: string;
  index: number;
}

const HolographicTerminal: React.FC<HolographicTerminalProps> = ({ position, color }) => {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.8, 1.2, 0.1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.7} roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.05, 0.15, 0.8, 6]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
};

interface ZoneLabelPadProps {
  label: string;
  color: string;
}

const ZoneLabelPad: React.FC<ZoneLabelPadProps> = ({ color }) => {
  return (
    <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[6.5, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.06} side={THREE.DoubleSide} />
    </mesh>
  );
};

// ─────────────────────────────────────────────
// Floating Particles
// ─────────────────────────────────────────────
const FloatingParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#10b981'),
      new THREE.Color('#3b82f6'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#06b6d4'),
    ];
    for (let i = 0; i < count; i++) {
      const r = 20 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.sin(theta) * r + (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 8 + 0.5;
      positions[i * 3 + 2] = Math.cos(theta) * r + (Math.random() - 0.5) * 20;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
};

// ─────────────────────────────────────────────
// Distant Floating Islands
// ─────────────────────────────────────────────
const DistantIslands: React.FC = () => {
  const islands = useMemo(() => [
    { pos: [80, -10, -60] as [number, number, number], scale: 8, color: '#0a1a15' },
    { pos: [-70, -15, 50] as [number, number, number], scale: 12, color: '#0a1020' },
    { pos: [60, -8, 70] as [number, number, number], scale: 6, color: '#0a1520' },
    { pos: [-90, -20, -40] as [number, number, number], scale: 15, color: '#0a1015' },
  ], []);

  return (
    <group>
      {islands.map((island, i) => (
        <mesh key={i} position={island.pos}>
          <cylinderGeometry args={[island.scale * 0.6, island.scale, island.scale * 0.3, 12]} />
          <meshStandardMaterial color={island.color} roughness={0.9} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
};

// ─────────────────────────────────────────────
// Sky / atmospheric elements
// ─────────────────────────────────────────────
const SkyElements: React.FC = () => {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.02;
  });

  return (
    <group>
      {/* Distant atmosphere ring */}
      <mesh ref={ringRef} position={[0, -20, 0]}>
        <torusGeometry args={[180, 3, 4, 128]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.03} />
      </mesh>
      {/* Fog plane */}
      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[500, 500]} />
        <meshBasicMaterial color="#030708" transparent opacity={0.6} />
      </mesh>
    </group>
  );
};
