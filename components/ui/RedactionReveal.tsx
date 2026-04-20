"use client";

import { useState } from "react";

type Props = {
  children: string;
  /** When true, the text underneath is revealed */
  revealed?: boolean;
};

/**
 * Redacted black bar over text. Hover or prop forces partial reveal.
 */
export function RedactionReveal({ children, revealed = false }: Props) {
  const [hovering, setHovering] = useState(false);
  const show = revealed || hovering;
  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <span className={show ? "opacity-100 transition-opacity duration-300" : "opacity-30"}>{children}</span>
      <span
        className={`absolute inset-0 bg-ink transition-opacity duration-300 ${
          show ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />
    </span>
  );
}
