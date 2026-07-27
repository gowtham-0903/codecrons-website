"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Client-side loaders for every WebGL scene.
 *
 * `ssr: false` is only legal inside a Client Component, so all dynamic
 * imports live here rather than in the (server) page files. Each scene also
 * waits until it is near the viewport before mounting its canvas, and is
 * skipped entirely for users who prefer reduced motion.
 */

const scenes = {
  hero: dynamic(() => import("@/components/3d/HeroScene"), { ssr: false }),
  device: dynamic(() => import("@/components/3d/DeviceMockup"), { ssr: false }),
  globe: dynamic(() => import("@/components/3d/GlobeScene"), { ssr: false }),
  particles: dynamic(() => import("@/components/3d/ParticleField"), { ssr: false }),
  decor: dynamic(() => import("@/components/3d/DecorScene"), { ssr: false }),
} as const;

export type SceneName = keyof typeof scenes;

interface LazySceneProps {
  scene: SceneName;
  className?: string;
  /** How early to mount, as a root margin. */
  rootMargin?: string;
}

export default function LazyScene({
  scene,
  className,
  rootMargin = "200px",
}: LazySceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [allowed, setAllowed] = useState(true);

  // Users who ask for reduced motion get no animated WebGL at all.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setAllowed(!query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || !allowed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [allowed, rootMargin]);

  const Scene = scenes[scene];

  return (
    <div ref={containerRef} className={cn("relative w-full h-full", className)}>
      {allowed && visible && <Scene />}
    </div>
  );
}
