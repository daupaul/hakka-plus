"use client";

import Link from "next/link";
import { Film, Newspaper, Sparkles, Users, ShieldAlert, ArrowRight, Activity, ShoppingBag, CreditCard, Heart, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useContent } from "@/lib/store/content";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber, relativeTime } from "@/lib/utils";

const RECENT_ACTIVITY = [
  { id: 1, at: "2026-05-21T10:24:00+08:00", actor: "編輯室 王小美", category: "content", action: "發布新聞", target: "義民祭 120 週年" },
  { id: 2, at: "2026-05-21T09:48:00+08:00", actor: "影音部 張正杰", category: "content", action: "新增影片", target: "薑花盛開時 EP15" },
  { id: 3, at: "2026-05-21T08:30:00+08:00", actor: "客服 林雅婷", category: "member", action: "處理退款", target: "訂單 #2026-0512-0042" },
  { id: 4, at: "2026-05-20T22:15:00+08:00", actor: "系統", category: "incident", action: "S2 自動修復", target: "API 502 偶發異常" },
  { id: 5, at: "2026-05-20T18:00:00+08:00", actor: "行銷 蔡岳廷", category: "system", action: "排程推播", target: "週末客家旅遊推薦" },
];

export default function AdminDashboardPage() {
  const videos = useContent((s) => s.videos);
  const news = useContent((s) => s.news);
  const curations = useContent((s) => s.curations);
  const products = useContent((s) => s.products);

  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <div className="text-xs section-title text-accent">DASHBOARD</div>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-text-primary">客+ Admin 總覽</h1>
        <p className="mt-1 text-sm text-text-secondary">企劃書 v2 承諾的 14 個 CMS 模組，全部就位。</p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Film className="size-5" />} label="影片庫" value={videos.length} delta="+3 本週" trend="up" />
        <StatCard icon={<Newspaper className="size-5" />} label="新聞" value={news.length} delta="+12 本週" trend="up" />
        <StatCard icon={<Sparkles className="size-5" />} label="策展" value={curations.length} delta="+1 本週" trend="up" />
        <StatCard icon={<ShoppingBag className="size-5" />} label="選物商品" value={products.length} delta="+2 本週" trend="up" />
        <StatCard icon={<Users className="size-5" />} label="會員總數" value={formatNumber(12842)} delta="+218 本週" trend="up" />
        <StatCard icon={<CreditCard className="size-5" />} label="本月營收" value={formatNumber(2840300)} prefix="NT$" delta="+8.2%" trend="up" />
        <StatCard icon={<Heart className="size-5" />} label="觀看時數" value="48,210" suffix=" hr" delta="+12%" trend="up" />
        <StatCard icon={<ShieldAlert className="size-5" />} label="待處理事件" value="2" delta="0 嚴重" trend="flat" tone="warning" />
      </div>

      {/* Two-col layout */}
      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity className="size-4 text-accent" />
                <h2 className="font-display font-bold">最近活動</h2>
              </div>
              <Badge variant="default">即時</Badge>
            </div>
            <ul className="space-y-3">
              {RECENT_ACTIVITY.map((a) => (
                <li key={a.id} className="flex items-start gap-3 p-3 -mx-3 rounded-lg hover:bg-bg-base/40">
                  <div className={`size-9 rounded-full inline-flex items-center justify-center ${
                    a.category === "content" ? "bg-accent-soft text-accent" :
                    a.category === "member" ? "bg-warning/15 text-warning" :
                    a.category === "incident" ? "bg-danger/15 text-danger" :
                    "bg-info/15 text-info"
                  }`}>
                    {a.category === "content" ? <Sparkles className="size-4" /> :
                     a.category === "member" ? <Users className="size-4" /> :
                     a.category === "incident" ? <AlertTriangle className="size-4" /> :
                     <Activity className="size-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm">
                      <span className="font-semibold text-text-primary">{a.actor}</span>
                      <span className="text-text-secondary"> · {a.action} </span>
                      <span className="text-text-primary font-medium">{a.target}</span>
                    </div>
                    <div className="text-xs text-text-muted mt-0.5">{relativeTime(a.at)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="lg:col-span-5">
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="size-4 text-accent" />
              <h2 className="font-display font-bold">系統健康度</h2>
            </div>
            <div className="space-y-4">
              <Health label="API 服務" value="99.98%" tone="good" />
              <Health label="CDN（Cloudflare R2）" value="100%" tone="good" />
              <Health label="轉碼工作站" value="3 / 4 線上" tone="warning" />
              <Health label="iNews FTP" value="正常" tone="good" />
              <Health label="ECPay 金流" value="正常" tone="good" />
              <Health label="備份排程" value="今日 02:00 完成" tone="good" />
            </div>
            <div className="mt-6 pt-4 border-t border-border">
              <Link href="/admin/incidents" className="text-sm text-accent font-semibold inline-flex items-center gap-1">
                查看完整事件記錄 <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick access modules */}
      <div>
        <h2 className="font-display text-xl font-bold mb-4">14 個 CMS 模組</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/admin/videos", label: "影音管理", count: videos.length, suffix: "部", v2: false },
            { href: "/admin/news", label: "新聞管理", count: news.length, suffix: "則", v2: true },
            { href: "/admin/curations", label: "策展管理", count: curations.length, suffix: "篇", v2: false },
            { href: "/admin/schedule", label: "節目表 & 直播", count: 4, suffix: "頻道", v2: false },
            { href: "/admin/members", label: "會員管理", count: 12842, suffix: "位", v2: false },
            { href: "/admin/orders", label: "金流訂單", count: 318, suffix: "筆本月", v2: false },
            { href: "/admin/tags", label: "標籤 & 內容架構", count: 40, suffix: "標籤", v2: false },
            { href: "/admin/seo", label: "SEO 設定", count: 24, suffix: "頁面", v2: false },
            { href: "/admin/roles", label: "權限角色", count: 6, suffix: "角色", v2: false },
            { href: "/admin/incidents", label: "危機處理", count: 2, suffix: "待處理", v2: true },
            { href: "/admin/notifications", label: "推播 & 通知", count: 14, suffix: "排程", v2: false },
            { href: "/admin/cdn", label: "CDN & 效能", count: 99.98, suffix: "% 可用度", v2: false },
            { href: "/admin/shop", label: "導購商品", count: products.length, suffix: "件", v2: false },
            { href: "/admin/settings", label: "系統設定", count: 12, suffix: "整合", v2: false },
          ].map((m) => (
            <Link key={m.href} href={m.href}>
              <Card className="hover:border-accent transition-colors h-full">
                <CardContent className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-text-muted">{m.href}</div>
                    <div className="mt-1 font-semibold text-text-primary flex items-center gap-2">
                      {m.label}
                      {m.v2 && <Badge variant="warm">v2 必殺技</Badge>}
                    </div>
                    <div className="mt-1 text-xs text-text-muted">
                      <span className="text-accent font-bold font-display text-base">{m.count.toLocaleString()}</span> {m.suffix}
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-text-muted" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, prefix, suffix, delta, trend, tone = "default" }: { icon: React.ReactNode; label: string; value: string | number; prefix?: string; suffix?: string; delta?: string; trend?: "up" | "down" | "flat"; tone?: "default" | "warning" }) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-text-muted">{label}</span>
          <span className={tone === "warning" ? "text-warning" : "text-accent"}>{icon}</span>
        </div>
        <div className="mt-3 text-2xl lg:text-3xl font-display font-extrabold text-text-primary">
          {prefix}{value}{suffix}
        </div>
        {delta && (
          <div className={`mt-1 text-xs font-semibold ${trend === "up" ? "text-success" : trend === "down" ? "text-danger" : "text-text-muted"}`}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "—"} {delta}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Health({ label, value, tone }: { label: string; value: string; tone: "good" | "warning" | "bad" }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-text-secondary">{label}</span>
      <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${tone === "good" ? "text-success" : tone === "warning" ? "text-warning" : "text-danger"}`}>
        <span className={`size-2 rounded-full ${tone === "good" ? "bg-success" : tone === "warning" ? "bg-warning" : "bg-danger"}`} />
        {value}
      </span>
    </div>
  );
}
