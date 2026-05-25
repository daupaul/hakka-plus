import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Use dark ink (for light backgrounds) */
  invert?: boolean;
}

const SIZES = { sm: "h-6", md: "h-7 lg:h-9", lg: "h-9 lg:h-11" };

/**
 * HakkaTV brand mark — pure inline SVG, infinitely crisp at any size.
 * 5-petal 油桐花 icon + bold "HakkaTV" wordmark.
 */
export function HakkaLogo({ className, size = "md", invert = false }: Props) {
  return (
    <svg
      viewBox="0 0 240 60"
      className={cn(SIZES[size], "w-auto", invert ? "text-[#14181a]" : "text-white", className)}
      fill="currentColor"
      role="img"
      aria-label="HakkaTV"
    >
      <g transform="translate(30 30)">
        <circle r="24" fill="none" stroke="currentColor" strokeWidth="2.8" />
        {[0, 72, 144, 216, 288].map((deg) => (
          <path
            key={deg}
            d="M 0 -14 C -5.5 -14 -7.5 -7.5 -3.5 -2 C -1.2 0 1.2 0 3.5 -2 C 7.5 -7.5 5.5 -14 0 -14 Z"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle r="2.8" />
      </g>
      <text
        x="68"
        y="40"
        fontFamily='-apple-system, BlinkMacSystemFont, "Helvetica Neue", "Noto Sans TC", system-ui, sans-serif'
        fontWeight="900"
        fontSize="30"
        letterSpacing="-1.2"
      >
        Hakka<tspan fontStyle="italic" letterSpacing="-0.5">TV</tspan>
      </text>
    </svg>
  );
}
