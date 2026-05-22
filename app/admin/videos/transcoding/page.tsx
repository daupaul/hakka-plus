"use client";

import { Cloud, Play, Pause, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUi } from "@/lib/store/ui";

const JOBS = [
  { id: "j01", videoTitle: "薑花盛開時 EP15", status: "processing", progress: 68, started: "2026-05-21T10:00:00+08:00", presets: ["720p", "1080p", "4K"] },
  { id: "j02", videoTitle: "客家伙房 EP21", status: "processing", progress: 23, started: "2026-05-21T10:20:00+08:00", presets: ["720p", "1080p"] },
  { id: "j03", videoTitle: "百年龍燈 (直播回看)", status: "queued", progress: 0, started: "2026-05-21T10:30:00+08:00", presets: ["720p", "1080p", "4K"] },
  { id: "j04", videoTitle: "客家八音的當代旅程 EP9", status: "completed", progress: 100, started: "2026-05-21T08:00:00+08:00", presets: ["720p", "1080p"] },
  { id: "j05", videoTitle: "稜線上的行走日記 EP5", status: "completed", progress: 100, started: "2026-05-21T07:30:00+08:00", presets: ["720p", "1080p"] },
  { id: "j06", videoTitle: "藍衫女兒們 EP18", status: "failed", progress: 42, started: "2026-05-21T06:00:00+08:00", presets: ["720p", "1080p", "4K"] },
];

export default function TranscodingPage() {
  const toast = useUi((s) => s.toast);
  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">轉碼任務</h1>
        <p className="mt-1 text-sm text-text-secondary">影片上傳後自動觸發轉碼，產生 720p / 1080p / 4K 多畫質串流檔。</p>
      </div>

      <div className="grid sm:grid-cols-4 gap-3">
        <Stat label="進行中" value="2" tone="info" />
        <Stat label="排隊中" value="1" tone="warning" />
        <Stat label="今日完成" value="14" tone="good" />
        <Stat label="失敗" value="1" tone="bad" />
      </div>

      <div className="space-y-3">
        {JOBS.map((j) => (
          <Card key={j.id}>
            <CardContent>
              <div className="flex items-start gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge variant={j.status === "completed" ? "success" : j.status === "processing" ? "default" : j.status === "queued" ? "warning" : "danger"}>
                      {j.status === "completed" ? "完成" : j.status === "processing" ? "進行中" : j.status === "queued" ? "排隊" : "失敗"}
                    </Badge>
                    {j.presets.map((p) => <Badge key={p} variant="muted">{p}</Badge>)}
                  </div>
                  <div className="font-semibold text-text-primary">{j.videoTitle}</div>
                  <div className="text-xs text-text-muted mt-0.5 font-mono">Job ID: {j.id} · 開始於 {new Date(j.started).toLocaleString("zh-TW")}</div>
                  <div className="mt-3 h-2 rounded-full bg-bg-base overflow-hidden">
                    <div className={`h-full transition-all ${j.status === "failed" ? "bg-danger" : "bg-accent"}`} style={{ width: `${j.progress}%` }} />
                  </div>
                  <div className="mt-1 text-xs text-text-muted">{j.progress}% {j.status === "processing" && `(ETA ${Math.ceil((100 - j.progress) * 0.4)} 分鐘)`}</div>
                </div>
                <div className="flex gap-2">
                  {j.status === "processing" && <Button size="sm" variant="ghost" onClick={() => toast({ variant: "default", title: "已暫停" })}><Pause className="size-3.5" /></Button>}
                  {j.status === "failed" && <Button size="sm" variant="secondary" onClick={() => toast({ variant: "success", title: "已重試" })}><Play className="size-3.5" /> 重試</Button>}
                  {j.status === "completed" && <CheckCircle2 className="size-5 text-success" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "good" | "warning" | "bad" | "info" }) {
  const cls = tone === "good" ? "text-success" : tone === "warning" ? "text-warning" : tone === "bad" ? "text-danger" : "text-info";
  return (
    <Card><CardContent>
      <div className="text-xs uppercase tracking-wider text-text-muted">{label}</div>
      <div className={`mt-2 font-display text-3xl font-extrabold ${cls}`}>{value}</div>
    </CardContent></Card>
  );
}
