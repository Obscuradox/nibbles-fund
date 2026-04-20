"use client";

import dynamic from "next/dynamic";

// Lazy-load react-countup (only loads when stats are rendered)
const ReactCountUp = dynamic(() => import("react-countup"), { ssr: false });

type Props = {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  separator?: string;
};

export function CountUp({ end, decimals = 0, prefix = "", suffix = "", duration = 2.2, separator = "," }: Props) {
  return (
    <ReactCountUp
      end={end}
      decimals={decimals}
      prefix={prefix}
      suffix={suffix}
      duration={duration}
      separator={separator}
      enableScrollSpy
      scrollSpyOnce
    />
  );
}
