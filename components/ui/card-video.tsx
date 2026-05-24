import Link from "next/link";
import { Play, Clock } from "lucide-react";
import type { Video } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  video: Video;
  variant?: "portrait" | "landscape" | "compact";
  className?: string;
}

export function CardVideo({ video, variant = "portrait", className }: Props) {
  const isPortrait = variant === "portrait";
  const isLandscape = variant === "landscape";
  const cover = isLandscape ? video.hero : video.poster;

  return (
    <Link
      href={`/watch/${video.slug}`}
      className={cn(
        "group block relative card overflow-hidden transition-all duration-300 hover:border-accent",
        "hover:shadow-[0_0_32px_-12px_rgba(0,255,148,0.45)]",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-bg-deep",
          isPortrait && "aspect-[3/4]",
          isLandscape && "aspect-video",
          variant === "compact" && "aspect-[4/5]",
        )}
      >
        {/* Using <img> instead of next/image so we don't depend on the sharp/optimizer pipeline */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cover}
          alt={video.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/95 via-bg-deep/15 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          {video.featured && <Badge variant="default">精選</Badge>}
          {video.paywall === "subscriber" && <Badge variant="warm">會員</Badge>}
          {video.paywall === "paid" && <Badge variant="warning">付費</Badge>}
        </div>

        {/* Play icon (centered, fade in on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="size-14 rounded-full bg-accent text-text-inverse flex items-center justify-center">
            <Play className="size-5 ml-0.5" fill="currentColor" />
          </div>
        </div>

        {/* Duration chip */}
        <div className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-bg-deep/85 backdrop-blur-sm px-2 py-0.5 text-[11px] font-mono text-text-primary">
          <Clock className="size-3" />
          {video.duration}
        </div>
      </div>

      <div className="p-3 lg:p-4">
        <div className="flex items-center gap-1.5 text-[11px] text-text-muted mb-1.5">
          <span>{video.category}</span>
          <span>·</span>
          <span>{video.year}</span>
        </div>
        <h3 className="font-display font-bold text-sm lg:text-base text-text-primary line-clamp-2 group-hover:text-accent transition-colors">
          {video.title}
        </h3>
        {video.titleEn && (
          <p className="mt-1 text-[11px] text-text-muted line-clamp-1 uppercase tracking-wider">
            {video.titleEn}
          </p>
        )}
      </div>
      {/* Green corner brackets on hover — cinematic focus effect */}
      <span className="pointer-events-none absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-accent rounded-tl opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="pointer-events-none absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-accent rounded-tr opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="pointer-events-none absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-accent rounded-bl opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="pointer-events-none absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-accent rounded-br opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
