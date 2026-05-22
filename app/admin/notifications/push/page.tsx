"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUi } from "@/lib/store/ui";
import { Bell } from "lucide-react";

export default function PushPage() {
  const toast = useUi((s) => s.toast);
  const [form, setForm] = useState({ title: "", body: "", deeplink: "", audience: "all", schedule: "now" });

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">推播通知</h1>
        <p className="mt-1 text-sm text-text-secondary">透過 FCM / APNs 推送至 App 與 Web Push 訂閱者。</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-7"><CardContent className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary">標題 (≤ 50 字)</label>
            <Input className="mt-1.5" maxLength={50} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="新一集《茶山書簡》上架" />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary">內容 (≤ 120 字)</label>
            <Textarea className="mt-1.5" maxLength={120} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="本週六晚間 20:00 客家電視台首播，會員可同步線上觀看。" />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary">點擊跳轉 URL</label>
            <Input className="mt-1.5" value={form.deeplink} onChange={(e) => setForm({ ...form, deeplink: e.target.value })} placeholder="/watch/tea-mountain-letters" />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary">受眾</label>
            <select value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} className="mt-1.5 h-10 w-full rounded-lg border border-border bg-bg-elevated px-3 text-sm">
              <option value="all">全用戶 (12,842)</option>
              <option value="annual">年費會員 (3,201)</option>
              <option value="monthly">月費會員 (2,810)</option>
              <option value="trial">試用中 (482)</option>
              <option value="seg-young">25-40 新世代 (4,231)</option>
              <option value="seg-elder">45+ 傳統受眾 (3,812)</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary">發送時機</label>
            <select value={form.schedule} onChange={(e) => setForm({ ...form, schedule: e.target.value })} className="mt-1.5 h-10 w-full rounded-lg border border-border bg-bg-elevated px-3 text-sm">
              <option value="now">立即發送</option>
              <option value="scheduled">排程發送</option>
              <option value="optimal">最佳時段 (AI 推薦)</option>
            </select>
          </div>
          {form.schedule === "scheduled" && (
            <Input type="datetime-local" />
          )}
          <div className="flex gap-2">
            <Button className="flex-1" onClick={() => toast({ variant: "success", title: "推播已發送", description: `已送至 ${form.audience === "all" ? "12,842 名用戶" : "選擇受眾"}` })}>
              <Bell className="size-4" /> 發送
            </Button>
            <Button variant="secondary" onClick={() => toast({ variant: "default", title: "已儲存為草稿" })}>儲存草稿</Button>
            <Button variant="ghost" onClick={() => toast({ variant: "default", title: "測試已送出", description: "已寄至測試裝置" })}>測試送出</Button>
          </div>
        </CardContent></Card>

        <Card className="lg:col-span-5"><CardContent>
          <h2 className="font-display font-bold mb-3">預覽 (iOS)</h2>
          <div className="card p-4 bg-bg-deep border-bg-elevated">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-8 rounded-lg bg-accent inline-flex items-center justify-center text-text-inverse font-bold text-xs">客+</div>
              <div className="flex-1">
                <div className="text-xs font-bold text-text-primary">客+</div>
                <div className="text-[10px] text-text-muted">現在</div>
              </div>
            </div>
            <div className="text-sm font-semibold text-text-primary">{form.title || "推播標題"}</div>
            <div className="mt-0.5 text-xs text-text-secondary">{form.body || "推播內容..."}</div>
          </div>
        </CardContent></Card>
      </div>
    </div>
  );
}
