"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Globe, Check } from "lucide-react";
import { LOCALE_META, routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, []);

  const change = (nextLocale: string) => {
    // Strip existing locale prefix and prepend new one
    const segments = pathname.split("/").filter(Boolean);
    if (routing.locales.includes(segments[0] as (typeof routing.locales)[number])) {
      segments.shift();
    }
    const rest = segments.join("/");
    const path = nextLocale === routing.defaultLocale ? `/${rest}` : `/${nextLocale}/${rest}`;
    router.push(path.replace(/\/+$/, "") || "/");
    setOpen(false);
  };

  return (
    <div ref={ref} className="fixed bottom-4 left-4 z-40">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 border border-brass/40 bg-cream-paper/95 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink backdrop-blur hover:bg-whiteboard-cream"
        style={{ borderRadius: 2 }}
        aria-label="Change language"
      >
        <Globe className="h-3.5 w-3.5" />
        {currentLocale.toUpperCase()}
      </button>
      {open && (
        <div
          className="absolute bottom-full left-0 mb-2 w-56 border border-brass/40 bg-cream-paper shadow-plate"
          style={{ borderRadius: 2 }}
          role="menu"
        >
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => change(loc)}
              className="flex w-full items-center justify-between px-4 py-2.5 text-left font-sans text-sm text-ink hover:bg-whiteboard-cream"
              role="menuitem"
            >
              <span>
                {LOCALE_META[loc].native}
                <span className="ml-2 text-xs text-brass">({loc})</span>
              </span>
              {currentLocale === loc && <Check className="h-4 w-4 text-nibbles-gold" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
