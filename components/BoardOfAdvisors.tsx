"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInOnScroll } from "./motion/FadeInOnScroll";
import { PaperCard } from "./ui/PaperCard";

type Advisor = {
  id: string;
  name: string;
  role: string;
  credential: string;
  image: string;
  shortBio: string;
  fullBio: string[];
};

const ADVISORS: Advisor[] = [
  {
    id: "whitworth",
    name: "Penelope Whitworth, PhD",
    role: "Quantitative Chair",
    credential: "Oxford (unverified)",
    image: "/images/advisor-penelope.png",
    shortBio: "Mean-reversion research. Peer-reviewed. Peer unnamed.",
    fullBio: [
      "Dr. Whitworth holds a PhD from Oxford, or possibly the Open University. The records are unclear.",
      "She was previously head of signals research at a fund that cannot be named.",
      "She holds a seat on the Seeds Committee. She has voted yes on every position to date.",
      "Compensated quarterly in sunflower seeds. Attends meetings remotely. Has never attended in person.",
      "Declined to comment for this bio. Wishes it noted she is real.",
    ],
  },
  {
    id: "pembrooke",
    name: "Sir Reginald Pembrooke",
    role: "Senior Strategist",
    credential: "Privately consulted.",
    image: "/images/advisor-reginald.png",
    shortBio: "Knighted, 2003. Services unspecified. Attends no meetings.",
    fullBio: [
      "Knighted in 2003 for services to an industry that prefers not to be named.",
      "Has advised sovereign wealth funds, family offices, and one ornithological society.",
      "Joined the Board after a single private meeting with Mr. Nibbles. It lasted nine minutes.",
      "His views arrive quarterly, in a memo Deborah archives and does not circulate.",
      "Reached through his club. The club has no address.",
    ],
  },
  {
    id: "chen",
    name: "Dr. Margaret Chen",
    role: "Director",
    credential: "Hamster Business School, '19. Valedictorian.",
    image: "/images/advisor-margaret.png",
    shortBio: "Founded the school she graduated from. Wrote the Seeds text.",
    fullBio: [
      "Graduated first in her class from Hamster Business School, a programme she also founded.",
      "Holds the Zelda Chair in Rodent Portfolio Theory. The chair was funded by Mr. Nibbles.",
      "Her dissertation, 'On the Wheel,' remains the foundational text of the Seven Seeds.",
      "Chairs the Ethics Committee. No ethics violations to date.",
      "Office hours by appointment. Appointments are not granted.",
    ],
  },
  {
    id: "anonymous",
    name: "Anonymous",
    role: "Risk Committee",
    credential: "Has requested this not be written.",
    image: "/images/advisor-anonymous.png",
    shortBio: "Identity known only to Mr. Nibbles, Deborah, and one notary.",
    fullBio: [
      "Joined The Fund on 14 March 2024.",
      "Identity known only to Mr. Nibbles, Deborah, and a notary in New Jersey.",
      "Has provided risk guidance on four occasions. Each was vindicated.",
      "Communicates via encrypted messenger pigeon.",
      "Compensated through a shell entity. Do not print its name.",
    ],
  },
  {
    id: "morgan",
    name: "The Estate of J. P. Morgan",
    role: "Historical Consultant",
    credential: "Non-responsive since 1913.",
    image: "/images/advisor-morgan.png",
    shortBio: "Retained in perpetuity. Has not acknowledged the retention.",
    fullBio: [
      "Retained in an advisory capacity for matters of historical precedent.",
      "Has not acknowledged the retention, nor contested it.",
      "Correspondence sent monthly to a Wall Street post office box. Returns are archived.",
      "Deemed to advise through enduring influence on the broader financial tradition.",
      "The Fund's counsel concurs. The Fund's counsel is also non-responsive.",
    ],
  },
  {
    id: "deborah",
    name: "Deborah",
    role: "Everything Else",
    credential: "Also the one writing this.",
    image: "/images/deborah-clipboard.png",
    shortBio: "Holds every role not otherwise assigned. Approves of nothing.",
    fullBio: [
      "Holds every position not otherwise assigned.",
      "Includes Investor Relations, Compliance, Counsel, Communications, and Ethics secretariat.",
      "Previously head of IR at a competing hamster fund. It wound down orderly.",
      "Compensation not disclosed. She approves of this.",
      "Has written this bio. Will not be accepting feedback.",
    ],
  },
];

export function BoardOfAdvisors() {
  const [open, setOpen] = useState<Advisor | null>(null);

  return (
    <section id="advisors" className="bg-whiteboard-cream">
      <div className="prospectus-container py-20 md:py-28">
        <FadeInOnScroll>
          <div className="mb-12 text-center">
            <p className="kicker mb-4">Advisory Board</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Six Advisors. One Returns Calls.
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-ink/75">
              The sixth is Deborah.
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ADVISORS.map((a, i) => (
            <FadeInOnScroll key={a.id} delay={i * 0.05}>
              <button
                onClick={() => setOpen(a)}
                className="group block w-full text-left"
                aria-label={`View bio of ${a.name}`}
              >
                <PaperCard
                  variant="letterhead"
                  className="flex h-full flex-col p-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-plate"
                >
                  <div className="relative mx-auto mb-4 h-56 w-full overflow-hidden bg-cream-paper">
                    <Image
                      src={a.image}
                      alt={`Portrait of ${a.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain object-bottom"
                    />
                  </div>
                  <h3 className="text-center font-display text-xl leading-snug">{a.name}</h3>
                  <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-brass">
                    {a.role}
                  </p>
                  <p className="mt-4 border-t border-brass/20 pt-4 text-center font-sans text-sm leading-relaxed text-ink/80">
                    {a.shortBio}
                  </p>
                  <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-brass opacity-0 transition-opacity group-hover:opacity-100">
                    Read biography →
                  </p>
                </PaperCard>
              </button>
            </FadeInOnScroll>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto bg-cream-paper p-8 shadow-plate md:p-10"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              style={{ borderRadius: 2 }}
            >
              <button
                onClick={() => setOpen(null)}
                className="absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center text-ink/70 hover:text-ink"
                aria-label="Close biography"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-start gap-5">
                <div className="relative hidden h-32 w-32 shrink-0 overflow-hidden border border-brass/30 md:block">
                  <Image src={open.image} alt="" fill className="object-contain" sizes="128px" />
                </div>
                <div>
                  <p className="kicker mb-2">{open.role}</p>
                  <h3 className="font-display text-3xl">{open.name}</h3>
                  <p className="mt-2 font-sans text-sm italic text-ink/70">{open.credential}</p>
                </div>
              </div>

              <div className="mt-8 space-y-4 font-sans text-base leading-relaxed text-ink/90">
                {open.fullBio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <p className="mt-8 border-t border-brass/20 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                Biography on file · Not for distribution
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
