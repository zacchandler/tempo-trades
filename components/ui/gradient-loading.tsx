"use client";

import { motion } from "motion/react";

export function GradientLoading() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.6, delay: 2.0, ease: "easeInOut" }}
      onAnimationComplete={(def: { opacity?: number }) => {
        if (def.opacity === 0) {
          const el = document.getElementById("loading-screen");
          if (el) el.style.display = "none";
        }
      }}
      id="loading-screen"
    >
      {/* Gradient traces */}
      <div className="relative w-48 h-48">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, oklch(0.75 0.18 155), transparent)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: 1, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 rounded-full"
          style={{
            background:
              "conic-gradient(from 180deg, transparent, oklch(0.65 0.15 250), transparent)",
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.2, repeat: 1, ease: "linear" }}
        />
        <div className="absolute inset-8 rounded-full bg-background flex items-center justify-center">
          <motion.span
            className="font-display text-3xl tracking-wider text-text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            TEMPO
          </motion.span>
        </div>
      </div>

      {/* Progress line */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-border overflow-hidden rounded-full"
      >
        <motion.div
          className="h-full bg-accent rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </motion.div>
    </motion.div>
  );
}
