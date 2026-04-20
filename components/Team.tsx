import Image from "next/image";
import { FadeInOnScroll } from "./motion/FadeInOnScroll";
import { PaperCard } from "./ui/PaperCard";
import { BrassDivider } from "./ui/BrassDivider";
import { CharacterCutout } from "./ui/CharacterCutout";

type Principal = {
  name: string;
  role: string;
  image: string;
  hoverImage?: string;
  bio: string;
  education?: string;
  previously?: string;
  clearances?: string;
};

const PRINCIPALS: Principal[] = [
  {
    name: "Mr. Nibbles",
    role: "Founder · Chief Investment Officer",
    image: "/images/nibbles-arms-crossed.png",
    hoverImage: "/images/nibbles-unimpressed.png",
    education: "Self-taught. Bloomberg terminal, 2021–2023.",
    previously: "Independent analyst. Fort Lee, NJ.",
    clearances: "None required.",
    bio:
      "Mr. Nibbles founded The Nibbles Fund in January 2024, following three years of independent research. He holds advanced expertise in technical analysis, macro positioning, and the patient observation of seeds. He has never broken character. He will not be starting now. Communicates via whiteboard.",
  },
  {
    name: "Deborah",
    role: "Investor Relations · Compliance",
    image: "/images/deborah-clipboard.png",
    hoverImage: "/images/deborah-pointing.png",
    education: "The Saxon Academy. Comparative Procedure, 2014.",
    previously: "Head of IR, competing fund (wound down, orderly).",
    clearances: "Notarized.",
    bio:
      "Deborah joined The Fund in March 2024. She previously served in investor relations at a competing fund of significantly lesser success. She wears pearls. She does not repeat herself. Inquiries may be directed to her, and then reconsidered.",
  },
  {
    name: "Craig",
    role: "Chief Executive Officer",
    image: "/images/team-craig.png",
    education: "Various online courses. Incomplete.",
    previously: "Day trading, 2018–2021. Unsuccessful.",
    clearances: "None required.",
    bio:
      "Craig provides strategic oversight. Craig is learning. Craig is not authorized to comment. Questions should not be addressed to Craig.",
  },
];

export function Team() {
  return (
    <section id="team" className="bg-whiteboard-cream">
      <div className="prospectus-container py-20 md:py-28">
        <FadeInOnScroll>
          <div className="mb-14 text-center">
            <p className="kicker mb-4">Fund Leadership</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              The Principals
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-sans text-slate-70">
              Three principals. One of them is aware.
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRINCIPALS.map((p, i) => (
            <FadeInOnScroll key={p.name} delay={i * 0.08}>
              <PaperCard className="group flex h-full flex-col p-8" variant="letterhead">
                <div className="relative mx-auto mb-6 h-56 w-full">
                  <CharacterCutout
                    src={p.image}
                    hoverSrc={p.hoverImage}
                    alt={`Portrait of ${p.name}`}
                    width={220}
                    height={220}
                    bob={false}
                    className="mx-auto"
                  />
                </div>
                <h3 className="text-center font-display text-2xl">{p.name}</h3>
                <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-brass">
                  {p.role}
                </p>
                <div className="mt-5 flex justify-center">
                  <span className="h-px w-10 bg-brass/40" aria-hidden="true" />
                </div>

                <dl className="mt-5 space-y-2 font-mono text-[11px] text-ink/75">
                  <Row label="Education" value={p.education} />
                  <Row label="Previously" value={p.previously} />
                  <Row label="Clearances" value={p.clearances} />
                </dl>

                <p className="mt-5 border-t border-brass/20 pt-4 text-center font-sans text-sm leading-relaxed text-ink/80">
                  {p.bio}
                </p>

                <p className="mt-5 border-t border-brass/20 pt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">
                  Contact: Not Currently Available
                </p>
              </PaperCard>
            </FadeInOnScroll>
          ))}
        </div>
      </div>
      <BrassDivider variant="hairline" />
    </section>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-baseline gap-2">
      <dt className="shrink-0 text-[9px] uppercase tracking-[0.14em] text-brass">{label}:</dt>
      <dd className="flex-1">{value}</dd>
    </div>
  );
}
