"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MoreVertical, Plus, Trash2, Edit, Copy, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  className?: string;
  cell: (row: T) => React.ReactNode;
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
}

export interface DataTableAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  variant?: "default" | "danger";
}

interface Props<T extends { id: string }> {
  title: string;
  description?: string;
  data: T[];
  columns: Column<T>[];
  searchKeys?: (keyof T)[];
  searchPlaceholder?: string;
  filters?: { key: string; label: string; values: { value: string; label: string }[]; filter: (row: T, v: string) => boolean }[];
  newHref?: string;
  newLabel?: string;
  actions?: DataTableAction<T>[];
  emptyMessage?: string;
  pageSize?: number;
}

export function DataTable<T extends { id: string }>({
  title,
  description,
  data,
  columns,
  searchKeys = [],
  searchPlaceholder = "搜尋…",
  filters = [],
  newHref,
  newLabel = "新增",
  actions = [],
  emptyMessage = "沒有資料",
  pageSize = 10,
}: Props<T>) {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = data.slice();
    if (query && searchKeys.length > 0) {
      const q = query.toLowerCase();
      list = list.filter((row) =>
        searchKeys.some((k) => String((row as Record<string, unknown>)[k as string] ?? "").toLowerCase().includes(q)),
      );
    }
    filters.forEach((f) => {
      const v = activeFilters[f.key];
      if (v && v !== "all") list = list.filter((row) => f.filter(row, v));
    });
    if (sortKey) {
      const col = columns.find((c) => c.key === sortKey);
      if (col?.sortValue) {
        list = list.slice().sort((a, b) => {
          const av = col.sortValue!(a);
          const bv = col.sortValue!(b);
          if (av < bv) return sortDir === "asc" ? -1 : 1;
          if (av > bv) return sortDir === "asc" ? 1 : -1;
          return 0;
        });
      }
    }
    return list;
  }, [data, query, searchKeys, filters, activeFilters, sortKey, sortDir, columns]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice(page * pageSize, (page + 1) * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary">{title}</h1>
          {description && <p className="mt-1 text-sm text-text-secondary">{description}</p>}
        </div>
        {newHref && (
          <Button asChild>
            <Link href={newHref}><Plus className="size-4" /> {newLabel}</Link>
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {searchKeys.length > 0 && (
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(0); }}
              className="pl-9"
            />
          </div>
        )}
        {filters.map((f) => (
          <select
            key={f.key}
            value={activeFilters[f.key] ?? "all"}
            onChange={(e) => { setActiveFilters((af) => ({ ...af, [f.key]: e.target.value })); setPage(0); }}
            className="h-10 rounded-lg border border-border bg-bg-elevated px-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">{f.label}：全部</option>
            {f.values.map((v) => <option key={v.value} value={v.value}>{v.label}</option>)}
          </select>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-bg-elevated border-b border-border">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className={cn("text-left p-3 text-xs uppercase tracking-wider text-text-muted font-semibold", col.className)}>
                    {col.sortable ? (
                      <button onClick={() => handleSort(col.key)} className="inline-flex items-center gap-1 hover:text-text-primary">
                        {col.header} <ArrowUpDown className="size-3" />
                      </button>
                    ) : col.header}
                  </th>
                ))}
                {actions.length > 0 && <th className="p-3 w-12" />}
              </tr>
            </thead>
            <tbody>
              {pageData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)} className="p-10 text-center text-text-muted">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                pageData.map((row) => (
                  <tr key={row.id} className="border-b border-border last:border-b-0 hover:bg-bg-elevated/50">
                    {columns.map((col) => (
                      <td key={col.key} className={cn("p-3", col.className)}>
                        {col.cell(row)}
                      </td>
                    ))}
                    {actions.length > 0 && (
                      <td className="p-3 text-right relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === row.id ? null : row.id)}
                          aria-label="操作"
                          className="size-8 rounded-full hover:bg-bg-elevated text-text-secondary inline-flex items-center justify-center"
                        >
                          <MoreVertical className="size-4" />
                        </button>
                        {openMenu === row.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
                            <div className="absolute right-3 top-full mt-1 z-20 card bg-bg-elevated min-w-[160px] py-1 shadow-xl">
                              {actions.map((a, i) => (
                                <button
                                  key={i}
                                  onClick={() => { a.onClick(row); setOpenMenu(null); }}
                                  className={cn(
                                    "w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-bg-base",
                                    a.variant === "danger" ? "text-danger" : "text-text-primary",
                                  )}
                                >
                                  {a.icon}
                                  {a.label}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-border px-4 py-3 flex items-center justify-between text-xs text-text-muted">
          <div>
            共 <span className="text-text-primary font-semibold">{filtered.length}</span> 筆
            （顯示 {filtered.length === 0 ? 0 : page * pageSize + 1}-{Math.min((page + 1) * pageSize, filtered.length)}）
          </div>
          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" disabled={page === 0} onClick={() => setPage(page - 1)}>上一頁</Button>
            <span className="px-2">{page + 1} / {pageCount}</span>
            <Button size="sm" variant="ghost" disabled={page >= pageCount - 1} onClick={() => setPage(page + 1)}>下一頁</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Re-export common icons for table actions
export { Edit, Copy, Trash2 };

export function statusBadge(status: string) {
  const map: Record<string, { variant: "default" | "muted" | "outline" | "warm" | "success" | "warning" | "danger"; label: string }> = {
    draft: { variant: "muted", label: "草稿" },
    review: { variant: "warning", label: "審核中" },
    published: { variant: "success", label: "已發布" },
    archived: { variant: "outline", label: "已下架" },
  };
  const conf = map[status] ?? { variant: "outline" as const, label: status };
  return <Badge variant={conf.variant}>{conf.label}</Badge>;
}
