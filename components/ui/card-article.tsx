import Link from "next/link";
import { Clock } from "lucide-react";
import type { NewsItem } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { relativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Props {
  item: NewsItem;
  variant?: "default" | "wide" | "compact";
  className?: string;
}

export function CardArticle({ item, variant = "default", className }: Props) {
  const isWide = variant === "wide";

  return (
    <Link
      href={`/news/${item.slug}`}
      className={cn(
        "group block card overflow-hidden transition-all duration-300 hover:border-accent",
        isWide && "lg:grid lg:grid-cols-2",
        className,
      )}
    >
      <div className={cn("relative w-full overflow-hidden bg-bg-deep", isWide ? "aspect-video lg:aspect-[4/3]" : "aspect-[16/10]")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          <Badge variant={item.featured ? "warm" : "outline"}>{item.category}</Badge>
          {item.source === "inews" && <Badge variant="muted">iNews</Badge>}
        </div>
      </div>

      <div className={cn("p-4 lg:p-5", variant === "compact" && "p-3 lg:p-4")}>
        <h3
          className={cn(
            "font-display font-bold text-text-primary line-clamp-2 group-hover:text-accent transition-colors",
            isWide ? "text-xl lg:text-2xl" : variant === "compact" ? "text-sm lg:text-base" : "text-base lg:text-lg",
          )}
        >
          {item.title}
        </h3>
        {item.subtitle && variant !== "compact" && (
          <p className="mt-1.5 text-sm text-text-secondary line-clamp-2">{item.subtitle}</p>
        )}
        {isWide && (
          <p className="mt-3 text-sm text-text-secondary line-clamp-3">{item.excerpt}</p>
        )}
        <div className="mt-3 flex items-center gap-2 text-[11px] text-text-muted">
          <Clock className="size-3" />
          {relativeTime(item.publishedAt)}
          {item.author && (
            <>
              <span>·</span>
              <span>{item.author}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
