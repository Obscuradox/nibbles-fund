"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInOnScroll } from "./motion/FadeInOnScroll";
import { PaperCard } from "./ui/PaperCard";

const FAQS = [
  {
    q: "Is this a real hedge fund?",
    a: "The Fund is real. The hedge is figurative. Mr. Nibbles is material.",
  },
  {
    q: "Who is Mr. Nibbles?",
    a: "A hamster. See Fig. 1.",
  },
  {
    q: "What does $NIBBLES do?",
    a: "It trades on the Solana blockchain. It commemorates Mr. Nibbles. It does not entitle the holder to profits, ownership, or counsel. It may nevertheless appreciate.",
  },
  {
    q: "What is the Seven Seeds framework?",
    a: "Seven proprietary rules authored by Mr. Nibbles. All seven are disclosed in the Philosophy section. Interpretation is not provided.",
  },
  {
    q: "Who is Deborah?",
    a: "Deborah handles investor relations. Deborah will not be handling your questions.",
  },
  {
    q: "Is Craig the CEO?",
    a: "Per the record, yes. The record and reality do not always align.",
  },
  {
    q: "Can I contact Mr. Nibbles?",
    a: "No.",
  },
  {
    q: "Is this financial advice?",
    a: "No. Nothing on this page is financial advice. Mr. Nibbles is above advice.",
  },
  {
    q: "Where can I read the filings?",
    a: "The Filings Room. See above. Certain documents are redacted. That is the nature of filings.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream-paper">
      <div className="prospectus-container py-20 md:py-28">
        <FadeInOnScroll>
          <div className="mb-14 text-center">
            <p className="kicker mb-4">Compliance Office</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-slate-70">
              Already answered by Deborah.
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <FadeInOnScroll className="lg:col-span-2" delay={0.05}>
            <PaperCard variant="letterhead" className="divide-y divide-brass/20">
              {FAQS.map((f, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-whiteboard-cream/50"
                  >
                    <span className="flex-1 font-display text-lg text-ink">{f.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-brass transition-transform ${
                        open === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 font-sans text-base leading-relaxed text-ink/80">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </PaperCard>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.1}>
            <div className="flex flex-col items-center lg:sticky lg:top-[140px]">
              <div className="relative h-72 w-full max-w-[280px]">
                <Image
                  src="/images/deborah-pointing.png"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="280px"
                />
              </div>
              <p className="mt-4 max-w-xs text-center font-hand text-2xl text-prospectus-navy">
                &ldquo;These have already been answered.&rdquo;
              </p>
              <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-brass">
                — Deborah
              </p>
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
}
