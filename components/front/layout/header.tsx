"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSeniorMode } from "@/lib/store/senior-mode";
import { useUi } from "@/lib/store/ui";

/**
 * Style A header — matches /Users/paul/Downloads/Hakka_/components/Header.jsx
 * HakkaTV mint logo · 3 nav tabs centered · search + EN pill right · mobile hamburger
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const senior = useSeniorMode((s) => s.enabled);
  const toggleSenior = useSeniorMode((s) => s.toggle);
  const toast = useUi((s) => s.toast);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tabs = [
    { label: "戲劇", href: "/watch" },
    { label: "直播", href: "/live" },
    { label: "新聞", href: "/news" },
  ];

  return (
    <>
      <header
        className="site-header"
        style={{
          background: scrolled ? "rgba(21,27,25,0.92)" : "rgba(21,27,25,0.4)",
          borderBottomColor: scrolled ? "var(--border-default)" : "transparent",
        }}
      >
        <Link className="brand-logo" href="/" aria-label="HakkaTV 客家電視台">
          <svg className="brand-logo-svg" viewBox="0 0 230 50" fill="none" aria-hidden="true">
            {/* 5-petal flower icon — abstracted 油桐花 */}
            <g transform="translate(25, 25)">
              <circle cx="0" cy="0" r="22" fill="none" stroke="currentColor" strokeWidth="2.2" opacity="0.9" />
              {[0, 72, 144, 216, 288].map((deg, i) => (
                <ellipse key={i} cx="0" cy="-10" rx="5.5" ry="9" fill="currentColor" transform={`rotate(${deg})`} />
              ))}
              <circle cx="0" cy="0" r="3.2" fill="currentColor" />
            </g>
            <text
              x="58"
              y="34"
              fontFamily="Barlow Condensed, sans-serif"
              fontWeight="700"
              fontSize="32"
              fill="currentColor"
              letterSpacing="-0.5"
            >
              HakkaTV
            </text>
          </svg>
        </Link>

        <nav className="site-nav" aria-label="主分類">
          {tabs.map((t) => (
            <Link key={t.label} href={t.href} className="site-nav-item">
              {t.label}
            </Link>
          ))}
        </nav>

        <div className="site-actions">
          <Link href="/search" className="header-icon-btn" aria-label="搜尋">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Link>
          <button className="header-en-pill" aria-label="切換語言為英文">EN</button>
        </div>

        <button className="menu-mobile" onClick={() => setOpen(!open)} aria-label="開啟主選單">
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
            <rect width="20" height="2" rx="1" fill="currentColor" />
            <rect y="6" width="20" height="2" rx="1" fill="currentColor" />
            <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-x-0 top-[72px] z-40 bg-bg-base border-b border-border lg:hidden">
          <nav className="px-5 py-4 grid grid-cols-2 gap-1">
            {[
              { href: "/", label: "首頁" },
              { href: "/watch", label: "影視" },
              { href: "/news", label: "新聞" },
              { href: "/shorts", label: "短影音" },
              { href: "/life", label: "生活+" },
              { href: "/live", label: "直播" },
              { href: "/schedule", label: "節目表" },
              { href: "/themes", label: "主題訂閱" },
              { href: "/about", label: "關於客台" },
              { href: "/search", label: "搜尋" },
              { href: "/account", label: "會員中心" },
              { href: "/admin", label: "後台" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 h-11 inline-flex items-center rounded-lg text-sm font-medium text-text-secondary hover:text-accent hover:bg-bg-elevated"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Senior-friendly FAB */}
      <button
        type="button"
        onClick={() => {
          toggleSenior();
          toast({
            variant: "success",
            title: senior ? "已切回標準模式" : "已切換為長輩友善模式",
            description: senior ? "回到完整介面" : "字級放大 22%、按鈕變大、節目表 / 新聞優先",
          });
        }}
        aria-pressed={senior}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 h-12 px-4 rounded-full bg-bg-elevated border border-border hover:border-accent text-text-primary transition-colors shadow-lg"
        style={{ background: senior ? "var(--accent-mint)" : "var(--bg-elevated)", color: senior ? "var(--text-inverse)" : "var(--text-primary)" }}
      >
        <span className="font-mono font-bold">A+</span>
        <span className="flex flex-col items-start leading-tight text-xs">
          <span className="font-semibold">長輩友善模式</span>
          <span className="text-[10px] opacity-70">{senior ? "ON" : "OFF"}</span>
        </span>
      </button>
    </>
  );
}
