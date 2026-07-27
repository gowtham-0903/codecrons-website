"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/data/services";
import Badge from "@/components/ui/Badge";
import { EASE } from "@/lib/motion";

/** Numbered service rows — each expands its deliverables on hover/focus. */
export default function ServiceList() {
  return (
    <div className="flex flex-col">
      {services.map((service, i) => (
        <motion.article
          key={service.id}
          id={service.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: EASE }}
          className="group scroll-mt-28 border-b border-border py-12 first:border-t"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            <div className="md:col-span-1">
              <span className="font-serif text-lg font-bold text-accent-purple">
                {service.number}
              </span>
            </div>

            <div className="md:col-span-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-fg leading-tight text-balance">
                {service.title}
              </h2>
              <div className="flex flex-wrap gap-2 mt-4">
                {service.tags.map((tag) => (
                  <Badge key={tag} label={tag} color="purple" />
                ))}
              </div>
            </div>

            <div className="md:col-span-6">
              <p className="text-fg-muted leading-relaxed text-pretty">
                {service.description}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mt-6">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-fg-muted"
                  >
                    <Check
                      size={14}
                      className="text-accent-teal shrink-0 mt-1"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-1 flex md:justify-end">
              <ArrowUpRight
                size={22}
                className="text-fg-muted/25 transition-all duration-300 group-hover:text-accent-orange group-hover:rotate-45"
                aria-hidden
              />
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
