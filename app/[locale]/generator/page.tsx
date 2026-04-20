"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download, Copy, Check } from "lucide-react";
import { TickerBar } from "@/components/TickerBar";
import { BloombergChyron } from "@/components/ui/BloombergChyron";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { EasterEggProvider } from "@/lib/easterEggs";

const POSES = [
  { id: "hero-pointer", src: "/images/nibbles-hero-pointer.png", label: "Pointer" },
  { id: "arms-crossed", src: "/images/nibbles-arms-crossed.png", label: "Arms Crossed" },
  { id: "thinking", src: "/images/nibbles-thinking.png", label: "Thinking" },
  { id: "signing", src: "/images/nibbles-signing.png", label: "Signing" },
  { id: "phone", src: "/images/nibbles-phone.png", label: "On the Phone" },
  { id: "newspaper", src: "/images/nibbles-newspaper.png", label: "Reading FT" },
  { id: "walking", src: "/images/nibbles-walking.png", label: "Walking" },
  { id: "unimpressed", src: "/images/nibbles-unimpressed.png", label: "Unimpressed" },
  { id: "stamping", src: "/images/nibbles-stamping.png", label: "Stamping" },
  { id: "peeking", src: "/images/nibbles-peeking.png", label: "Peeking" },
];

export default function GeneratorPage() {
  const [selectedPose, setSelectedPose] = useState(POSES[0]);
  const [caption, setCaption] = useState("Observing.");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const render = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    canvas.width = 1080;
    canvas.height = 1080;

    // Cream background
    ctx.fillStyle = "#FAF6EC";
    ctx.fillRect(0, 0, 1080, 1080);

    // Draw character
    const img = await loadImage(selectedPose.src);
    const targetH = 700;
    const targetW = (img.width / img.height) * targetH;
    ctx.drawImage(img, (1080 - targetW) / 2, 120, targetW, targetH);

    // Caption
    ctx.fillStyle = "#0F1A3A";
    ctx.font = "bold 60px Fraunces, Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText(caption, 540, 920, 960);

    // Watermark
    ctx.fillStyle = "rgba(139, 111, 58, 0.7)";
    ctx.font = "400 18px 'IBM Plex Mono', monospace";
    ctx.fillText("THE NIBBLES FUND · nibblesfund.com", 540, 1030);

    return canvas.toDataURL("image/png");
  };

  const download = async () => {
    const dataUrl = await render();
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `nibbles-${selectedPose.id}.png`;
    link.click();
  };

  const copyToClipboard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    await render();
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      try {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // clipboard unsupported → fall back to download
        download();
      }
    }, "image/png");
  };

  return (
    <EasterEggProvider>
      <TickerBar />
      <BloombergChyron />
      <Nav />

      <main className="prospectus-container py-16">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <p className="kicker mb-4">Communications Kit</p>
          <h1 className="font-display text-4xl leading-tight md:text-5xl">
            Mr. Nibbles Reaction Generator
          </h1>
          <p className="mx-auto mt-4 max-w-md font-sans text-slate-70">
            Pick a pose. Add a caption. Download the image. Distribute at your discretion.
            The Fund does not endorse your caption.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Preview */}
          <div className="flex flex-col items-center">
            <div className="relative aspect-square w-full max-w-md border border-brass/40 bg-cream-paper shadow-plate">
              <div className="absolute inset-0 flex flex-col items-center justify-start p-6">
                <div className="relative flex-1 w-full">
                  <Image src={selectedPose.src} alt="" fill className="object-contain" sizes="400px" />
                </div>
                <p className="mt-4 text-center font-display text-3xl text-prospectus-navy">
                  {caption || "\u00A0"}
                </p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-brass">
                  The Nibbles Fund · nibblesfund.com
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button onClick={download} className="btn-primary text-sm">
                <Download className="h-4 w-4" />
                Download PNG
              </button>
              <button onClick={copyToClipboard} className="btn-ghost text-sm">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy to Clipboard"}
              </button>
            </div>
          </div>

          {/* Controls */}
          <div>
            <p className="kicker mb-3">Caption</p>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Observing."
              maxLength={80}
              className="w-full border border-brass/40 bg-cream-paper px-4 py-3 font-mono text-base text-ink focus:outline-none focus:ring-2 focus:ring-nibbles-gold"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {["Observing.", "Noted.", "Acceptable.", "No.", "We are the market.", "This, too, is a seed."].map((c) => (
                <button
                  key={c}
                  onClick={() => setCaption(c)}
                  className="border border-brass/30 bg-whiteboard-cream px-3 py-1 font-mono text-xs hover:bg-nibbles-gold/10"
                  style={{ borderRadius: 2 }}
                >
                  {c}
                </button>
              ))}
            </div>

            <p className="kicker mt-8 mb-3">Pose</p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              {POSES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPose(p)}
                  className={`relative aspect-square border ${
                    selectedPose.id === p.id
                      ? "border-nibbles-gold shadow-lg"
                      : "border-brass/30 opacity-60 hover:opacity-100"
                  } bg-cream-paper transition`}
                  aria-label={p.label}
                >
                  <Image src={p.src} alt={p.label} fill className="object-contain p-1" sizes="80px" />
                </button>
              ))}
            </div>

            <p className="mt-8 font-mono text-xs italic text-slate-70">
              Your creation is yours. Distribution is your responsibility. Deborah takes no position.
            </p>
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />

        <p className="mt-16 text-center">
          <Link href="/" className="font-mono text-xs uppercase tracking-[0.18em] text-brass hover:text-nibbles-gold">
            ← Return to the Fund
          </Link>
        </p>
      </main>

      <Footer />
    </EasterEggProvider>
  );
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
