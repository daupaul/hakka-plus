"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useUi } from "@/lib/store/ui";

interface Props {
  title: string;
  backHref: string;
  backLabel?: string;
  onSave: () => boolean | void | Promise<boolean | void>;
  onDelete?: () => void;
  saveLabel?: string;
  isNew?: boolean;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export function EntityForm({ title, backHref, backLabel = "回列表", onSave, onDelete, saveLabel = "儲存", isNew, children, sidebar }: Props) {
  const router = useRouter();
  const toast = useUi((s) => s.toast);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const ok = await onSave();
      if (ok !== false) {
        toast({ variant: "success", title: isNew ? "已建立" : "已儲存", description: title });
        router.push(backHref);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-6xl">
      <div className="flex items-center gap-3 flex-wrap">
        <Link href={backHref} className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent">
          <ArrowLeft className="size-4" /> {backLabel}
        </Link>
        <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-text-primary flex-1">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          {onDelete && !isNew && (
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => {
                if (confirm("確定刪除？此操作無法復原。")) {
                  onDelete();
                  toast({ variant: "warning", title: "已刪除" });
                  router.push(backHref);
                }
              }}
            >
              <Trash2 className="size-4" /> 刪除
            </Button>
          )}
          <Button type="submit" disabled={saving}>
            <Save className="size-4" /> {saving ? "儲存中…" : saveLabel}
          </Button>
        </div>
      </div>

      <div className={sidebar ? "grid lg:grid-cols-3 gap-6" : ""}>
        <div className={sidebar ? "lg:col-span-2 space-y-6" : "space-y-6"}>{children}</div>
        {sidebar && <aside className="lg:col-span-1 space-y-4">{sidebar}</aside>}
      </div>
    </form>
  );
}

export function FormSection({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="space-y-4">
        <div>
          <h2 className="font-display text-lg font-bold text-text-primary">{title}</h2>
          {description && <p className="text-xs text-text-muted mt-0.5">{description}</p>}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

export function FormField({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-text-secondary flex items-center gap-1">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint && <div className="mt-1 text-xs text-text-muted">{hint}</div>}
    </div>
  );
}
