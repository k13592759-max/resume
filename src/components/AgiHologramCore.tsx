import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Cpu } from 'lucide-react';

export const AgiHologramCore: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [activeMode, setActiveMode] = useState<'neural' | 'core' | 'vortex'>('core');
  const [telemetry, setTelemetry] = useState({
    fps: 60,
    particles: 1200,
    synapses: 480,
    entropy: '0.042',
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Setup Three.js Scene, Camera, Renderer
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 420;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Group to hold all 3D objects for mouse rotation
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Colors
    const isDark = theme === 'dark';
    const primaryColor = new THREE.Color(isDark ? 0x38bdf8 : 0x0284c7); // sky
    const secondaryColor = new THREE.Color(isDark ? 0x818cf8 : 0x4f46e5); // indigo
    const accentColor = new THREE.Color(isDark ? 0xc084fc : 0x9333ea); // violet

    // 1. 3D Particle Sphere (Neural Lattice)
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 7.5 + (Math.random() - 0.5) * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color gradient across coordinates
      const mixRatio = Math.random();
      const mixedColor = primaryColor.clone().lerp(accentColor, mixRatio);

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.3, 'rgba(129, 140, 248, 0.8)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    mainGroup.add(particles);

    // 2. 3D Gyroscopic Orbital Rings
    const ringGroup = new THREE.Group();
    mainGroup.add(ringGroup);

    const createRing = (radius: number, color: THREE.Color, rotX: number, rotY: number) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.04, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: isDark ? 0.75 : 0.5,
        wireframe: true,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = rotX;
      ring.rotation.y = rotY;
      return ring;
    };

    const ring1 = createRing(8.8, primaryColor, Math.PI / 4, 0);
    const ring2 = createRing(9.4, secondaryColor, -Math.PI / 3, Math.PI / 6);
    const ring3 = createRing(10.0, accentColor, Math.PI / 6, -Math.PI / 4);

    ringGroup.add(ring1);
    ringGroup.add(ring2);
    ringGroup.add(ring3);

    // 3. Central Wireframe Geometry (Icosahedron Core)
    const coreGeo = new THREE.IcosahedronGeometry(4, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.45 : 0.3,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 4. Inner glowing nucleus
    const nucleusGeo = new THREE.SphereGeometry(1.6, 24, 24);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: false,
      transparent: true,
      opacity: isDark ? 0.8 : 0.6,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    mainGroup.add(nucleus);

    // Mouse Parallax & Tracking
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / height) * 2 - 1);
      targetRotationY = mouseX * 0.9;
      targetRotationX = -mouseY * 0.9;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Continuous rotation
        particles.rotation.y = elapsedTime * 0.12;
        particles.rotation.x = Math.sin(elapsedTime * 0.08) * 0.15;

        // Orbital rings precession
        ring1.rotation.z = elapsedTime * 0.35;
        ring2.rotation.z = -elapsedTime * 0.28;
        ring3.rotation.y = elapsedTime * 0.42;

        // Core breathing
        const scale = 1 + Math.sin(elapsedTime * 2) * 0.06;
        coreMesh.scale.set(scale, scale, scale);
        coreMesh.rotation.x = elapsedTime * 0.25;
        coreMesh.rotation.y = elapsedTime * 0.35;

        // Nucleus gentle pulse
        const nScale = 1 + Math.cos(elapsedTime * 3) * 0.12;
        nucleus.scale.set(nScale, nScale, nScale);

        // Smooth mouse parallax lerp
        mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
        mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Entropy telemetry ticker
    const telemetryInterval = setInterval(() => {
      setTelemetry({
        fps: 60,
        particles: 1400,
        synapses: 480 + Math.floor(Math.sin(Date.now() * 0.002) * 24),
        entropy: (0.042 + Math.random() * 0.006).toFixed(4),
      });
    }, 1500);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(telemetryInterval);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      geometry.dispose();
      particleMaterial.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
    };
  }, [theme, activeMode]);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[480px] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl flex flex-col justify-between">
      
      {/* Top Cybernetic HUD Header */}
      <div className="relative z-20 p-4 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/60 dark:bg-black/60 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-300 font-semibold tracking-wider">CGA // 3D AGI CORE</span>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md text-[11px]">
          <button
            onClick={() => setActiveMode('core')}
            className={`px-2.5 py-0.5 rounded-lg transition-all ${
              activeMode === 'core'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Core
          </button>
          <button
            onClick={() => setActiveMode('neural')}
            className={`px-2.5 py-0.5 rounded-lg transition-all ${
              activeMode === 'neural'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Lattice
          </button>
          <button
            onClick={() => setActiveMode('vortex')}
            className={`px-2.5 py-0.5 rounded-lg transition-all ${
              activeMode === 'vortex'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Vortex
          </button>
        </div>
      </div>

      {/* WebGL 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        title="Interactive 3D AGI Hologram • Drag or move cursor to orbit"
      />

      {/* Bottom Telemetry HUD Bar */}
      <div className="relative z-20 p-3 sm:p-4 border-t border-white/10 bg-slate-900/40 dark:bg-black/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-sky-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>NODES: {telemetry.particles}</span>
          </span>
          <span className="hidden sm:inline text-indigo-400">
            SYNAPSES: {telemetry.synapses}
          </span>
          <span className="text-emerald-400">
            FPS: {telemetry.fps} (60Hz)
          </span>
        </div>

        <div className="flex items-center gap-2 ml-auto text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>THREE.JS WEBGL RENDER</span>
        </div>
      </div>

    </div>
  );
};
