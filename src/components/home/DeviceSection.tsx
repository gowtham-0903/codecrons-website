"use client";

import { motion } from "motion/react-client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";

const DeviceMockup = dynamic(() => import("@/components/3d/DeviceMockup"), { ssr: false });

// TODO: Implement Device Section (mid-page 3D feature section)
// Layout: 2 columns on desktop — left: text content, right: 3D device mockup
// Left:
//   - Small label: "Our Work"
//   - Headline: bold, PT Serif
//   - Body paragraph about project quality / approach
//   - "View Portfolio →" link → /portfolio
// Right:
//   - DeviceMockup 3D scene (lazy-loaded, hidden on mobile)
//   - The mockup should show a stylised dashboard or app screenshot
// Background: bg-fg (black) for full contrast section
// Text: white (text-bg)
export default function DeviceSection() {
  return (
    <section className="py-24 bg-fg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-accent-mint">Our Work</span>
          <h2 className="font-serif font-bold text-4xl lg:text-5xl text-bg leading-tight">
            {/* TODO: Add real headline */}
            Products That Make an Impact
          </h2>
          <p className="text-bg/70 text-lg leading-relaxed">
            {/* TODO: Add real description */}
            We don't just write code — we craft experiences. Every project we
            take on is built to be fast, scalable, and beautiful.
          </p>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-accent-mint font-semibold hover:gap-3 transition-all"
          >
            View Portfolio <ArrowUpRight size={16} />
          </Link>
        </motion.div>

        {/* 3D Device */}
        <div className="hidden lg:block relative h-[480px]">
          {/* TODO: DeviceMockup renders here */}
          <DeviceMockup />
        </div>
      </div>
    </section>
  );
}
