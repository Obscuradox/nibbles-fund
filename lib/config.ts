// Launch-day swap these to real values.
export const TOKEN = {
  name: "The Nibbles Fund",
  ticker: "NIBBLES",
  mintAddress: "Hm3N1bbl3sFundPLACEHOLDERkLp9aXxXxXxXxXxXxXx",
  // Placeholder until pump.fun fair launch
  contractAddress: "Hm3N1bbl3sFundPLACEHOLDERkLp9aXxXxXxXxXxXxXx",
  pairAddress: "PLACEHOLDER_PAIR_ADDRESS",
  pumpFunUrl: "https://pump.fun/coin/placeholder-nibbles",
  jupiterUrl: "https://jup.ag/",
  dexScreenerEmbed: "https://dexscreener.com/solana/PLACEHOLDER_PAIR_ADDRESS?embed=1&theme=light&info=0",
  tiers: {
    observer: 0,
    participant: 100_000,
    charter: 1_000_000,
  },
} as const;

export const SOCIALS = {
  x: "https://x.com/nibblesfund",
  telegram: "https://t.me/nibblesfund",
  discord: "https://discord.gg/nibblesfund",
} as const;

export const WALLETS = {
  phantom: "https://phantom.app/",
  solflare: "https://solflare.com/",
} as const;

// Short address for display
export const shortCA = (ca: string) =>
  ca.length > 12 ? `${ca.slice(0, 4)}...${ca.slice(-4)}` : ca;
