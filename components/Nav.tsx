"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { TOKEN } from "@/lib/config";

const NAV_LINKS = [
  { href: "#team", label: "Team" },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#performance", label: "Performance" },
  { href: "#press", label: "Press" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-8 z-30 border-b border-brass/30 bg-cream-paper/95 backdrop-blur-sm"
      style={{ backdropFilter: "saturate(1.1)" }}
    >
      <div className="prospectus-container flex h-16 items-center justify-between">
        <Link
          href="#top"
          className="font-display text-xl tracking-tight text-ink hover:text-prospectus-navy"
        >
          The Nibbles Fund
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-sm text-ink/70 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={TOKEN.pumpFunUrl} target="_blank" rel="noreferrer" className="btn-primary text-sm">
            Buy ${TOKEN.ticker}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            onClick={() => setOpen(true)}
            className="md:hidden"
            aria-label="Open navigation"
          >
            <Menu className="h-6 w-6 text-ink" />
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-cream-paper md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between border-b border-brass/30 px-6 py-5">
            <span className="font-display text-xl">The Nibbles Fund</span>
            <button onClick={() => setOpen(false)} aria-label="Close navigation">
              <X className="h-6 w-6 text-ink" />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-8" aria-label="Primary mobile">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-brass/20 py-5 font-display text-2xl text-ink"
              >
                {l.label}
              </a>
            ))}
            <a
              href={TOKEN.pumpFunUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-8 w-full justify-center"
            >
              Buy ${TOKEN.ticker}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
