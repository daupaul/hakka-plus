"use client";

import { useState } from "react";
import { format, addDays, startOfDay } from "date-fns";
import { zhTW } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Radio } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CHANNELS = [
  { id: "ch1", name: "客家電視", num: "17" },
  { id: "ch2", name: "HAKKA+ HD", num: "117" },
  { id: "ch3", name: "客家國際", num: "217" },
  { id: "ch4", name: "小客家兒童", num: "317" },
];

const PROGRAMS_BY_HOUR = [
  "客家新聞", "茶山書簡", "客家伙房", "義民信仰：百二年的香火", "桐花雪季", "客家八音的當代旅程",
  "客家流行音樂的星空", "藍染夥房手記", "粄條情書", "客家伙房", "雷打不動的擂茶", "美濃的星河之夜",
  "鹿港的客家後街", "屏東來的回聲", "客家青年的矽谷時光", "靜默的客家河", "稜線上的行走日記",
  "祖屋的眼神", "燈籠師傅與他的兒子", "百年龍燈：客庄夜未眠", "薑花盛開時", "藍衫女兒們", "月光下的客家粄", "伯公樹下的孩子",
];

export default function SchedulePage() {
  const [dayOffset, setDayOffset] = useState(0);
  const date = addDays(startOfDay(new Date()), dayOffset);
  const isToday = dayOffset === 0;

  const slots = Array.from({ length: 24 }, (_, h) => ({
    hour: h,
    time: `${String(h).padStart(2, "0")}:00`,
    programs: CHANNELS.map((c, ci) => ({
      channelId: c.id,
      title: PROGRAMS_BY_HOUR[(h + ci * 3) % PROGRAMS_BY_HOUR.length],
      isLive: isToday && h === new Date().getHours(),
    })),
  }));

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
      <header className="mb-6">
        <div className="section-title text-xs">TV SCHEDULE</div>
        <h1 className="mt-2 font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-text-primary">節目表</h1>
        <p className="mt-3 text-text-secondary text-sm lg:text-base">4 個客台頻道，前後 4 週節目表查詢。</p>
      </header>

      <div className="mb-6 flex items-center gap-3">
        <Button variant="secondary" size="sm" onClick={() => setDayOffset(dayOffset - 1)}>
          <ChevronLeft className="size-4" />
        </Button>
        <div className="text-center">
          <div className="font-display font-bold text-text-primary text-lg lg:text-xl">
            {format(date, "yyyy/MM/dd (EEE)", { locale: zhTW })}
          </div>
          {isToday && <div className="text-xs text-accent font-semibold">今日</div>}
        </div>
        <Button variant="secondary" size="sm" onClick={() => setDayOffset(dayOffset + 1)}>
          <ChevronRight className="size-4" />
        </Button>
        <Button variant={isToday ? "ghost" : "outline"} size="sm" onClick={() => setDayOffset(0)} className="ml-2">
          回到今日
        </Button>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-bg-elevated border-b border-border">
            <tr>
              <th className="text-left p-3 text-xs uppercase tracking-wider text-text-muted">時段</th>
              {CHANNELS.map((c) => (
                <th key={c.id} className="text-left p-3 min-w-[180px]">
                  <div className="font-display font-bold text-text-primary">{c.name}</div>
                  <div className="text-[10px] text-text-muted">頻道 {c.num}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot.hour} className="border-b border-border last:border-b-0 hover:bg-bg-elevated/50">
                <td className="p-3 font-mono text-text-secondary w-20">{slot.time}</td>
                {slot.programs.map((p, i) => (
                  <td key={i} className="p-3">
                    <div className="flex items-center gap-2">
                      {p.isLive && <Badge variant="danger" className="bg-danger text-white"><Radio className="size-2.5" /> LIVE</Badge>}
                      <span className="text-text-primary line-clamp-1">{p.title}</span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
