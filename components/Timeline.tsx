"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeInOnScroll } from "./motion/FadeInOnScroll";

type Milestone = {
  date: string;
  where: string;
  title: string;
  body: string;
  thumb: string;
  metric?: { label: string; value: string };
};

const MILESTONES: Milestone[] = [
  {
    date: "Aug 2021",
    where: "PetSmart · Fort Lee, NJ",
    title: "The Purchase",
    body: "Mr. Nibbles acquired for $14.99. No orientation was provided. He did not require one.",
    thumb: "/renders/backroom.png",
    metric: { label: "Cost Basis", value: "$14.99" },
  },
  {
    date: "Nov 2022",
    where: "The Ledger",
    title: "First Trade Executed",
    body: "A profit of $847 was booked on a single SOL position. Craig, still day-trading at the time, did not notice.",
    thumb: "/renders/backroom.png",
    metric: { label: "First Profit", value: "+$847" },
  },
  {
    date: "Q3 2023",
    where: "Six Figures",
    title: "Portfolio Crosses $100K",
    body: "Mr. Nibbles orders a new whiteboard. Deborah approves the requisition without comment.",
    thumb: "/renders/vault.png",
    metric: { label: "AUM", value: "$100K" },
  },
  {
    date: "Jan 2024",
    where: "The Fund",
    title: "The Nibbles Fund Established",
    body: "Deborah joins as Head of IR, Compliance, and Everything Else. Craig is retained in an advisory non-capacity.",
    thumb: "/renders/tradingfloor.png",
    metric: { label: "Founded", value: "Jan 2024" },
  },
  {
    date: "Q2 2024",
    where: "Outperformance",
    title: "Fourth Consecutive Quarter Beating S&P",
    body: "Performance attributed to Seeds II, III, and V. Ratification of methodology pending internal review.",
    thumb: "/renders/rooftop.png",
    metric: { label: "YTD", value: "+412%" },
  },
  {
    date: "Q1 2026",
    where: "Retail Open",
    title: "Public Subscription Accepted",
    body: "$NIBBLES launches on pump.fun. Mr. Nibbles remains at his desk. Deborah remains unreachable by phone.",
    thumb: "/renders/cigar.png",
    metric: { label: "Launch", value: "$NIBBLES" },
  },
];

export function Timeline() {
  return (
    <section
      id="timeline"
      className="relative overflow-hidden bg-prospectus-navy text-cream-paper"
    >
      {/* Subtle terminal texture */}
      <div className="absolute inset-0 opacity-[0.08]" aria-hidden="true">
        <Image
          src="/images/bg-terminal-wall.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative prospectus-container py-20 md:py-28">
        <FadeInOnScroll>
          <div className="mb-16 max-w-2xl md:mb-20">
            <p className="kicker mb-4 text-nibbles-gold-soft">Fund History</p>
            <h2 className="font-display text-4xl leading-[1.05] text-cream-paper md:text-6xl">
              A Concise Chronology
            </h2>
            <p className="mt-5 font-sans text-lg leading-relaxed text-cream-paper/75">
              From shoebox to subscription, measured in quarters. Each entry has
              been verified by Deborah and reluctantly corroborated by Craig.
            </p>
          </div>
        </FadeInOnScroll>

        <div className="relative mx-auto max-w-5xl">
          {/* Base rail */}
          <div
            className="absolute bottom-0 top-0 w-px bg-cream-paper/15 md:left-1/2 left-5 md:-translate-x-1/2"
            aria-hidden="true"
          />
          {/* Animated gold rail — mount-based, not whileInView (SSR safe) */}
          <motion.div
            className="absolute top-0 w-[2px] origin-top bg-nibbles-gold shadow-[0_0_12px_rgba(212,179,106,0.45)] md:left-1/2 left-5 md:-translate-x-1/2"
            style={{ height: "100%" }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 2.2, ease: "easeOut", delay: 0.1 }}
            aria-hidden="true"
          />

          <ol className="space-y-14 md:space-y-20">
            {MILESTONES.map((m, i) => {
              const rightSide = i % 2 === 1;
              return (
                <li key={m.date} className="relative">
                  {/* Node — year chip on the rail */}
                  <motion.div
                    className="absolute left-5 top-6 z-10 -translate-x-1/2 md:left-1/2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4 + i * 0.12,
                      ease: "backOut",
                    }}
                  >
                    <div className="relative">
                      <div className="h-3.5 w-3.5 rounded-full bg-nibbles-gold shadow-[0_0_18px_rgba(212,179,106,0.75)]" />
                      <div
                        className="absolute inset-0 animate-ping rounded-full bg-nibbles-gold opacity-40"
                        aria-hidden="true"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.2 + i * 0.1,
                      ease: "easeOut",
                    }}
                    className={`
                      pl-14 md:pl-0
                      ${rightSide ? "md:pl-[calc(50%+2.5rem)]" : "md:pr-[calc(50%+2.5rem)]"}
                      ${rightSide ? "md:text-left" : "md:text-right"}
                    `}
                  >
                    <MilestoneCard milestone={m} rightSide={rightSide} />
                  </motion.div>
                </li>
              );
            })}
          </ol>

          {/* Terminus — capstone */}
          <motion.div
            className="relative mt-14 flex justify-center md:mt-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            <div className="relative flex flex-col items-center">
              <div className="absolute -top-1 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-2 border-nibbles-gold bg-prospectus-navy" />
              <div className="mt-6 border border-nibbles-gold/40 bg-prospectus-navy-soft/40 px-6 py-3 text-center backdrop-blur">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-nibbles-gold-soft">
                  Present Day
                </p>
                <p className="mt-1 font-display text-xl text-cream-paper">
                  The Fund Continues. So Does the Hamster.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MilestoneCard({
  milestone: m,
  rightSide,
}: {
  milestone: Milestone;
  rightSide: boolean;
}) {
  return (
    <article
      className={`
        group relative overflow-hidden border border-cream-paper/15 bg-prospectus-navy-soft/60
        shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur
        transition-all duration-300 hover:border-nibbles-gold/60
        hover:shadow-[0_14px_40px_-10px_rgba(212,179,106,0.2)]
      `}
      style={{ borderRadius: 3 }}
    >
      {/* Thumbnail with gradient ink-wash */}
      <div className="relative aspect-[16/8] w-full overflow-hidden bg-ink/40">
        <Image
          src={m.thumb}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,26,58,0.15) 0%, rgba(15,26,58,0.85) 100%)",
          }}
          aria-hidden="true"
        />
        {/* Metric chip */}
        {m.metric && (
          <div
            className={`absolute top-3 ${rightSide ? "right-3" : "right-3"} border border-nibbles-gold/50 bg-ink/60 px-2.5 py-1 backdrop-blur`}
            style={{ borderRadius: 2 }}
          >
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-nibbles-gold-soft">
              {m.metric.label}
            </p>
            <p className="font-display text-lg leading-none text-cream-paper">
              {m.metric.value}
            </p>
          </div>
        )}
        {/* Date/where overlay */}
        <div className="absolute inset-x-0 bottom-0 px-5 py-4 text-left">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-nibbles-gold-soft">
            {m.date} · {m.where}
          </p>
          <h3 className="mt-1 font-display text-2xl leading-tight text-cream-paper md:text-[1.7rem]">
            {m.title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-5 md:px-6 md:py-6">
        <p className="font-sans text-[15px] leading-relaxed text-cream-paper/80 text-left">
          {m.body}
        </p>
      </div>
    </article>
  );
}
