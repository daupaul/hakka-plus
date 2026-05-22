"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  time: string;       // "12:24"
  label?: string;     // 日午 / 暗夜
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showSeconds?: boolean;
  secondsValue?: string;
}

const SIZE_MAP = {
  sm: "text-4xl",
  md: "text-6xl lg:text-7xl",
  lg: "text-7xl lg:text-9xl",
  xl: "text-[18vw] sm:text-[14vw] lg:text-[14rem] leading-none",
};

export function ClockDisplay({ time, label, size = "md", className, showSeconds = false, secondsValue }: Props) {
  return (
    <div className={cn("flex flex-col items-start", className)}>
      <div className="relative flex items-baseline">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={time}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className={cn("clock-numerals text-text-primary", SIZE_MAP[size])}
          >
            {time}
          </motion.span>
        </AnimatePresence>
        {showSeconds && (
          <span className="ml-2 clock-numerals text-text-muted text-sm lg:text-base">{secondsValue ?? "00"}</span>
        )}
      </div>
      {label && (
        <span className="mt-2 inline-flex items-center gap-2 text-text-secondary text-xs lg:text-sm uppercase tracking-[0.2em]">
          <span className="size-1.5 rounded-full bg-accent" />
          {label}
        </span>
      )}
    </div>
  );
}
