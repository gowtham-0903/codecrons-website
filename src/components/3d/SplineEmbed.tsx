"use client";

import { cn } from "@/lib/utils";

interface SplineEmbedProps {
  url: string;        // Spline scene URL from spline.design
  className?: string;
}

// TODO: Implement Spline embed wrapper
// Install: npm install @splinetool/react-spline
// Then replace the placeholder div below with:
//
//   import Spline from "@splinetool/react-spline";
//   <Spline scene={url} className={cn("w-full h-full", className)} />
//
// Spline scenes used in this project:
//   - Services page: TODO — add Spline scene URL
//   - Contact page: TODO — add Spline scene URL
//
// Note: Spline scenes are heavy. Lazy-load this component with:
//   dynamic(() => import("@/components/3d/SplineEmbed"), { ssr: false })

export default function SplineEmbed({ url, className }: SplineEmbedProps) {
  return (
    <div className={cn("w-full h-full flex items-center justify-center bg-bg-subtle rounded-2xl border border-border", className)}>
      {/* TODO: replace with <Spline scene={url} /> once package is installed */}
      <p className="text-fg-muted text-sm">Spline scene: {url}</p>
    </div>
  );
}
