import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center bg-cream-paper px-6 py-20 text-center">
          <div className="relative h-48 w-48">
            <Image
              src="/images/nibbles-thinking.png"
              alt="Mr. Nibbles, looking at an empty ledger"
              fill
              className="object-contain"
              sizes="192px"
            />
          </div>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.28em] text-brass">Error 404 · Observed</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-ink md:text-6xl">
            The Fund has no record of this page.
          </h1>
          <p className="mt-5 max-w-md font-sans text-lg text-slate-70">
            Deborah has been notified. She will not be responding.
          </p>
          <Link href="/" className="btn-primary mt-10">
            Return to The Fund
          </Link>
          <p className="mt-12 max-w-md font-mono text-[10px] italic text-ink/40">
            Ref: 404-NIB-2026 · Filed under: Internal Review · Action: None
          </p>
        </main>
      </body>
    </html>
  );
}
