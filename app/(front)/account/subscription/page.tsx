"use client";

import Link from "next/link";
import { useAuth } from "@/lib/store/auth";
import { useUi } from "@/lib/store/ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const PLANS = [
  { id: "trial", name: "7 天試用", price: 0, period: "7 天", features: ["全站非付費內容", "1 個裝置", "標準畫質"] },
  { id: "monthly", name: "月繳", price: 199, period: "月", features: ["全站非付費內容", "2 個裝置同時", "1080p 高畫質", "下載觀看"], featured: true },
  { id: "annual", name: "年繳", price: 1800, period: "年", features: ["全站非付費內容", "4 個裝置同時", "4K 超高畫質", "下載觀看", "獨家會員首播"] },
];

export default function SubscriptionPage() {
  const memberLoggedIn = useAuth((s) => s.memberLoggedIn);
  const toast = useUi((s) => s.toast);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
      <nav className="text-xs text-text-muted mb-4">
        <Link href="/account" className="hover:text-accent">會員中心</Link> / 訂閱管理
      </nav>
      <Badge variant="default">SUBSCRIPTION</Badge>
      <h1 className="mt-3 font-display text-3xl lg:text-5xl font-extrabold text-text-primary">訂閱管理</h1>
      <p className="mt-3 text-text-secondary">選擇最適合你的方案，隨時可以升級、降級或取消。</p>

      <div className="mt-10 grid sm:grid-cols-3 gap-4">
        {PLANS.map((p) => (
          <Card key={p.id} className={p.featured ? "border-accent" : ""}>
            <CardContent>
              {p.featured && <Badge variant="warm">最熱門</Badge>}
              <h2 className="mt-2 font-display text-xl font-bold text-text-primary">{p.name}</h2>
              <div className="mt-4">
                <span className="font-display text-4xl font-extrabold text-text-primary">NT${p.price}</span>
                <span className="text-sm text-text-muted">/{p.period}</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="size-4 text-accent shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-6 w-full"
                variant={p.featured ? "primary" : "secondary"}
                onClick={() =>
                  toast({
                    variant: "success",
                    title: `已切換至 ${p.name}`,
                    description: memberLoggedIn ? "新方案立即生效。" : "請先登入後再次嘗試。",
                  })
                }
              >
                選擇方案
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border-warning/40 bg-warning/5">
        <CardContent>
          <h3 className="font-bold text-text-primary">取消訂閱</h3>
          <p className="mt-1 text-sm text-text-secondary">取消後不會立即停止，會在當期到期日後不再自動續扣。</p>
          <Button className="mt-3" variant="ghost" onClick={() => toast({ variant: "warning", title: "已取消自動續約", description: "訂閱期內仍可使用，期滿後不再扣款。" })}>
            取消自動續約
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
