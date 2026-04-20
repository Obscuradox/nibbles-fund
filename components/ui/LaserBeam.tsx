"use client";

import { motion } from "framer-motion";

type Props = {
  from: { x: number; y: number };
  to: { x: number; y: number };
  className?: string;
  animated?: boolean;
};

export function LaserBeam({ from, to, className = "", animated = true }: Props) {
  const length = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));

  return (
    <svg
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <defs>
        <filter id="laser-glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Glow layer */}
      <motion.line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="#FF2D2D"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#laser-glow)"
        opacity="0.7"
        initial={animated ? { pathLength: 0, opacity: 0 } : {}}
        animate={animated ? { pathLength: 1, opacity: 0.7 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {/* Core beam */}
      <motion.line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.9"
        initial={animated ? { pathLength: 0 } : {}}
        animate={animated ? { pathLength: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      />
      {/* Terminus dot */}
      <motion.circle
        cx={to.x}
        cy={to.y}
        r="4"
        fill="#FF2D2D"
        filter="url(#laser-glow)"
        initial={animated ? { scale: 0 } : {}}
        animate={animated ? { scale: [0, 1.2, 1] } : {}}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
    </svg>
  );
}
