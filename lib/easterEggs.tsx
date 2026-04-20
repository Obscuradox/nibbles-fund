"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getAudio } from "./audio";

type EggState = {
  seedsRevealed: boolean;
  craigOpen: boolean;
  memoOpen: boolean;
  triggerSeeds: () => void;
  triggerCraig: () => void;
  closeCraig: () => void;
  triggerMemo: () => void;
  closeMemo: () => void;
};

const EggCtx = createContext<EggState | null>(null);

export function EasterEggProvider({ children }: { children: ReactNode }) {
  const [seedsRevealed, setSeedsRevealed] = useState(false);
  const [craigOpen, setCraigOpen] = useState(false);
  const [memoOpen, setMemoOpen] = useState(false);
  const [buffer, setBuffer] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      if (e.key.length !== 1) return;
      setBuffer((b) => {
        const next = (b + e.key.toUpperCase()).slice(-10);
        if (next.endsWith("SEEDS")) {
          setSeedsRevealed(true);
          getAudio().bell();
          return "";
        }
        if (next.endsWith("CRAIG")) {
          setCraigOpen(true);
          getAudio().thunk();
          return "";
        }
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <EggCtx.Provider
      value={{
        seedsRevealed,
        craigOpen,
        memoOpen,
        triggerSeeds: () => setSeedsRevealed(true),
        triggerCraig: () => setCraigOpen(true),
        closeCraig: () => setCraigOpen(false),
        triggerMemo: () => setMemoOpen(true),
        closeMemo: () => setMemoOpen(false),
      }}
    >
      {children}
    </EggCtx.Provider>
  );
}

export function useEasterEggs() {
  const ctx = useContext(EggCtx);
  if (!ctx) throw new Error("useEasterEggs outside provider");
  return ctx;
}
