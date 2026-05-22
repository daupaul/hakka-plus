"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import { useContent } from "@/lib/store/content";

export function Footer() {
  const settings = useContent((s) => s.settings);

  return (
    <footer className="mt-24 border-t border-border bg-bg-deep relative overflow-hidden">
      {/* Decorative green glow circles */}
      <div className="absolute -bottom-32 -left-32 size-96 rounded-full bg-accent/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 size-72 rounded-full bg-accent-warm/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-screen-2xl px-6 lg:px-12 pt-20 pb-10 lg:pt-32 lg:pb-12">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* LEFT: Huge HAKKA+ logo */}
          <div className="lg:col-span-7">
            <div className="font-display text-7xl sm:text-8xl lg:text-[10rem] font-black tracking-tighter text-text-primary leading-none">
              HAKKA<span className="text-accent">+</span>
            </div>
            <p className="mt-4 text-sm text-text-secondary max-w-md">
              {settings.siteTagline}
            </p>
          </div>

          {/* RIGHT: 4 columns of links */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-8 text-sm">
            <FooterColumn title="探索" links={[
              { href: "/", label: "首頁" },
              { href: "/watch", label: "影視" },
              { href: "/shorts", label: "短影音" },
              { href: "/life", label: "生活+" },
              { href: "/news", label: "新聞" },
              { href: "/themes", label: "主題訂閱" },
              { href: "/schedule", label: "節目表" },
            ]} />
            <FooterColumn title="社群" links={[
              { href: settings.socialLinks.youtube ?? "#", label: "YouTube", external: true },
              { href: settings.socialLinks.facebook ?? "#", label: "Facebook", external: true },
              { href: settings.socialLinks.instagram ?? "#", label: "Instagram", external: true },
              { href: settings.socialLinks.line ?? "#", label: "LINE", external: true },
            ]} />
            <FooterColumn title="關於" links={[
              { href: "/about", label: "客台簡介" },
              { href: "/about/governance", label: "公開資訊" },
              { href: "/about/contact", label: "聯絡 / 申訴" },
              { href: "/about/faq", label: "常見問題" },
              { href: "/about/visit", label: "參訪申請" },
            ]} />
            <FooterColumn title="法務" links={[
              { href: "#", label: "隱私權政策" },
              { href: "#", label: "服務條款" },
              { href: "#", label: "Cookie 設定" },
              { href: "/admin", label: "後台 CMS" },
            ]} />
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-text-muted">
          <div>© 2026 Hakka TV. Hakka Affairs Council. All Rights Reserved.</div>
          <div className="flex items-center gap-3">
            {settings.socialLinks.facebook && <a href={settings.socialLinks.facebook} aria-label="Facebook" target="_blank" rel="noreferrer" className="size-8 rounded-full border border-border inline-flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent"><Facebook className="size-3.5" /></a>}
            {settings.socialLinks.instagram && <a href={settings.socialLinks.instagram} aria-label="Instagram" target="_blank" rel="noreferrer" className="size-8 rounded-full border border-border inline-flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent"><Instagram className="size-3.5" /></a>}
            {settings.socialLinks.youtube && <a href={settings.socialLinks.youtube} aria-label="YouTube" target="_blank" rel="noreferrer" className="size-8 rounded-full border border-border inline-flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent"><Youtube className="size-3.5" /></a>}
            {settings.socialLinks.line && <a href={settings.socialLinks.line} aria-label="LINE" target="_blank" rel="noreferrer" className="size-8 rounded-full border border-border inline-flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent"><MessageCircle className="size-3.5" /></a>}
            <span className="text-text-muted/60">本站受 reCAPTCHA 保護</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string; external?: boolean }[] }) {
  return (
    <div>
      <h4 className="section-title text-[10px] mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            {l.external ? (
              <a href={l.href} target="_blank" rel="noreferrer" className="text-sm text-text-secondary hover:text-accent transition-colors">{l.label}</a>
            ) : (
              <Link href={l.href} className="text-sm text-text-secondary hover:text-accent transition-colors">{l.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
