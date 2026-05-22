"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUi } from "@/lib/store/ui";

export default function RecommendationsPage() {
  const toast = useUi((s) => s.toast);
  const [weights, setWeights] = useState({ recency: 30, popularity: 25, personal: 25, tagSimilarity: 15, diversity: 5 });

  const total = Object.values(weights).reduce((s, n) => s + n, 0);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">推薦演算法權重</h1>
        <p className="mt-1 text-sm text-text-secondary">調整首頁與內容頁的推薦排序邏輯。可進行 A/B test。</p>
      </div>

      <Card>
        <CardContent>
          <h2 className="font-display font-bold mb-4">演算法權重 (總和應 = 100)</h2>
          <div className="space-y-4">
            {([
              ["recency", "新近性", "新發布的內容優先"],
              ["popularity", "人氣", "觀看數高的內容優先"],
              ["personal", "個人化", "基於用戶觀看歷史"],
              ["tagSimilarity", "標籤相似度", "內容宇宙串聯"],
              ["diversity", "多樣性", "避免過度集中"],
            ] as const).map(([k, label, desc]) => (
              <div key={k}>
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <div className="font-semibold text-text-primary text-sm">{label}</div>
                    <div className="text-xs text-text-muted">{desc}</div>
                  </div>
                  <div className="font-display font-bold text-accent text-lg">{weights[k]}%</div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={weights[k]}
                  onChange={(e) => setWeights({ ...weights, [k]: Number(e.target.value) })}
                  className="w-full accent-accent"
                />
              </div>
            ))}
          </div>
          <div className={`mt-6 text-sm font-bold ${total === 100 ? "text-success" : "text-warning"}`}>
            目前總和：{total}% {total !== 100 && "(建議調整為 100%)"}
          </div>
          <Button
            className="mt-4 w-full"
            onClick={() => toast({ variant: "success", title: "已套用推薦權重", description: `下次刷新時生效` })}
          >套用</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="font-display font-bold mb-3">A/B 測試</h2>
          <div className="space-y-3">
            <ABCard name="Group A — 高新近性" status="進行中" sample="50%" ctr="3.4%" />
            <ABCard name="Group B — 高人氣" status="進行中" sample="50%" ctr="3.1%" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ABCard({ name, status, sample, ctr }: { name: string; status: string; sample: string; ctr: string }) {
  return (
    <div className="card p-3 flex items-center gap-3 flex-wrap">
      <Badge variant="default">{status}</Badge>
      <div className="flex-1 min-w-[160px]">
        <div className="font-semibold text-text-primary text-sm">{name}</div>
        <div className="text-xs text-text-muted">受眾 {sample}</div>
      </div>
      <div className="text-right">
        <div className="text-xs text-text-muted">點擊率</div>
        <div className="font-display font-bold text-accent">{ctr}</div>
      </div>
    </div>
  );
}
