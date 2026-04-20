"use client";

import Image from "next/image";
import { FadeInOnScroll } from "./motion/FadeInOnScroll";
import { PaperCard } from "./ui/PaperCard";
import { BrassDivider } from "./ui/BrassDivider";
import { CharacterCutout } from "./ui/CharacterCutout";

type Seed = {
  number: string;
  title: string;
  plain: string;
  image: string;
};

const SEEDS: Seed[] = [
  {
    number: "I",
    title: "The wheel spins for reasons.",
    plain: "Size positions to match your conviction.",
    image: "/images/whiteboard-bullflag.png",
  },
  {
    number: "II",
    title: "A seed is not a nut.",
    plain: "Accumulate what grows. Ignore what cracks.",
    image: "/images/seed-2-nut.png",
  },
  {
    number: "III",
    title: "The cage is not the market.",
    plain: "Structure limits you. The market does not.",
    image: "/images/seed-3-cage.png",
  },
  {
    number: "IV",
    title: "Liquidity is an opinion.",
    plain: "Volume is the only thing that is actually there.",
    image: "/images/seed-4-liquidity.png",
  },
  {
    number: "V",
    title: "Patience compounds.",
    plain: "So does impatience. Pick one.",
    image: "/images/seed-5-patience.png",
  },
  {
    number: "VI",
    title: "Avoid the rat.",
    plain: "A rat runs the competing fund. We have been warned.",
    image: "/images/seed-6-rival.png",
  },
  {
    number: "VII",
    title: "The seed you do not plant will not grow.",
    plain: "Conviction without action is vocabulary. Act, or do not.",
    image: "/images/whiteboard-seedtheory.png",
  },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="bg-cream-paper">
      <div className="prospectus-container py-20 md:py-28">
        <FadeInOnScroll>
          <div className="mb-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="kicker mb-4">Investment Philosophy</p>
              <h2 className="font-display text-4xl leading-tight md:text-5xl">
                The Seven Seeds
              </h2>
              <p className="mt-4 font-sans text-lg leading-relaxed text-ink/80">
                Seven rules. Authored by Mr. Nibbles. Observed by Deborah. Published without amendment.
              </p>
            </div>
            <div className="relative flex items-end justify-center gap-2">
              <Image
                src="/images/whiteboard-seedtheory.png"
                alt="Seven Seeds whiteboard"
                width={320}
                height={260}
                className="w-full max-w-[320px] object-contain"
              />
              <CharacterCutout
                src="/images/nibbles-thinking.png"
                alt="Mr. Nibbles reviewing the Seven Seeds"
                width={180}
                height={180}
                bob
                className="-ml-6 hidden sm:block"
              />
            </div>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SEEDS.map((s, i) => (
            <FadeInOnScroll key={s.number} delay={i * 0.04}>
              <PaperCard className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="kicker">Seed {s.number}</span>
                </div>
                <div className="relative my-5 aspect-[4/3] overflow-hidden bg-cream-paper">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
                <h3 className="font-display text-xl leading-snug text-ink">
                  {`"${s.title}"`}
                </h3>
                <p className="mt-3 font-sans text-sm text-ink/75">{s.plain}</p>
              </PaperCard>
            </FadeInOnScroll>
          ))}
        </div>

        {/* Quarterly letter */}
        <div className="mt-20">
          <FadeInOnScroll>
            <PaperCard variant="letterhead" className="relative mx-auto max-w-3xl px-8 py-12 md:px-16 md:py-16">
              <div className="mb-8 flex items-baseline justify-between border-b border-brass/30 pb-4">
                <div>
                  <p className="kicker">The Nibbles Fund</p>
                  <p className="mt-1 font-display text-2xl">A Letter from the Founder</p>
                </div>
                <p className="font-mono text-xs text-brass">Q1 · 2026</p>
              </div>

              <div className="font-sans text-base leading-relaxed text-ink/90 md:text-[17px] md:leading-[1.7]">
                <p>To the Fund Participants,</p>
                <p className="mt-4">
                  Q1 proceeded. Volatility was offered. We declined. Positions matured. One did not. We observed it.
                </p>
                <p className="mt-4">
                  We do not manage risk. We manage the response to risk. The hamster that flees every shadow eats no seeds. The one that ignores every shadow eats briefly. The Fund is the third hamster.
                </p>
                <p className="mt-4">
                  Craig still believes he is Chief Executive. We have not disabused him. The matter is tabled.
                </p>
                <p className="mt-4">The Fund continues. So does the hamster.</p>
              </div>

              <div className="mt-10 flex items-end justify-between">
                <div>
                  <p className="font-hand text-4xl leading-none text-prospectus-navy">M. Nibbles</p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-brass">
                    Mr. Nibbles · Chief Investment Officer
                  </p>
                </div>
              </div>
            </PaperCard>
          </FadeInOnScroll>
        </div>
      </div>
      <BrassDivider variant="hairline" />
    </section>
  );
}
