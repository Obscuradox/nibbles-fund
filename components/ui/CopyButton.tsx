"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

type Props = {
  value: string;
  display?: string;
  label?: string;
};

export function CopyButton({ value, display, label = "Copy" }: Props) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard blocked; no-op
    }
  };

  return (
    <button
      onClick={onCopy}
      aria-label={label}
      className="group inline-flex items-center gap-2 border border-brass/30 bg-cream-paper px-3 py-2 font-mono text-xs
        text-ink/80 transition-colors hover:bg-whiteboard-cream focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-nibbles-gold"
      style={{ borderRadius: 2 }}
    >
      <span className="tabular-nums">{display ?? value}</span>
      {copied ? (
        <Check className="h-3.5 w-3.5 text-ledger-green" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-brass group-hover:text-ink" aria-hidden="true" />
      )}
    </button>
  );
}
