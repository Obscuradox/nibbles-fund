"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Rss } from "lucide-react";
import { SOCIALS } from "@/lib/config";

const SITEMAP = [
  {
    title: "The Fund",
    links: [
      { label: "Leadership", href: "#team" },
      { label: "Philosophy", href: "#philosophy" },
      { label: "Performance", href: "#performance" },
      { label: "Holdings", href: "#holdings" },
      { label: "Advisory Board", href: "#advisors" },
    ],
  },
  {
    title: "Documents",
    links: [
      { label: "Prospectus", href: "/disclosures" },
      { label: "Quarterly Letters", href: "#philosophy" },
      { label: "Filings Room", href: "#filings" },
      { label: "Tear Sheet", href: "#tearsheet" },
      { label: "FAQ", href: "#faq" },
      { label: "RSS Feed", href: "/feed.xml" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Investor Relations (Deborah)", href: "#faq" },
      { label: "Press", href: "#" },
      { label: "Meme Generator", href: "/generator" },
      { label: "Fund Portal", href: "/portal" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Form ADV Part 2", href: "/disclosures" },
      { label: "Terms of Subscription", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Mr. Nibbles is a Hamster", href: "#" },
    ],
  },
];

export function Footer() {
  const [now, setNow] = useState("");

  useEffect(() => {
    const update = () => setNow(new Date().toUTCString().replace("GMT", "UTC"));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="border-t-2 border-nibbles-gold bg-prospectus-navy text-cream-paper/80">
      {/* Sitemap */}
      <div className="prospectus-container border-b border-cream-paper/10 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {SITEMAP.map((col) => (
            <div key={col.title}>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-nibbles-gold-soft">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="font-sans text-sm text-cream-paper/70 transition-colors hover:text-cream-paper"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Memo signup + wordmark + socials */}
      <div className="prospectus-container py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Wordmark */}
          <div className="md:col-span-1">
            <p className="font-display text-3xl text-cream-paper">The Nibbles Fund</p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-nibbles-gold-soft">
              Est. MMXXIV · Shoebox HQ · Fort Lee, NJ
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-cream-paper/60">
              <span className="border border-nibbles-gold/40 bg-nibbles-gold/10 px-2 py-1 text-nibbles-gold-soft">
                Member NIBBLES-SIPC (Privately Operated)
              </span>
              <span className="border border-cream-paper/20 px-2 py-1">
                SWIFT/BIC: NIBBUS33XXX · ABA: 000-00-0000
              </span>
            </div>
          </div>

          {/* Memo signup */}
          <div className="md:col-span-2">
            <p className="kicker mb-3 text-nibbles-gold-soft">Subscribe to the Memo</p>
            <p className="mb-4 font-sans text-sm text-cream-paper/70">
              Deborah sends the Memo irregularly. It contains market observations. It does not contain disclaimers.
            </p>
            <form className="flex flex-wrap gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="you@domain.com"
                className="flex-1 min-w-[240px] border border-cream-paper/20 bg-prospectus-navy-soft px-3 py-2 font-mono text-sm text-cream-paper placeholder:text-cream-paper/65 focus:outline-none focus:ring-2 focus:ring-nibbles-gold"
              />
              <button type="submit" className="border border-nibbles-gold/60 bg-nibbles-gold/10 px-5 py-2 font-mono text-xs uppercase tracking-[0.18em] text-nibbles-gold-soft hover:bg-nibbles-gold/20">
                Subscribe
              </button>
            </form>
            <p className="mt-2 font-mono text-[10px] italic text-cream-paper/65">
              Submission will be considered. Deborah does not acknowledge submissions.
            </p>
          </div>
        </div>
      </div>

      {/* Socials + heartbeat */}
      <div className="prospectus-container border-t border-cream-paper/10 py-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link href={SOCIALS.x} target="_blank" className="text-cream-paper/60 hover:text-nibbles-gold-soft" aria-label="X / Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </Link>
            <Link href={SOCIALS.telegram} target="_blank" className="text-cream-paper/60 hover:text-nibbles-gold-soft" aria-label="Telegram">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            </Link>
            <Link href={SOCIALS.discord} target="_blank" className="text-cream-paper/60 hover:text-nibbles-gold-soft" aria-label="Discord">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037A19.74 19.74 0 003.677 4.3698a.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
            </Link>
            <Link href="/feed.xml" className="text-cream-paper/60 hover:text-nibbles-gold-soft" aria-label="RSS Feed">
              <Rss className="h-5 w-5" />
            </Link>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-paper/65 tabular-nums">
            Last observed: {now}
          </p>
        </div>

        <div className="mt-10 border-t border-cream-paper/10 pt-6">
          <p className="max-w-3xl font-mono text-[11px] leading-[1.8] text-cream-paper/80">
            The Nibbles Fund is a memecoin. Not a registered investment vehicle. Mr. Nibbles is a hamster.
            Past performance is commentary, not a promise.
          </p>
          <p className="mt-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-cream-paper/80">
            <span>© 2026 The Nibbles Fund · All Seeds Reserved</span>
            <span>CIK 0001984213</span>
          </p>

          {/* Hidden final payoff */}
          <p className="mt-8 font-mono text-[10px] text-cream-paper/40">
            if you have read this far the fund thanks you. you will not be mentioned.
          </p>
        </div>
      </div>
    </footer>
  );
}
