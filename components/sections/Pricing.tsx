"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlowCard } from "@/components/ui/spotlight-card";

gsap.registerPlugin(ScrollTrigger);

const features = [
  "Live Trading Daily at 9:30am EST",
  "Personal 1-1 Calls Whenever",
  "Premium Chat Room Access",
  "Live Entries & Exits",
  "6-Figure Technical Analysis",
  "Exclusive Long Term Portfolio",
  "Daily Bias Breakdowns",
  "Psychology & Mindset Coaching",
];

export function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".pricing-card-outer", {
        opacity: 0,
        y: 80,
        scale: 0.9,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pricing-card-outer",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern opacity-5" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Header */}
        <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
          Simple Pricing
        </span>
        <h2 className="font-display text-5xl md:text-7xl tracking-tight leading-none mb-4">
          One Plan.
          <br />
          <span className="text-text-secondary">Everything Included.</span>
        </h2>
        <p className="text-lg text-text-secondary mb-16 max-w-xl mx-auto">
          No tiers, no upsells, no hidden fees. Full access from day one.
        </p>

        {/* Pricing Card with Spotlight */}
        <div className="pricing-card-outer flex justify-center">
          <GlowCard
            customSize
            className="w-full max-w-[400px]"
          >
            {/* Card inner content */}
            <div className="relative flex flex-col z-10">
              {/* Top glass strip */}
              <div className="mx-5 mt-5 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="size-3.5 text-accent" />
                  <span className="text-[11px] font-semibold text-accent tracking-wider uppercase animate-pulse">
                    Price Increasing Soon
                  </span>
                  <Zap className="size-3.5 text-accent" />
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-mono text-6xl font-bold text-text-primary">
                    $80
                  </span>
                  <span className="text-lg text-text-secondary">/mo</span>
                </div>
                <p className="text-xs text-text-muted mt-1">
                  Everything you need to become profitable
                </p>
              </div>

              {/* Features list */}
              <div className="px-6 py-6 space-y-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="size-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Check className="size-3 text-accent" />
                    </div>
                    <span className="text-sm text-text-secondary text-left">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="px-6 pb-6 space-y-3">
                <a
                  href="https://whop.com/checkout/53IXMCH14M0cvMTrhf-eQa7-b6Wz-vS2b-VK7cMZumrRuz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-background font-bold text-base rounded-2xl cursor-pointer transition-all hover:brightness-110 glow-green"
                >
                  Join Today
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="https://whop.com/c/tempotrades/claim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-white/10 text-text-secondary font-medium text-sm rounded-2xl cursor-pointer transition-all hover:border-accent/30 hover:text-text-primary"
                >
                  Start with a free 7-day trial
                </a>
              </div>

              {/* Bottom dots */}
              <div className="flex justify-center gap-2 pb-5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "size-1.5 rounded-full",
                      i === 0 ? "bg-accent" : "bg-white/20"
                    )}
                  />
                ))}
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
