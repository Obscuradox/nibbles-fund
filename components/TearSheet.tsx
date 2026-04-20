"use client";

import { useState } from "react";
import { Download, Check, Mail } from "lucide-react";
import { FadeInOnScroll } from "./motion/FadeInOnScroll";
import { PaperCard } from "./ui/PaperCard";
import { getAudio } from "@/lib/audio";

const TERMS = [
  { label: "Management Fee", value: "2% per annum" },
  { label: "Performance Fee", value: "20% above high-water mark" },
  { label: "Lockup", value: "90 days" },
  { label: "Redemption", value: "Quarterly, 45-day notice" },
  { label: "Minimum Subscription", value: "$25 (retail)" },
  { label: "Institutional Minimum", value: "$100,000 (currently unavailable)" },
  { label: "High-Water Mark", value: "Yes" },
  { label: "Gate", value: "At Manager's discretion" },
];

const PROVIDERS = [
  { label: "Administrator", value: "TBD" },
  { label: "Custodian", value: "Phantom Wallet" },
  { label: "Prime Broker", value: "Jupiter" },
  { label: "Auditor", value: "None currently" },
  { label: "Legal Counsel", value: "Non-responsive" },
  { label: "Tax Advisor", value: "Deborah" },
];

const EXPOSURES = [
  { label: "Long Positions", value: "$184,200" },
  { label: "Short Positions", value: "$0" },
  { label: "Net Exposure", value: "$184,200" },
  { label: "Gross Exposure", value: "$184,200" },
  { label: "Leverage", value: "1.00x" },
];

export function TearSheet() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/tearsheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSent(true);
      getAudio().thunk();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Send failed.");
    } finally {
      setSending(false);
    }
  };

  const onDownload = async () => {
    // Client-side PDF via dynamic jspdf import
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "letter" });
    doc.setFont("times", "bold");
    doc.setFontSize(18);
    doc.text("THE NIBBLES FUND", 72, 80);
    doc.setFontSize(11);
    doc.setFont("times", "normal");
    doc.text("Quarterly Tear Sheet · Q1 2026 · Unaudited", 72, 100);
    doc.line(72, 108, 540, 108);

    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.text("Fund Terms", 72, 140);
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    TERMS.forEach((t, i) => {
      doc.text(`${t.label}:`, 72, 160 + i * 16);
      doc.text(t.value, 250, 160 + i * 16);
    });

    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.text("Service Providers", 72, 320);
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    PROVIDERS.forEach((p, i) => {
      doc.text(`${p.label}:`, 72, 340 + i * 16);
      doc.text(p.value, 250, 340 + i * 16);
    });

    doc.setFontSize(13);
    doc.setFont("times", "bold");
    doc.text("Monthly Exposures", 72, 460);
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    EXPOSURES.forEach((e, i) => {
      doc.text(`${e.label}:`, 72, 480 + i * 16);
      doc.text(e.value, 250, 480 + i * 16);
    });

    doc.setFontSize(9);
    doc.setFont("times", "italic");
    doc.text("Not for distribution. Mr. Nibbles is a hamster.", 72, 720);
    doc.save("nibbles-fund-tearsheet.pdf");
    getAudio().thunk();
  };

  return (
    <section id="tearsheet" className="bg-whiteboard-cream">
      <div className="prospectus-container py-20 md:py-28">
        <FadeInOnScroll>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-brass/30 pb-6">
            <div>
              <p className="kicker mb-3">Fund Terms & Tear Sheet</p>
              <h2 className="font-display text-4xl leading-tight md:text-5xl">
                Tear Sheet · Q1 2026
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={onDownload} className="btn-ghost">
                <Download className="h-4 w-4" />
                Download (PDF)
              </button>
            </div>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FadeInOnScroll delay={0.05}>
            <PaperCard variant="letterhead" className="h-full p-8">
              <h3 className="mb-5 border-b border-brass/30 pb-3 font-display text-xl">
                Fund Terms
              </h3>
              <dl className="space-y-3 font-mono text-sm">
                {TERMS.map((t) => (
                  <div key={t.label} className="flex items-start justify-between gap-4">
                    <dt className="text-[11px] uppercase tracking-[0.14em] text-brass">{t.label}</dt>
                    <dd className="text-right text-ink/90">{t.value}</dd>
                  </div>
                ))}
              </dl>
            </PaperCard>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.1}>
            <PaperCard variant="letterhead" className="h-full p-8">
              <h3 className="mb-5 border-b border-brass/30 pb-3 font-display text-xl">
                Service Providers
              </h3>
              <dl className="space-y-3 font-mono text-sm">
                {PROVIDERS.map((p) => (
                  <div key={p.label} className="flex items-start justify-between gap-4">
                    <dt className="text-[11px] uppercase tracking-[0.14em] text-brass">{p.label}</dt>
                    <dd className="text-right text-ink/90">{p.value}</dd>
                  </div>
                ))}
              </dl>
              <h3 className="mb-5 mt-8 border-b border-brass/30 pb-3 font-display text-xl">
                Monthly Exposures
              </h3>
              <dl className="space-y-3 font-mono text-sm">
                {EXPOSURES.map((e) => (
                  <div key={e.label} className="flex items-start justify-between gap-4">
                    <dt className="text-[11px] uppercase tracking-[0.14em] text-brass">{e.label}</dt>
                    <dd className="text-right text-ink/90">{e.value}</dd>
                  </div>
                ))}
              </dl>
            </PaperCard>
          </FadeInOnScroll>
        </div>

        {/* Email tear sheet */}
        <FadeInOnScroll delay={0.15}>
          <div className="mt-10 border border-brass/30 bg-cream-paper p-8 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="max-w-md">
                <p className="kicker mb-2">Personalized Tear Sheet</p>
                <p className="font-sans text-sm text-ink/80">
                  Request a personalized copy of this tear sheet delivered by Deborah. She will charge no fee for the service.
                </p>
              </div>
              {sent ? (
                <p className="inline-flex items-center gap-2 font-mono text-sm text-ledger-green">
                  <Check className="h-4 w-4" />
                  Received. Deborah will consider it.
                </p>
              ) : (
                <form onSubmit={onSend} className="flex flex-1 flex-wrap items-center justify-end gap-2 min-w-[260px]">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      getAudio().tick();
                    }}
                    placeholder="you@domain.com"
                    className="flex-1 min-w-[200px] border border-brass/40 bg-cream-paper px-3 py-2 font-mono text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-nibbles-gold"
                  />
                  <button type="submit" disabled={sending} className="btn-primary text-sm disabled:opacity-60">
                    <Mail className="h-4 w-4" />
                    {sending ? "Sending..." : "Send"}
                  </button>
                </form>
              )}
            </div>
            {error && <p className="mt-3 font-mono text-xs text-alert-red">{error}</p>}
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
