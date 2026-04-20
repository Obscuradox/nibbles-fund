import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  width?: number;
  height?: number;
  className?: string;
};

/**
 * A dry-erase whiteboard on a wooden easel frame, rendered as SVG + content slot.
 * Content (charts, diagrams) goes inside the white surface.
 */
export function Whiteboard({ children, width = 380, height = 280, className = "" }: Props) {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Wooden easel legs */}
      <svg
        viewBox={`0 0 ${width} ${height + 40}`}
        width={width}
        height={height + 40}
        className="absolute inset-0"
        aria-hidden="true"
      >
        {/* Left leg */}
        <line x1="12" y1={height + 30} x2="60" y2="20" stroke="#5C3D1E" strokeWidth="6" strokeLinecap="round" />
        {/* Right leg */}
        <line
          x1={width - 12}
          y1={height + 30}
          x2={width - 60}
          y2="20"
          stroke="#5C3D1E"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Crossbar */}
        <line x1="30" y1={height - 4} x2={width - 30} y2={height - 4} stroke="#5C3D1E" strokeWidth="4" strokeLinecap="round" />
      </svg>

      {/* Whiteboard surface */}
      <div
        className="absolute left-[10%] right-[10%] top-[5%] bg-white border-2 border-[#5C3D1E] shadow-lg"
        style={{ height: height - 30, borderRadius: 2 }}
      >
        <div className="relative h-full w-full p-3">{children}</div>
      </div>
    </div>
  );
}
