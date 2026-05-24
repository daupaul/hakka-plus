"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { useSeniorMode } from "@/lib/store/senior-mode";
import { useUi } from "@/lib/store/ui";
import { cn } from "@/lib/utils";

const MOBILE_NAV = [
  { href: "/", label: "首頁" },
  { href: "/watch", label: "影視" },
  { href: "/news", label: "新聞" },
  { href: "/shorts", label: "短影音" },
  { href: "/life", label: "生活+" },
  { href: "/shop", label: "客家選物" },
  { href: "/live", label: "直播" },
  { href: "/schedule", label: "節目表" },
  { href: "/themes", label: "主題訂閱" },
  { href: "/about", label: "關於客台" },
  { href: "/search", label: "搜尋" },
  { href: "/account", label: "會員中心" },
];

export function Header() {
  const pathname = usePathname();
  const senior = useSeniorMode((s) => s.enabled);
  const toggleSenior = useSeniorMode((s) => s.toggle);
  const toast = useUi((s) => s.toast);
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all",
        senior ? "bg-white/95 border-b border-border-strong" : "bg-bg-base/85 backdrop-blur-md border-b border-border",
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-8 h-14 lg:h-16 flex items-center justify-between">
        {/* LEFT — Logo only */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0">
          <span className="inline-flex items-center justify-center size-6 lg:size-7 rounded-full bg-accent">
            <svg viewBox="0 0 20 20" className="size-3.5 lg:size-4 text-text-inverse" fill="currentColor">
              <circle cx="10" cy="10" r="4" />
            </svg>
          </span>
          <span className={cn("font-display font-extrabold tracking-tight text-text-primary italic", senior ? "text-base" : "text-sm lg:text-base")}>
            HakkaTV
          </span>
        </Link>

        {/* RIGHT — minimal icons only (moon, menu) */}
        <div className="flex items-center gap-1.5">
          <button
            aria-label={senior ? "切回標準模式" : "切換長輩友善模式"}
            onClick={() => {
              toggleSenior();
              toast({
                variant: "success",
                title: senior ? "已切回標準模式" : "已切換為長輩友善模式",
                description: senior ? "回到完整介面" : "字級放大、按鈕變大、節目表 / 新聞優先",
              });
            }}
            className={cn(
              "size-9 inline-flex items-center justify-center rounded-full transition-colors",
              senior ? "bg-accent text-text-inverse" : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated",
            )}
          >
            {senior ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            aria-label="選單"
            onClick={() => setOpen(!open)}
            className="size-9 inline-flex items-center justify-center rounded-full bg-bg-elevated text-text-secondary hover:text-text-primary transition-colors"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Slide-down menu (for all sizes — full nav opens from menu icon, like the mockup pattern) */}
      {open && (
        <div className="border-t border-border bg-bg-base">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-8 py-4">
            <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
              {MOBILE_NAV.map((item) => {
                const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-3 h-11 inline-flex items-center rounded-lg text-sm font-medium transition-colors",
                      active ? "bg-accent-soft text-accent" : "text-text-secondary hover:bg-bg-elevated hover:text-text-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 pt-4 border-t border-border flex items-center gap-3 text-xs text-text-muted">
              <Link href="/search" onClick={() => setOpen(false)} className="hover:text-accent">搜尋</Link>
              <span className="opacity-30">·</span>
              <Link href="/account" onClick={() => setOpen(false)} className="hover:text-accent">會員中心</Link>
              <span className="opacity-30">·</span>
              <Link href="/admin" onClick={() => setOpen(false)} className="hover:text-accent">後台 CMS</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
