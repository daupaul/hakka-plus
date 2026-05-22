import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow: string;
  title: string;
  href?: string;
  ctaLabel?: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionShell({ eyebrow, title, href, ctaLabel = "查看全部", className, children }: Props) {
  return (
    <section className={cn("py-12 lg:py-16", className)}>
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-12">
        <div className="flex items-end justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <div className="section-title text-[11px] lg:text-xs">{eyebrow}</div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-text-primary">
              {title}
            </h2>
          </div>
          {href && (
            <Link
              href={href}
              className="hidden md:inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent transition-colors"
            >
              {ctaLabel} <ArrowUpRight className="size-4" />
            </Link>
          )}
        </div>
        {children}
        {href && (
          <Link
            href={href}
            className="mt-6 md:hidden inline-flex items-center gap-1 text-sm text-accent"
          >
            {ctaLabel} <ArrowUpRight className="size-4" />
          </Link>
        )}
      </div>
    </section>
  );
}
