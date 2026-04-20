"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDown, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { TOKEN } from "@/lib/config";
import { CopyButton } from "./ui/CopyButton";
import { FadeInOnScroll } from "./motion/FadeInOnScroll";
import { CharacterCutout } from "./ui/CharacterCutout";
import { Whiteboard } from "./ui/Whiteboard";
import { FloatingChip } from "./ui/FloatingChip";
import { LaserBeam } from "./ui/LaserBeam";
import { SpeechBubble } from "./ui/SpeechBubble";

const VOICE_LINES = ["Observing.", "Noted.", "Acceptable.", "Hmm.", "Carry on."];

// Pen tip origin — measured against the character PNG at 360×360 rendered size.
// Character is anchored bottom-left of the canvas. Pen tip in character-local coords.
const PAW_LOCAL = { x: 322, y: 196 };
const CHARACTER_SIZE = 360;

export function Hero() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const peakRef = useRef<HTMLDivElement>(null);
  const [bubble, setBubble] = useState<string | null>(null);
  const [pawAbs, setPawAbs] = useState<{ x: number; y: number } | null>(null);
  const [laserTo, setLaserTo] = useState<{ x: number; y: number } | null>(null);

  // Measure paw + chart-peak anchor positions relative to the canvas.
  // Recompute on resize, on fonts loaded, and on scroll (layout shifts can move things).
  useEffect(() => {
    const canvas = canvasRef.current;
    const peak = peakRef.current;
    if (!canvas) return;

    const update = () => {
      const cRect = canvas.getBoundingClientRect();
      // Paw: character sits at bottom-left of canvas.
      const paw = {
        x: PAW_LOCAL.x,
        y: cRect.height - CHARACTER_SIZE + PAW_LOCAL.y,
      };
      setPawAbs(paw);

      if (peak) {
        const pRect = peak.getBoundingClientRect();
        setLaserTo({
          x: pRect.left - cRect.left + pRect.width / 2,
          y: pRect.top - cRect.top + pRect.height / 2,
        });
      }
    };

    update();
    window.addEventListener("resize", update);
    // Re-measure after images/fonts load
    const t = window.setTimeout(update, 300);
    const t2 = window.setTimeout(update, 1200);
    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-brass/30 laser-cursor"
    >
      {/* Ambient radial fade background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 80% 30%, rgba(15,26,58,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="prospectus-container grid grid-cols-1 items-center gap-10 py-12 md:grid-cols-12 md:gap-8 md:py-28">
        {/* Copy column */}
        <div className="md:col-span-5">
          <FadeInOnScroll>
            <p className="kicker mb-6">Est. 2024 · Shoebox HQ · Fort Lee, NJ</p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.06}>
            <h1 className="font-display text-[2.5rem] leading-[1.02] tracking-[-0.02em] text-ink sm:text-[3.25rem] md:text-[5rem]">
              The Nibbles<br />Fund.
            </h1>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.14}>
            <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-ink/80 sm:text-lg md:text-xl">
              A hamster who only trades green candles. Three years. Zero losses. Nobody knows how he does it.
            </p>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.22}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="kicker">Contract</span>
              <CopyButton
                value={TOKEN.contractAddress}
                display={`${TOKEN.contractAddress.slice(0, 8)}…${TOKEN.contractAddress.slice(-6)}`}
                label="Copy contract address"
              />
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={0.3}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={TOKEN.pumpFunUrl} target="_blank" rel="noreferrer" className="btn-primary">
                Buy ${TOKEN.ticker}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#philosophy" className="btn-ghost">
                Read the Prospectus
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#filings" className="btn-ghost">
                View Filings
                <FileText className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </FadeInOnScroll>
        </div>

        {/* Composition canvas */}
        <div
          ref={canvasRef}
          className="relative md:col-span-7 min-h-[440px] md:min-h-[560px]"
          onClick={() => {
            setBubble(VOICE_LINES[Math.floor(Math.random() * VOICE_LINES.length)]);
            setTimeout(() => setBubble(null), 2000);
          }}
        >
          {/* LIVE indicator */}
          <div className="absolute left-0 top-0 z-50 inline-flex items-center gap-2">
            <motion.span
              className="h-2 w-2 rounded-full bg-alert-red"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brass">Live</span>
          </div>

          {/* Whiteboard with SVG chart. On mobile we use a smaller board; md+ gets full size. */}
          <div className="absolute right-2 top-10 z-10 hidden md:block md:right-8 md:top-12">
            <Whiteboard width={380} height={260}>
              <div className="relative h-full w-full">
                <HeroChart />
                {/* Invisible anchor at breakout arrow head — laser target */}
                <div
                  ref={peakRef}
                  aria-hidden="true"
                  className="absolute h-1 w-1"
                  style={{ left: "86%", top: "12%" }}
                />
              </div>
            </Whiteboard>
          </div>
          <div className="absolute right-2 top-6 z-10 md:hidden">
            <Whiteboard width={260} height={180}>
              <HeroChart />
            </Whiteboard>
          </div>

          {/* Character cutout — scales down on mobile via CSS transform; md+ uses native size */}
          <div className="absolute bottom-0 left-0 z-20 origin-bottom-left scale-[0.65] sm:scale-[0.8] md:left-4 md:scale-100">
            <CharacterCutout
              src="/images/nibbles-hero-pointer.png"
              alt="Mr. Nibbles, the hedge-fund hamster, pointing at a whiteboard."
              width={CHARACTER_SIZE}
              height={CHARACTER_SIZE}
              priority
              bob
              reactive
            />
            <SpeechBubble text={bubble} className="bottom-full left-24 mb-2" />
          </div>

          {/* Laser beam — hidden on mobile where the layered composition compresses */}
          {pawAbs && laserTo && (
            <div className="pointer-events-none absolute inset-0 z-30 hidden md:block">
              <LaserBeam from={pawAbs} to={laserTo} animated />
            </div>
          )}

          {/* Floating chips — plain-English numbers, not jargon */}
          <div className="absolute right-2 top-0 z-40 md:right-4 md:top-2">
            <FloatingChip label="Gains" value="+847.3%" variant="gold" delay={0.8} />
          </div>
          <div className="absolute bottom-24 left-2 z-40 hidden md:block">
            <FloatingChip label="Stash" value="$4.2M" variant="navy" delay={1.0} />
          </div>
          <div className="absolute right-10 top-64 z-40 hidden lg:block">
            <FloatingChip label="Losses" value="0" variant="green" delay={1.2} />
          </div>
        </div>
      </div>

      {/* Figure caption */}
      <div className="prospectus-container -mt-4 pb-8 md:-mt-8">
        <p className="text-right font-mono text-[10px] uppercase tracking-[0.18em] text-brass">
          Fig. 1 — The Founder at Work. Photographed by Deborah.
        </p>
      </div>
    </section>
  );
}

