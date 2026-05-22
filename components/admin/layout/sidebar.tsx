"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ADMIN_NAV, type AdminNavItem } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-64 shrink-0 border-r border-border bg-bg-elevated/60">
      <div className="sticky top-0 h-screen overflow-y-auto scroll-pretty">
        <div className="px-5 h-16 flex items-center border-b border-border">
          <Link href="/admin" className="font-display text-xl font-extrabold text-text-primary">
            客+ <span className="text-accent">Admin</span>
          </Link>
        </div>
        <nav className="p-3 flex flex-col gap-0.5">
          {ADMIN_NAV.map((item) => (
            <NavItem key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>
        <div className="p-4 border-t border-border text-xs text-text-muted">
          v2 POC · prototype only
        </div>
      </div>
    </aside>
  );
}

function NavItem({ item, pathname }: { item: AdminNavItem; pathname: string }) {
  const hasChildren = !!item.children?.length;
  const exactlyHere = pathname === item.href;
  const insideHere = pathname === item.href || pathname.startsWith(item.href + "/");
  const [open, setOpen] = useState(insideHere);
  const Icon = item.icon;

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-2.5 px-3 h-9 rounded-md text-sm transition-colors",
          exactlyHere
            ? "bg-accent text-text-inverse font-semibold"
            : "text-text-secondary hover:bg-bg-card hover:text-text-primary",
        )}
      >
        <Icon className="size-4" />
        <span className="flex-1 truncate">{item.label}</span>
        {item.badge && (
          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent-warm text-text-inverse">
            {item.badge}
          </span>
        )}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center gap-2.5 px-3 h-9 rounded-md text-sm transition-colors",
          insideHere ? "text-text-primary" : "text-text-secondary hover:text-text-primary",
        )}
      >
        <Icon className="size-4" />
        <span className="flex-1 truncate text-left font-medium">{item.label}</span>
        {item.badge && (
          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-accent-warm text-text-inverse">
            {item.badge}
          </span>
        )}
        {open ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
      </button>
      {open && (
        <div className="ml-3 mt-0.5 pl-3 border-l border-border flex flex-col gap-0.5">
          {item.children!.map((c) => {
            const here = pathname === c.href;
            return (
              <Link
                key={c.href}
                href={c.href}
                className={cn(
                  "px-3 h-8 inline-flex items-center rounded-md text-xs transition-colors",
                  here
                    ? "bg-accent-soft text-accent font-semibold"
                    : "text-text-secondary hover:bg-bg-card hover:text-text-primary",
                )}
              >
                {c.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
