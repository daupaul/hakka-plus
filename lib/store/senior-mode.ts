"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type SeniorLevel = "standard" | "large" | "xl";

interface SeniorModeStore {
  /** Whether senior-friendly mode is enabled at all. */
  enabled: boolean;
  /** Within senior mode, which text-size tier — 對應提案 §1.5 字級切換 (標準/大/特大). */
  level: SeniorLevel;
  toggle: () => void;
  setEnabled: (v: boolean) => void;
  setLevel: (l: SeniorLevel) => void;
  cycleLevel: () => void;
}

const NEXT: Record<SeniorLevel, SeniorLevel> = {
  standard: "large",
  large: "xl",
  xl: "standard",
};

export const useSeniorMode = create<SeniorModeStore>()(
  persist(
    (set, get) => ({
      enabled: false,
      level: "large",
      toggle: () => set({ enabled: !get().enabled }),
      setEnabled: (v) => set({ enabled: v }),
      setLevel: (level) => set({ level }),
      cycleLevel: () => set({ level: NEXT[get().level] }),
    }),
    {
      name: "hakka-poc.senior-mode",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export const SENIOR_LEVEL_LABEL: Record<SeniorLevel, string> = {
  standard: "標準",
  large: "大",
  xl: "特大",
};
