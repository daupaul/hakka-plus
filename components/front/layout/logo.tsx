import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** When true, use dark ink suitable for light backgrounds. */
  invert?: boolean;
}

const SIZES = {
  sm: "h-6",
  md: "h-7 lg:h-8",
  lg: "h-9 lg:h-10",
};

/**
 * HakkaTV brand mark — vector SVG replica of the official 油桐花 (tung flower) logo.
 * Crisp at any size, supports both white-on-dark and dark-on-light via `invert`.
 */
export function HakkaLogo({ className, size = "md", invert = false }: Props) {
  return (
    <svg
      viewBox="0 0 220 56"
      className={cn(SIZES[size], "w-auto", invert ? "text-text-primary" : "text-white", className)}
      fill="currentColor"
      aria-label="HakkaTV"
    >
      {/* 5-petal Tung flower (官方客家電視台油桐花) */}
      <g transform="translate(28 28)">
        {/* Outer ring */}
        <circle r="22" fill="none" stroke="currentColor" strokeWidth="2.6" />
        {/* Petals at 0°, 72°, 144°, 216°, 288° */}
        <g>
          <ellipse cx="0" cy="-12" rx="3.8" ry="6.5" />
          <ellipse cx="11.4" cy="-3.7" rx="6.5" ry="3.8" transform="rotate(-30 11.4 -3.7)" />
          <ellipse cx="7" cy="9.7" rx="3.8" ry="6.5" transform="rotate(36 7 9.7)" />
          <ellipse cx="-7" cy="9.7" rx="3.8" ry="6.5" transform="rotate(-36 -7 9.7)" />
          <ellipse cx="-11.4" cy="-3.7" rx="6.5" ry="3.8" transform="rotate(30 -11.4 -3.7)" />
        </g>
        {/* Center dot */}
        <circle r="2.4" />
      </g>

      {/* Wordmark */}
      <text
        x="62"
        y="38"
        fontFamily='-apple-system, BlinkMacSystemFont, "Inter", "Noto Sans TC", sans-serif'
        fontWeight="900"
        fontSize="30"
        letterSpacing="-1"
      >
        Hakka<tspan fontStyle="italic">TV</tspan>
      </text>
    </svg>
  );
}
