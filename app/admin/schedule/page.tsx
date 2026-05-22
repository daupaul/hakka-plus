"use client";

import { useState } from "react";
import { addDays, format, startOfWeek } from "date-fns";
import { zhTW } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUi } from "@/lib/store/ui";

const CHANNELS = [
  { id: "ch1", name: "客家電視", num: "17" },
  { id: "ch2", name: "HAKKA+ HD", num: "117" },
  { id: "ch3", name: "客家國際", num: "217" },
  { id: "ch4", name: "小客家兒童", num: "317" },
];

const PROGRAM_POOL = [
  "客家新聞 (1hr)", "茶山書簡 EP", "客家伙房", "義民信仰", "桐花雪季", "客家八音",
  "客家流行音樂", "藍染夥房手記", "粄條情書", "雷打不動的擂茶", "美濃的星河之夜",
  "鹿港的客家後街", "屏東來的回聲", "客家青年的矽谷時光", "靜默的客家河", "客家小炒實境秀",
];

export default function AdminSchedulePage() {
  const toast = useUi((s) => s.toast);
  const [weekOffset, setWeekOffset] = useState(0);
  const start = addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), weekOffset * 7);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">節目表編排</h1>
          <p className="mt-1 text-sm text-text-secondary">4 個頻道，週節目表編輯與公視 API 同步。</p>
        </div>
        <Button onClick={() => toast({ variant: "success", title: "已觸發手動同步", description: "公視 API 排程資料正在拉取..." })}>
          <Plus className="size-4" /> 新增節目
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="secondary" size="sm" onClick={() => setWeekOffset(weekOffset - 1)}><ChevronLeft className="size-4" /></Button>
        <div className="font-display text-lg font-bold text-text-primary">
          {format(start, "yyyy/MM/dd", { locale: zhTW })} — {format(addDays(start, 6), "MM/dd", { locale: zhTW })}
        </div>
        <Button variant="secondary" size="sm" onClick={() => setWeekOffset(weekOffset + 1)}><ChevronRight className="size-4" /></Button>
        <Button variant="ghost" size="sm" onClick={() => setWeekOffset(0)}>本週</Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg-elevated border-b border-border">
              <tr>
                <th className="text-left p-3 text-xs text-text-muted w-32">頻道</th>
                {days.map((d, i) => (
                  <th key={i} className="text-left p-3 min-w-[140px]">
                    <div className="text-xs text-text-muted">{format(d, "EEE", { locale: zhTW })}</div>
                    <div className="font-display font-bold text-text-primary">{format(d, "MM/dd")}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CHANNELS.map((ch, ci) => (
                <tr key={ch.id} className="border-b border-border last:border-b-0">
                  <td className="p-3 align-top">
                    <div className="font-semibold text-text-primary text-sm">{ch.name}</div>
                    <div className="text-[10px] text-text-muted">頻道 {ch.num}</div>
                  </td>
                  {days.map((_, di) => (
                    <td key={di} className="p-2 align-top">
                      <div className="space-y-1.5">
                        {[0, 1, 2].map((slot) => {
                          const idx = (ci * 7 + di * 3 + slot) % PROGRAM_POOL.length;
                          const program = PROGRAM_POOL[idx];
                          return (
                            <button
                              key={slot}
                              onClick={() => toast({ variant: "default", title: "編輯節目", description: `${ch.name} · ${program}` })}
                              className="block w-full text-left card p-2 hover:border-accent transition-colors bg-bg-base"
                            >
                              <div className="text-[10px] text-text-muted">{["08:00", "14:00", "20:00"][slot]}</div>
                              <div className="text-xs font-semibold text-text-primary line-clamp-1">{program}</div>
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card className="border-warning/40 bg-warning/5">
        <CardContent>
          <h3 className="font-bold text-text-primary mb-2">公視 API 同步</h3>
          <p className="text-sm text-text-secondary">
            節目表每 30 分鐘自動從公視 API 同步。最後同步時間：2026-05-21 10:30。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
