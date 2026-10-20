import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  connections: number[];
  color: string;
}

export const NeuralNetworkVisual: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse coordinates for interactive gentle repulsion/attraction
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Node configuration
    const nodeCount = Math.min(Math.floor((width * height) / 9000), 48);
    let nodes: Node[] = [];

    const isDark = theme === 'dark';
    const colors = isDark
      ? ['#38BDF8', '#818CF8', '#A78BFA', '#C084FC', '#67E8F9']
      : ['#0284C7', '#4F46E5', '#7C3AED', '#9333EA', '#0891B2'];

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const radius = Math.random() * 2 + 2;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.6),
          vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.6),
          radius,
          baseRadius: radius,
          connections: [],
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    initNodes();

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connection distance threshold
      const maxDistance = 110;

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (isDark ? 0.35 : 0.25);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);

            const gradient = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y
            );
            gradient.addColorStop(0, nodes[i].color);
            gradient.addColorStop(1, nodes[j].color);

            ctx.strokeStyle = gradient;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Draw & update nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          // Normal velocity
          node.x += node.vx;
          node.y += node.vy;

          // Gentle mouse interaction
          const mdx = node.x - mouse.x;
          const mdy = node.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < mouse.radius) {
            const force = (1 - mDist / mouse.radius) * 1.5;
            node.x += (mdx / mDist) * force;
            node.y += (mdy / mDist) * force;
            node.radius = node.baseRadius * 1.5;
          } else {
            node.radius = node.baseRadius;
          }

          // Boundary bounce
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
        }

        // Draw node with glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isDark ? 8 : 4;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <div className="relative w-full h-full min-h-[320px] lg:min-h-[420px] rounded-2xl overflow-hidden glass-panel border border-white/10 dark:border-white/10 flex items-center justify-center shadow-2xl">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair"
      />
      
      {/* Central stylized AI core overlay */}
      <div className="relative pointer-events-none z-10 p-6 flex flex-col items-center text-center max-w-xs backdrop-blur-md bg-black/40 dark:bg-black/50 border border-white/10 rounded-2xl shadow-xl">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-3 animate-pulse-subtle">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <p className="text-xs font-mono uppercase tracking-widest text-sky-400 dark:text-sky-300 font-semibold mb-1">
          Neural Node Fabric
        </p>
        <p className="text-xs text-slate-300 dark:text-slate-400">
          Interactive computational mesh • Hover to perturb
        </p>
      </div>

      {/* Subtle corner tech accents */}
      <div className="absolute top-3 left-3 font-mono text-[10px] text-slate-400 dark:text-slate-500 pointer-events-none">
        01_AGY // SYNAPSE
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-[10px] text-slate-400 dark:text-slate-500 pointer-events-none">
        STATUS: ACTIVE
      </div>
    </div>
  );
};
