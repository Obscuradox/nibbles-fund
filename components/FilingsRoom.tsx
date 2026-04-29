"use client";

import { useEffect, useState } from "react";
import { FileText, X, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInOnScroll } from "./motion/FadeInOnScroll";
import { RedactionReveal } from "./ui/RedactionReveal";
import { useEasterEggs } from "@/lib/easterEggs";

type Filing = {
  id: string;
  name: string;
  type: string;
  date: string;
  pages: string;
  status: "Filed" | "Withdrawn" | "Not Filed" | "Classified";
  locked?: boolean;
  body?: () => React.ReactNode;
};

const FILINGS: Filing[] = [
  {
    id: "adv",
    name: "Form ADV Part 2",
    type: "Brochure",
    date: "2026-01-15",
    pages: "47",
    status: "Filed",
    body: () => (
      <>
        <p className="font-semibold">Item 1. Cover Page</p>
        <p>The Nibbles Fund, LP. CIK 0001984213. Registered: Not Currently.</p>
        <p className="mt-4 font-semibold">Item 4. Advisory Business</p>
        <p>
          The Adviser provides discretionary investment management services. The Adviser is a hamster. The
          Adviser is discretionary in temperament as well as in legal character.
        </p>
        <p className="mt-4 font-semibold">Item 5. Fees and Compensation</p>
        <p>
          The Adviser charges a management fee of 2% per annum and a performance fee of 20% above the
          high-water mark. Payment may be remitted in USD, SOL, or sunflower seeds.
        </p>
        <p className="mt-4 font-semibold">Item 7. Methods of Analysis</p>
        <p className="italic">Seeds.</p>
        <p className="mt-4 font-semibold">Item 9. Disciplinary Information</p>
        <p>Zero.</p>
        <p className="mt-4 font-semibold">Item 14. Deborah</p>
        <p>The Adviser does not accept personal checks, wire transfers, or grievances.</p>
      </>
    ),
  },
  {
    id: "13g",
    name: "Form 13G",
    type: "Beneficial Ownership",
    date: "2026-01-02",
    pages: "3",
    status: "Filed",
    body: () => (
      <>
        <p className="font-semibold">Item 1. Security and Issuer</p>
        <p>$NIBBLES Token. Issued by The Nibbles Fund.</p>
        <p className="mt-4 font-semibold">Item 4. Ownership</p>
        <p>Reporting Person: M. Nibbles (Natural Person).</p>
        <p>
          Beneficial Ownership: <strong>100.00% of outstanding</strong>
        </p>
        <p>Shared Voting Power: 0.00%</p>
        <p>Shared Dispositive Power: 0.00%</p>
        <p className="mt-4 font-semibold">Item 10. Certification</p>
        <p>The undersigned certifies that the acquired securities were not purchased to influence control of the issuer. The undersigned IS the issuer.</p>
        <p className="mt-6 font-mono text-[10px]">Signed: /s/ M. Nibbles, by Deborah (under power of attorney)</p>
      </>
    ),
  },
  {
    id: "13f",
    name: "Form 13F-HR",
    type: "Holdings Report",
    date: "2025-12-31",
    pages: "14",
    status: "Filed",
    body: () => (
      <>
        <p className="font-semibold">Schedule of Holdings — Q4 2025</p>
        <p className="mt-4">SOL (Solana) — 8,420 units</p>
        <p>BTC (Bitcoin) — <RedactionReveal>0.47 units</RedactionReveal></p>
        <p>USDC — $92,400</p>
        <p>
          <RedactionReveal>SUNFLOWER_SEEDS</RedactionReveal> — 12kg physical
        </p>
        <p>$NIBBLES — <RedactionReveal>UNDISCLOSED PORTION OF FLOAT</RedactionReveal></p>
        <p className="mt-6 text-sm italic">
          Certain positions have been redacted under Rule 24b-2. Disclosure would not be in the interest of the Fund
          participants, the hamster, or Deborah.
        </p>
      </>
    ),
  },
  {
    id: "8k",
    name: "Form 8-K",
    type: "Material Hamster Event",
    date: "2025-11-03",
    pages: "1",
    status: "Filed",
    body: () => (
      <>
        <p className="font-semibold">Item 8.01 Other Events</p>
        <p className="mt-4">
          On 3 November 2025, Mr. Nibbles observed the market for approximately eleven (11) continuous hours
          without taking a position. This observation is considered material to investors.
        </p>
        <p className="mt-4">No position was subsequently taken. The market continued.</p>
        <p className="mt-4">This filing has been reviewed by Deborah. It remains accurate as stated.</p>
      </>
    ),
  },
  {
    id: "d",
    name: "Form D",
    type: "Subscription Notice",
    date: "2025-10-01",
    pages: "6",
    status: "Filed",
    body: () => (
      <>
        <p className="font-semibold">Notice of Exempt Offering of Securities</p>
        <p className="mt-4">Issuer: The Nibbles Fund. Offering Type: Equity.</p>
        <p>Minimum Investment Accepted from Any Outside Investor: $25.</p>
        <p>Total Offering Amount: $1.21B, notional.</p>
        <p>Sales Commissions: 0%. Finder&apos;s Fees: 0%. Deborah receives nothing extra.</p>
      </>
    ),
  },
  {
    id: "ddq",
    name: "DDQ Response",
    type: "Due Diligence Questionnaire",
    date: "—",
    pages: "22",
    status: "Withdrawn",
  },
  {
    id: "incident",
    name: "Incident Report",
    type: "Internal Memorandum",
    date: "—",
    pages: "[CLASSIFIED]",
    status: "Classified",
    locked: true,
  },
];

