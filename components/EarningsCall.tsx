"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, VolumeX } from "lucide-react";
import Image from "next/image";
import { FadeInOnScroll } from "./motion/FadeInOnScroll";
import { PaperCard } from "./ui/PaperCard";

type Line = {
  speaker: string;
  text: string;
  audio?: string; // path under /public
  muted?: boolean;
};

// audio slugs match generate-earnings-audio.sh output names (NN-slug.mp3)
const TRANSCRIPT: Line[] = [
  { speaker: "OPERATOR", text: "Good afternoon. Welcome to The Nibbles Fund Q1 2026 earnings call. All participants are in listen-only mode. Today's call is being recorded.", audio: "/audio/earnings/00-operator.mp3" },
  { speaker: "OPERATOR", text: "I will now turn the call over to Deborah.", audio: "/audio/earnings/01-operator.mp3" },
  { speaker: "DEBORAH", text: "Thank you, operator. Joining me today is Mr. Nibbles, Chief Investment Officer. Mr. Nibbles will not be speaking. He is observing.", audio: "/audio/earnings/02-deborah.mp3" },
  { speaker: "DEBORAH", text: "Q1 was a quarter of expected outcomes. Seed I performed as disclosed. Seeds II through III performed within tolerance. Seeds IV through VII performed, but the details are privileged.", audio: "/audio/earnings/03-deborah.mp3" },
  { speaker: "DEBORAH", text: "Net-net, the Fund is up. That is the presentation.", audio: "/audio/earnings/04-deborah.mp3" },
  { speaker: "OPERATOR", text: "We will now take questions.", audio: "/audio/earnings/05-operator.mp3" },
  { speaker: "ANALYST (Morgan Stanley)", text: "Could you walk us through the decision to allocate 8% to physical sunflower seeds?", audio: "/audio/earnings/06-analyst-morgan-stanley.mp3" },
  { speaker: "DEBORAH", text: "No.", audio: "/audio/earnings/07-deborah.mp3" },
  { speaker: "ANALYST (JPMorgan)", text: "Does Mr. Nibbles have any comment on the Rat Coin situation?", audio: "/audio/earnings/08-analyst-jpmorgan.mp3" },
  { speaker: "[MUTED]", text: "[QUESTION MUTED BY MANAGEMENT]", muted: true },
  { speaker: "DEBORAH", text: "We will now take prepared remarks only.", audio: "/audio/earnings/10-deborah.mp3" },
  { speaker: "ANALYST (Goldman)", text: "Can you clarify the gate mechanism?", audio: "/audio/earnings/11-analyst-goldman.mp3" },
  { speaker: "DEBORAH", text: "The gate is at the Manager's discretion. The Manager has discretion.", audio: "/audio/earnings/12-deborah.mp3" },
  { speaker: "OPERATOR", text: "That concludes today's earnings call. Thank you for joining. A replay will not be available.", audio: "/audio/earnings/13-operator.mp3" },
];

