"use client";

import { motion } from "motion/react";

interface BlurStaggerTextProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[];
  triggerOnView?: boolean;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.015,
    },
  },
};

const letterAnimation = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    filter: "blur(0px)",
  },
};

export function BlurStaggerText({
  text,
  className = "",
  delay = 0,
  highlightWords = [],
  triggerOnView = false,
}: BlurStaggerTextProps) {
  const words = text.split(" ");

  const containerWithDelay = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
        delayChildren: delay,
      },
    },
  };

  const viewProps = triggerOnView
    ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-100px" } }
    : { initial: "hidden", animate: "show" };

  return (
    <motion.span
      className={`inline ${className}`}
      variants={containerWithDelay}
      {...viewProps}
    >
      {words.map((word, wi) => {
        const isHighlight = highlightWords.some((hw) =>
          word.toLowerCase().includes(hw.toLowerCase())
        );
        return (
          <span key={`${word}-${wi}`} className="inline-block">
            {word.split("").map((char, ci) => (
              <motion.span
                key={`${char}-${wi}-${ci}`}
                className={`inline-block ${isHighlight ? "text-accent" : ""}`}
                variants={letterAnimation}
                transition={{ duration: 0.3 }}
              >
                {char}
              </motion.span>
            ))}
            {wi < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </motion.span>
  );
}
