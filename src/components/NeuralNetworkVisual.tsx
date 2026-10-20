import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  pulsePhase: number;
}

interface DataPacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 130,
    };

    let shockwaves: Shockwave[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      shockwaves.push({
        x: clickX,
        y: clickY,
        radius: 5,
        maxRadius: 180,
        alpha: 0.9,
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    const nodeCount = Math.min(Math.floor((width * height) / 8500), 45);
    let nodes: Node[] = [];
    let packets: DataPacket[] = [];

    const isDark = theme === 'dark';
    const colors = isDark
      ? ['#38BDF8', '#818CF8', '#A78BFA', '#C084FC', '#67E8F9']
      : ['#0284C7', '#4F46E5', '#7C3AED', '#9333EA', '#0891B2'];

    const initNodes = () => {
      nodes = [];
      packets = [];
      for (let i = 0; i < nodeCount; i++) {
        const radius = Math.random() * 2.5 + 2;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.65),
          vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.65),
          radius,
          baseRadius: radius,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    initNodes();

    // Periodically spawn data packets travelling along synapse connections
    const spawnPacket = () => {
      if (nodes.length < 2 || prefersReducedMotion) return;
      const from = Math.floor(Math.random() * nodes.length);
      // find nearest neighbor within connection distance
      const neighbors: number[] = [];
      for (let j = 0; j < nodes.length; j++) {
        if (j === from) continue;
        const dx = nodes[from].x - nodes[j].x;
        const dy = nodes[from].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < 120) {
          neighbors.push(j);
        }
      }

      if (neighbors.length > 0 && packets.length < 18) {
        const to = neighbors[Math.floor(Math.random() * neighbors.length)];
        packets.push({
          fromNode: from,
          toNode: to,
          progress: 0,
          speed: Math.random() * 0.015 + 0.012,
          color: nodes[from].color,
        });
      }
    };

    const packetInterval = setInterval(spawnPacket, 300);

    // Main Canvas Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const maxDistance = 115;

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (isDark ? 0.35 : 0.22);
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

      // Draw & animate data packets travelling along synapses
      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p];
        const nFrom = nodes[pkt.fromNode];
        const nTo = nodes[pkt.toNode];

        if (!nFrom || !nTo) {
          packets.splice(p, 1);
          continue;
        }

        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const px = nFrom.x + (nTo.x - nFrom.x) * pkt.progress;
        const py = nFrom.y + (nTo.y - nFrom.y) * pkt.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = pkt.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Render shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 3.5;
        sw.alpha -= 0.02;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(s, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(99, 102, 241, ${sw.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw & update nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          node.pulsePhase += 0.03;

          // Mouse attraction/repulsion
          const mdx = node.x - mouse.x;
          const mdy = node.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < mouse.radius) {
            const force = (1 - mDist / mouse.radius) * 1.8;
            node.x += (mdx / mDist) * force;
            node.y += (mdy / mDist) * force;
            node.radius = node.baseRadius * 1.6;
          } else {
            node.radius = node.baseRadius + Math.sin(node.pulsePhase) * 0.6;
          }

          // Shockwave perturbation
          for (const sw of shockwaves) {
            const sdx = node.x - sw.x;
            const sdy = node.y - sw.y;
            const sDist = Math.sqrt(sdx * sdx + sdy * sdy);
            if (Math.abs(sDist - sw.radius) < 20) {
              node.x += (sdx / sDist) * 3;
              node.y += (sdy / sDist) * 3;
            }
          }

          // Boundary bouncing
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(1.5, node.radius), 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isDark ? 10 : 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(packetInterval);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
    };
  }, [theme]);

  return (
    <div className="relative w-full h-full min-h-[340px] lg:min-h-[440px] rounded-2xl overflow-hidden glass-panel border border-white/10 flex items-center justify-center shadow-2xl">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer"
        title="Click to pulse the neural network"
      />
      
      {/* Central stylized AI core overlay */}
      <div className="relative pointer-events-none z-10 p-6 flex flex-col items-center text-center max-w-xs backdrop-blur-md bg-black/40 dark:bg-black/60 border border-white/10 rounded-2xl shadow-2xl">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-3 animate-pulse">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <p className="text-xs font-mono uppercase tracking-widest text-sky-400 dark:text-sky-300 font-semibold mb-1">
          Neural Node Fabric
        </p>
        <p className="text-[11px] text-slate-300 dark:text-slate-400">
          Synaptic data packets active • Click to pulse network
        </p>
      </div>

      {/* Tech coordinate accents */}
      <div className="absolute top-3 left-3 font-mono text-[10px] text-slate-400 dark:text-slate-500 pointer-events-none flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        01_AGY // SYNAPSE ACTIVE
      </div>
      <div className="absolute bottom-3 right-3 font-mono text-[10px] text-slate-400 dark:text-slate-500 pointer-events-none">
        INTERACTIVE • 60 FPS
      </div>
    </div>
  );
};
