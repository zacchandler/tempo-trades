"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  scatteredColor: string;
  life: number;
  vx: number;
  vy: number;
}

interface LogoParticlesProps {
  className?: string;
  imageSrc?: string;
  particleCount?: number;
  /** Size of the logo sampling area in px */
  logoSize?: number;
  /** Main particle color */
  color?: string;
  /** Scattered particle color on hover */
  scatterColor?: string;
  /** Canvas background — set "transparent" to inherit parent bg */
  background?: string;
  /** Mouse repel radius */
  repelRadius?: number;
}

export function LogoParticles({
  className = "",
  imageSrc = "/images/logo.jpg",
  particleCount = 4500,
  logoSize: logoSizeProp,
  color = "oklch(0.75 0.18 155)",
  scatterColor = "oklch(0.55 0.12 155)",
  background = "transparent",
  repelRadius = 50,
}: LogoParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const isTouchingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  const resolveColor = useCallback((oklch: string) => {
    // Canvas can't draw oklch directly in all browsers — convert via a temp element
    if (!oklch.startsWith("oklch")) return oklch;
    if (typeof document === "undefined") return "#00d26a";
    const el = document.createElement("div");
    el.style.color = oklch;
    document.body.appendChild(el);
    const resolved = getComputedStyle(el).color;
    document.body.removeChild(el);
    return resolved;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: background === "transparent" });
    if (!ctx) return;

    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    /* ── sizing ── */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const resolvedColor = resolveColor(color);
    const resolvedScatter = resolveColor(scatterColor);

    /* ── load logo image ── */
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    let particles: Particle[] = [];
    let textImageData: ImageData | null = null;
    let animId = 0;

    img.onload = () => {
      const rect = canvas.getBoundingClientRect();
      const logoSize = logoSizeProp ?? (mobile ? Math.min(rect.width * 0.55, 220) : Math.min(rect.width * 0.65, 340));
      const scale = logoSize / Math.max(img.width, img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const ox = (rect.width - w) / 2;
      const oy = (rect.height - h) / 2;

      // Draw image to sample pixel data
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(img, ox, oy, w, h);
      textImageData = ctx.getImageData(
        0,
        0,
        rect.width * (window.devicePixelRatio || 1),
        rect.height * (window.devicePixelRatio || 1)
      );
      ctx.clearRect(0, 0, rect.width, rect.height);

      const dpr = window.devicePixelRatio || 1;

      function createParticle(): Particle | null {
        if (!textImageData) return null;
        const imgW = textImageData.width;
        const imgH = textImageData.height;
        const data = textImageData.data;

        for (let attempt = 0; attempt < 150; attempt++) {
          const px = Math.floor(Math.random() * imgW);
          const py = Math.floor(Math.random() * imgH);
          const idx = (py * imgW + px) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          // Only sample dark pixels (the logo shape) with some alpha
          if (a > 128 && r < 100 && g < 100 && b < 100) {
            const x = px / dpr;
            const y = py / dpr;

            // Vary the green brightness slightly for depth
            const brightness = 0.7 + Math.random() * 0.3;
            const particleColor =
              brightness > 0.85 ? resolvedColor : resolvedScatter;

            return {
              x,
              y,
              baseX: x,
              baseY: y,
              size: Math.random() * 1.8 + 0.4,
              color: particleColor,
              scatteredColor: "#ffffff",
              life: Math.floor(Math.random() * 200 + 80),
              vx: 0,
              vy: 0,
            };
          }
        }
        return null;
      }

      // Spawn initial particles
      const count = Math.floor(
        particleCount * Math.sqrt((rect.width * rect.height) / (1920 * 1080))
      );
      for (let i = 0; i < count; i++) {
        const p = createParticle();
        if (p) particles.push(p);
      }

      /* ── animation loop ── */
      function animate() {
        if (!ctx || !canvas) return;
        const rect = canvas.getBoundingClientRect();

        if (background === "transparent") {
          ctx.clearRect(0, 0, rect.width, rect.height);
        } else {
          ctx.fillStyle = background;
          ctx.fillRect(0, 0, rect.width, rect.height);
        }

        const { x: mx, y: my } = mouseRef.current;
        const r2 = repelRadius * repelRadius;

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist2 = dx * dx + dy * dy;

          if (
            dist2 < r2 &&
            (isTouchingRef.current || !("ontouchstart" in window))
          ) {
            const dist = Math.sqrt(dist2);
            const force = (repelRadius - dist) / repelRadius;
            const angle = Math.atan2(dy, dx);
            p.vx -= Math.cos(angle) * force * 3;
            p.vy -= Math.sin(angle) * force * 3;
            ctx.fillStyle = p.scatteredColor;
          } else {
            ctx.fillStyle = p.color;
          }

          // Spring back to base + velocity damping
          p.vx += (p.baseX - p.x) * 0.06;
          p.vy += (p.baseY - p.y) * 0.06;
          p.vx *= 0.88;
          p.vy *= 0.88;
          p.x += p.vx;
          p.y += p.vy;

          ctx.fillRect(p.x, p.y, p.size, p.size);

          p.life--;
          if (p.life <= 0) {
            const np = createParticle();
            if (np) {
              particles[i] = np;
            } else {
              particles.splice(i, 1);
            }
          }
        }

        // Replenish
        const target = Math.floor(
          particleCount *
            Math.sqrt((rect.width * rect.height) / (1920 * 1080))
        );
        let spawned = 0;
        while (particles.length < target && spawned < 10) {
          const np = createParticle();
          if (np) particles.push(np);
          spawned++;
        }

        animId = requestAnimationFrame(animate);
      }

      animate();
    };

    /* ── events ── */
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
    };
    const onTouchStart = () => {
      isTouchingRef.current = true;
    };
    const onTouchEnd = () => {
      isTouchingRef.current = false;
      mouseRef.current = { x: -9999, y: -9999 };
    };
    const onMouseLeave = () => {
      if (!("ontouchstart" in window)) {
        mouseRef.current = { x: -9999, y: -9999 };
      }
    };
    const onResize = () => {
      // Full re-init on resize
      cancelAnimationFrame(animId);
      particles = [];
      resize();
      // Re-trigger image processing
      img.onload?.(new Event("load"));
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    canvas.addEventListener("touchstart", onTouchStart);
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchend", onTouchEnd);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [
    imageSrc,
    particleCount,
    logoSizeProp,
    color,
    scatterColor,
    background,
    repelRadius,
    resolveColor,
    isMobile,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full touch-none ${className}`}
      aria-label="Interactive particle logo effect"
    />
  );
}
