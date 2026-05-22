"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Globe, UserCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import { FRONT_NAV } from "@/lib/nav";
import { useSeniorMode } from "@/lib/store/senior-mode";
import { SeniorToggle } from "./senior-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const senior = useSeniorMode((s) => s.enabled);
  const [open, setOpen] = useState(false);

  const navItems = senior ? FRONT_NAV.filter((n) => n.seniorVisible) : FRONT_NAV;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md transition-all",
        senior ? "bg-white/95 border-border-strong" : "bg-bg-base/80 border-border",
      )}
    >
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-8 h-16 lg:h-18 flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="font-display text-xl lg:text-2xl font-extrabold tracking-tight text-text-primary">
            Hakka<span className="text-accent">+</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 flex-1">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 h-9 inline-flex items-center rounded-full text-sm font-medium transition-colors",
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <SeniorToggle className="hidden sm:inline-flex" />
          <Link
            href="/search"
            aria-label="搜尋"
            className="size-9 hidden md:inline-flex items-center justify-center rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors"
          >
            <Search className="size-4" />
          </Link>
          <button
            aria-label="語言"
            className="size-9 hidden md:inline-flex items-center justify-center rounded-full border border-border text-text-secondary hover:text-text-primary transition-colors"
          >
            <Globe className="size-4" />
          </button>
          <Link
            href="/account"
            aria-label="會員"
            className="size-9 inline-flex items-center justify-center rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-colors"
          >
            <UserCircle className="size-4" />
          </Link>
          <button
            aria-label="選單"
            onClick={() => setOpen(!open)}
            className="size-9 lg:hidden inline-flex items-center justify-center rounded-full border border-border text-text-secondary"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-bg-base">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "px-3 h-11 inline-flex items-center gap-3 rounded-lg text-sm font-medium",
                    active ? "bg-accent-soft text-accent" : "text-text-secondary",
                  )}
                >
                  <Icon className="size-4" />
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
