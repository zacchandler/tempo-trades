"use client";

import { Star } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

const col1 = [
  {
    name: "Jordan",
    result: "$25,000 in Payouts",
    quote: "Tempo's strategy and live trading sessions completely changed how I approach the market. The psychology coaching alone is worth 10x the price.",
    color: "from-green-500 to-emerald-700",
  },
  {
    name: "Daniel",
    result: "10+ Payouts Achieved",
    quote: "After blowing 3 funded accounts, I was ready to quit. Joined Tempo Trades and it was the best decision I ever made. The live entries showed me exactly what I was doing wrong.",
    color: "from-blue-500 to-cyan-700",
  },
  {
    name: "Marcus",
    result: "$15,000 First Month",
    quote: "Having access to other profitable traders and getting personal feedback on your trades is invaluable. This isn't just a course — it's a transformation.",
    color: "from-purple-500 to-violet-700",
  },
  {
    name: "Tyler",
    result: "Consistent $5k Weeks",
    quote: "I was overcomplicating everything before. Tempo's simple strategy cut through all the noise. Now I take 2-3 trades a day and hit my targets consistently.",
    color: "from-sky-500 to-blue-700",
  },
];

const col2 = [
  {
    name: "Alex",
    result: "Passed 3 Evaluations",
    quote: "The daily bias analysis and technical breakdowns are next level. I went from not understanding ICT at all to passing multiple evaluations within 2 months.",
    color: "from-amber-500 to-orange-700",
  },
  {
    name: "Ryan",
    result: "$8,400 in 2 Weeks",
    quote: "Seeing exactly when and why Tempo enters and exits — that's something no YouTube video can teach you. Real-time, real money, real accountability.",
    color: "from-teal-500 to-cyan-700",
  },
  {
    name: "Chris",
    result: "5 Funded Accounts",
    quote: "I've tried 4 other trading communities. None of them come close. The 1-on-1 calls fixed my risk management and I passed 5 evaluations since joining.",
    color: "from-rose-500 to-pink-700",
  },
  {
    name: "Nathan",
    result: "$12,000 Month 2",
    quote: "The long-term portfolio analysis is something nobody else offers. Tempo showed me how to build real wealth alongside day trading. Complete game changer.",
    color: "from-indigo-500 to-blue-700",
  },
];

const col3 = [
  {
    name: "Kevin",
    result: "6 Payouts in 3 Months",
    quote: "I joined skeptical — another trading group, right? But the daily live sessions proved me wrong within the first week. Tempo's entries are surgical.",
    color: "from-emerald-500 to-green-700",
  },
  {
    name: "Brandon",
    result: "$20,000 Quarter",
    quote: "The community is genuinely supportive. No ego, no flexing — just traders helping traders. The profits channel is real proof that this strategy works.",
    color: "from-violet-500 to-purple-700",
  },
  {
    name: "Jamal",
    result: "Quit My 9-5",
    quote: "6 months ago I was working a job I hated. Tempo's mentorship gave me the confidence and skill to go full-time. Best investment I've ever made in myself.",
    color: "from-orange-500 to-red-700",
  },
  {
    name: "Derek",
    result: "$7,500 Best Day",
    quote: "The psychology sessions changed everything. I used to revenge trade after losses. Now I follow the plan, take my entries, and walk away green almost every day.",
    color: "from-cyan-500 to-teal-700",
  },
];

function TestimonialCard({
  name,
  result,
  quote,
  color,
}: {
  name: string;
  result: string;
  quote: string;
  color: string;
}) {
  return (
    <div className="w-[320px] shrink-0 rounded-2xl bg-surface/60 border border-white/5 p-6 hover:border-accent/20 transition-all duration-300">
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-3.5 text-accent fill-accent" />
        ))}
      </div>

      <p className="text-text-secondary leading-relaxed text-sm mb-5">
        &ldquo;{quote}&rdquo;
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <div
          className={`size-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-sm`}
        >
          {name[0]}
        </div>
        <div>
          <p className="font-semibold text-text-primary text-sm">{name}</p>
          <p className="text-xs text-accent font-mono">{result}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4 block">
            Real Results
          </span>
          <h2 className="font-display text-5xl md:text-7xl tracking-tight leading-none">
            Results Speak
            <br />
            <span className="text-text-secondary">Louder</span>
          </h2>
        </div>

        {/* Vertical marquee columns */}
        <div className="relative h-[550px]">
          {/* Top fade */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 justify-center h-full overflow-hidden">
            {/* Column 1 — scrolls up */}
            <Marquee
              vertical
              pauseOnHover
              className="h-full [--duration:25s] [--gap:1.25rem]"
            >
              {col1.map((t) => (
                <TestimonialCard key={t.name} {...t} />
              ))}
            </Marquee>

            {/* Column 2 — scrolls up, staggered with different speed + offset */}
            <Marquee
              vertical
              pauseOnHover
              className="h-full [--duration:32s] [--gap:1.25rem] hidden md:flex mt-[-80px]"
            >
              {col2.map((t) => (
                <TestimonialCard key={t.name} {...t} />
              ))}
            </Marquee>

            {/* Column 3 — scrolls up, different speed */}
            <Marquee
              vertical
              pauseOnHover
              className="h-full [--duration:28s] [--gap:1.25rem] hidden lg:flex"
            >
              {col3.map((t) => (
                <TestimonialCard key={t.name} {...t} />
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
