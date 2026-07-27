"use client";

import { Quote } from "lucide-react";
import { testimonials, type Testimonial } from "@/data/testimonials";
import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="min-w-[320px] sm:min-w-[380px] max-w-[380px] border border-border rounded-2xl bg-bg p-7 flex flex-col gap-5 shadow-sm">
      <Quote size={28} className="text-accent-purple shrink-0" aria-hidden />

      <blockquote className="text-fg-muted text-[15px] leading-relaxed flex-1">
        {item.quote}
      </blockquote>

      <figcaption className="flex items-center gap-3 pt-4 border-t border-border">
        <span
          className="w-10 h-10 rounded-full bg-accent-purple/10 text-accent-purple flex items-center justify-center text-xs font-bold shrink-0"
          aria-hidden
        >
          {initials(item.name)}
        </span>
        <span className="min-w-0">
          <span className="block font-semibold text-fg text-sm truncate">
            {item.name}
          </span>
          <span className="block text-fg-muted text-xs truncate">
            {item.role}, {item.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Auto-scrolling testimonial carousel.
 *
 * Renders nothing while `testimonials` is empty (see data/testimonials.ts) so
 * the page never shows an empty shell. With fewer than three quotes the strip
 * is repeated enough times to fill the loop seamlessly.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  // Ensure the row is at least twice the viewport width before duplicating.
  const repeats = Math.max(2, Math.ceil(6 / testimonials.length));
  const strip = Array.from({ length: repeats }, () => testimonials).flat();

  return (
    <section className="py-24 bg-bg-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <SectionHeader
          label="Client Love"
          title="Kind words from clients"
          subtitle="What the teams we have worked with say about the process."
          align="center"
        />
      </div>

      <div className="relative edge-fade">
        <div
          className={cn(
            "flex w-max gap-6 px-6",
            "animate-marquee-slow hover:[animation-play-state:paused]",
          )}
        >
          {strip.map((item, i) => (
            <TestimonialCard key={`${item.id}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
