"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SeniorModeStore {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (v: boolean) => void;
}

export const useSeniorMode = create<SeniorModeStore>()(
  persist(
    (set, get) => ({
      enabled: false,
      toggle: () => set({ enabled: !get().enabled }),
      setEnabled: (v) => set({ enabled: v }),
    }),
    {
      name: "hakka-poc.senior-mode",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
