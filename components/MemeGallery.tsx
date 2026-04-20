"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { FadeInOnScroll } from "./motion/FadeInOnScroll";
import { BrassDivider } from "./ui/BrassDivider";

type Meme = {
  file: string;
  caption: string;
  aspect: "16/9" | "3/2";
};

const MEMES: Meme[] = [
  { file: "casino.png", caption: "Black. Always black.", aspect: "16/9" },
  { file: "yacht.png", caption: "He bought the yacht in cash.", aspect: "16/9" },
  { file: "lambo.png", caption: "He also bought the Lambo in cash.", aspect: "16/9" },
  { file: "gym.png", caption: "Leg day is also gains day.", aspect: "3/2" },
  { file: "congress.png", caption: "He did not invoke the Fifth.", aspect: "16/9" },
  { file: "sauna.png", caption: "Cardio.", aspect: "3/2" },
  { file: "court.png", caption: "Under oath. On his Bloomberg.", aspect: "16/9" },
  { file: "ramen.png", caption: "Still eats seeds. Still rich.", aspect: "3/2" },
  { file: "redbull.png", caption: "Another Tuesday.", aspect: "16/9" },
  { file: "jet.png", caption: "He does not know the pilot.", aspect: "16/9" },
  { file: "tattoo.png", caption: "His first red candle. And his last.", aspect: "3/2" },
  { file: "ipo.png", caption: "He rang the bell once. It was enough.", aspect: "16/9" },
];

export function MemeGallery() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? 0 : (o + 1) % MEMES.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? 0 : (o - 1 + MEMES.length) % MEMES.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section id="memes" className="relative border-b border-brass/30 bg-cream-paper">
      <div className="prospectus-container py-20 md:py-28">
        <FadeInOnScroll>
          <div className="mb-10 max-w-3xl">
            <p className="kicker mb-4">The Archives</p>
            <h2 className="font-display text-4xl leading-tight md:text-5xl">
              Mr. Nibbles, photographed in the wild.
            </h2>
            <p className="mt-4 font-sans text-lg leading-relaxed text-slate-70">
              Deborah has been collecting these for the investor relations file. She says they are not
              for public release. They are now for public release.
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MEMES.map((m, i) => (
            <FadeInOnScroll key={m.file} delay={0.03 * (i % 6)}>
              <button
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden border border-brass/40 bg-whiteboard-cream shadow-plate transition-transform hover:-translate-y-1 hover:shadow-lg"
                aria-label={`Enlarge: ${m.caption}`}
              >
                <div
                  className="relative w-full"
                  style={{ aspectRatio: m.aspect.replace("/", " / ") }}
                >
                  <Image
                    src={`/images/memes/${m.file}`}
                    alt={m.caption}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-brass/30 bg-cream-paper px-4 py-3">
                  <p className="font-display text-lg leading-tight text-ink">
                    {m.caption}
                  </p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass">
                    Fig. {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </button>
            </FadeInOnScroll>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(null);
            }}
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream-paper/90 text-ink hover:bg-cream-paper"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-5xl"
          >
            <div
              className="relative w-full overflow-hidden border border-brass/40 bg-cream-paper shadow-plate"
              style={{ aspectRatio: MEMES[open].aspect.replace("/", " / ") }}
            >
              <Image
                src={`/images/memes/${MEMES[open].file}`}
                alt={MEMES[open].caption}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-4 rounded-sm bg-cream-paper/95 px-4 py-3">
              <p className="font-display text-xl text-ink">{MEMES[open].caption}</p>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-brass">
                Fig. {String(open + 1).padStart(2, "0")} of {String(MEMES.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      )}

      <BrassDivider variant="hairline" />
    </section>
  );
}
