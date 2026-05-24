import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** When true, use the dark-ink variant suitable for light backgrounds. */
  invert?: boolean;
}

const SIZES = {
  sm: { width: 96, height: 30 },
  md: { width: 128, height: 40 },
  lg: { width: 160, height: 50 },
};

/**
 * HakkaTV brand mark — extracted from the official design.
 * Renders the actual logo image (white tung-flower icon + HakkaTV wordmark).
 */
export function HakkaLogo({ className, size = "md", invert = false }: Props) {
  const s = SIZES[size];
  const src = invert ? "/logo-hakkatv-dark.png" : "/logo-hakkatv.png";
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={src}
        alt="HakkaTV"
        width={s.width}
        height={s.height}
        priority
        className="object-contain"
      />
    </span>
  );
}
