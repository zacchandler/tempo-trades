"use client";

import { motion } from "motion/react";
import { FluidBackground } from "@/components/ui/fluid-background";
import { CandlestickChart } from "@/components/ui/candlestick-chart";
import { BlurStaggerText } from "@/components/ui/blur-stagger-text";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <FluidBackground className="opacity-60" />
      <div className="absolute inset-0 opacity-[0.08]">
        <CandlestickChart variant="hero" candleCount={50} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Profile picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.3, duration: 0.5 }}
          className="mb-8"
        >
          <Image
            src="/images/logo.jpg"
            alt="Tempo Trades"
            width={80}
            height={80}
            className="mx-auto rounded-2xl border border-white/10"
            priority
          />
        </motion.div>

        {/* Pre-headline badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 mb-8"
        >
          <div className="size-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            For Serious Traders Only
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-display text-7xl md:text-9xl lg:text-[11rem] tracking-tight leading-none mb-6">
          <BlurStaggerText
            text="Trade Smarter."
            delay={2.7}
          />
          <br />
          <BlurStaggerText
            text="$10k/mo+."
            delay={3.0}
            highlightWords={["$10k/mo+."]}
          />
        </h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: 0.5 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          A proven ICT strategy, taught live every morning.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.6, duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          className="flex flex-col items-center gap-3"
        >
          <a
            href="https://whop.com/c/tempotrades/claim"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-accent text-background font-bold text-lg rounded-2xl cursor-pointer transition-all hover:scale-[1.03] active:scale-[0.97]"
          >
            <span className="absolute inset-0 rounded-2xl glow-green-intense opacity-50 group-hover:opacity-80 transition-opacity" />
            <span className="relative z-10">Start Your Free 7-Day Trial</span>
          </a>
          <span className="text-sm text-text-muted">
            100% Risk Free — Cancel Anytime
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.0, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-6 text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
