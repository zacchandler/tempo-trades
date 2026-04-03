"use client";

import React, { useEffect, useRef, useCallback, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  customSize?: boolean;
  borderRadius?: number;
}

/**
 * Spotlight card with cursor-following border glow.
 * Uses a wrapper div with gradient bg as the "border" — inner div
 * covers the fill, leaving only the border gap visible.
 */
const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = "",
  glowColor = "oklch(0.75 0.18 155)",
  customSize = false,
  borderRadius = 24,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    const el = wrapperRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty("--glow-x", `${x}px`);
    el.style.setProperty("--glow-y", `${y}px`);

    // Fade based on distance from card
    const dx = Math.max(0, -x, x - rect.width);
    const dy = Math.max(0, -y, y - rect.height);
    const dist = Math.sqrt(dx * dx + dy * dy);
    const opacity = Math.max(0, 1 - dist / 150);
    el.style.setProperty("--glow-opacity", opacity.toFixed(3));
  }, []);

  useEffect(() => {
    document.addEventListener("pointermove", handlePointerMove);
    return () => document.removeEventListener("pointermove", handlePointerMove);
  }, [handlePointerMove]);

  const br = `${borderRadius}px`;

  return (
    <div
      ref={wrapperRef}
      className={`relative group ${!customSize ? "w-64" : ""} ${className}`}
      style={
        {
          "--glow-x": "50%",
          "--glow-y": "50%",
          "--glow-opacity": "0",
          "--glow-color": glowColor,
          borderRadius: br,
          padding: "2px",
        } as React.CSSProperties
      }
    >
      {/* Gradient border layer */}
      <div
        className="absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: "var(--glow-opacity)" as unknown as number,
          background: `radial-gradient(
            600px circle at var(--glow-x) var(--glow-y),
            var(--glow-color),
            transparent 40%
          )`,
          borderRadius: br,
        }}
      />

      {/* Subtle ambient border */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: br,
        }}
      />

      {/* Surface glow (inner fill glow) */}
      <div
        className="absolute inset-[2px] rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: "calc(var(--glow-opacity) * 0.15)" as unknown as number,
          background: `radial-gradient(
            400px circle at var(--glow-x) var(--glow-y),
            var(--glow-color),
            transparent 40%
          )`,
          borderRadius: `${borderRadius - 2}px`,
        }}
      />

      {/* Card fill */}
      <div
        className="relative rounded-[inherit] bg-[hsl(0_0%_7%)] z-10"
        style={{ borderRadius: `${borderRadius - 2}px` }}
      >
        {children}
      </div>
    </div>
  );
};

export { GlowCard };
