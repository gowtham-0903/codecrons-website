"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";
import { EASE } from "@/lib/motion";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

/** Closing call-to-action reused at the bottom of every page. */
export default function CTASection({
  title = "Ready to start?",
  subtitle = "Tell us what you are building. We will come back with scope, timeline, and a fixed price — no commitment.",
  primaryLabel = "Book a Free Call",
  secondaryHref = `mailto:${site.email}`,
  secondaryLabel = "Email Us",
}: CTASectionProps) {
  return (
    <section className="relative py-24 bg-fg overflow-hidden">
      <div
        className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-[0.18] bg-accent-orange"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative max-w-2xl mx-auto px-6 text-center flex flex-col items-center gap-6"
      >
        <h2 className="font-serif text-4xl lg:text-5xl font-bold text-bg leading-tight text-balance">
          {title}
        </h2>
        <p className="text-bg/70 text-lg leading-relaxed text-pretty">
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-2">
          <Button href={site.bookCallUrl} variant="primary" size="lg">
            {primaryLabel}
            <ArrowUpRight size={17} />
          </Button>
          <Button
            href={secondaryHref}
            size="lg"
            className="border-2 border-bg/25 text-bg hover:bg-bg hover:text-fg"
            variant="ghost"
          >
            {secondaryLabel}
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
