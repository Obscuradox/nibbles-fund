"use client";

// Minimal Web Audio beep system — no external assets needed.
// Generates tones programmatically for paper-thunk, ticker-halt, and type-click events.

class AudioManager {
  private ctx: AudioContext | null = null;
  private enabled = false;
  private ambientNode: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;

  setEnabled(on: boolean) {
    this.enabled = on;
    if (!on && this.ambientNode) this.stopAmbient();
    if (on && !this.ambientNode) this.startAmbient();
  }

  getEnabled() {
    return this.enabled;
  }

  private ensureContext() {
    if (!this.ctx && typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AC = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
      this.ctx = new AC();
    }
    return this.ctx;
  }

  thunk() {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(90, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.22);
  }

  tick() {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = 1800;
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  }

  bell() {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    [880, 1320].forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = f;
      const start = ctx.currentTime + i * 0.08;
      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.6);
    });
  }

  private startAmbient() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 55;
    gain.gain.value = 0.015;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    this.ambientNode = osc;
    this.ambientGain = gain;
  }

  private stopAmbient() {
    if (this.ambientGain) {
      const ctx = this.ensureContext();
      if (ctx) {
        this.ambientGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
        this.ambientNode?.stop(ctx.currentTime + 0.25);
      }
    }
    this.ambientNode = null;
    this.ambientGain = null;
  }
}

let instance: AudioManager | null = null;

export function getAudio(): AudioManager {
  if (!instance) instance = new AudioManager();
  return instance;
}
