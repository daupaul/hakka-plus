"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, FileText, BarChart3, Link2, ExternalLink } from "lucide-react";
import { useUi } from "@/lib/store/ui";

export default function AdminSeoPage() {
  const toast = useUi((s) => s.toast);
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">SEO 設定</h1>
        <p className="mt-1 text-sm text-text-secondary">全站 SEO 配置、頁面 Meta 編輯、結構化資料、Sitemap 與 GA / GSC 整合。</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="已收錄頁面" value="3,421" delta="GSC" />
        <Stat label="主要關鍵字排名" value="48" delta="進前 10" />
        <Stat label="Core Web Vitals" value="98 / 96 / 94" delta="LCP / INP / CLS" />
        <Stat label="本月自然流量" value="124K" delta="+12.4%" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Module href="/admin/seo/pages" icon={<FileText className="size-5" />} title="頁面 Meta 編輯" desc="每個 URL 的 title / description / OG / canonical" />
        <Module href="/admin/seo/structured-data" icon={<BarChart3 className="size-5" />} title="結構化資料" desc="Schema.org JSON-LD 自動生成與驗證" />
        <Module icon={<Globe className="size-5" />} title="多語言 hreflang" desc="繁中 / 客語 / 英文版本指向" onClick={() => toast({ variant: "default", title: "已開啟多語言設定" })} />
        <Module icon={<Link2 className="size-5" />} title="重定向規則" desc="301 / 302 規則管理" onClick={() => toast({ variant: "default", title: "已開啟重定向" })} />
        <Module icon={<FileText className="size-5" />} title="Robots.txt & Sitemap" desc="搜尋引擎索引控制" onClick={() => toast({ variant: "default", title: "Sitemap 已產生" })} />
      </div>

      <Card>
        <CardContent>
          <h2 className="font-display font-bold mb-3">整合服務</h2>
          <div className="space-y-3 text-sm">
            <IntegrationRow name="Google Search Console" status="已連結" account="hakka.tv 已驗證" />
            <IntegrationRow name="Google Analytics 4" status="已連結" account="G-XXXXXXXXXX" />
            <IntegrationRow name="Meta Pixel" status="已連結" account="ID: 1234567890123456" />
            <IntegrationRow name="Bing Webmaster" status="未連結" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Stat({ label, value, delta }: { label: string; value: string; delta?: string }) {
  return <Card><CardContent>
    <div className="text-xs uppercase tracking-wider text-text-muted">{label}</div>
    <div className="mt-2 font-display text-2xl font-extrabold text-text-primary">{value}</div>
    {delta && <div className="mt-1 text-xs text-text-muted">{delta}</div>}
  </CardContent></Card>;
}

function Module({ href, icon, title, desc, onClick }: { href?: string; icon: React.ReactNode; title: string; desc: string; onClick?: () => void }) {
  const body = (
    <Card className="hover:border-accent transition-colors cursor-pointer">
      <CardContent>
        <div className="text-accent">{icon}</div>
        <div className="mt-3 font-display font-bold text-text-primary">{title}</div>
        <p className="mt-1 text-xs text-text-muted">{desc}</p>
      </CardContent>
    </Card>
  );
  return href ? <Link href={href}>{body}</Link> : <div onClick={onClick}>{body}</div>;
}

function IntegrationRow({ name, status, account }: { name: string; status: string; account?: string }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-border last:border-b-0">
      <div className="size-9 rounded-full bg-accent-soft text-accent inline-flex items-center justify-center"><ExternalLink className="size-4" /></div>
      <div className="flex-1">
        <div className="font-semibold text-text-primary">{name}</div>
        {account && <div className="text-xs text-text-muted">{account}</div>}
      </div>
      <span className={`text-xs font-semibold ${status === "已連結" ? "text-success" : "text-text-muted"}`}>{status}</span>
    </div>
  );
}
