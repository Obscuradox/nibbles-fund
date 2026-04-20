import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "letterhead" | "sunken";
};

export function PaperCard({ children, className = "", variant = "default" }: Props) {
  const variants = {
    default: "bg-whiteboard-cream border border-brass/20 shadow-card",
    letterhead: "bg-cream-paper border border-brass/30 shadow-plate",
    sunken: "bg-cream-paper/60 border border-brass/15",
  };
  return (
    <div className={`relative ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
