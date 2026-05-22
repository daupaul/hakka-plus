"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/auth";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const admin = useAuth((s) => s.admin);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setReady(true);
      return;
    }
    if (!admin) {
      router.replace("/admin/login");
    } else {
      setReady(true);
    }
  }, [admin, pathname, router]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center text-text-muted text-sm">
        Loading…
      </div>
    );
  }
  return <>{children}</>;
}
