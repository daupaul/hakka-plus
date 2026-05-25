"use client";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Dark ink (for light backgrounds — admin / senior mode). */
  invert?: boolean;
}

/**
 * HakkaTV brand mark — inline SVG (5-petal Tung flower + HakkaTV wordmark).
 * Uses `currentColor` so `color: white` on dark / `color: #14181a` on light just works.
 */
const SIZES: Record<NonNullable<Props["size"]>, { w: number; h: number }> = {
  sm: { w: 128, h: 32 },
  md: { w: 160, h: 40 },
  lg: { w: 200, h: 50 },
};

export function HakkaLogo({ className, size = "md", invert = false }: Props) {
  const s = SIZES[size];
  return (
    <svg
      viewBox="0 0 240 60"
      width={s.w}
      height={s.h}
      role="img"
      aria-label="HakkaTV"
      className={cn(className)}
      style={{ display: "block", color: invert ? "#14181a" : "#ffffff" }}
    >
      <g transform="translate(30 30)" fill="currentColor">
        <circle r="24" fill="none" stroke="currentColor" strokeWidth="2.8" />
        <g>
          {[0, 72, 144, 216, 288].map((deg) => (
            <path
              key={deg}
              d="M 0 -14 C -5.5 -14 -7.5 -7.5 -3.5 -2 C -1.2 0 1.2 0 3.5 -2 C 7.5 -7.5 5.5 -14 0 -14 Z"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>
        <circle r="2.8" />
      </g>
      <text
        x="68"
        y="40"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Noto Sans TC', system-ui, sans-serif"
        fontWeight={900}
        fontSize={30}
        letterSpacing={-1.2}
        fill="currentColor"
      >
        Hakka
        <tspan fontStyle="italic" letterSpacing={-0.5}>TV</tspan>
      </text>
    </svg>
  );
}
