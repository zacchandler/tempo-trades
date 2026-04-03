"use client";

import { useEffect, useRef, useCallback } from "react";
import { generateCandlestickData, type CandleData } from "@/lib/candlestick-data";

interface CandlestickChartProps {
  variant?: "hero" | "strip" | "floating";
  className?: string;
  candleCount?: number;
}

const COLORS = {
  bullish: "rgba(0, 210, 106, 0.8)",
  bullishGlow: "rgba(0, 210, 106, 0.3)",
  bearish: "rgba(180, 60, 60, 0.7)",
  grid: "rgba(255, 255, 255, 0.04)",
  bg: "#0a0a0a",
};

export function CandlestickChart({
  variant = "hero",
  className = "",
  candleCount = 60,
}: CandlestickChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const candlesRef = useRef<CandleData[]>([]);
  const offsetRef = useRef(0);

  const drawCandles = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const candles = candlesRef.current;
      if (!candles.length) return;

      ctx.clearRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 0.5;
      const gridSpacing = variant === "strip" ? 30 : 60;
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Calculate price range
      let minPrice = Infinity,
        maxPrice = -Infinity;
      for (const c of candles) {
        if (c.low < minPrice) minPrice = c.low;
        if (c.high > maxPrice) maxPrice = c.high;
      }
      const priceRange = maxPrice - minPrice || 1;
      const padding = variant === "strip" ? 5 : 20;
      const candleWidth = Math.max(
        3,
        (width - padding * 2) / candles.length - 2
      );
      const gap = 2;

      candles.forEach((candle, i) => {
        const x = padding + i * (candleWidth + gap) - offsetRef.current;
        if (x < -candleWidth || x > width + candleWidth) return;

        const yHigh =
          padding +
          ((maxPrice - candle.high) / priceRange) * (height - padding * 2);
        const yLow =
          padding +
          ((maxPrice - candle.low) / priceRange) * (height - padding * 2);
        const yOpen =
          padding +
          ((maxPrice - candle.open) / priceRange) * (height - padding * 2);
        const yClose =
          padding +
          ((maxPrice - candle.close) / priceRange) * (height - padding * 2);

        const color = candle.bullish ? COLORS.bullish : COLORS.bearish;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        // Wick
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + candleWidth / 2, yHigh);
        ctx.lineTo(x + candleWidth / 2, yLow);
        ctx.stroke();

        // Body
        const bodyTop = Math.min(yOpen, yClose);
        const bodyHeight = Math.max(Math.abs(yClose - yOpen), 1);
        ctx.fillRect(x, bodyTop, candleWidth, bodyHeight);

        // Glow on latest candle
        if (i === candles.length - 1 && candle.bullish) {
          ctx.shadowColor = COLORS.bullishGlow;
          ctx.shadowBlur = 15;
          ctx.fillRect(x, bodyTop, candleWidth, bodyHeight);
          ctx.shadowBlur = 0;
        }
      });
    },
    [variant]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    candlesRef.current = generateCandlestickData(candleCount);

    let lastTime = 0;
    const newCandleInterval = 2500;

    const animate = (time: number) => {
      const rect = canvas.getBoundingClientRect();

      if (time - lastTime > newCandleInterval) {
        lastTime = time;
        const lastCandle = candlesRef.current[candlesRef.current.length - 1];
        const newCandles = generateCandlestickData(1, lastCandle?.close ?? 5800);
        candlesRef.current.push(newCandles[0]);
        if (candlesRef.current.length > candleCount + 20) {
          candlesRef.current.shift();
        }
      }

      drawCandles(ctx, rect.width, rect.height);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [candleCount, drawCandles]);

  const heightClass =
    variant === "strip"
      ? "h-[100px]"
      : variant === "floating"
        ? "h-[200px]"
        : "h-full";

  return (
    <canvas
      ref={canvasRef}
      className={`w-full ${heightClass} ${className}`}
      style={{ display: "block" }}
      aria-hidden="true"
    />
  );
}
