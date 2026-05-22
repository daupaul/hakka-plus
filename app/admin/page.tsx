"use client";

import Link from "next/link";
import { Film, Newspaper, Sparkles, Users, ShieldAlert, ArrowRight, Activity, ShoppingBag, CreditCard, Heart, AlertTriangle, CheckCircle2, Bookmark, CalendarDays, Tags } from "lucide-react";
import { useContent } from "@/lib/store/content";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber, relativeTime } from "@/lib/utils";

const RECENT_ACTIVITY = [
  { id: 1, at: "2026-05-22T10:24:00+08:00", actor: "編輯室 王小美", category: "content", action: "發布新聞", target: "義民祭 120 週年" },
  { id: 2, at: "2026-05-22T09:48:00+08:00", actor: "影音部 張正杰", category: "content", action: "新增影片", target: "薑花盛開時 EP15" },
  { id: 3, at: "2026-05-22T08:30:00+08:00", actor: "客服 林雅婷", category: "member", action: "處理退款", target: "訂單 #2026-0512-0042" },
  { id: 4, at: "2026-05-21T22:15:00+08:00", actor: "系統", category: "incident", action: "S2 自動修復", target: "API 502 偶發異常" },
  { id: 5, at: "2026-05-21T18:00:00+08:00", actor: "行銷 蔡岳廷", category: "system", action: "排程推播", target: "週末客家旅遊推薦" },
];

export default function AdminDashboardPage() {
  const videos = useContent((s) => s.videos);
  const news = useContent((s) => s.news);
  const curations = useContent((s) => s.curations);
  const products = useContent((s) => s.products);
  const themes = useContent((s) => s.themes);
  const tags = useContent((s) => s.tags);
  const timeline = useContent((s) => s.timeline);
  const settings = useContent((s) => s.settings);

  const publishedVideos = videos.filter((v) => v.status === "published").length;
  const draftVideos = videos.filter((v) => v.status === "draft").length;
  const publishedNews = news.filter((n) => n.status === "published").length;
  const featuredNews = news.filter((n) => n.featured).length;
  const totalSubscribers = themes.reduce((s, t) => s + t.subscriberCount, 0);
  const totalProductClicks = products.reduce((s, p) => s + p.clickCount, 0);

  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <div className="text-xs section-title text-accent">DASHBOARD</div>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-text-primary">客+ Admin 總覽</h1>
        <p className="mt-1 text-sm text-text-secondary">所有統計來自前端共用 Zustand store · 後台改 → 前台立即反映</p>
      </div>

      {/* Real-time stat cards (from store) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Film className="size-5" />} label="影片庫" value={videos.length} delta={`${publishedVideos} 已發布 / ${draftVideos} 草稿`} href="/admin/videos" />
        <StatCard icon={<Newspaper className="size-5" />} label="新聞" value={news.length} delta={`${publishedNews} 已發布 / ${featuredNews} 編輯精選`} href="/admin/news" v2 />
        <StatCard icon={<Sparkles className="size-5" />} label="策展" value={curations.length} delta="生活+ 內容" href="/admin/curations" />
        <StatCard icon={<ShoppingBag className="size-5" />} label="選物商品" value={products.length} delta={`${formatNumber(totalProductClicks)} 累計點擊`} href="/admin/shop" />
        <StatCard icon={<Bookmark className="size-5" />} label="主題訂閱" value={themes.length} delta={`${formatNumber(totalSubscribers)} 訂閱數`} href="/admin/themes" />
        <StatCard icon={<Tags className="size-5" />} label="跨類型標籤" value={tags.length} delta="內容宇宙串聯" href="/admin/tags" />
        <StatCard icon={<CalendarDays className="size-5" />} label="時間軸時段" value={timeline.length} delta="6 個 24hr 推薦池" href="/admin/timeline" />
        <StatCard icon={<ShieldAlert className="size-5" />} label="待處理事件" value="2" delta="0 嚴重" tone="warning" href="/admin/incidents" v2 />
      </div>

      {/* Interactivity demo banner */}
      <Card className="border-accent/40 bg-accent-soft">
        <CardContent>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="size-6 text-accent shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-text-primary">前後台即時聯動</h3>
              <p className="mt-1 text-sm text-text-secondary">
                以下後台模組的所有 CRUD 操作會即時反映到前台對應頁面（透過共用 Zustand store + localStorage）：
              </p>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 text-xs">
                <LinkPair admin="/admin/videos" front="/watch" label="影音" />
                <LinkPair admin="/admin/news" front="/news" label="新聞" />
                <LinkPair admin="/admin/curations" front="/life" label="策展" />
                <LinkPair admin="/admin/shop" front="/shop" label="選物" />
                <LinkPair admin="/admin/themes" front="/themes" label="主題訂閱" />
                <LinkPair admin="/admin/timeline" front="/" label="時間軸 (Home)" />
                <LinkPair admin="/admin/tags" front="/search" label="標籤" />
                <LinkPair admin="/admin/settings" front="/" label="網站設定 (Footer)" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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

      {/* Quick links to live frontend pages */}
      <Card>
        <CardContent>
          <h2 className="font-display font-bold mb-3">前台快速跳轉（驗證互動）</h2>
          <p className="text-xs text-text-muted mb-4">
            建議測試流程：① 在影音/新聞/策展 CMS 新增或編輯內容 → ② 點下方任一前台連結（會在新分頁開啟） → ③ 確認改動立即顯示
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/", label: "Home" },
              { href: "/watch", label: "影視列表" },
              { href: "/news", label: "新聞列表" },
              { href: "/life", label: "生活+ 策展" },
              { href: "/shop", label: "客家選物" },
              { href: "/themes", label: "主題訂閱" },
              { href: "/about", label: "關於客台" },
              { href: "/search", label: "全站搜尋" },
            ].map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full border border-border text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors">
                {l.label} ↗
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ icon, label, value, delta, tone = "default", href, v2 }: { icon: React.ReactNode; label: string; value: string | number; delta?: string; tone?: "default" | "warning"; href?: string; v2?: boolean }) {
  const body = (
    <Card className="hover:border-accent transition-colors h-full">
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-text-muted">{label}</span>
          <span className={tone === "warning" ? "text-warning" : "text-accent"}>{icon}</span>
        </div>
        <div className="mt-3 text-2xl lg:text-3xl font-display font-extrabold text-text-primary">{value}</div>
        {delta && <div className="mt-1 text-xs text-text-muted">{delta}</div>}
        {v2 && <div className="mt-2"><Badge variant="warm">v2 必殺技</Badge></div>}
      </CardContent>
    </Card>
  );
  return href ? <Link href={href}>{body}</Link> : body;
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

function LinkPair({ admin, front, label }: { admin: string; front: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 p-2 rounded bg-bg-base/80">
      <Link href={admin} className="font-mono text-[10px] text-accent hover:underline">{admin}</Link>
      <ArrowRight className="size-3 text-text-muted shrink-0" />
      <a href={front} target="_blank" rel="noreferrer" className="font-mono text-[10px] text-text-secondary hover:text-accent">{front} ↗</a>
    </div>
  );
}
