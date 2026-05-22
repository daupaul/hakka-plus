"use client";

import Link from "next/link";
import { useContent } from "@/lib/store/content";
import { CardVideo } from "@/components/ui/card-video";

export default function HistoryPage() {
  const videos = useContent((s) => s.videos);
  // Mock: show most recent 12 as "history"
  const history = [...videos].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 12);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
      <nav className="text-xs text-text-muted mb-4">
        <Link href="/account" className="hover:text-accent">會員中心</Link> / 觀看紀錄
      </nav>
      <h1 className="font-display text-3xl lg:text-5xl font-extrabold text-text-primary">觀看紀錄</h1>
      <p className="mt-3 text-text-secondary">最近觀看過的影視內容。</p>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
        {history.map((v) => <CardVideo key={v.id} video={v} />)}
      </div>
    </div>
  );
}
