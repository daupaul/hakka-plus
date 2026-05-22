"use client";

import { useSeniorMode } from "@/lib/store/senior-mode";
import { useUi } from "@/lib/store/ui";
import { Type, ZapOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function SeniorToggle({ className }: { className?: string }) {
  const enabled = useSeniorMode((s) => s.enabled);
  const toggle = useSeniorMode((s) => s.toggle);
  const toast = useUi((s) => s.toast);

  return (
    <button
      type="button"
      onClick={() => {
        toggle();
        toast({
          variant: "success",
          title: enabled ? "已切回標準模式" : "已切換為長輩友善模式",
          description: enabled
            ? "回到完整介面與動態效果"
            : "字級放大、提高對比、節目表與新聞置頂",
        });
      }}
      aria-pressed={enabled}
      title={enabled ? "切換回標準模式" : "切換到長輩友善模式"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 h-9 border text-xs font-semibold transition-all",
        enabled
          ? "border-accent bg-accent text-text-inverse"
          : "border-border text-text-secondary hover:border-accent hover:text-accent",
        className,
      )}
    >
      {enabled ? <Type className="size-3.5" /> : <ZapOff className="size-3.5" />}
      <span>{enabled ? "長輩友善模式" : "長輩友善"}</span>
    </button>
  );
}
