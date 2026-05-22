"use client";

import Link from "next/link";
import { Bell, Users } from "lucide-react";
import { useContent } from "@/lib/store/content";
import { useAuth } from "@/lib/store/auth";
import { useUi } from "@/lib/store/ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/utils";

export default function ThemesPage() {
  const themes = useContent((s) => s.themes);
  const toast = useUi((s) => s.toast);
  const member = useAuth((s) => s.memberLoggedIn);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
      <header className="mb-8 lg:mb-10 max-w-3xl">
        <div className="section-title text-xs">THEME SUBSCRIPTION</div>
        <h1 className="mt-2 font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-text-primary">主題訂閱</h1>
        <p className="mt-3 text-text-secondary text-sm lg:text-base">
          設定你關注的客家文化主題 — 新內容上架時，我們會第一時間通知你。
          {!member && <span className="block mt-2 text-warning">登入會員後即可訂閱主題。</span>}
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
        {themes.map((t) => (
          <div key={t.id} className="group card overflow-hidden hover:border-accent transition-colors">
            <Link href={`/themes/${t.slug}`} className="block relative aspect-video overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.cover} alt={t.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent" />
              <div className="absolute inset-x-4 bottom-4">
                <h3 className="font-display text-xl lg:text-2xl font-extrabold text-text-primary line-clamp-1">{t.name}</h3>
                <div className="mt-1 inline-flex items-center gap-1 text-xs text-text-muted">
                  <Users className="size-3" /> {formatNumber(t.subscriberCount)} 訂閱
                </div>
              </div>
            </Link>
            <div className="p-4">
              <p className="text-sm text-text-secondary line-clamp-2 mb-3">{t.description}</p>
              <Button
                variant="primary"
                className="w-full"
                onClick={() =>
                  toast({
                    variant: "success",
                    title: `已訂閱「${t.name}」`,
                    description: "新內容上架時會收到推播通知。",
                  })
                }
              >
                <Bell className="size-4" /> 訂閱主題
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
