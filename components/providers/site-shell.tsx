"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSeniorMode } from "@/lib/store/senior-mode";
import { useContent } from "@/lib/store/content";
import { ToastViewport } from "@/components/ui/toast-viewport";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const senior = useSeniorMode((s) => s.enabled);
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
    } else {
      body.classList.remove("admin-shell");
      body.classList.toggle("senior-mode", senior);
    }
  }, [senior, isAdmin]);

  return (
    <>
      {children}
      <ToastViewport />
    </>
  );
}
