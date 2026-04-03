"use client";

import { FlippingCard } from "@/components/ui/flipping-card";
import { BlurStaggerText } from "@/components/ui/blur-stagger-text";
import { motion } from "motion/react";

const features = [
  {
    title: "Live Trading Daily",
    description:
      "Trade live every weekday at 9:30am EST. Learn the backend process of a profitable trader from psychology to entire thought process.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
  },
  {
    title: "A Winning Strategy",
    description:
      "Watch and learn the strategy that got me to profitability. Currently making 33k monthly.",
    image:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop",
  },
  {
    title: "Live Entries and Exits",
    description:
      "Learn and master the knowledge behind a 6-figure trader. Understand the psychology behind every single entry and exit.",
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop",
  },
  {
    title: "Premium Education",
    description:
      "Personal education at anytime ensuring growth. No more feeling alone in trading. Personal success guarantee.",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
  },
  {
    title: "Master Technical Analysis",
    description:
      "From daily bias to different time frame analysis, ensuring success across all market conditions.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    title: "Long Term Portfolio",
    description:
      "Follow long term market plans. See thousands invested for the future with deep dive analysis.",
    image:
      "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=600&h=400&fit=crop",
  },
];

const blurIn = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  show: { opacity: 1, filter: "blur(0px)" },
};

export function Features() {
  return (
    <section
      id="features"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
            <BlurStaggerText text="What's Inside" triggerOnView />
          </span>
          <h2 className="font-display text-5xl md:text-7xl tracking-tight leading-none">
            <BlurStaggerText text="Everything You Need" triggerOnView />
            <br />
            <BlurStaggerText
              text="To Win"
              triggerOnView
              className="text-text-secondary"
            />
          </h2>
        </div>

        {/* Cards grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ staggerChildren: 0.08 }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={blurIn}
              transition={{ duration: 0.4 }}
            >
              <FlippingCard
                className="h-[320px] w-full cursor-pointer"
                frontContent={
                  <div className="relative h-full w-full">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    {/* Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-display text-2xl tracking-tight text-white">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                }
                backContent={
                  <div className="h-full w-full flex flex-col items-center justify-center px-8 py-8 text-center bg-surface">
                    <h3 className="font-display text-2xl tracking-tight text-accent mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                }
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
