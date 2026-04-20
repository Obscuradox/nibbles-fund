import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "nibbles-gold": "#B8923A",
        "nibbles-gold-soft": "#D4B36A",
        "prospectus-navy": "#0F1A3A",
        "prospectus-navy-soft": "#1B2A5A",
        "cream-paper": "#FAF6EC",
        "whiteboard-cream": "#F4EDDC",
        "ledger-green": "#1B4332",
        brass: "#6F5629",
        "brass-soft": "#8B6F3A",
        ink: "#0A0A0A",
        "alert-red": "#C83A2E",
        "slate-70": "#4B5563",
      },
      fontFamily: {
        display: ['"Fraunces Variable"', "Fraunces", "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
        hand: ['"Caveat"', "cursive"],
      },
      fontSize: {
        // Editorial scale
        "display-xl": ["6rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["4rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-sm": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        prospectus: "72rem",
      },
      boxShadow: {
        plate: "0 1px 2px rgba(10,10,10,0.06), 0 0 0 1px rgba(139,111,58,0.18)",
        card: "0 1px 3px rgba(10,10,10,0.08)",
      },
      backgroundImage: {
        "paper-grain": "url('/textures/paper-grain.svg')",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ticker-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 400ms ease-out forwards",
        "ticker-scroll": "ticker-scroll 45s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
