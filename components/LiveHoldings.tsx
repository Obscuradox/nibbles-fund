"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { FadeInOnScroll } from "./motion/FadeInOnScroll";

type Holding = {
  asset: string;
  position: string;
  costBasis: string;
  current: string;
  ytdPct: number;
  sparkSeed: number[];
  note: string;
};

const HOLDINGS_INITIAL: Holding[] = [
  {
    asset: "SOL",
    position: "8,420.15",
    costBasis: "$127.00",
    current: "$162.40",
    ytdPct: 27.5,
    sparkSeed: [127, 131, 140, 138, 145, 152, 149, 158, 162, 161, 162.4],
    note: "Accumulating.",
  },
  {
    asset: "BTC",
    position: "0.47",
    costBasis: "$62,100",
    current: "$71,400",
    ytdPct: 15.0,
    sparkSeed: [62100, 63000, 65200, 64800, 68000, 69500, 69100, 70500, 71400, 71200, 71400],
    note: "Observing.",
  },
  {
    asset: "$NIBBLES",
    position: "—",
    costBasis: "—",
    current: "—",
    ytdPct: 0,
    sparkSeed: [1, 1.1, 1.2, 1.3, 1.5, 1.8, 2.2, 2.9, 3.8, 5.1, 7.0],
    note: "We are the market.",
  },
  {
    asset: "RAT_COIN",
    position: "0",
    costBasis: "—",
    current: "—",
    ytdPct: -42,
    sparkSeed: [10, 9.2, 8.5, 8.8, 7.4, 7.1, 6.5, 6.2, 6.0, 5.8, 5.8],
    note: "A rat runs it. We have been warned.",
  },
  {
    asset: "CASH (USDC)",
    position: "$92,400",
    costBasis: "—",
    current: "—",
    ytdPct: 0,
    sparkSeed: [92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92.4],
    note: "Patient.",
  },
  {
    asset: "SUNFLOWER SEEDS",
    position: "12kg physical",
    costBasis: "—",
    current: "—",
    ytdPct: 0,
    sparkSeed: [1, 1.02, 1.01, 1.05, 1.03, 1.04, 1.06, 1.08, 1.05, 1.07, 1.08],
    note: "Hedge.",
  },
];

function Sparkline({ data, up }: { data: number[]; up: boolean }) {
  const w = 56;
  const h = 20;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline
        points={pts}
        fill="none"
        stroke={up ? "#1B4332" : "#C83A2E"}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LiveHoldings() {
  const [holdings, setHoldings] = useState<Holding[]>(HOLDINGS_INITIAL);

  useEffect(() => {
    const id = setInterval(() => {
      setHoldings((prev) =>
        prev.map((h) => {
          const last = h.sparkSeed[h.sparkSeed.length - 1];
          const drift = (Math.random() - 0.48) * last * 0.01;
          const nextV = Math.max(0.001, last + drift);
          const nextSeed = [...h.sparkSeed.slice(1), nextV];
          return { ...h, sparkSeed: nextSeed };
        })
      );
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="holdings" className="relative overflow-hidden bg-prospectus-navy">
      <div className="absolute inset-0 opacity-[0.16]" aria-hidden="true">
        <Image src="/images/bg-terminal-wall.jpg" alt="" fill className="object-cover" sizes="100vw" />
      </div>
      <div className="relative prospectus-container py-20 md:py-28 text-cream-paper">
        <FadeInOnScroll>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-cream-paper/20 pb-6">
            <div>
              <p className="kicker mb-3 text-nibbles-gold-soft">Live Market Data</p>
              <h2 className="font-display text-4xl leading-tight md:text-5xl">
                Current Positions
              </h2>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream-paper/60">
              Source: The Fund · Verified: Never · As of {new Date().toUTCString().slice(5, 16)}
            </p>
          </div>
        </FadeInOnScroll>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] font-mono text-sm">
            <thead>
              <tr className="border-b border-cream-paper/20 text-[10px] uppercase tracking-[0.18em] text-cream-paper/50">
                <th className="py-3 pr-4 text-left">Asset</th>
                <th className="py-3 pr-4 text-left">Position</th>
                <th className="py-3 pr-4 text-left">Cost Basis</th>
                <th className="py-3 pr-4 text-left">Current</th>
                <th className="py-3 pr-4 text-left">YTD</th>
                <th className="py-3 pr-4 text-left">Trend</th>
                <th className="py-3 pr-4 text-left">Analyst Note</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h) => (
                <tr
                  key={h.asset}
                  className="border-b border-cream-paper/10 transition-colors hover:bg-cream-paper/5"
                >
                  <td className="py-4 pr-4 font-semibold text-nibbles-gold-soft">{h.asset}</td>
                  <td className="py-4 pr-4 tabular-nums">{h.position}</td>
                  <td className="py-4 pr-4 tabular-nums text-cream-paper/70">{h.costBasis}</td>
                  <td className="py-4 pr-4 tabular-nums">{h.current}</td>
                  <td
                    className={`py-4 pr-4 tabular-nums ${
                      h.ytdPct > 0 ? "text-[#86EFAC]" : h.ytdPct < 0 ? "text-[#F87171]" : "text-cream-paper/70"
                    }`}
                  >
                    {h.ytdPct !== 0 && (
                      <span className="inline-flex items-center gap-1">
                        <ArrowUp className={`h-3 w-3 ${h.ytdPct > 0 ? "" : "rotate-180"}`} />
                        {h.ytdPct > 0 ? "+" : ""}
                        {h.ytdPct.toFixed(1)}%
                      </span>
                    )}
                    {h.ytdPct === 0 && <span>—</span>}
                  </td>
                  <td className="py-4 pr-4">
                    <Sparkline data={h.sparkSeed} up={h.sparkSeed[h.sparkSeed.length - 1] >= h.sparkSeed[0]} />
                  </td>
                  <td className="py-4 pr-4 italic text-cream-paper/80">{h.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 max-w-2xl font-sans text-xs italic text-cream-paper/50">
          Positions and notes are indicative. Mr. Nibbles does not comment on his own positioning.
          Deborah declines to elaborate.
        </p>
      </div>
    </section>
  );
}
