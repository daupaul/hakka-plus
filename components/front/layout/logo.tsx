import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Toggle to render the icon-only version */
  iconOnly?: boolean;
}

const SIZES = {
  sm: { icon: 20, text: "text-sm" },
  md: { icon: 24, text: "text-base" },
  lg: { icon: 32, text: "text-2xl" },
};

/**
 * Hakka TV brand mark.
 * White ring with a 4-petal Tung flower inside + "HakkaTV" wordmark.
 * Mirrors the design-spec logo from /Users/paul/Downloads/Hakka+/H.png.
 */
export function HakkaLogo({ className, size = "md", iconOnly = false }: Props) {
  const s = SIZES[size];
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 40 40"
        width={s.icon}
        height={s.icon}
        className="shrink-0"
        aria-hidden="true"
      >
        {/* Outer ring */}
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2.2" fill="none" />
        {/* Tung-flower petals — 4 teardrop shapes radiating from center */}
        {/* Top petal */}
        <ellipse cx="20" cy="11.5" rx="3.2" ry="5.5" fill="currentColor" />
        {/* Right petal */}
        <ellipse cx="28.5" cy="20" rx="5.5" ry="3.2" fill="currentColor" />
        {/* Bottom petal */}
        <ellipse cx="20" cy="28.5" rx="3.2" ry="5.5" fill="currentColor" />
        {/* Left petal */}
        <ellipse cx="11.5" cy="20" rx="5.5" ry="3.2" fill="currentColor" />
        {/* Center accent — small filled dot */}
        <circle cx="20" cy="20" r="2.2" fill="currentColor" />
        {/* Subtle off-center stamen — gives the asymmetric organic feel */}
        <circle cx="14.5" cy="14.5" r="1.1" fill="currentColor" />
      </svg>
      {!iconOnly && (
        <span className={cn("font-display font-extrabold tracking-tight whitespace-nowrap", s.text)}>
          Hakka<span className="italic">TV</span>
        </span>
      )}
    </span>
  );
}
