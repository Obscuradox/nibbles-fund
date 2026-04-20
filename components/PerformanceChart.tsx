"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Cumulative return index, Jan 2023 = 100. Deadpan: Nibbles never down.
const NIBBLES_POINTS = [
  100, 108, 119, 126, 141, 158, 172, 188, 205, 224, 248, 271,
  294, 321, 352, 388, 424, 463, 508, 554, 606, 662, 724, 791,
  863, 942, 1028, 1122, 1224,
];
const SP_POINTS = [
  100, 102, 104, 103, 107, 110, 112, 115, 114, 117, 119, 122,
  124, 126, 128, 129, 132, 134, 137, 139, 141, 143, 145, 148,
  150, 152, 154, 157, 159,
];

const WIDTH = 800;
const HEIGHT = 280;
const PAD = { top: 20, right: 30, bottom: 28, left: 44 };

function buildPath(points: number[]) {
  const maxY = Math.max(...NIBBLES_POINTS);
  const xStep = (WIDTH - PAD.left - PAD.right) / (points.length - 1);
  const yScale = (HEIGHT - PAD.top - PAD.bottom) / maxY;
  return points
    .map((y, i) => {
      const cx = PAD.left + i * xStep;
      const cy = HEIGHT - PAD.bottom - y * yScale;
      return `${i === 0 ? "M" : "L"}${cx.toFixed(1)},${cy.toFixed(1)}`;
    })
    .join(" ");
}

export function PerformanceChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const nibblesPath = buildPath(NIBBLES_POINTS);
  const spPath = buildPath(SP_POINTS);

  const years = ["2023", "2024", "2025", "2026"];
  const xYearStep = (WIDTH - PAD.left - PAD.right) / (years.length - 1);

  const gridValues = [200, 500, 800, 1100];
  const maxY = Math.max(...NIBBLES_POINTS);
  const yScale = (HEIGHT - PAD.top - PAD.bottom) / maxY;

  return (
    <div className="w-full">
      <svg
        ref={ref}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto font-mono"
        role="img"
        aria-label="Cumulative return chart, Nibbles Fund vs S&P 500, 2023 through 2026"
      >
        {/* Grid lines */}
        {gridValues.map((v) => {
          const y = HEIGHT - PAD.bottom - v * yScale;
          return (
            <g key={v}>
              <line
                x1={PAD.left}
                x2={WIDTH - PAD.right}
                y1={y}
                y2={y}
                stroke="#8B6F3A"
                strokeOpacity="0.18"
                strokeDasharray="2 4"
              />
              <text
                x={PAD.left - 8}
                y={y + 3}
                textAnchor="end"
                fontSize="9"
                fill="#8B6F3A"
                letterSpacing="1"
              >
                {v}
              </text>
            </g>
          );
        })}

        {/* X axis years */}
        {years.map((yr, i) => (
          <text
            key={yr}
            x={PAD.left + i * xYearStep}
            y={HEIGHT - 8}
            textAnchor="middle"
            fontSize="10"
            fill="#8B6F3A"
            letterSpacing="1.5"
          >
            {yr}
          </text>
        ))}

        {/* S&P line */}
        <motion.path
          d={spPath}
          fill="none"
          stroke="#4B5563"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />

        {/* Nibbles line */}
        <motion.path
          d={nibblesPath}
          fill="none"
          stroke="#B8923A"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: inView ? 1 : 0 }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        />

        {/* Legend */}
        <g transform={`translate(${PAD.left}, ${PAD.top})`}>
          <line x1="0" y1="0" x2="22" y2="0" stroke="#B8923A" strokeWidth="2.5" />
          <text x="28" y="3" fontSize="10" fill="#0A0A0A" letterSpacing="1">
            NIBBLES FUND
          </text>

          <line x1="140" y1="0" x2="162" y2="0" stroke="#4B5563" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="168" y="3" fontSize="10" fill="#4B5563" letterSpacing="1">
            S&amp;P 500
          </text>
        </g>
      </svg>
    </div>
  );
}
