"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  /** Idle bob animation */
  bob?: boolean;
  /** Track cursor with eye parallax (needs eye overlay SVG positioned separately) */
  trackCursor?: boolean;
  /** Respond to nearby mouse with subtle scale/translate */
  reactive?: boolean;
  /** Alternate src to crossfade on hover (reactive pose swap) */
  hoverSrc?: string;
};

export function CharacterCutout({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  bob = true,
  trackCursor = false,
  reactive = false,
  hoverSrc,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [showHover, setShowHover] = useState(false);

  const tx = useMotionValue(0);
  const ty = useMotionValue(0);
  const springX = useSpring(tx, { damping: 25, stiffness: 150 });
  const springY = useSpring(ty, { damping: 25, stiffness: 150 });

  useEffect(() => {
    if (!reactive && !trackCursor) return;

    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 400) {
        tx.set((dx / dist) * Math.min(dist / 100, 3));
        ty.set((dy / dist) * Math.min(dist / 100, 3));
      } else {
        tx.set(0);
        ty.set(0);
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reactive, trackCursor, tx, ty]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{ width, height, x: reactive ? springX : 0, y: reactive ? springY : 0 }}
      animate={bob ? { y: [0, -4, 0] } : undefined}
      transition={bob ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : undefined}
      onMouseEnter={() => hoverSrc && setShowHover(true)}
      onMouseLeave={() => hoverSrc && setShowHover(false)}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`h-full w-full object-contain transition-opacity duration-300 ${
          showHover ? "opacity-0" : "opacity-100"
        }`}
      />
      {hoverSrc && (
        <Image
          src={hoverSrc}
          alt=""
          width={width}
          height={height}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${
            showHover ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </motion.div>
  );
}
