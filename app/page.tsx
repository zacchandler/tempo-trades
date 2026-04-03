"use client";

import dynamic from "next/dynamic";
import { GradientLoading } from "@/components/ui/gradient-loading";
import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SocialProofBar } from "@/components/sections/SocialProofBar";
import { Footer } from "@/components/sections/Footer";

// Lazy load below-fold sections
const PriceTickerSection = dynamic(
  () =>
    import("@/components/sections/PriceTickerSection").then(
      (m) => m.PriceTickerSection
    ),
  { ssr: false }
);

const Story = dynamic(
  () => import("@/components/sections/Story").then((m) => m.Story),
  { ssr: false }
);

const Features = dynamic(
  () => import("@/components/sections/Features").then((m) => m.Features),
  { ssr: false }
);

const DiscordShowcase = dynamic(
  () =>
    import("@/components/sections/DiscordShowcase").then(
      (m) => m.DiscordShowcase
    ),
  { ssr: false }
);

const Testimonials = dynamic(
  () =>
    import("@/components/sections/Testimonials").then((m) => m.Testimonials),
  { ssr: false }
);

const Pricing = dynamic(
  () => import("@/components/sections/Pricing").then((m) => m.Pricing),
  { ssr: false }
);

const FinalCTA = dynamic(
  () => import("@/components/sections/FinalCTA").then((m) => m.FinalCTA),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <GradientLoading />
      <Navbar />
      <main>
        <Hero />
        <SocialProofBar />
        <PriceTickerSection />
        <Story />
        <DiscordShowcase />
        <Features />
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
