"use client";

import "../style-a-admin.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/layout/sidebar";
import { AdminTopbar } from "@/components/admin/layout/topbar";
import { AdminGuard } from "@/components/admin/layout/admin-guard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  // Apply admin light theme to the document root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "admin");
    return () => document.documentElement.removeAttribute("data-theme");
  }, []);

  // Login page renders standalone — no sidebar / topbar / guard
  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <AdminGuard>
      <div className="adm-layout">
        <AdminSidebar />
        <main>
          <AdminTopbar />
          <div className="adm-page">{children}</div>
        </main>
      </div>
    </AdminGuard>
  );
}
