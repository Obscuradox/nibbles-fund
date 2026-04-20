"use client";

import { motion, AnimatePresence } from "framer-motion";

type Props = {
  text: string | null;
  className?: string;
};

export function SpeechBubble({ text, className = "" }: Props) {
  return (
    <AnimatePresence>
      {text && (
        <motion.div
          className={`absolute whitespace-nowrap bg-cream-paper border border-brass/40 shadow-card px-3 py-1.5 font-mono text-xs text-ink ${className}`}
          style={{ borderRadius: 2 }}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.95 }}
          transition={{ duration: 0.25 }}
        >
          {text}
          <span className="absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 border-b border-r border-brass/40 bg-cream-paper" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
