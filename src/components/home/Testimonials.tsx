"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import SectionHeader from "@/components/ui/SectionHeader";

// TODO: Implement auto-scrolling testimonials carousel
// Layout: horizontal scrolling row of cards, auto-plays like a marquee
// Each card:
//   - Large opening quote mark in accent-purple
//   - Quote text in text-fg-muted italic
//   - Author name (bold) + role + company below
//   - Avatar image (optional, use initials fallback if no image)
//   - Card: white bg, border-border, rounded-2xl, shadow-sm
// Auto-scroll: similar to Marquee but horizontal, pause on hover
// Duplicate cards array for seamless loop
// Width: each card is min-w-[360px], row overflows and animates
export default function Testimonials() {
  const repeated = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-bg-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <SectionHeader
          label="Client Love"
          title="Kind Words from Clients"
          align="center"
        />
      </div>

      {/* TODO: implement auto-scroll carousel */}
      <div className="flex gap-6 px-6 overflow-x-auto pb-4">
        {repeated.map((t, i) => (
          <div
            key={i}
            className="min-w-[340px] border border-border rounded-2xl bg-bg p-6 flex flex-col gap-4"
          >
            <span className="text-5xl text-accent-purple font-serif leading-none">"</span>
            <p className="text-fg-muted italic text-sm leading-relaxed">{t.quote}</p>
            <div className="mt-auto">
              <p className="font-semibold text-fg text-sm">{t.name}</p>
              <p className="text-fg-muted text-xs">{t.role}, {t.company}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
