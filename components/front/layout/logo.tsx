"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Use dark ink (for light backgrounds) */
  invert?: boolean;
}

/**
 * HakkaTV brand mark — uses the official PNG (640×160 @4x source for retina).
 * Matches the original design exactly. `invert` swaps to dark-ink variant for light bgs.
 */
const SIZES = {
  sm: { w: 128, h: 32 },   // shown as 128×32 CSS pixels
  md: { w: 160, h: 40 },
  lg: { w: 200, h: 50 },
};

export function HakkaLogo({ className, size = "md", invert = false }: Props) {
  const s = SIZES[size];
  return (
    <Image
      src={invert ? "/hakka-logo-dark.png" : "/hakka-logo.png"}
      alt="HakkaTV"
      width={s.w}
      height={s.h}
      priority
      className={cn("w-auto", className)}
      style={{ height: s.h, width: "auto" }}
    />
  );
}
