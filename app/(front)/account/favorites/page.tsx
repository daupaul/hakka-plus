"use client";

import Link from "next/link";
import { useContent } from "@/lib/store/content";
import { CardVideo } from "@/components/ui/card-video";

export default function FavoritesPage() {
  const videos = useContent((s) => s.videos);
  const favs = videos.filter((v) => v.featured).slice(0, 8);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
      <nav className="text-xs text-text-muted mb-4">
        <Link href="/account" className="hover:text-accent">會員中心</Link> / 我的收藏
      </nav>
      <h1 className="font-display text-3xl lg:text-5xl font-extrabold text-text-primary">我的收藏</h1>
      <p className="mt-3 text-text-secondary">你收藏的影視內容。</p>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
        {favs.map((v) => <CardVideo key={v.id} video={v} />)}
      </div>
    </div>
  );
}
