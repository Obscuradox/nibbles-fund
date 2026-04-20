"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInOnScroll } from "./motion/FadeInOnScroll";
import { PaperCard } from "./ui/PaperCard";
import { TOKEN, SOCIALS, WALLETS } from "@/lib/config";
import { getAudio } from "@/lib/audio";

const QUESTIONS = [
  "I am at least 18 years of age.",
  "I possess a Solana wallet, or am willing to obtain one.",
  "I understand that a hamster is making these decisions.",
  "I have read, or intend to eventually read, the Seven Seeds framework.",
  "I acknowledge that Mr. Nibbles is not a financial advisor, though he would be a good one.",
];

export function InvestorGate() {
  const [checks, setChecks] = useState<boolean[]>([false, false, false, false, false]);
  const [certified, setCertified] = useState(false);
  const [stampVisible, setStampVisible] = useState(false);
  const allChecked = checks.every(Boolean);

  const certify = () => {
    if (!allChecked) return;
    setCertified(true);
    setStampVisible(true);
    getAudio().thunk();
    // Auto-dismiss stamp after 1.8s so the user can proceed to the steps
    setTimeout(() => setStampVisible(false), 1800);
  };

  return (
    <section id="join" className="bg-cream-paper">
      <div className="prospectus-container py-20 md:py-28">
        <FadeInOnScroll>
          <div className="mb-14 text-center">
            <p className="kicker mb-4">Participation</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Instructions for Fund Participants
            </h2>
            <p className="mx-auto mt-4 max-w-md font-sans text-slate-70">
              First certify. Then proceed. Deborah has already reviewed the procedure.
            </p>
          </div>
        </FadeInOnScroll>

        {/* Suitability Exam */}
        <FadeInOnScroll delay={0.05}>
          <PaperCard variant="letterhead" className="mx-auto max-w-3xl p-10">
            <div className="mb-6 flex items-baseline justify-between border-b border-brass/30 pb-4">
              <div>
                <p className="kicker">Suitability Certification</p>
                <p className="mt-1 font-display text-2xl">Investor Qualification</p>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">Required</p>
            </div>

            <ul className="space-y-4">
              {QUESTIONS.map((q, i) => (
                <li key={i}>
                  <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-relaxed text-ink/90">
                    <input
                      type="checkbox"
                      checked={checks[i]}
                      onChange={(e) => {
                        const next = [...checks];
                        next[i] = e.target.checked;
                        setChecks(next);
                        getAudio().tick();
                      }}
                      disabled={certified}
                      className="mt-1 h-4 w-4 shrink-0 accent-nibbles-gold"
                    />
                    <span>{q}</span>
                  </label>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-brass/30 pt-6">
              <p className="font-sans text-xs italic text-slate-70">
                By certifying, you acknowledge the foregoing. The Fund does not record your response.
              </p>
              <button onClick={certify} disabled={!allChecked || certified} className="btn-primary disabled:opacity-40">
                {certified ? (
                  <>
                    <Check className="h-4 w-4" />
                    Certified
                  </>
                ) : (
                  "Certify"
                )}
              </button>
            </div>
          </PaperCard>
        </FadeInOnScroll>

        {/* Stamp animation on pass — auto-dismisses after 1.8s */}
        <AnimatePresence>
          {stampVisible && (
            <motion.div
              className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.45 } }}
            >
              <motion.div
                initial={{ scale: 2.1, rotate: -12, opacity: 0 }}
                animate={{ scale: 1, rotate: -8, opacity: 1 }}
                exit={{ scale: 1.05, opacity: 0 }}
                transition={{ type: "spring", damping: 18, stiffness: 220 }}
                className="relative"
              >
                <div className="border-4 border-alert-red bg-cream-paper/95 px-10 py-5 font-mono text-xl font-bold uppercase tracking-[0.25em] text-alert-red shadow-lg">
                  Provisionally Suitable
                </div>
                <p className="mt-2 text-center font-mono text-[10px] tracking-[0.2em] text-alert-red/70">
                  Emotionally Unsuitable
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Steps (revealed after certification) */}
        <AnimatePresence>
          {certified && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-16"
            >
              <p className="kicker mb-6 text-center">Three Steps</p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Step
                  num="I"
                  title="Obtain a Solana wallet."
                  body="Phantom or Solflare. Mr. Nibbles has no preference. He recommends you form one."
                  cta={{ label: "Get Phantom", href: WALLETS.phantom }}
                  image="/images/nibbles-phone.png"
                />
                <Step
                  num="II"
                  title="Fund the wallet."
                  body="With SOL. Mr. Nibbles does not accept fiat currency or chickpeas."
                  image="/images/nibbles-signing.png"
                />
                <Step
                  num="III"
                  title={`Acquire $${TOKEN.ticker}.`}
                  body="Via pump.fun or Jupiter. The Fund does not hold your hand. The Fund holds the line."
                  cta={{ label: "Buy on pump.fun", href: TOKEN.pumpFunUrl }}
                  image="/images/nibbles-stamping.png"
                />
              </div>

              <FadeInOnScroll delay={0.3}>
                <div className="mt-14 border-t border-brass/30 pt-10">
                  <p className="kicker mb-5 text-center">Dealing Room</p>
                  <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    <Link href={SOCIALS.x} target="_blank" className="font-display text-xl text-ink hover:text-nibbles-gold">X / Twitter →</Link>
                    <Link href={SOCIALS.telegram} target="_blank" className="font-display text-xl text-ink hover:text-nibbles-gold">Telegram →</Link>
                    <Link href={SOCIALS.discord} target="_blank" className="font-display text-xl text-ink hover:text-nibbles-gold">Discord →</Link>
                  </div>
                  <p className="mt-6 text-center font-sans text-xs italic text-slate-70">
                    Direct communications are handled by Deborah. Mr. Nibbles is observing the charts.
                  </p>
                </div>
              </FadeInOnScroll>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Step({
  num,
  title,
  body,
  cta,
  image,
}: {
  num: string;
  title: string;
  body: string;
  cta?: { label: string; href: string };
  image: string;
}) {
  return (
    <PaperCard className="flex h-full flex-col items-center p-8 text-center">
      <div className="relative mb-6 h-36 w-36">
        <Image src={image} alt="" fill sizes="144px" className="object-contain" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">Step {num}</p>
      <h3 className="mt-2 font-display text-2xl leading-tight">{title}</h3>
      <p className="mt-4 font-sans text-sm leading-relaxed text-ink/80">{body}</p>
      {cta && (
        <a
          href={cta.href}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.16em] text-prospectus-navy hover:text-nibbles-gold"
        >
          {cta.label}
          <ArrowUpRight className="h-3 w-3" />
        </a>
      )}
    </PaperCard>
  );
}
