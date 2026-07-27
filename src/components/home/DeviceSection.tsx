"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import LazyScene from "@/components/3d/LazyScene";
import { EASE } from "@/lib/motion";

const POINTS = [
  "Sub-second loads and Core Web Vitals in the green",
  "Typed end to end, from database column to button label",
  "Deployed on infrastructure you own and control",
];

export default function DeviceSection() {
  return (
    <section className="relative py-24 bg-fg overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-[0.16] bg-accent-purple"
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col gap-6"
        >
          <span className="inline-flex items-center gap-2 self-start text-xs font-bold uppercase tracking-widest text-accent-mint">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-mint" aria-hidden />
            Our Work
          </span>

          <h2 className="font-serif font-bold text-4xl lg:text-5xl text-bg leading-[1.1] text-balance">
            Products that hold up under real traffic
          </h2>

          <p className="text-bg/70 text-lg leading-relaxed text-pretty">
            Anything looks good in a demo. What matters is the second year — when
            the data has grown, the team has changed, and someone needs to add a
            feature nobody planned for. That is what we build for.
          </p>

          <ul className="flex flex-col gap-3 mt-2">
            {POINTS.map((point, i) => (
              <motion.li
                key={point}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.1 }}
                className="flex items-start gap-3 text-bg/80 text-sm"
              >
                <Check size={16} className="text-accent-teal mt-0.5 shrink-0" />
                {point}
              </motion.li>
            ))}
          </ul>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-accent-mint font-semibold mt-4 w-fit transition-all hover:gap-3"
          >
            View portfolio
            <ArrowUpRight size={16} />
          </Link>
        </motion.div>

        {/* 3D device — hidden on mobile where it would cost more than it adds */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE }}
          className="hidden lg:block relative h-[480px]"
        >
          <LazyScene scene="device" />
        </motion.div>
      </div>
    </section>
  );
}
