"use client";

import Image from "next/image";
import { FadeInOnScroll } from "./motion/FadeInOnScroll";
import { motion } from "framer-motion";

type Milestone = {
  date: string;
  where: string;
  title: string;
  body: string;
  thumb?: string;
};

const MILESTONES: Milestone[] = [
  {
    date: "Aug 2021",
    where: "PetSmart · Fort Lee, NJ",
    title: "The Purchase",
    body: "Mr. Nibbles purchased for $14.99. Receives no orientation.",
    thumb: "/renders/backroom.png",
  },
  {
    date: "Nov 2022",
    where: "The Ledger",
    title: "First Trade Executed",
    body: "A profit of $847. Craig does not notice.",
    thumb: "/renders/backroom.png",
  },
  {
    date: "Q3 2023",
    where: "Six Figures",
    title: "Portfolio Crosses $100K",
    body: "Mr. Nibbles orders a new whiteboard.",
    thumb: "/renders/vault.png",
  },
  {
    date: "Jan 2024",
    where: "The Fund",
    title: "The Nibbles Fund Established",
    body: "Deborah joins as Head of IR, Compliance, and Everything Else.",
    thumb: "/renders/tradingfloor.png",
  },
  {
    date: "Q2 2024",
    where: "Outperformance",
    title: "Fourth Consecutive Quarter Beating S&P",
    body: "Performance attributed to Seeds II, III, and V. Ratification pending.",
    thumb: "/renders/rooftop.png",
  },
  {
    date: "Q1 2026",
    where: "Retail Open",
    title: "Public Subscription Accepted",
    body: "$NIBBLES launches on pump.fun. Mr. Nibbles remains at his desk.",
    thumb: "/renders/cigar.png",
  },
];

export function Timeline() {
  return (
    <section id="timeline" className="bg-whiteboard-cream">
      <div className="prospectus-container py-20 md:py-28">
        <FadeInOnScroll>
          <div className="mb-14 text-center">
            <p className="kicker mb-4">Fund History</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              A Concise Chronology
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-slate-70">
              From rodent to rodent, measured in quarters.
            </p>
          </div>
        </FadeInOnScroll>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-brass/30" aria-hidden="true" />
          <motion.div
            className="absolute left-6 top-0 w-px bg-nibbles-gold"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />

          <div className="space-y-10">
            {MILESTONES.map((m, i) => (
              <FadeInOnScroll key={m.date} delay={i * 0.04}>
                <div className="relative pl-16">
                  {/* Dot */}
                  <div className="absolute left-4 top-2 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-nibbles-gold bg-cream-paper" />

                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-brass/20 pb-2">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass">
                        {m.date} · {m.where}
                      </p>
                      <h3 className="mt-1 font-display text-2xl text-ink">{m.title}</h3>
                    </div>
                    {m.thumb && (
                      <div className="relative h-20 w-28 overflow-hidden border border-brass/30 opacity-80">
                        <Image src={m.thumb} alt="" fill className="object-cover" sizes="112px" />
                      </div>
                    )}
                  </div>
                  <p className="mt-4 font-sans text-base leading-relaxed text-ink/80">{m.body}</p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
