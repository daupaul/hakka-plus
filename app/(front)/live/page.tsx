"use client";

import { Radio, Users, Eye, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CHANNELS = [
  { id: "ch1", name: "客家電視 (HD)", number: "17", poster: "https://picsum.photos/seed/live-ch1/1920/1080", host: "李珮安主播", viewers: 4231, currentProgram: "客家新聞 18:00 整點", description: "客家電視台主頻，全天候客家新聞、戲劇、紀錄片" },
  { id: "ch2", name: "客台 HAKKA+ HD", number: "117", poster: "https://picsum.photos/seed/live-ch2/1920/1080", host: "張詩慧主持", viewers: 1832, currentProgram: "茶山書簡 EP4 重播", description: "客台 HD 高畫質頻道，戲劇與電影為主" },
  { id: "ch3", name: "客家國際", number: "217", poster: "https://picsum.photos/seed/live-ch3/1920/1080", host: "陳家瑀製作", viewers: 921, currentProgram: "全球客家對話 · 矽谷篇", description: "面向海外客家社群的國際頻道" },
  { id: "ch4", name: "小客家兒童", number: "317", poster: "https://picsum.photos/seed/live-ch4/1920/1080", host: "黃信瑋主持", viewers: 612, currentProgram: "伯公樹下的孩子 EP6", description: "客語兒童節目專屬頻道" },
];

export default function LivePage() {
  const main = CHANNELS[0];

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
      <header className="mb-8">
        <div className="section-title text-xs">LIVE NOW</div>
        <h1 className="mt-2 font-display text-3xl lg:text-5xl font-extrabold tracking-tight text-text-primary">直播</h1>
        <p className="mt-3 text-text-secondary text-sm lg:text-base">4 個頻道全天候不間斷播出。</p>
      </header>

      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-8">
          <div className="card overflow-hidden">
            <div className="relative aspect-video bg-bg-deep overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={main.poster} alt={main.name} className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/20 to-transparent" />
              <div className="absolute top-4 left-4">
                <Badge variant="danger" className="bg-danger text-white">
                  <Radio className="size-3 animate-pulse" /> LIVE
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <div className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full bg-bg-base/80 backdrop-blur-md text-text-primary text-xs">
                  <Users className="size-3.5" /> {main.viewers.toLocaleString()} 人收看
                </div>
              </div>
            </div>
            <div className="p-5 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-display text-xl lg:text-2xl font-bold text-text-primary">{main.name}</div>
                  <div className="mt-1 text-sm text-text-secondary">頻道 {main.number} · 主持人 {main.host}</div>
                </div>
                <Button variant="secondary"><MessageCircle className="size-4" /> 直播聊天室</Button>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-xs text-text-muted">目前播出</div>
                <div className="mt-1 font-semibold text-text-primary">{main.currentProgram}</div>
              </div>
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-3">
          <div className="section-title text-xs px-1">所有頻道</div>
          {CHANNELS.map((ch) => (
            <button key={ch.id} className="w-full card overflow-hidden hover:border-accent transition-colors text-left flex items-center gap-3 p-3">
              <div className="relative w-24 aspect-video shrink-0 overflow-hidden rounded-md bg-bg-deep">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ch.poster} alt={ch.name} className="size-full object-cover" />
                <Badge variant="danger" className="absolute top-1 left-1 text-[9px] bg-danger text-white">LIVE</Badge>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-text-primary text-sm">{ch.name}</div>
                <div className="text-xs text-text-muted">頻道 {ch.number}</div>
                <div className="mt-1 text-xs text-text-secondary line-clamp-1">{ch.currentProgram}</div>
                <div className="mt-1 inline-flex items-center gap-1 text-[10px] text-text-muted">
                  <Eye className="size-2.5" /> {ch.viewers.toLocaleString()}
                </div>
              </div>
            </button>
          ))}
        </aside>
      </div>
    </div>
  );
}
