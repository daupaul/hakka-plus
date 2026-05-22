"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Role } from "@/lib/types";

interface AdminSession {
  userId: string;
  name: string;
  email: string;
  role: Role;
  loggedInAt: string;
}

interface AuthStore {
  admin: AdminSession | null;
  loginAsAdmin: (email: string) => void;
  logoutAdmin: () => void;

  memberLoggedIn: boolean;
  memberId: string | null;
  loginMember: (memberId: string) => void;
  logoutMember: () => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      admin: null,
      loginAsAdmin: (email) =>
        set({
          admin: {
            userId: "u_demo",
            name: email.split("@")[0] || "Demo User",
            email,
            role: "superadmin",
            loggedInAt: new Date().toISOString(),
          },
        }),
      logoutAdmin: () => set({ admin: null }),

      memberLoggedIn: false,
      memberId: null,
      loginMember: (memberId) => set({ memberLoggedIn: true, memberId }),
      logoutMember: () => set({ memberLoggedIn: false, memberId: null }),
    }),
    {
      name: "hakka-poc.auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
