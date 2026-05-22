"use client";

import { useContent } from "@/lib/store/content";
import { useUi } from "@/lib/store/ui";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

export default function NewsReviewPage() {
  const news = useContent((s) => s.news);
  const updateNews = useContent((s) => s.updateNews);
  const publishNews = useContent((s) => s.publishNews);
  const toast = useUi((s) => s.toast);

  const drafts = news.filter((n) => n.status === "draft");
  const reviewing = news.filter((n) => n.status === "review");
  const published = news.filter((n) => n.status === "published").slice(0, 8);

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">新聞審核工作流</h1>
        <p className="mt-1 text-sm text-text-secondary">編輯送審 → 主編核可 → 發布。對應企劃書 §2.1 內容審核流程。</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <ReviewColumn title="待送審" count={drafts.length} icon={<Clock className="size-4 text-text-muted" />}>
          {drafts.slice(0, 6).map((n) => (
            <ReviewCard key={n.id} title={n.title} category={n.category} author={n.author} cover={n.image}>
              <Button size="sm" variant="secondary" className="w-full" onClick={() => { updateNews(n.id, { status: "review" }); toast({ variant: "default", title: "已送審" }); }}>送主編審核</Button>
            </ReviewCard>
          ))}
        </ReviewColumn>
        <ReviewColumn title="審核中" count={reviewing.length} icon={<Clock className="size-4 text-warning" />}>
          {reviewing.length === 0 ? <div className="text-xs text-text-muted text-center py-8">沒有待審稿件</div> : reviewing.map((n) => (
            <ReviewCard key={n.id} title={n.title} category={n.category} author={n.author} cover={n.image}>
              <div className="flex gap-2">
                <Button size="sm" variant="primary" className="flex-1" onClick={() => { publishNews(n.id); toast({ variant: "success", title: "已核可發布" }); }}><CheckCircle2 className="size-3.5" /> 核可</Button>
                <Button size="sm" variant="ghost" className="flex-1" onClick={() => { updateNews(n.id, { status: "draft" }); toast({ variant: "warning", title: "已退回" }); }}><XCircle className="size-3.5" /> 退回</Button>
              </div>
            </ReviewCard>
          ))}
        </ReviewColumn>
        <ReviewColumn title="已發布" count={published.length} icon={<CheckCircle2 className="size-4 text-success" />}>
          {published.map((n) => (
            <ReviewCard key={n.id} title={n.title} category={n.category} author={n.author} cover={n.image}>
              <Badge variant="success">已發布</Badge>
            </ReviewCard>
          ))}
        </ReviewColumn>
      </div>
    </div>
  );
}

function ReviewColumn({ title, count, icon, children }: { title: string; count: number; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        {icon}
        <h2 className="font-display font-bold text-text-primary">{title}</h2>
        <Badge variant="muted">{count}</Badge>
      </div>
      {children}
    </div>
  );
}

function ReviewCard({ title, category, author, cover, children }: { title: string; category: string; author?: string; cover: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="relative w-16 aspect-[4/3] shrink-0 overflow-hidden rounded-md bg-bg-deep">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover} alt={title} className="size-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <Badge variant="outline">{category}</Badge>
            <h3 className="mt-1.5 font-semibold text-text-primary text-sm line-clamp-2">{title}</h3>
            <div className="mt-1 text-xs text-text-muted">{author ?? "編輯室"}</div>
          </div>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
