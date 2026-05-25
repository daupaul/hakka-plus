"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSeniorMode } from "@/lib/store/senior-mode";
import { useContent } from "@/lib/store/content";
import { ToastViewport } from "@/components/ui/toast-viewport";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const senior = useSeniorMode((s) => s.enabled);
  const level = useSeniorMode((s) => s.level);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  // Rehydrate content store (skipHydration: true) once on client mount.
  useEffect(() => {
    useContent.persist.rehydrate();
  }, []);

  useEffect(() => {
    const body = document.body;
    if (isAdmin) {
      body.classList.add("admin-shell");
      body.classList.remove("senior-mode");
      body.removeAttribute("data-senior-level");
    } else {
      body.classList.remove("admin-shell");
      body.classList.toggle("senior-mode", senior);
      if (senior) {
        body.setAttribute("data-senior-level", level);
      } else {
        body.removeAttribute("data-senior-level");
      }
    }
  }, [senior, level, isAdmin]);

  return (
    <>
      {children}
      <ToastViewport />
    </>
  );
}
