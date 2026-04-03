"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-500 ${
        scrolled
          ? "glass-elevated shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#" className="font-display text-2xl tracking-wider text-text-primary">
          TEMPO TRADES
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#story" className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
            About
          </a>
          <a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
            Features
          </a>
          <a href="#community" className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
            Community
          </a>
          <a href="#pricing" className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
            Pricing
          </a>
          <a
            href="https://whop.com/c/tempotrades/claim"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 bg-accent text-background font-semibold text-sm rounded-xl hover:brightness-110 transition-all cursor-pointer glow-green"
          >
            Start Free Trial
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-text-primary cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
        >
          <a href="#story" className="text-sm text-text-secondary py-2 cursor-pointer" onClick={() => setMobileOpen(false)}>
            About
          </a>
          <a href="#features" className="text-sm text-text-secondary py-2 cursor-pointer" onClick={() => setMobileOpen(false)}>
            Features
          </a>
          <a href="#community" className="text-sm text-text-secondary py-2 cursor-pointer" onClick={() => setMobileOpen(false)}>
            Community
          </a>
          <a href="#pricing" className="text-sm text-text-secondary py-2 cursor-pointer" onClick={() => setMobileOpen(false)}>
            Pricing
          </a>
          <a
            href="https://whop.com/c/tempotrades/claim"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-3 bg-accent text-background font-semibold text-sm rounded-xl cursor-pointer"
          >
            Start Free Trial
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
