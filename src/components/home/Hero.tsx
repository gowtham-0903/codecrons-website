"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import Button from "@/components/ui/Button";
import LazyScene from "@/components/3d/LazyScene";
import { site } from "@/lib/site";
import { EASE } from "@/lib/motion";

/** Words in the headline that get the animated gradient treatment. */
const HEADLINE = ["We build", "software", "that scales."];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 bg-bg overflow-hidden">
      {/* Background texture + colour wash */}
      <div className="absolute inset-0 dot-grid opacity-60" aria-hidden />
      <div
        className="absolute -top-40 -right-20 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-[0.14] bg-accent-purple"
        aria-hidden
      />
      <div
        className="absolute bottom-0 -left-32 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-[0.1] bg-accent-orange"
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <div className="flex flex-col gap-7">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full border border-border bg-bg-subtle text-xs font-semibold uppercase tracking-widest text-fg-muted"
          >
            <span className="relative flex w-2 h-2" aria-hidden>
              <span className="absolute inline-flex w-full h-full rounded-full bg-accent-teal opacity-70 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-accent-teal" />
            </span>
            {site.tagline} · Available for new work
          </motion.span>

          <h1 className="font-serif font-bold text-5xl sm:text-6xl lg:text-7xl text-fg leading-[1.05] tracking-tight">
            {HEADLINE.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.11, ease: EASE }}
                className="block"
              >
                {i === HEADLINE.length - 1 ? (
                  <span className="text-gradient">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
            className="text-fg-muted text-lg leading-relaxed max-w-lg text-pretty"
          >
            Codecrons is a full-stack product studio. We design and ship custom
            software, SaaS platforms, AI integrations, and the automation that
            ties them together — for teams that need it built properly the first
            time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58, ease: EASE }}
            className="flex flex-wrap gap-4 mt-1"
          >
            <Button href="/portfolio" variant="outline" size="lg">
              View Our Work
            </Button>
            <Button href={site.bookCallUrl} variant="primary" size="lg">
              Book a Call
              <ArrowUpRight size={17} />
            </Button>
          </motion.div>

          {/* Quick proof points */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex flex-wrap gap-x-10 gap-y-4 mt-4 pt-6 border-t border-border"
          >
            {[
              { value: "2–6 wks", label: "Typical first release" },
              { value: "Fixed", label: "Scope and pricing" },
              { value: "Direct", label: "Access to engineers" },
            ].map((item) => (
              <div key={item.label}>
                <dt className="font-serif font-bold text-xl text-fg">
                  {item.value}
                </dt>
                <dd className="text-xs text-fg-muted mt-0.5">{item.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* 3D scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
          className="hidden lg:block relative h-[560px] scene-glow"
        >
          <LazyScene scene="hero" />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-fg-muted"
        aria-hidden
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.div>
    </section>
  );
}
