"use client";

import { useContent } from "@/lib/store/content";
import { CardVideo } from "@/components/ui/card-video";
import { SectionShell } from "./section-shell";

export function SectionStories() {
  const videos = useContent((s) => s.videos);
  const stories = videos.filter((v) => v.category === "戲劇" || v.category === "紀錄片").slice(0, 6);

  return (
    <SectionShell
      eyebrow="STORIES WORTH STAYING FOR"
      title="值得你留下來的故事"
      href="/watch"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
        {stories.map((v) => (
          <CardVideo key={v.id} video={v} variant="portrait" />
        ))}
      </div>
    </SectionShell>
  );
}
