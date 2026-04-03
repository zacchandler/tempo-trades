"use client";

import { motion } from "motion/react";

interface PnlCardProps {
  date: string;
  pnl: string;
  trades: number;
  winRate: string;
  className?: string;
}

export function PnlCard({ date, pnl, trades, winRate, className = "" }: PnlCardProps) {
  const bars = Array.from({ length: trades }, (_, i) => ({
    height: 20 + Math.random() * 40,
    positive: Math.random() > 0.35,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl border border-white/10 bg-[#1e1f22] p-4 font-mono text-sm ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[#949ba4] text-xs">{date}</span>
        <span className="text-accent font-semibold">Net P&L {pnl}</span>
      </div>

      <div className="flex items-end gap-1 h-12 mb-3">
        {bars.map((bar, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-sm ${bar.positive ? "bg-accent/70" : "bg-destructive/60"}`}
            style={{ height: `${bar.height}%` }}
          />
        ))}
      </div>

      <div className="flex justify-between text-xs text-[#b5bac1]">
        <span>Total Trades: {trades}</span>
        <span>Win Rate: {winRate}</span>
      </div>
    </motion.div>
  );
}
