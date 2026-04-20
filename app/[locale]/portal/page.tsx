"use client";

import Link from "next/link";
import Image from "next/image";
import { Lock, Unlock, ShieldCheck } from "lucide-react";
import { TickerBar } from "@/components/TickerBar";
import { BloombergChyron } from "@/components/ui/BloombergChyron";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { EasterEggProvider } from "@/lib/easterEggs";
import { PaperCard } from "@/components/ui/PaperCard";
import { RedactionReveal } from "@/components/ui/RedactionReveal";

// Demo content — in production this would gate behind real wallet + token balance check
const GATED_CONTENT = [
  {
    tier: "Fund Participant",
    threshold: "100,000 $NIBBLES",
    items: [
      { title: "Seed IV — On Liquidity", body: "Liquidity is not a measure of market depth. Liquidity is the distance between conviction and exit. The Fund prefers positions where that distance is short." },
      { title: "Seed V — On Patience", body: "Patience compounds. Impatience compounds faster, in the opposite direction. Both can be observed in the same participant, usually within a single session." },
      { title: "Seed VI — On The Rival", body: "A rat runs a competing fund. Its positions are the inverse of ours. This is a coincidence only if one believes in them." },
    ],
  },
  {
    tier: "Charter Participant",
    threshold: "1,000,000 $NIBBLES",
    items: [
      { title: "Seed VII — [REDACTED]", body: "███████████████████████████████████████████████████████████████████████████████████████████████." },
      { title: "Q4 2024 Bonus Letter · A Brief Word About Craig", body: "Craig is handled. That is the word about Craig." },
      { title: "After-Hours Memo · 2026-03-17 (partial)", body: "Meeting adjourned at 02:41. Present: M. Nibbles, Deborah. Absent: Craig. Motion: continue. Carried." },
    ],
  },
];

export default function Portal() {
  return (
    <EasterEggProvider>
      <TickerBar />
      <BloombergChyron />
      <Nav />

      <main className="prospectus-container py-16">
        <header className="mb-10 max-w-2xl">
          <p className="kicker mb-4">Restricted Access</p>
          <h1 className="font-display text-4xl leading-tight md:text-5xl">
            The Fund Portal
          </h1>
          <p className="mt-4 font-sans text-lg leading-relaxed text-slate-70">
            Access granted by ownership tier. Participation begins at 100,000 units. Charter access at 1,000,000.
            Holdings are verified on-chain at connection.
          </p>
        </header>

        {/* Connect prompt */}
        <PaperCard variant="letterhead" className="mb-12 flex flex-wrap items-center justify-between gap-6 p-8">
          <div className="flex items-center gap-4">
            <ShieldCheck className="h-10 w-10 text-nibbles-gold" />
            <div>
              <p className="font-display text-2xl">Connect a Solana Wallet</p>
              <p className="mt-1 font-sans text-sm text-slate-70">
                The Fund does not store addresses. Verification occurs at read time only.
              </p>
            </div>
          </div>
          <button
            className="btn-primary"
            onClick={() => alert("Wallet adapter will be wired on launch day. For now: observe.")}
          >
            Connect Wallet
          </button>
        </PaperCard>

        {/* Gated content preview */}
        <div className="space-y-10">
          {GATED_CONTENT.map((tier, tierIdx) => (
            <section key={tier.tier}>
              <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3 border-b border-brass/30 pb-3">
                <h2 className="font-display text-2xl">{tier.tier}</h2>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass">
                  Threshold: {tier.threshold}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tier.items.map((item, i) => (
                  <PaperCard key={i} className="relative p-6 opacity-70">
                    <div className="absolute right-3 top-3 text-brass">
                      {tierIdx === 0 ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    </div>
                    <p className="kicker mb-2">{tier.tier}</p>
                    <h3 className="font-display text-xl leading-snug text-ink">{item.title}</h3>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-ink/80">
                      <RedactionReveal revealed={false}>{item.body}</RedactionReveal>
                    </p>
                    <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-brass">
                      Full text available on verification
                    </p>
                  </PaperCard>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-brass/30 pt-8 text-center">
          <div className="relative mx-auto h-40 w-40">
            <Image src="/images/nibbles-signing.png" alt="" fill className="object-contain" sizes="160px" />
          </div>
          <p className="mt-6 max-w-xl mx-auto font-sans text-sm italic text-slate-70">
            Access to the Portal is a privilege extended to Fund Participants. Access is not extended to the general public.
            The general public is encouraged to read the public materials, which are comprehensive.
          </p>
          <p className="mt-6">
            <Link href="/" className="font-mono text-xs uppercase tracking-[0.2em] text-brass hover:text-nibbles-gold">
              ← Return to the Fund
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </EasterEggProvider>
  );
}
