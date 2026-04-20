"use client";

import { useState } from "react";
import Image from "next/image";
import { Printer, Share2 } from "lucide-react";
import { FadeInOnScroll } from "./motion/FadeInOnScroll";
import { PaperCard } from "./ui/PaperCard";
import { BrassDivider } from "./ui/BrassDivider";
import { PerformanceChart } from "./PerformanceChart";
import { CountUp } from "./ui/CountUp";
import { TOKEN } from "@/lib/config";
import { CharacterCutout } from "./ui/CharacterCutout";

export function Performance() {
  const hasLivePair = TOKEN.pairAddress !== "PLACEHOLDER_PAIR_ADDRESS";
  const [amount, setAmount] = useState<string>("10000");
  const amt = parseFloat(amount) || 0;
  const calculated = amt * 12.24; // 1,124% return → 12.24x multiplier

  return (
    <section id="performance" className="relative bg-whiteboard-cream">
      <div className="absolute inset-0 opacity-[0.12]" aria-hidden="true">
        <Image src="/images/bg-safe-door.jpg" alt="" fill className="object-cover" sizes="100vw" />
      </div>

      <div className="relative prospectus-container py-20 md:py-28">
        <FadeInOnScroll>
          <div className="mb-12 max-w-3xl">
            <p className="kicker mb-4">The Numbers</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Line goes up. Always.
            </h2>
            <p className="mt-4 font-sans text-lg leading-relaxed text-slate-70">
              Nibbles vs. everything else. Three years of candles, all green. No red ones. Not even by accident.
            </p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.1}>
          <PaperCard variant="letterhead" className="px-6 py-10 md:px-12 md:py-12">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-brass">
                Jan 2023 — Apr 2026 · Cumulative, indexed to 100
              </p>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 border border-brass/40 bg-cream-paper px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink hover:bg-whiteboard-cream"
              >
                <Printer className="h-3 w-3" />
                Print Tear Sheet
              </button>
            </div>
            <div className="relative">
              <PerformanceChart />
              <div className="pointer-events-none absolute bottom-0 right-0 hidden lg:block">
                <CharacterCutout
                  src="/images/nibbles-thinking.png"
                  alt=""
                  width={140}
                  height={140}
                  bob
                />
              </div>
            </div>
          </PaperCard>
        </FadeInOnScroll>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <FadeInOnScroll delay={0.05}>
            <StatTile
              label="Total Gains"
              value={<><CountUp end={1124} separator="," />%</>}
              note="Three years. No fees. No excuses."
            />
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.1}>
            <StatTile
              label="Win Rate"
              value={<><CountUp end={100} />%</>}
              note="Every trade. Every time."
            />
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.15}>
            <StatTile
              label="Red Candles"
              value={<CountUp end={0} />}
              note="Mr. Nibbles does not ship red candles."
            />
          </FadeInOnScroll>
        </div>

        {/* Cost-Basis Calculator */}
        <FadeInOnScroll delay={0.2}>
          <div className="mt-10">
            <PaperCard variant="letterhead" className="px-6 py-8 md:px-10">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brass/30 pb-4">
                <div>
                  <p className="kicker">What-if Calculator</p>
                  <p className="mt-1 font-display text-2xl">The Regret Machine</p>
                </div>
                <button
                  onClick={() => {
                    const text = `I would have $${calculated.toLocaleString("en-US", { maximumFractionDigits: 0 })}. I do not. $NIBBLES`;
                    navigator.clipboard.writeText(text);
                  }}
                  className="btn-ghost text-sm"
                >
                  <Share2 className="h-4 w-4" />
                  Share your regret
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center">
                <label className="flex flex-wrap items-center gap-3 font-mono text-sm text-ink/80">
                  <span className="whitespace-nowrap">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min={0}
                    className="w-full max-w-[12rem] border border-brass/40 bg-cream-paper px-3 py-2 font-mono text-sm text-ink focus:outline-none focus:ring-2 focus:ring-nibbles-gold sm:w-40"
                  />
                  <span className="flex-1 min-w-0">invested in January 2023 would now hold</span>
                </label>

                <p className="font-display text-3xl text-prospectus-navy tabular-nums sm:text-4xl">
                  ${calculated.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </p>
              </div>
              <p className="mt-4 font-sans text-xs italic text-slate-70">
                You did not invest. The calculation proceeds without your participation.
              </p>
            </PaperCard>
          </div>
        </FadeInOnScroll>

        {/* Live market */}
        <FadeInOnScroll delay={0.25}>
          <div className="mt-14">
            <div className="mb-3 flex items-baseline justify-between">
              <p className="kicker">Live Market · ${TOKEN.ticker}</p>
              <p className="font-mono text-xs text-slate-70">
                {hasLivePair ? "Source: DEXScreener" : "Awaiting fair launch"}
              </p>
            </div>
            {hasLivePair ? (
              <div className="aspect-[16/9] w-full overflow-hidden border border-brass/40 bg-cream-paper shadow-plate">
                <iframe src={TOKEN.dexScreenerEmbed} title="DEXScreener chart" className="h-full w-full" loading="lazy" />
              </div>
            ) : (
              <PaperCard className="flex aspect-[16/9] items-center justify-center p-12 text-center">
                <div>
                  <p className="font-display text-3xl text-prospectus-navy">Market Opens Shortly.</p>
                  <p className="mt-3 font-sans text-sm text-slate-70">
                    The Fund will be available on pump.fun at the announced hour. Deborah is finalizing the
                    paperwork. Mr. Nibbles is already at his desk.
                  </p>
                </div>
              </PaperCard>
            )}
          </div>
        </FadeInOnScroll>
      </div>

      <BrassDivider variant="hairline" />
    </section>
  );
}

function StatTile({
  label,
  value,
  note,
}: {
  label: string;
  value: React.ReactNode;
  note: string;
}) {
  return (
    <PaperCard className="flex h-full flex-col justify-between p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass">{label}</p>
      <p className="mt-4 font-display text-5xl text-prospectus-navy tabular-nums">{value}</p>
      <p className="mt-3 font-sans text-xs text-slate-70">{note}</p>
    </PaperCard>
  );
}
