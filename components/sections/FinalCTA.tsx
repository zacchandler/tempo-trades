"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-headline", {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-headline",
          start: "top 85%",
        },
      });
      gsap.from(".cta-buttons", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cta-buttons",
          start: "top 90%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Subtle radial gradient — matches default background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.75_0.18_155/0.04)_0%,transparent_50%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2 className="cta-headline font-display text-6xl md:text-8xl lg:text-9xl tracking-tight leading-none mb-6">
          Your Next Trade
          <br />
          Could Change
          <br />
          <span className="text-accent">Everything</span>
        </h2>

        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12">
          Join 400+ traders who stopped guessing and started winning.
        </p>

        <div className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://whop.com/c/tempotrades/claim"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-background font-bold text-lg rounded-2xl cursor-pointer transition-all hover:scale-[1.03] active:scale-[0.97] glow-green-intense"
          >
            Start Free Trial
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="https://whop.com/checkout/53IXMCH14M0cvMTrhf-eQa7-b6Wz-vS2b-VK7cMZumrRuz/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-text-primary font-semibold text-lg rounded-2xl cursor-pointer transition-all hover:border-accent/30 hover:bg-accent/5"
          >
            Join Now — $80/mo
          </a>
        </div>

        <p className="text-sm text-text-muted mt-6">
          100% Risk Free — Cancel During Trial, Pay Nothing
        </p>
      </div>
    </section>
  );
}
