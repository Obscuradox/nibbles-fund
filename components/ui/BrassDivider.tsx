type Props = {
  variant?: "hairline" | "double" | "ornament";
  className?: string;
  ornamentSrc?: string;
};

export function BrassDivider({ variant = "hairline", className = "", ornamentSrc }: Props) {
  if (variant === "ornament" && ornamentSrc) {
    return (
      <div className={`flex items-center justify-center py-10 ${className}`}>
        <div aria-hidden="true" className="h-px w-24 bg-brass/30" />
        <img
          src={ornamentSrc}
          alt=""
          aria-hidden="true"
          className="mx-6 h-8 w-auto opacity-80"
        />
        <div aria-hidden="true" className="h-px w-24 bg-brass/30" />
      </div>
    );
  }

  if (variant === "double") {
    return (
      <div className={`brass-double-rule ${className}`} aria-hidden="true" />
    );
  }

  return <div className={`brass-hairline ${className}`} aria-hidden="true" />;
}
