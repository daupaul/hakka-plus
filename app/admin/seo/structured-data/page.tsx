"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { useUi } from "@/lib/store/ui";

const TYPES = [
  { type: "VideoObject", count: 24, status: "valid" },
  { type: "NewsArticle", count: 40, status: "valid" },
  { type: "Article (策展)", count: 12, status: "valid" },
  { type: "Product (選物)", count: 20, status: "valid" },
  { type: "BreadcrumbList", count: 156, status: "valid" },
  { type: "Organization", count: 1, status: "valid" },
  { type: "WebSite (SearchAction)", count: 1, status: "valid" },
];

const EXAMPLE = `{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "星雲下的黑潮島嶼",
  "description": "三代客家漁村家族在花蓮黑潮島嶼的離合悲歡。",
  "thumbnailUrl": "https://hakka.tv/og/v01.jpg",
  "uploadDate": "2026-04-01T00:00:00+08:00",
  "duration": "PT47M30S",
  "contentUrl": "https://hakka.tv/watch/stars-above-kuroshio",
  "publisher": {
    "@type": "Organization",
    "name": "公視客家電視台"
  }
}`;

export default function StructuredDataPage() {
  const toast = useUi((s) => s.toast);
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">結構化資料</h1>
        <p className="mt-1 text-sm text-text-secondary">所有內容類型的 Schema.org JSON-LD 自動生成。</p>
      </div>

      <Card><CardContent>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold">已部署 Schema</h2>
          <Button variant="secondary" onClick={() => toast({ variant: "success", title: "已執行 Google Rich Results 驗證", description: "全部 Schema 通過驗證" })}>驗證所有 Schema</Button>
        </div>
        <ul className="space-y-2">
          {TYPES.map((t) => (
            <li key={t.type} className="flex items-center gap-3 p-3 rounded-lg bg-bg-base">
              <CheckCircle2 className="size-5 text-success" />
              <div className="flex-1">
                <div className="font-semibold text-text-primary">{t.type}</div>
                <div className="text-xs text-text-muted">{t.count} 個項目部署</div>
              </div>
              <Badge variant="success">通過</Badge>
            </li>
          ))}
        </ul>
      </CardContent></Card>

      <Card><CardContent>
        <h2 className="font-display font-bold mb-3">VideoObject 範例 (自動生成)</h2>
        <pre className="card bg-bg-base p-4 text-xs font-mono overflow-x-auto text-text-primary">
{EXAMPLE}
        </pre>
      </CardContent></Card>
    </div>
  );
}
