"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSeniorMode, SENIOR_LEVEL_LABEL, type SeniorLevel } from "@/lib/store/senior-mode";
import { useUi } from "@/lib/store/ui";
import { HakkaLogo } from "./logo";

/**
 * Style A header — matches /Users/paul/Downloads/Hakka_/components/Header.jsx
 * HakkaTV mint logo · 3 nav tabs centered · search + EN pill right · mobile hamburger
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const senior = useSeniorMode((s) => s.enabled);
  const level = useSeniorMode((s) => s.level);
  const toggleSenior = useSeniorMode((s) => s.toggle);
  const setLevel = useSeniorMode((s) => s.setLevel);
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
          <HakkaLogo size={senior ? "lg" : "md"} invert={senior} />
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

      {/* Senior-friendly FAB — when off: single toggle. When on: 3-tier text size + off button */}
      {!senior ? (
        <button
          type="button"
          onClick={() => {
            toggleSenior();
            toast({ variant: "success", title: "已切換為長輩友善模式", description: "字級放大、按鈕變大、節目表 / 新聞優先、淺底高對比" });
          }}
          aria-pressed={false}
          className="senior-fab"
          style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 50,
            display: "inline-flex", alignItems: "center", gap: 8, height: 48, padding: "0 20px",
            borderRadius: 999, background: "rgba(31, 36, 34, 0.95)", color: "#fff",
            border: "1px solid rgba(255,255,255,0.18)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            cursor: "pointer", fontFamily: "var(--font-cn)",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>A+</span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>長輩友善模式</span>
        </button>
      ) : (
        <div
          className="senior-fab-expanded"
          style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 50,
            display: "inline-flex", alignItems: "center", gap: 8, padding: 8,
            borderRadius: 999, background: "#ffffff", border: "2px solid #14181a",
            boxShadow: "0 4px 0 #14181a, 0 12px 32px rgba(0,0,0,0.15)",
          }}
        >
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13, padding: "0 8px", color: "#14181a" }}>字級</span>
          {(["standard", "large", "xl"] as SeniorLevel[]).map((l) => {
            const active = level === l;
            const size = l === "standard" ? 14 : l === "large" ? 16 : 19;
            return (
              <button
                key={l}
                type="button"
                onClick={() => { setLevel(l); toast({ variant: "default", title: `字級：${SENIOR_LEVEL_LABEL[l]}` }); }}
                aria-pressed={active}
                style={{
                  minWidth: 44, minHeight: 44, padding: "0 12px", borderRadius: 999,
                  background: active ? "#00703c" : "transparent", color: active ? "#fff" : "#14181a",
                  border: active ? "0" : "1px solid rgba(20,24,26,0.18)",
                  fontFamily: "var(--font-cn)", fontWeight: 700, fontSize: size, cursor: "pointer",
                }}
              >
                {SENIOR_LEVEL_LABEL[l]}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => { toggleSenior(); toast({ variant: "success", title: "已切回標準模式" }); }}
            style={{
              minWidth: 44, minHeight: 44, padding: "0 14px", borderRadius: 999,
              background: "#14181a", color: "#fff", border: 0,
              fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}
          >
            關閉
          </button>
        </div>
      )}
    </>
  );
}
