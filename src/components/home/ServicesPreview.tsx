"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import SectionHeader from "@/components/ui/SectionHeader";

// TODO: Implement Services Preview section (shows first 4 services)
// Layout: 2x2 grid on desktop, 1 column on mobile
// Each card:
//   - Service number (01, 02...) in accent-purple, small font
//   - Service title in bold
//   - Short description in text-fg-muted
//   - Tags as Badge components
//   - Hover: card lifts with shadow, ArrowUpRight icon appears top-right
//   - Clicking the card → navigates to /services#service-id
// Bottom: "View All Services →" link → /services
// Animate: fade-up stagger on cards (Framer Motion)
export default function ServicesPreview() {
  const preview = services.slice(0, 4);

  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        <SectionHeader
          label="What We Do"
          title="Services Built for Scale"
          subtitle="From idea to production — we cover every layer of the stack."
        />

        {/* TODO: implement card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {preview.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="border border-border rounded-2xl p-8 hover:border-accent-purple hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm font-bold text-accent-purple">{service.number}</span>
                <ArrowUpRight size={18} className="text-fg-faint group-hover:text-accent-orange transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-fg mb-2">{service.title}</h3>
              <p className="text-fg-muted text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/services" className="inline-flex items-center gap-2 text-accent-orange font-semibold hover:gap-3 transition-all">
            View All Services <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
