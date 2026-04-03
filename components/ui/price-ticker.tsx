"use client";

import { generateTickerData } from "@/lib/candlestick-data";

export function PriceTicker({ className = "" }: { className?: string }) {
  const tickers = generateTickerData();
  const tickerContent = tickers.map((t) => (
    <span key={t.symbol} className="inline-flex items-center gap-2 px-6">
      <span className="font-mono text-sm text-text-secondary">{t.symbol}</span>
      <span className="font-mono text-sm text-text-primary">
        {t.price.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
      <span
        className={`font-mono text-sm ${t.up ? "text-accent" : "text-destructive"}`}
      >
        {t.up ? "▲" : "▼"} {t.up ? "+" : ""}
        {t.change}%
      </span>
      <span className="text-text-muted">|</span>
    </span>
  ));

  return (
    <div
      className={`relative overflow-hidden bg-surface/50 border-y border-border ${className}`}
      aria-hidden="true"
    >
      <div className="flex animate-ticker whitespace-nowrap py-3">
        <div className="flex shrink-0">{tickerContent}</div>
        <div className="flex shrink-0">{tickerContent}</div>
        <div className="flex shrink-0">{tickerContent}</div>
      </div>
      <style jsx>{`
        @keyframes ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
