"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { techStack } from "@/data/techStack";
import SectionHeader from "@/components/ui/SectionHeader";

// TODO: Implement Tech Stack section
// Layout: icon grid — 4–6 columns on desktop, 3 on tablet, 2 on mobile
// Each item:
//   - Icon image (from /public/tech/) — use next/image
//   - Name label below icon
//   - Hover: slight scale + accent-purple text
// Animate: fade-up stagger on each icon
// Background: bg-bg (white)
export default function TechStack() {
  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        <SectionHeader
          label="Our Stack"
          title="Tools We Trust"
          subtitle="The technologies and tools we use to build world-class products."
          align="center"
        />

        {/* TODO: implement icon grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {techStack.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex flex-col items-center gap-2 group cursor-default"
            >
              {/* TODO: replace with actual tech icons in /public/tech/ */}
              <div className="w-12 h-12 rounded-xl border border-border bg-bg-subtle flex items-center justify-center group-hover:border-accent-purple transition-colors">
                <span className="text-xs text-fg-muted font-bold">{item.name.slice(0, 2)}</span>
              </div>
              <span className="text-xs text-fg-muted group-hover:text-accent-purple transition-colors font-medium text-center">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
