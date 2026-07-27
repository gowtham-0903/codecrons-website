"use client";

import { cn } from "@/lib/utils";
import DecorScene from "@/components/3d/DecorScene";

interface SplineEmbedProps {
  /**
   * Public Spline scene URL (the "my.spline.design/…" link from the
   * Share → Embed dialog). Leave undefined to render the in-house R3F
   * decorative scene instead.
   */
  url?: string;
  title?: string;
  className?: string;
}

/**
 * Spline wrapper.
 *
 * Uses Spline's iframe embed rather than @splinetool/react-spline — it costs
 * nothing in bundle size and works without an extra dependency. When no URL
 * is configured it falls back to <DecorScene />, so both Services and Contact
 * render a finished 3D accent today and can be swapped to a real Spline scene
 * by passing `url` once one is published.
 */
export default function SplineEmbed({
  url,
  title = "Decorative 3D scene",
  className,
}: SplineEmbedProps) {
  if (!url) {
    return (
      <div className={cn("relative w-full h-full scene-glow", className)}>
        <DecorScene />
      </div>
    );
  }

  return (
    <iframe
      src={url}
      title={title}
      loading="lazy"
      className={cn("w-full h-full border-0 rounded-2xl", className)}
      allow="autoplay; fullscreen; xr-spatial-tracking"
    />
  );
}
