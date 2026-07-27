import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Codecrons logo.
 *
 * Assets in /public are generated from the master artwork:
 *   logo.png       — full lockup, dark wordmark (light backgrounds)
 *   logo-light.png — full lockup, white wordmark (dark backgrounds)
 *   logo-mark.png  — the mark on its own, square
 *
 * All three are trimmed and alpha-cut from the original 6250×6250 export, so
 * the mark's gradient is preserved and the background is transparent.
 */

// Intrinsic ratio of the lockup files (900 × 154)
const LOCKUP_W = 900;
const LOCKUP_H = 154;

interface LogoProps {
  className?: string;
  /** Use the white-wordmark variant, for dark backgrounds. */
  invert?: boolean;
  /** Rendered width in px. Height follows the lockup ratio. */
  width?: number;
  /** Render just the mark, without the wordmark. */
  markOnly?: boolean;
  /** Set on the logo in the header so it is not lazy-loaded. */
  priority?: boolean;
}

export default function Logo({
  className,
  invert = false,
  width = 150,
  markOnly = false,
  priority = false,
}: LogoProps) {
  if (markOnly) {
    return (
      <Image
        src="/logo-mark.png"
        alt="Codecrons"
        width={width}
        height={width}
        priority={priority}
        className={cn("h-auto w-auto", className)}
        style={{ width, height: width }}
      />
    );
  }

  return (
    <Image
      src={invert ? "/logo-light.png" : "/logo.png"}
      alt="Codecrons"
      width={LOCKUP_W}
      height={LOCKUP_H}
      priority={priority}
      sizes={`${width}px`}
      className={cn("w-auto", className)}
      style={{ width, height: (width * LOCKUP_H) / LOCKUP_W }}
    />
  );
}
