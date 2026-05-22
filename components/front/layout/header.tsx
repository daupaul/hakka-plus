"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Moon, Sun, Menu, X, Globe, UserCircle } from "lucide-react";
import { useState } from "react";
import { FRONT_NAV } from "@/lib/nav";
import { useSeniorMode } from "@/lib/store/senior-mode";
import { SeniorToggle } from "./senior-toggle";
import { cn } from "@/lib/utils";

// Streamlined main nav matching mockup pattern (4-5 items max).
const PRIMARY_NAV = [
  { href: "/", label: "首頁" },
  { href: "/watch", label: "影視" },
  { href: "/news", label: "新聞" },
  { href: "/schedule", label: "節目表" },
  { href: "/account/favorites", label: "收藏" },
];

export function Header() {
  const pathname = usePathname();
  const senior = useSeniorMode((s) => s.enabled);
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const navItems = senior ? FRONT_NAV.filter((n) => n.seniorVisible).slice(0, 5) : PRIMARY_NAV;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md transition-all",
        senior ? "bg-white/95 border-border-strong" : "bg-bg-base/85 border-border",
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-8 h-16 lg:h-16 flex items-center gap-3 lg:gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0">
          <span className="inline-flex items-center justify-center size-7 lg:size-8 rounded-full bg-accent">
            <svg viewBox="0 0 20 20" className="size-4 text-text-inverse" fill="currentColor"><circle cx="10" cy="10" r="4" /></svg>
          </span>
          <span className={cn("font-display font-extrabold tracking-tight text-text-primary", senior ? "text-base" : "text-sm lg:text-base italic")}>
            HakkaTV
          </span>
        </Link>

        {/* Centered nav */}
        <nav className="hidden lg:flex items-center gap-1 mx-auto">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3.5 h-9 inline-flex items-center rounded-full text-sm font-medium transition-colors",
                  active ? "bg-accent-soft text-accent" : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="px-3.5 h-9 inline-flex items-center rounded-full text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors relative"
          >
            更多 ▾
            {moreOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={(e) => { e.stopPropagation(); setMoreOpen(false); }} />
                <div className="absolute top-full right-0 mt-2 card bg-bg-elevated min-w-[180px] py-2 shadow-xl z-40">
                  {[
                    { href: "/shorts", label: "短影音 Shorts" },
                    { href: "/life", label: "生活+ 策展" },
                    { href: "/shop", label: "客家選物" },
                    { href: "/live", label: "直播" },
                    { href: "/themes", label: "主題訂閱" },
                    { href: "/about", label: "關於客台" },
                  ].map((m) => (
                    <Link
                      key={m.href}
                      href={m.href}
                      onClick={() => setMoreOpen(false)}
                      className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-base hover:text-accent"
                    >
                      {m.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </button>
        </nav>

        {/* Right utilities */}
        <div className="flex items-center gap-1.5 ml-auto">
          <SeniorToggle className="hidden xl:inline-flex" />
          <Link
            href="/search"
            aria-label="搜尋"
            className="size-9 hidden md:inline-flex items-center justify-center rounded-full text-text-secondary hover:text-accent transition-colors"
          >
            <Search className="size-4" />
          </Link>
          <button
            aria-label="切換主題"
            className="size-9 hidden md:inline-flex items-center justify-center rounded-full text-text-secondary hover:text-accent transition-colors"
          >
            {senior ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            aria-label="語言"
            className="size-9 hidden md:inline-flex items-center justify-center rounded-full text-text-secondary hover:text-accent transition-colors"
          >
            <Globe className="size-4" />
            <span className="ml-1 text-xs">中</span>
          </button>
          <Link
            href="/account"
            aria-label="會員"
            className="size-9 hidden md:inline-flex items-center justify-center rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors"
          >
            <UserCircle className="size-4" />
          </Link>
          <button
            aria-label="選單"
            onClick={() => setOpen(!open)}
            className="size-9 lg:hidden inline-flex items-center justify-center rounded-full bg-bg-elevated text-text-secondary"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-border bg-bg-base">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {[...PRIMARY_NAV, { href: "/shorts", label: "短影音" }, { href: "/life", label: "生活+" }, { href: "/shop", label: "選物" }, { href: "/live", label: "直播" }, { href: "/themes", label: "主題訂閱" }, { href: "/about", label: "關於客台" }, { href: "/search", label: "搜尋" }, { href: "/account", label: "會員中心" }].map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn("px-3 h-11 inline-flex items-center gap-3 rounded-lg text-sm font-medium", active ? "bg-accent-soft text-accent" : "text-text-secondary")}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2 mt-2 border-t border-border flex items-center gap-2">
              <SeniorToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
