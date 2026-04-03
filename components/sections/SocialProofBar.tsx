"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
import { motion } from "motion/react";

export function SocialProofBar() {
  return (
    <section className="relative py-10 border-y border-border bg-surface/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* 400+ Students */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0, duration: 0.5 }}
            className="text-center"
          >
            <NumberTicker
              target={400}
              suffix="+"
              className="text-4xl md:text-5xl font-bold text-text-primary"
              duration={2000}
            />
            <p className="text-sm text-text-secondary mt-2">Students</p>
          </motion.div>

          {/* $10k+ Monthly */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-center"
          >
            <NumberTicker
              target={10}
              prefix="$"
              suffix="k+"
              className="text-4xl md:text-5xl font-bold text-text-primary"
              duration={1500}
            />
            <p className="text-sm text-text-secondary mt-2">Monthly</p>
          </motion.div>

          {/* 600+ 5-Star Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center"
          >
            <NumberTicker
              target={600}
              suffix="+"
              className="text-4xl md:text-5xl font-bold text-text-primary"
              duration={2000}
            />
            <p className="text-sm text-text-secondary mt-2">5-Star Reviews</p>
          </motion.div>

          {/* 9:30am EST */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center"
          >
            <span className="font-mono text-4xl md:text-5xl font-bold text-text-primary tabular-nums">
              9:30am
            </span>
            <p className="text-sm text-text-secondary mt-2">Live Daily EST</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
