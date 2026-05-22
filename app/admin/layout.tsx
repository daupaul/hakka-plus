"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/layout/sidebar";
import { AdminTopbar } from "@/components/admin/layout/topbar";
import { AdminGuard } from "@/components/admin/layout/admin-guard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  // Login page renders standalone — no sidebar / topbar / guard.
  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <AdminGuard>
      <div className="min-h-screen flex">
        <AdminSidebar />
        <div className="flex-1 min-w-0 flex flex-col">
          <AdminTopbar />
          <main className="flex-1 px-6 py-8 lg:px-10 lg:py-10">{children}</main>
        </div>
      </div>
    </AdminGuard>
  );
}
