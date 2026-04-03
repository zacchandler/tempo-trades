"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlurStaggerText } from "@/components/ui/blur-stagger-text";
import { LogoParticles } from "@/components/ui/logo-particles";

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  "If you're reading this, congratulations. You have now made the first step in your journey to profitability.",
  "I've been lucky enough to make a lot of money in my career, but it was not always sunshine and rainbows.",
  "I was just like you. An emotional, confused, and unprofitable trader who wouldn't listen to their trade plan and blew funded accounts off emotional mistakes.",
  "I consumed 4-5+ hours of ICT content DAILY sitting at my desk, until I finally found the strategy that changed my life and those around me, forever.",
  "And now, I'm finally ready to pass the same strategy I use that makes me 10k/mo+ consistently to all of you and jumpstart your trading journey.",
  "The next step is to join the community of over 400 students that have trusted me enough to lead them to profitability.",
];

export function Story() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".story-paragraph").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: i * 0.05,
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5 grid-pattern" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text column */}
          <div>
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
              <BlurStaggerText text="The Journey" triggerOnView />
            </span>
            <h2 className="font-display text-5xl md:text-7xl tracking-tight leading-none mb-10">
              <BlurStaggerText text="I Was Just" triggerOnView />
              <br />
              <BlurStaggerText text="Like You" triggerOnView highlightWords={["Like", "You"]} />
            </h2>

            <div className="space-y-6">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="story-paragraph text-lg text-text-secondary leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Particle logo column */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-[400px] h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <LogoParticles
                imageSrc={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/images/logo.jpg`}
                logoSize={340}
                particleCount={5000}
                repelRadius={60}
              />
            </div>
            {/* Subtle glow behind */}
            <div className="absolute -inset-8 bg-accent/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
