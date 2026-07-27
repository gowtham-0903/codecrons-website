"use client";

import { motion } from "motion/react-client";
import dynamic from "next/dynamic";

// Lazy-load 3D to avoid SSR issues
const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), { ssr: false });

const BOOK_CALL_URL = "https://calendly.com/codecrons";

// TODO: Implement Hero section
// Layout: 2 columns on desktop (left: text, right: 3D scene), stacked on mobile
// Left side:
//   - Small label badge e.g. "Full-Stack Product Studio"
//   - Large h1: main headline (PT Serif, bold, ~72px)
//   - Sub-tagline paragraph (text-fg-muted)
//   - Two CTA buttons:
//       1. "View Our Work" → /portfolio (outline variant)
//       2. "Book a Call" → BOOK_CALL_URL, opens new tab (primary/orange variant)
// Right side:
//   - HeroScene (3D floating geometry), hidden on mobile
// Animations: Framer Motion fade-up stagger on headline + buttons
// Background: white (#FFFFFF), full viewport height (min-h-screen)
// Padding top: pt-24 to clear the fixed navbar
export default function Hero() {
  // TODO: implement
  return (
    <section className="relative min-h-screen flex items-center pt-24 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          {/* TODO: Add label badge */}
          <h1 className="font-serif font-bold text-5xl lg:text-7xl text-fg leading-tight">
            {/* TODO: Add real headline */}
            We Build Software That{" "}
            <span className="text-accent-orange italic">Scales.</span>
          </h1>
          <p className="text-fg-muted text-lg max-w-lg">
            {/* TODO: Add real sub-tagline */}
            Codecrons crafts custom software, SaaS products, AI integrations,
            and automation solutions for ambitious businesses worldwide.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <a
              href="/portfolio"
              className="px-6 py-3 rounded-full border-2 border-fg text-fg font-semibold hover:bg-fg hover:text-bg transition-all"
            >
              View Our Work
            </a>
            <a
              href={BOOK_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-accent-orange text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Book a Call
            </a>
          </div>
        </motion.div>

        {/* 3D Scene */}
        <div className="hidden lg:block relative h-[560px]">
          {/* TODO: HeroScene renders here */}
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
