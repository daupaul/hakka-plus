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
            "toast-card pointer-events-auto p-4 min-w-[280px] max-w-sm shadow-xl backdrop-blur-md rounded-xl border",
            t.variant === "success" && "toast-card--success",
            t.variant === "warning" && "toast-card--warning",
            t.variant === "danger" && "toast-card--danger",
          )}
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="toast-card-title font-semibold text-sm">{t.title}</div>
              {t.description ? (
                <div className="toast-card-desc mt-1 text-xs">{t.description}</div>
              ) : null}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              className="toast-card-close transition-colors"
              aria-label="關閉通知"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