export function EarningsCall() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [muted, setMuted] = useState<Set<number>>(new Set());
  const transcriptRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);

  // Check whether the generated audio pack exists (HEAD on the first line).
  useEffect(() => {
    let cancelled = false;
    const probe = TRANSCRIPT[0]?.audio;
    if (!probe) return;
    fetch(probe, { method: "HEAD" })
      .then((r) => {
        if (!cancelled) setAudioReady(r.ok);
      })
      .catch(() => {
        if (!cancelled) setAudioReady(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const clearFallback = () => {
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  };

  const advance = useCallback(() => {
    setIdx((i) => (i >= TRANSCRIPT.length - 1 ? i : i + 1));
  }, []);

  // Drive playback — prefer audio when available; otherwise use a reading-pace timer.
  useEffect(() => {
    const line = TRANSCRIPT[idx];
    if (!line || !playing) {
      audioRef.current?.pause();
      clearFallback();
      return;
    }

    const onEnd = () => {
      if (idx < TRANSCRIPT.length - 1) advance();
      else setPlaying(false);
    };

    const useAudio = audioReady && line.audio && !line.muted && !muted.has(idx);

    if (useAudio) {
      const el = audioRef.current ?? new Audio();
      audioRef.current = el;
      el.src = line.audio!;
      el.onended = onEnd;
      el.onerror = () => {
        // Missing file — fall back to reading-pace timer for this line only
        const ms = Math.max(1800, Math.min(8000, line.text.length * 55));
        fallbackTimerRef.current = window.setTimeout(onEnd, ms);
      };
      el.play().catch(() => {
        // Autoplay blocked — pause, user will hit Play
        setPlaying(false);
      });
    } else {
      // Muted line or no audio pack — reading-pace timer
      const ms = line.muted
        ? 1500
        : Math.max(1800, Math.min(8000, line.text.length * 55));
      fallbackTimerRef.current = window.setTimeout(onEnd, ms);
    }

    return () => {
      clearFallback();
      if (audioRef.current) {
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
      }
    };
  }, [idx, playing, audioReady, muted, advance]);

  // Autoscroll transcript
  useEffect(() => {
    transcriptRef.current?.scrollTo({
      top: transcriptRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [idx]);

  const togglePlay = () => {
    if (!playing && idx >= TRANSCRIPT.length - 1) setIdx(0);
    setPlaying((p) => !p);
  };

  const visible = TRANSCRIPT.slice(0, idx + 1);

  return (
    <section
      id="earnings"
      className="relative overflow-hidden bg-prospectus-navy text-cream-paper"
    >
      <div className="absolute inset-0 opacity-[0.12]" aria-hidden="true">
        <Image
          src="/images/bg-terminal-wall.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      <div className="relative prospectus-container py-20 md:py-28">
        <FadeInOnScroll>
          <div className="mb-10 border-b border-cream-paper/20 pb-6">
            <p className="kicker mb-3 text-nibbles-gold-soft">Q1 2026 Earnings Call</p>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
              Earnings Call · Q1 2026
            </h2>
            <p className="mt-3 max-w-xl font-mono text-[10px] uppercase tracking-[0.22em] text-cream-paper/60 sm:text-xs">
              Speakers: M. Nibbles (CIO, non-speaking) · Deborah (IR) · Analysts (listen-only)
            </p>
          </div>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Transcript */}
          <FadeInOnScroll className="lg:col-span-3" delay={0.05}>
            <PaperCard
              variant="sunken"
              className="flex h-[460px] flex-col bg-ink/20 text-cream-paper md:h-[520px]"
            >
              <div className="flex items-center justify-between border-b border-cream-paper/20 px-4 py-3 sm:px-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-paper/60">
                  Live Transcript {audioReady ? "· Audio" : "· Text"}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={togglePlay}
                    className="inline-flex items-center gap-1 border border-cream-paper/30 px-3 py-1 font-mono text-[10px] uppercase tracking-wider hover:bg-cream-paper/10"
                  >
                    {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    {playing ? "Pause" : "Play"}
                  </button>
                </div>
              </div>
              <div
                ref={transcriptRef}
                className="flex-1 space-y-4 overflow-y-auto px-4 py-4 font-mono text-sm leading-relaxed sm:px-5"
              >
                {visible.map((line, i) => (
                  <div
                    key={i}
                    className={`${
                      line.muted || muted.has(i) ? "opacity-40" : ""
                    } ${i === idx && playing ? "text-cream-paper" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-nibbles-gold-soft">
                        {line.speaker}
                      </p>
                      {!line.muted &&
                        line.speaker.startsWith("ANALYST") &&
                        !muted.has(i) && (
                          <button
                            onClick={() =>
                              setMuted((s) => new Set(s).add(i))
                            }
                            className="inline-flex shrink-0 items-center gap-1 border border-cream-paper/20 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-cream-paper/60 hover:bg-cream-paper/10"
                            title="Mute this question"
                          >
                            <VolumeX className="h-3 w-3" />
                            Mute
                          </button>
                        )}
                    </div>
                    <p className="mt-1 text-cream-paper/90">
                      {muted.has(i)
                        ? "[QUESTION MUTED BY MANAGEMENT]"
                        : line.text}
                    </p>
                  </div>
                ))}
              </div>
            </PaperCard>
          </FadeInOnScroll>

          {/* Guidance chart (intentionally illegible) */}
          <FadeInOnScroll className="lg:col-span-2" delay={0.1}>
            <PaperCard
              variant="sunken"
              className="h-[320px] bg-ink/20 text-cream-paper sm:h-[420px] lg:h-[520px]"
            >
              <div className="flex items-center border-b border-cream-paper/20 px-4 py-3 sm:px-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream-paper/60">
                  Guidance Chart · Q2 Outlook
                </p>
              </div>
              <div className="relative h-[calc(100%-44px)] p-4">
                <svg viewBox="0 0 300 300" className="h-full w-full">
                  {[...Array(12)].map((_, i) => (
                    <polyline
                      key={i}
                      fill="none"
                      stroke={`hsl(${i * 30}, 60%, 55%)`}
                      strokeWidth="0.6"
                      strokeOpacity="0.7"
                      points={[...Array(18)]
                        .map(
                          (_, j) =>
                            `${j * 16},${
                              150 +
                              40 * Math.sin(j * 0.5 + i) +
                              20 * Math.cos(j * 0.3 + i * 2)
                            }`
                        )
                        .join(" ")}
                    />
                  ))}
                  <text x="30" y="20" fill="#D4B36A" fontSize="7">
                    Seed-Adj. Yield
                  </text>
                  <text x="150" y="20" fill="#D4B36A" fontSize="7">
                    Craig-Normalized Δ
                  </text>
                  <text x="30" y="290" fill="#D4B36A" fontSize="7">
                    Burrow Depth Ratio
                  </text>
                  <text x="150" y="290" fill="#D4B36A" fontSize="7">
                    Wheel-Turn Composite
                  </text>
                  <text x="80" y="155" fill="#D4B36A" fontSize="7">
                    Net Rodent Exposure
                  </text>
                </svg>
              </div>
            </PaperCard>
          </FadeInOnScroll>
        </div>

        <p className="mt-6 max-w-2xl font-sans text-xs italic text-cream-paper/60">
          Transcript compiled by Deborah. Chart methodology is proprietary. Replay not available.
        </p>
      </div>
    </section>
  );
}
