type Props = {
  seed: string;
  className?: string;
};

/**
 * Generic hedge-fund-manager silhouette. CSS-only. The comedy is that they're fake.
 */
export function AvatarSilhouette({ seed, className = "" }: Props) {
  // Deterministic hash → hue tint
  const hash = seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const tint = (hash % 60) - 30; // -30..+30 degrees hue shift

  return (
    <div
      className={`relative overflow-hidden border border-brass/40 ${className}`}
      style={{
        background: "linear-gradient(180deg, #D9C4A3 0%, #8B6F3A 100%)",
        filter: `hue-rotate(${tint}deg)`,
      }}
      aria-hidden="true"
    >
      {/* Body */}
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx="50" cy="38" r="18" fill="#0F1A3A" opacity="0.72" />
        <path d="M 20 100 Q 50 55 80 100 Z" fill="#0F1A3A" opacity="0.72" />
      </svg>
    </div>
  );
}
