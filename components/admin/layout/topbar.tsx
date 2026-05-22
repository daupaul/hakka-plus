"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Bell, LogOut, ExternalLink } from "lucide-react";
import { useAuth } from "@/lib/store/auth";
import { useUi } from "@/lib/store/ui";

export function AdminTopbar() {
  const router = useRouter();
  const admin = useAuth((s) => s.admin);
  const logout = useAuth((s) => s.logoutAdmin);
  const toast = useUi((s) => s.toast);

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-bg-elevated/95 backdrop-blur-md">
      <div className="h-full px-6 flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 max-w-md flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
            <input
              type="search"
              placeholder="搜尋影片 / 新聞 / 會員 / 訂單…"
              className="h-9 w-full rounded-full bg-bg-base border border-border pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-border text-xs text-text-secondary hover:text-accent hover:border-accent transition-colors"
          >
            <ExternalLink className="size-3.5" /> 查看前台
          </Link>
          <button
            onClick={() => toast({ variant: "default", title: "通知中心", description: "POC 階段尚未串接真實通知。" })}
            className="size-9 rounded-full border border-border inline-flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
            aria-label="通知"
          >
            <Bell className="size-4" />
          </button>
          {admin ? (
            <>
              <div className="hidden md:flex items-center gap-2 px-3 h-9 rounded-full border border-border">
                <div className="size-6 rounded-full bg-gradient-to-br from-accent to-accent-strong" />
                <div className="text-xs">
                  <div className="font-semibold text-text-primary leading-none">{admin.name}</div>
                  <div className="text-text-muted">{admin.role}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  toast({ variant: "default", title: "已登出" });
                  router.push("/admin/login");
                }}
                className="size-9 rounded-full border border-border inline-flex items-center justify-center text-text-secondary hover:text-danger hover:border-danger transition-colors"
                aria-label="登出"
              >
                <LogOut className="size-4" />
              </button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
