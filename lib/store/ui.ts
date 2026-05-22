"use client";

import { create } from "zustand";
import { nanoid } from "nanoid";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: "default" | "success" | "warning" | "danger";
  ttl?: number;
}

interface UiStore {
  toasts: Toast[];
  toast: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: string) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}

export const useUi = create<UiStore>((set, get) => ({
  toasts: [],
  toast: (t) => {
    const id = nanoid(6);
    const ttl = t.ttl ?? 3500;
    set({ toasts: [...get().toasts, { id, ...t }] });
    setTimeout(() => {
      set({ toasts: get().toasts.filter((x) => x.id !== id) });
    }, ttl);
  },
  dismissToast: (id) => set({ toasts: get().toasts.filter((x) => x.id !== id) }),
  sidebarCollapsed: false,
  toggleSidebar: () => set({ sidebarCollapsed: !get().sidebarCollapsed }),
}));
