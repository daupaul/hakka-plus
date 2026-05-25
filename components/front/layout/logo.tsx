"use client";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Render dark ink (for light backgrounds — admin / senior mode). Defaults to white. */
  invert?: boolean;
}

/**
 * HakkaTV brand mark — official SVG from `/public/hakka-logo.svg` (1453×352 source PNG wrapped in SVG).
 * `invert` flips the white wordmark to near-black via CSS filter, preserving original shape/typography.
 */
const SIZES = {
  sm: { w: 128, h: 32 },
  md: { w: 160, h: 40 },
  lg: { w: 200, h: 50 },
};

export function HakkaLogo({ className, size = "md", invert = false }: Props) {
  const s = SIZES[size];
  return (
    <img
      src="/hakka-logo.svg"
      alt="HakkaTV"
      width={s.w}
      height={s.h}
      className={cn(className)}
      style={{
        height: s.h,
        width: s.w,
        display: "block",
        filter: invert ? "brightness(0) saturate(100%)" : "none",
      }}
    />
  );
}
