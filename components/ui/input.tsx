import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      "flex h-10 w-full rounded-lg border border-border bg-bg-elevated px-3 py-2 text-sm text-text-primary",
      "placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
      "disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-lg border border-border bg-bg-elevated px-3 py-2 text-sm text-text-primary",
        "placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
        "disabled:opacity-50 transition-colors resize-y",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
