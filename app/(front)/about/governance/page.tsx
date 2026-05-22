import Link from "next/link";
import { FileText, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DOCS = [
  { id: "g1", title: "2025 年度報告書", category: "年度報告", publishedAt: "2026-03-31", file: "#" },
  { id: "g2", title: "2024 年度報告書", category: "年度報告", publishedAt: "2025-03-31", file: "#" },
  { id: "g3", title: "2025 Q4 財務季報", category: "財務", publishedAt: "2026-02-28", file: "#" },
  { id: "g4", title: "2026 董事會名單", category: "董事會", publishedAt: "2026-01-15", file: "#" },
  { id: "g5", title: "製播公約 v3", category: "製播公約", publishedAt: "2025-09-01", file: "#" },
  { id: "g6", title: "新聞部編採守則", category: "製播公約", publishedAt: "2025-09-01", file: "#" },
  { id: "g7", title: "資訊公開申請表單", category: "資訊公開", publishedAt: "2024-12-01", file: "#" },
  { id: "g8", title: "2026 上半年新聞稿合輯", category: "新聞稿", publishedAt: "2026-05-20", file: "#" },
];

export default function GovernancePage() {
  const grouped = DOCS.reduce<Record<string, typeof DOCS>>((acc, d) => {
    acc[d.category] = [...(acc[d.category] ?? []), d];
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
      <nav className="text-xs text-text-muted mb-4">
        <Link href="/about" className="hover:text-accent">關於客台</Link> / 公開資訊
      </nav>
      <Badge variant="default">PUBLIC RECORDS</Badge>
      <h1 className="mt-3 font-display text-3xl lg:text-5xl font-extrabold text-text-primary">公開資訊</h1>
      <p className="mt-3 text-text-secondary text-base">
        依政府資訊公開法第 7 條，本台主動公開所有重要決策與營運文件。
      </p>

      <div className="mt-10 space-y-8">
        {Object.entries(grouped).map(([cat, docs]) => (
          <section key={cat}>
            <h2 className="font-display text-xl font-bold text-text-primary mb-3">{cat}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {docs.map((d) => (
                <Card key={d.id} className="hover:border-accent transition-colors">
                  <CardContent className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-accent-soft text-accent inline-flex items-center justify-center shrink-0">
                      <FileText className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-text-primary line-clamp-1">{d.title}</div>
                      <div className="text-xs text-text-muted">發佈於 {d.publishedAt}</div>
                    </div>
                    <a href={d.file} className="inline-flex items-center gap-1 text-xs text-accent hover:underline">
                      下載 <Download className="size-3" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
