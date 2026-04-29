"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { FadeInOnScroll } from "./motion/FadeInOnScroll";

const VIDEO_SRC = "/video/nibbles-wolf-v6.mp4";
const POSTER_SRC = "/video/nibbles-wolf-v6-poster.jpg";

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [started, setStarted] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
      setStarted(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const requestFullscreen = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) {
      v.requestFullscreen().catch(() => {});
      return;
    }
    // iOS Safari fallback — webkitEnterFullscreen is non-standard but real on iOS
    const ios = v as HTMLVideoElement & { webkitEnterFullscreen?: () => void };
    if (typeof ios.webkitEnterFullscreen === "function") {
      ios.webkitEnterFullscreen();
    }
  };

  return (
    <section
      id="film"
      className="relative border-b border-brass/30 bg-prospectus-navy text-cream-paper"
    >
      <div className="prospectus-container py-16 md:py-24">
        <FadeInOnScroll>
          <div className="mb-8 max-w-3xl md:mb-12">
            <p className="kicker mb-3 text-nibbles-gold-soft">Exhibit A · File Footage</p>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
              The Nibbles of Wall Street.
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-cream-paper/80 sm:text-lg">
              Sixty seconds of the Founder at work. Filed under privileged.
              Released anyway.
            </p>
          </div>
        </FadeInOnScroll>

        <FadeInOnScroll delay={0.08}>
          <div className="mx-auto w-full max-w-[420px]">
            {/* Frame */}
            <div className="relative overflow-hidden border border-brass/50 bg-ink shadow-plate">
              {/* Caption bar — top */}
              <div className="flex items-center justify-between gap-3 border-b border-brass/40 bg-ink/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-nibbles-gold-soft sm:px-4">
                <span className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-alert-red" />
                  Rec
                </span>
                <span className="hidden sm:inline">REEL 06 · 1:12 · 9:16</span>
                <span className="sm:hidden">REEL 06</span>
              </div>

              {/* Video container — fixed 9:16 aspect */}
              <div className="relative w-full" style={{ aspectRatio: "9 / 16" }}>
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={VIDEO_SRC}
                  poster={POSTER_SRC}
                  preload="metadata"
                  playsInline
                  muted={muted}
                  controls={false}
                  onPlay={() => {
                    setPlaying(true);
                    setStarted(true);
                  }}
                  onPause={() => setPlaying(false)}
                  onEnded={() => setPlaying(false)}
                />

                {/* Big-play overlay (pre-start) */}
                {!started && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center bg-ink/30 transition-colors hover:bg-ink/20"
                    aria-label="Play film"
                  >
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-paper/95 text-ink shadow-plate transition-transform hover:scale-105">
                      <Play className="h-8 w-8 translate-x-0.5" fill="currentColor" />
                    </span>
                  </button>
                )}

                {/* Pause-tap (after first play) */}
                {started && (
                  <button
                    onClick={togglePlay}
                    className="absolute inset-0"
                    aria-label={playing ? "Pause film" : "Play film"}
                  />
                )}

                {/* Controls overlay (after first play) */}
                {started && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-ink/85 to-transparent px-3 py-3 sm:px-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream-paper/90 text-ink hover:bg-cream-paper"
                      aria-label={playing ? "Pause" : "Play"}
                    >
                      {playing ? (
                        <Pause className="h-4 w-4" fill="currentColor" />
                      ) : (
                        <Play className="h-4 w-4 translate-x-0.5" fill="currentColor" />
                      )}
                    </button>
                    <div className="pointer-events-auto flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMute();
                        }}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream-paper/90 text-ink hover:bg-cream-paper"
                        aria-label={muted ? "Unmute" : "Mute"}
                      >
                        {muted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          requestFullscreen();
                        }}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream-paper/90 text-ink hover:bg-cream-paper"
                        aria-label="Fullscreen"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Caption bar — bottom */}
              <div className="flex items-center justify-between border-t border-brass/40 bg-ink/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream-paper/60 sm:px-4">
                <span>Subject: M. Nibbles</span>
                <span className="hidden sm:inline">Cam: Prieto Unit</span>
                <span>Cleared by Deborah</span>
              </div>
            </div>

            {/* Figure caption */}
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-cream-paper/50 sm:text-right">
              Fig. 06 — The Founder, on film. Sound recommended.
            </p>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
}
