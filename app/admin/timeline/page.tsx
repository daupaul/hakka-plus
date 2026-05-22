"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, Save, Plus, Trash2 } from "lucide-react";
import { useContent } from "@/lib/store/content";
import { useUi } from "@/lib/store/ui";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TimeSlot } from "@/lib/types";

export default function AdminTimelinePage() {
  const timeline = useContent((s) => s.timeline);
  const updateTimeSlot = useContent((s) => s.updateTimeSlot);
  const toast = useUi((s) => s.toast);

  const [activeTime, setActiveTime] = useState(timeline[0]?.time ?? "06:00");
  const [draft, setDraft] = useState<TimeSlot | null>(null);

  useEffect(() => {
    const slot = timeline.find((t) => t.time === activeTime);
    if (slot) setDraft(JSON.parse(JSON.stringify(slot)));
  }, [activeTime, timeline]);

  if (!draft) return <div className="text-text-muted">Loading…</div>;

  const set = <K extends keyof TimeSlot>(k: K, v: TimeSlot[K]) => setDraft((d) => d ? { ...d, [k]: v } : d);

  const save = () => {
    if (!draft) return;
    updateTimeSlot(activeTime, draft);
    toast({ variant: "success", title: "已儲存", description: `${draft.label} ${draft.time} 內容已更新，前台 Home 立即反映` });
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">客家生活時間軸</h1>
          <p className="mt-1 text-sm text-text-secondary">6 個時段內容編輯 — Home 大時鐘的右側推薦列表會立即反映</p>
        </div>
        <Link href="/" target="_blank" className="inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
          <Eye className="size-3.5" /> 前台 Home 預覽
        </Link>
      </div>

      {/* Time slot selector */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {timeline.map((t) => (
          <button
            key={t.time}
            onClick={() => setActiveTime(t.time)}
            className={cn(
              "card p-3 transition-colors text-left",
              activeTime === t.time ? "border-accent bg-accent-soft" : "hover:border-accent",
            )}
          >
            <div className="clock-numerals text-2xl text-text-primary">{t.time}</div>
            <div className="text-xs text-text-secondary mt-1">{t.label}</div>
          </button>
        ))}
      </div>

      {/* Edit panel */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card><CardContent className="space-y-4">
          <h2 className="font-display font-bold">時段內容</h2>
          <div>
            <label className="text-xs font-semibold text-text-secondary">時段標籤 (例：晨光、暗夜)</label>
            <Input className="mt-1.5" value={draft.label} onChange={(e) => set("label", e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary">時段描述（顯示在大時鐘下方）</label>
            <Textarea className="mt-1.5 min-h-[120px]" value={draft.description} onChange={(e) => set("description", e.target.value)} />
          </div>
        </CardContent></Card>

        <Card><CardContent>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold">本時段推薦（{draft.recommendations.length} 項）</h2>
            <Button size="sm" variant="secondary" onClick={() => set("recommendations", [...draft.recommendations, {
              id: `r-${Date.now()}`,
              type: "video" as const,
              refId: "",
              title: "新推薦",
              image: "https://picsum.photos/seed/new-rec/800/600",
              caption: "副標題",
            }])}><Plus className="size-3.5" /> 新增</Button>
          </div>
          <ul className="space-y-2 max-h-[440px] overflow-y-auto scroll-pretty">
            {draft.recommendations.map((r, i) => (
              <li key={r.id} className="card p-3 bg-bg-base space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="default">{r.type}</Badge>
                  <span className="text-xs text-text-muted flex-1 truncate">{r.refId}</span>
                  <button
                    type="button"
                    onClick={() => set("recommendations", draft.recommendations.filter((_, idx) => idx !== i))}
                    className="text-text-muted hover:text-danger"
                  ><Trash2 className="size-3.5" /></button>
                </div>
                <Input value={r.title} placeholder="標題" onChange={(e) => {
                  const next = [...draft.recommendations];
                  next[i] = { ...next[i], title: e.target.value };
                  set("recommendations", next);
                }} />
                <Input value={r.caption} placeholder="副標 / caption" onChange={(e) => {
                  const next = [...draft.recommendations];
                  next[i] = { ...next[i], caption: e.target.value };
                  set("recommendations", next);
                }} />
                <Input value={r.image} placeholder="圖片 URL" onChange={(e) => {
                  const next = [...draft.recommendations];
                  next[i] = { ...next[i], image: e.target.value };
                  set("recommendations", next);
                }} />
              </li>
            ))}
          </ul>
        </CardContent></Card>
      </div>

      <Button size="lg" className="w-full sm:w-auto" onClick={save}>
        <Save className="size-4" /> 儲存「{draft.label} {draft.time}」內容
      </Button>
    </div>
  );
}
