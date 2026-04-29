"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { TOKEN, shortCA } from "@/lib/config";
import { getAudio } from "@/lib/audio";

type TickerData = {
  price: string;
  change24h: string;
  changeUp: boolean;
  marketCap: string;
  volume24h: string;
};

const PLACEHOLDER: TickerData = {
  price: "$0.0000012",
  change24h: "+14.3%",
  changeUp: true,
  marketCap: "$4.2M",
  volume24h: "$890K",
};

async function fetchTickerData(pairAddress: string): Promise<TickerData | null> {
  if (pairAddress === "PLACEHOLDER_PAIR_ADDRESS") return null;
  try {
    const res = await fetch(
      `https://api.dexscreener.com/latest/dex/pairs/solana/${pairAddress}`,
      { cache: "no-store" }
    );
    const json = await res.json();
    const pair = json?.pair;
    if (!pair) return null;
    const change = Number(pair.priceChange?.h24 ?? 0);
    return {
      price: `$${Number(pair.priceUsd).toPrecision(2)}`,
      change24h: `${change > 0 ? "+" : ""}${change.toFixed(1)}%`,
      changeUp: change >= 0,
      marketCap: `$${(Number(pair.fdv ?? pair.marketCap ?? 0) / 1e6).toFixed(1)}M`,
      volume24h: `$${(Number(pair.volume?.h24 ?? 0) / 1e3).toFixed(0)}K`,
    };
  } catch {
    return null;
  }
}

export function TickerBar() {
  const [data, setData] = useState<TickerData>(PLACEHOLDER);
  const [halted, setHalted] = useState(false);
  const [flash, setFlash] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const live = await fetchTickerData(TOKEN.pairAddress);
      if (mounted && live) {
        setData(live);
        setFlash(true);
        setTimeout(() => setFlash(false), 620);
      }
    };
    load();
    const id = setInterval(load, 30_000);

    // Random trading-halt events every ~90s
    const haltInterval = setInterval(() => {
      setHalted(true);
      getAudio().bell();
      setTimeout(() => setHalted(false), 3500);
    }, 90_000 + Math.random() * 30_000);

    return () => {
      mounted = false;
      clearInterval(id);
      clearInterval(haltInterval);
    };
  }, []);

  const row = (
    <div className="flex shrink-0 items-center gap-8 px-8 text-xs font-mono tracking-wide">
      <span className="text-nibbles-gold-soft">${TOKEN.ticker}</span>
      <span className="text-cream-paper">{data.price}</span>
      <span
        className="inline-flex items-center gap-1"
        style={{ color: data.changeUp ? "#86EFAC" : "#F87171" }}
      >
        <ArrowUp className={`h-3 w-3 ${data.changeUp ? "" : "rotate-180"}`} />
        {data.change24h}
      </span>
      <span className="text-cream-paper/80">MC {data.marketCap}</span>
      <span className="text-cream-paper/80">VOL {data.volume24h}</span>
      <span className="text-cream-paper/60">CA: {shortCA(TOKEN.contractAddress)}</span>
      <span className="h-3 w-px bg-cream-paper/20" aria-hidden="true" />
      <span className="text-cream-paper/60">The Nibbles Fund · Est. 2024 · Shoebox HQ</span>
    </div>
  );

  if (halted) {
    return (
      <div
        className="sticky top-0 z-40 flex h-8 items-center justify-center overflow-hidden bg-alert-red px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-cream-paper sm:text-xs sm:tracking-[0.25em]"
        role="banner"
        data-ticker
      >
        <span className="truncate">
          <span className="sm:hidden">◼ Trading Halt · Material Dev.</span>
          <span className="hidden sm:inline">◼ Trading Halt · Material Development · Fund Resuming Shortly</span>
        </span>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={`sticky top-0 z-40 flex h-8 items-center overflow-hidden bg-prospectus-navy text-cream-paper ${
        flash ? "ticker-flash" : ""
      }`}
      role="banner"
      aria-label="Live price ticker"
      data-ticker
    >
      <div className="flex w-max animate-ticker-scroll will-change-transform">
        {row}
        {row}
      </div>
    </div>
  );
}
