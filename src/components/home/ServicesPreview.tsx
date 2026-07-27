"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredServices } from "@/data/services";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeader
            label="What We Do"
            title="Services built for scale"
            subtitle="From first sketch to production traffic — we cover every layer of the stack."
          />
          <Link
            href="/services"
            className="hidden md:inline-flex items-center gap-2 text-accent-orange font-semibold shrink-0 transition-all hover:gap-3"
          >
            View all services
            <ArrowUpRight size={16} />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {featuredServices.map((service) => (
            <motion.div key={service.id} variants={fadeUp}>
              <Link
                href={`/services#${service.id}`}
                className="group relative flex flex-col h-full border border-border rounded-2xl p-8 bg-bg overflow-hidden transition-all duration-300 hover:border-accent-purple hover:shadow-xl hover:-translate-y-1"
              >
                {/* Wash that fades in on hover */}
                <span
                  className="absolute inset-0 bg-gradient-to-br from-accent-purple/[0.06] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />

                <div className="relative flex items-start justify-between mb-5">
                  <span className="font-serif text-sm font-bold text-accent-purple">
                    {service.number}
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-fg-muted/30 transition-all duration-300 group-hover:text-accent-orange group-hover:rotate-45"
                  />
                </div>

                <h3 className="relative text-xl font-bold text-fg mb-3">
                  {service.title}
                </h3>
                <p className="relative text-fg-muted text-sm leading-relaxed flex-1">
                  {service.summary}
                </p>

                <div className="relative flex flex-wrap gap-2 mt-6">
                  {service.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} label={tag} color="purple" />
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <Link
          href="/services"
          className="md:hidden inline-flex items-center gap-2 text-accent-orange font-semibold self-center"
        >
          View all services
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
