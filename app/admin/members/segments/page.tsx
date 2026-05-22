"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";

const SEGMENTS = [
  { id: "seg-young", name: "25-40 歲新世代", count: 4231, desc: "短影音、社群分享、追劇主力" },
  { id: "seg-elder", name: "45+ 傳統受眾", count: 3812, desc: "節目表查詢優先、新聞重度使用者" },
  { id: "seg-culture", name: "文化愛好者", count: 2103, desc: "策展、選物、節氣關注者" },
  { id: "seg-public", name: "公部門 / 民眾", count: 982, desc: "申訴、表單、公開資訊查詢" },
  { id: "seg-tea", name: "茶愛好者", count: 1821, desc: "茶宇宙主題訂閱用戶" },
  { id: "seg-meinong", name: "美濃在地", count: 421, desc: "美濃地理位置會員" },
];

export default function MembersSegmentsPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">TA 分群管理</h1>
          <p className="mt-1 text-sm text-text-secondary">4 類核心 TA + 動態自訂分群，用於推播、行銷活動受眾選擇。</p>
        </div>
        <Button><Plus className="size-4" /> 新增分群</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {SEGMENTS.map((s) => (
          <Card key={s.id} className="hover:border-accent transition-colors">
            <CardContent>
              <div className="flex items-start justify-between mb-2">
                <div className="size-10 rounded-full bg-accent-soft text-accent inline-flex items-center justify-center">
                  <Users className="size-5" />
                </div>
                <Badge variant="warm">{s.count.toLocaleString()}</Badge>
              </div>
              <div className="font-display font-bold text-text-primary">{s.name}</div>
              <p className="mt-1 text-xs text-text-muted">{s.desc}</p>
              <div className="mt-4 pt-3 border-t border-border flex items-center gap-2">
                <Button size="sm" variant="secondary" className="flex-1">編輯規則</Button>
                <Button size="sm" variant="ghost">傳訊</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
