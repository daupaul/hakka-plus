"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import { useContent } from "@/lib/store/content";

export function Footer() {
  const settings = useContent((s) => s.settings);

  return (
    <footer className="mt-24 border-t border-border bg-bg-deep">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="font-display text-6xl lg:text-8xl font-black tracking-tighter text-text-primary">
              Hakka<span className="text-accent">+</span>
            </div>
            <p className="mt-4 text-sm text-text-secondary max-w-md">
              {settings.siteTagline}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {settings.socialLinks.facebook && (
                <a aria-label="Facebook" href={settings.socialLinks.facebook} target="_blank" rel="noreferrer" className="size-10 rounded-full border border-border inline-flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent">
                  <Facebook className="size-4" />
                </a>
              )}
              {settings.socialLinks.instagram && (
                <a aria-label="Instagram" href={settings.socialLinks.instagram} target="_blank" rel="noreferrer" className="size-10 rounded-full border border-border inline-flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent">
                  <Instagram className="size-4" />
                </a>
              )}
              {settings.socialLinks.youtube && (
                <a aria-label="YouTube" href={settings.socialLinks.youtube} target="_blank" rel="noreferrer" className="size-10 rounded-full border border-border inline-flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent">
                  <Youtube className="size-4" />
                </a>
              )}
              {settings.socialLinks.line && (
                <a aria-label="LINE" href={settings.socialLinks.line} target="_blank" rel="noreferrer" className="size-10 rounded-full border border-border inline-flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent">
                  <MessageCircle className="size-4" />
                </a>
              )}
            </div>
          </div>

          <FooterColumn title="探索" links={[
            { href: "/", label: "首頁" },
            { href: "/watch", label: "影視" },
            { href: "/shorts", label: "短影音" },
            { href: "/life", label: "生活+" },
            { href: "/news", label: "新聞" },
          ]} />

          <FooterColumn title="收看" links={[
            { href: "/live", label: "直播" },
            { href: "/schedule", label: "節目表" },
            { href: "/themes", label: "主題訂閱" },
            { href: "/account/subscription", label: "我的訂閱" },
          ]} />

          <FooterColumn title="關於" links={[
            { href: "/about", label: "客台簡介" },
            { href: "/about/governance", label: "公開資訊" },
            { href: "/about/contact", label: "聯絡 / 申訴" },
            { href: "/about/faq", label: "常見問題" },
            { href: "/about/visit", label: "參訪申請" },
          ]} />
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-text-muted">
          <div>© 2026 {settings.siteName} · 公視客家電視台</div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="hover:text-accent">後台 CMS</Link>
            <a href="#" className="hover:text-accent">隱私權政策</a>
            <a href="#" className="hover:text-accent">服務條款</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div className="lg:col-span-2">
      <h4 className="section-title text-xs mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-text-secondary hover:text-accent transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
