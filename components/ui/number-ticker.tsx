"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface NumberTickerProps {
  target: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
  decimals?: number;
}

export function NumberTicker({
  target,
  prefix = "",
  suffix = "",
  className = "",
  duration = 2000,
  decimals = 0,
}: NumberTickerProps) {
  const [value, setValue] = useState(0);
  const hasAnimatedRef = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  const startAnimation = useCallback(() => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (decimals > 0) {
        setValue(parseFloat(current.toFixed(decimals)));
      } else {
        setValue(Math.floor(current));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration, decimals]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [startAnimation]);

  const display = decimals > 0
    ? value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : value.toLocaleString();

  return (
    <span ref={ref} className={`font-mono tabular-nums ${className}`}>
      {prefix}{display}{suffix}
    </span>
  );
}