export function FilingsRoom() {
  const [open, setOpen] = useState<Filing | null>(null);
  const { craigOpen, closeCraig } = useEasterEggs();

  // When CRAIG easter egg is triggered, open the incident report
  useEffect(() => {
    if (craigOpen) {
      setOpen({
        id: "craig-incident",
        name: "Incident Report: Re: Craig Containment",
        type: "Internal Memorandum",
        date: "2026-Q1",
        pages: "1",
        status: "Classified",
        body: () => (
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-alert-red">CLASSIFIED · INTERNAL USE ONLY</p>
            <p className="mt-4 font-semibold">MEMORANDUM</p>
            <p className="font-semibold">Re: Craig Containment (2026-Q1)</p>
            <p>From: Deborah</p>
            <p>To: File</p>
            <p className="mt-4">
              On fourteen occasions during Q1, Craig attempted to provide strategic direction to The Fund.
            </p>
            <p className="mt-2">
              On each occasion, the direction was redirected.
            </p>
            <p className="mt-2">
              Containment remains operationally straightforward. Craig believes he is the Chief Executive. This
              belief is sustaining, harmless, and, in certain regards, productive.
            </p>
            <p className="mt-2">
              Recommend no change to current protocol. Mr. Nibbles concurs via blink sequence.
            </p>
            <p className="mt-6 font-mono text-[10px]">Signed: /s/ Deborah</p>
            <p className="font-mono text-[10px]">Do not distribute. Do not acknowledge. Do not Craig.</p>
          </>
        ),
      });
    }
  }, [craigOpen]);

  return (
    <section id="filings" className="bg-cream-paper">
      <div className="prospectus-container py-20 md:py-28">
        <FadeInOnScroll>
          <div className="mb-10 max-w-3xl">
            <p className="kicker mb-4">Filings Archive</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              The Filings Room
            </h2>
            <p className="mt-4 font-sans text-lg leading-relaxed text-slate-70">
              Public filings of The Nibbles Fund, as submitted to regulatory authorities who have not responded.
              Documents are informational. Comprehensive. Redacted in places.
            </p>
          </div>
        </FadeInOnScroll>

        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brass md:hidden">
          Swipe →
        </p>
        <div className="overflow-x-auto border border-brass/30 bg-cream-paper shadow-card">
          <table className="w-full min-w-[720px] font-mono text-sm">
            <thead className="bg-whiteboard-cream">
              <tr className="text-[10px] uppercase tracking-[0.18em] text-brass">
                <th className="border-b border-brass/30 px-5 py-3 text-left">Filing</th>
                <th className="border-b border-brass/30 px-5 py-3 text-left">Type</th>
                <th className="border-b border-brass/30 px-5 py-3 text-left">Date</th>
                <th className="border-b border-brass/30 px-5 py-3 text-left">Pages</th>
                <th className="border-b border-brass/30 px-5 py-3 text-left">Status</th>
                <th className="border-b border-brass/30 px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {FILINGS.map((f) => (
                <tr key={f.id} className="border-b border-brass/15 transition-colors hover:bg-whiteboard-cream">
                  <td className="px-5 py-4 font-semibold text-ink">{f.name}</td>
                  <td className="px-5 py-4 text-ink/70">{f.type}</td>
                  <td className="px-5 py-4 tabular-nums text-ink/70">{f.date}</td>
                  <td className="px-5 py-4 tabular-nums text-ink/70">{f.pages}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                        f.status === "Filed"
                          ? "bg-ledger-green/10 text-ledger-green"
                          : f.status === "Withdrawn"
                          ? "bg-alert-red/10 text-alert-red"
                          : "bg-ink/10 text-ink"
                      }`}
                    >
                      {f.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {f.body && !f.locked ? (
                      <button
                        onClick={() => setOpen(f)}
                        className="inline-flex items-center gap-1 font-sans text-[11px] uppercase tracking-wider text-prospectus-navy hover:text-nibbles-gold"
                      >
                        Open <FileText className="h-3 w-3" />
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-sans text-[11px] uppercase tracking-wider text-ink/40">
                        <Lock className="h-3 w-3" /> Sealed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 max-w-2xl font-sans text-xs italic text-slate-70">
          Regulatory filings are updated as they are filed. Updates may lag filing by several quarters, or indefinitely.
        </p>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setOpen(null);
              closeCraig();
            }}
          >
            <motion.div
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto bg-cream-paper p-10 shadow-plate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{ borderRadius: 2, fontFamily: "'Times New Roman', Times, serif" }}
            >
              <button
                onClick={() => {
                  setOpen(null);
                  closeCraig();
                }}
                className="absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center text-ink/60 hover:text-ink"
                aria-label="Close document"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="border-b border-ink/30 pb-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brass">{open.type}</p>
                <h3 className="mt-2 text-2xl font-bold">{open.name}</h3>
                <p className="mt-1 text-xs text-ink/60">Filed: {open.date} · {open.pages} pages</p>
              </div>
              <div className="mt-6 space-y-2 text-[15px] leading-[1.7] text-ink/90">
                {open.body?.()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
