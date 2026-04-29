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
  { file: "chant.jpg", caption: "Welcome to Stratton Burrowmont.", aspect: "16/9" },
  { file: "fugayzi.jpg", caption: "Every other coin is fugayzi.", aspect: "16/9" },
  { file: "casino.jpg", caption: "Black. Always black.", aspect: "16/9" },
  { file: "yacht.jpg", caption: "He bought the yacht in cash.", aspect: "16/9" },
  { file: "lambo.jpg", caption: "He drove home. He was fine.", aspect: "16/9" },
  { file: "crawl.jpg", caption: "When the chart turns red.", aspect: "16/9" },
  { file: "pen.jpg", caption: "Sell me this seed.", aspect: "16/9" },
  { file: "fbi.jpg", caption: "He filed the prospectus.", aspect: "16/9" },
  { file: "limo-money.jpg", caption: "F-you seeds.", aspect: "16/9" },
  { file: "helipad.jpg", caption: "Insurance covered it.", aspect: "16/9" },
  { file: "tattoo.jpg", caption: "His first red candle. And his last.", aspect: "3/2" },
  { file: "wink.jpg", caption: "Sometimes you take the lemmons.", aspect: "3/2" },
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {MEMES.map((m, i) => (
            <FadeInOnScroll key={m.file} delay={0.03 * (i % 6)}>
              <button
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden border border-brass/40 bg-whiteboard-cream shadow-plate transition-transform hover:-translate-y-1 hover:shadow-lg"
                aria-label={`Enlarge: ${m.caption}`}
              >
                <div
                  className="relative w-full bg-whiteboard-cream"
                  style={{ aspectRatio: m.aspect.replace("/", " / ") }}
                >
                  <Image
                    src={`/images/memes/${m.file}`}
                    alt={m.caption}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-brass/30 bg-cream-paper px-5 py-4">
                  <p className="font-display text-xl leading-tight text-ink md:text-2xl">
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
