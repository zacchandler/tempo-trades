"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DiscordMockup } from "@/components/ui/discord-mockup";

gsap.registerPlugin(ScrollTrigger);

export function DiscordShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header text reveal
      gsap.from(".discord-heading", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".discord-heading",
          start: "top 85%",
        },
      });

      // Mockup 3D entrance — plays once when section enters viewport
      gsap.from(".discord-mockup-wrapper", {
        scale: 0.85,
        rotateX: 8,
        rotateY: -3,
        filter: "blur(20px)",
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".discord-mockup-wrapper",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // All messages appear with a fast stagger — no scroll required
      gsap.utils
        .toArray<HTMLElement>('[class*="discord-message-"]')
        .forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            y: 25,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.3 + i * 0.08,
            scrollTrigger: {
              trigger: ".discord-mockup-wrapper",
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });

      // PnL cards
      gsap.from(".discord-pnl-card", {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.6,
        scrollTrigger: {
          trigger: ".discord-mockup-wrapper",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="community" ref={sectionRef} className="relative">
      <div className="discord-section-inner relative flex flex-col items-center justify-center py-24 md:py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute inset-0 grid-pattern opacity-10" />

        {/* Header */}
        <div className="relative z-10 text-center mb-16 px-6">
          <h2 className="discord-heading font-display text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-4">
            This Is Where Traders
            <br />
            <span className="text-accent">Level Up</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Real-time entries, live analysis, and a community of traders who actually post their results.
          </p>
        </div>

        {/* Discord Mockup */}
        <div
          className="discord-mockup-wrapper relative z-10 w-full max-w-5xl mx-auto px-4"
          style={{ perspective: "1200px" }}
        >
          <DiscordMockup />

          {/* Reflection glow */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-accent/5 blur-3xl rounded-full" />
        </div>

        {/* CTA below mockup */}
        <div className="relative z-10 text-center mt-16 px-6">
          <a
            href="https://whop.com/c/tempotrades/claim"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-background font-bold text-lg rounded-2xl cursor-pointer transition-all hover:scale-[1.03] active:scale-[0.97] glow-green"
          >
            Join The Community
          </a>
          <p className="text-sm text-text-muted mt-4">
            400+ active traders. Daily live sessions. Proof, not promises.
          </p>
        </div>
      </div>
    </section>
  );
}
