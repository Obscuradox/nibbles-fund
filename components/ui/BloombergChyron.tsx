"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ALERTS = [
  "NIBBLES REITERATES Q1 GUIDANCE · SEEDS COMMITTEE CONVENED",
  "TRADING HALT CLEARED · MATERIAL DEVELOPMENT RESOLVED · FUND RESUMES",
  "ANALYST DOWNGRADE (EXPECTED) · RAT COIN TO UNDERPERFORM",
  "DEBORAH RELEASES STATEMENT · NO",
  "MR. NIBBLES OBSERVED LOOKING PENSIVE · POSITION UNCHANGED",
  "CRAIG ATTEMPTS COMMENT · STOPPED BY DEBORAH · NO VIDEO",
  "SUNFLOWER SEED FUTURES · LIMIT UP · FUND POSITIONED",
  "MORNING CALL · DEBORAH REMINDS ANALYSTS · NOT THE WIRE",
  "Q2 LETTER DELAYED BY ONE WEEK · OBSERVATIONS PENDING",
  "PORTFOLIO UPDATED · DETAILS WITHHELD FOR REGULATORY REASONS",
  "DEBORAH APPROVES OF NOTHING CURRENTLY",
  "UNSCHEDULED MEETING · ATTENDEES UNDISCLOSED · OUTCOME POSITIVE",
];

export function BloombergChyron() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % ALERTS.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="sticky top-8 z-30 flex h-7 items-center overflow-hidden border-b border-brass/30 bg-prospectus-navy-soft text-cream-paper/80">
      <span className="shrink-0 bg-alert-red px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white">
        Breaking
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          className="ml-4 font-mono text-[11px] uppercase tracking-[0.12em] whitespace-nowrap overflow-hidden text-ellipsis"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          {ALERTS[idx]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
