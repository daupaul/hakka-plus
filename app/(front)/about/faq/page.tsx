"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import faqsSeed from "@/lib/mock/faqs.json";
import type { FaqItem } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = faqsSeed as FaqItem[];
const CATEGORIES = ["全部", ...Array.from(new Set(FAQS.map((f) => f.category)))];

export default function FaqPage() {
  const [category, setCategory] = useState("全部");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = FAQS.filter((f) => {
    if (category !== "全部" && f.category !== category) return false;
    if (query) {
      const q = query.toLowerCase();
      return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
      <nav className="text-xs text-text-muted mb-4">
        <Link href="/about" className="hover:text-accent">關於客台</Link> / 常見問題
      </nav>
      <Badge variant="default">FAQ</Badge>
      <h1 className="mt-3 font-display text-3xl lg:text-5xl font-extrabold text-text-primary">常見問題</h1>

      <div className="mt-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
        <Input className="pl-9" placeholder="搜尋問題..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`h-8 px-3 rounded-full text-xs font-semibold border transition-colors ${
              category === c ? "bg-accent text-text-inverse border-accent" : "border-border text-text-secondary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-2">
        {filtered.map((f) => {
          const open = openId === f.id;
          return (
            <div key={f.id} className="card overflow-hidden">
              <button
                onClick={() => setOpenId(open ? null : f.id)}
                className="w-full text-left p-4 lg:p-5 flex items-center gap-4 hover:bg-bg-elevated transition-colors"
              >
                <Badge variant="outline">{f.category}</Badge>
                <span className="flex-1 font-semibold text-text-primary">{f.question}</span>
                <ChevronDown className={cn("size-4 text-text-muted transition-transform", open && "rotate-180")} />
              </button>
              {open && (
                <div className="px-4 lg:px-5 pb-5 border-t border-border pt-4 text-sm text-text-secondary leading-relaxed">
                  {f.answer}
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && <div className="text-center py-12 text-text-muted">沒有符合的問題</div>}
      </div>
    </div>
  );
}