// Bull flag chart drawn as SVG
function HeroChart() {
  // 12 candles forming a bull flag breakout
  const candles = [
    { o: 80, c: 70, l: 65, h: 85 },
    { o: 70, c: 60, l: 55, h: 75 },
    { o: 60, c: 55, l: 50, h: 65 },
    { o: 55, c: 48, l: 44, h: 58 },
    { o: 48, c: 52, l: 45, h: 56 },
    { o: 52, c: 54, l: 50, h: 58 },
    { o: 54, c: 50, l: 46, h: 58 },
    { o: 50, c: 52, l: 48, h: 56 },
    { o: 52, c: 58, l: 50, h: 62 },
    { o: 58, c: 70, l: 56, h: 74 },
    { o: 70, c: 82, l: 68, h: 86 },
    { o: 82, c: 90, l: 80, h: 96 },
  ];
  const width = 340;
  const height = 180;
  const candleW = (width - 40) / candles.length;
  const maxH = 100;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
      {/* Baseline */}
      <line x1="20" y1={height - 12} x2={width - 10} y2={height - 12} stroke="#000" strokeWidth="0.8" opacity="0.4" />
      {candles.map((c, i) => {
        const x = 20 + i * candleW + candleW / 2;
        const top = ((maxH - c.h) / maxH) * (height - 30) + 8;
        const bottom = ((maxH - c.l) / maxH) * (height - 30) + 8;
        const bodyTop = ((maxH - Math.max(c.o, c.c)) / maxH) * (height - 30) + 8;
        const bodyBottom = ((maxH - Math.min(c.o, c.c)) / maxH) * (height - 30) + 8;
        const up = c.c >= c.o;
        return (
          <g key={i}>
            <line x1={x} y1={top} x2={x} y2={bottom} stroke="#000" strokeWidth="1" />
            <rect
              x={x - candleW * 0.3}
              y={bodyTop}
              width={candleW * 0.6}
              height={Math.max(2, bodyBottom - bodyTop)}
              fill={up ? "#1B4332" : "#fff"}
              stroke="#000"
              strokeWidth="1"
            />
          </g>
        );
      })}
      {/* Annotations */}
      <text x="30" y="30" fill="#000" fontFamily="Caveat, cursive" fontSize="18">BULL FLAG</text>
      <text x={width - 150} y={40} fill="#C83A2E" fontFamily="Caveat, cursive" fontSize="18">
        BREAKOUT CONFIRMED
      </text>
      {/* Breakout arrow */}
      <path
        d={`M ${width - 80} 55 L ${width - 40} 20`}
        stroke="#C83A2E"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrow)"
      />
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#C83A2E" />
        </marker>
      </defs>
    </svg>
  );
}
