"use client";

import { cn } from "@/lib/utils";

const ITEMS = [
  "Custom Software",
  "SaaS Development",
  "AI Integration",
  "Workflow Automation",
  "Web Applications",
  "Mobile Apps",
  "UI/UX Design",
  "Tech Consulting",
  "API Development",
  "Cloud Infrastructure",
];

interface MarqueeProps {
  className?: string;
}

/**
 * Infinite ticker. The item list is rendered twice inside a flex row and the
 * row translates -50%, so the second copy lands exactly where the first began
 * — no visible seam. Hovering pauses it; reduced-motion users get it static.
 */
export default function Marquee({ className }: MarqueeProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden w-full py-5 border-y border-border bg-bg-subtle edge-fade",
        className,
      )}
    >
      <div className="flex w-max gap-16 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className={cn(
              "flex items-center gap-4 text-sm font-bold tracking-wide uppercase",
              i % 2 === 0 ? "text-accent-orange" : "text-accent-purple",
            )}
          >
            <span aria-hidden>✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
