"use client";

import { useUi } from "@/lib/store/ui";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export function ToastViewport() {
  const toasts = useUi((s) => s.toasts);
  const dismiss = useUi((s) => s.dismissToast);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "pointer-events-auto card p-4 min-w-[280px] max-w-sm shadow-xl backdrop-blur-md",
            "border bg-bg-elevated/95",
            t.variant === "success" && "border-accent",
            t.variant === "warning" && "border-warning",
            t.variant === "danger" && "border-danger",
          )}
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="font-semibold text-sm text-text-primary">{t.title}</div>
              {t.description ? (
                <div className="mt-1 text-xs text-text-secondary">{t.description}</div>
              ) : null}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
