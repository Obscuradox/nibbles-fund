"use client";

import { motion } from "framer-motion";

type Props = {
  label: string;
  value: string;
  variant?: "gold" | "green" | "navy";
  className?: string;
  delay?: number;
};

export function FloatingChip({ label, value, variant = "navy", className = "", delay = 0 }: Props) {
  const variants = {
    gold: "bg-nibbles-gold/10 border-nibbles-gold/40 text-nibbles-gold",
    green: "bg-ledger-green/10 border-ledger-green/40 text-ledger-green",
    navy: "bg-prospectus-navy/10 border-prospectus-navy/40 text-prospectus-navy",
  };

  return (
    <motion.div
      className={`inline-flex items-center gap-2 border backdrop-blur-md px-3 py-1.5 ${variants[variant]} ${className}`}
      style={{ borderRadius: 2 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -2, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-70">{label}</span>
      <span className="font-mono text-sm font-semibold tabular-nums">{value}</span>
    </motion.div>
  );
}
