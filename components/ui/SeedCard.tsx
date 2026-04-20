import Image from "next/image";
import { Lock } from "lucide-react";
import { PaperCard } from "./PaperCard";

type Props = {
  number: string; // Roman numeral, e.g. "I"
  title: string;
  subtitle?: string;
  imageSrc?: string;
  locked?: boolean;
};

export function SeedCard({ number, title, subtitle, imageSrc, locked = false }: Props) {
  return (
    <PaperCard className="flex h-full flex-col p-8">
      <div className="flex items-start justify-between">
        <span className="kicker">Seed {number}</span>
        {locked && (
          <Lock className="h-4 w-4 text-brass/70" aria-label="Locked" />
        )}
      </div>

      {imageSrc && !locked && (
        <div className="relative my-6 aspect-square overflow-hidden bg-cream-paper">
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain"
          />
        </div>
      )}

      {locked && (
        <div className="my-6 flex aspect-square items-center justify-center bg-cream-paper/60">
          <Lock className="h-10 w-10 text-brass/40" aria-hidden="true" />
        </div>
      )}

      <h3 className={`font-display text-2xl leading-snug ${locked ? "blur-sm select-none" : ""}`}>
        {locked ? "——————————————" : `"${title}"`}
      </h3>
      {subtitle && (
        <p className="mt-3 font-sans text-sm text-slate-70">
          {locked ? "Available to fund participants." : subtitle}
        </p>
      )}
    </PaperCard>
  );
}
