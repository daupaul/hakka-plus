"use client";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Dark ink (for light backgrounds — admin / senior mode) via CSS filter. */
  invert?: boolean;
}

/**
 * Official HakkaTV logo — `/public/hakka-logo.svg` (1453×352 source PNG wrapped in SVG).
 * Native = white on transparent. `invert` flips to near-black for light backgrounds.
 */
const SIZES: Record<NonNullable<Props["size"]>, { w: number; h: number }> = {
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
        width: s.w,
        height: s.h,
        display: "block",
        filter: invert ? "brightness(0) saturate(100%)" : "none",
      }}
    />
  );
}
