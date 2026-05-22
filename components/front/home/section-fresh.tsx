"use client";

import { useContent } from "@/lib/store/content";
import { CardVideo } from "@/components/ui/card-video";
import { SectionShell } from "./section-shell";

export function SectionFresh() {
  const videos = useContent((s) => s.videos);
  // Newest 8 videos (sorted by publishedAt desc)
  const fresh = [...videos]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 8);

  return (
    <SectionShell
      eyebrow="FRESH CONTENTS"
      title="本週上新"
      href="/watch"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5">
        {fresh.map((v) => (
          <CardVideo key={v.id} video={v} variant="portrait" />
        ))}
      </div>
    </SectionShell>
  );
}
