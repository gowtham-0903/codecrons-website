"use client";

import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const PLANS = [
  {
    name: "Essential",
    price: "$750",
    period: "/month",
    description: "For startups and straightforward web projects.",
    features: [
      "Up to 5-page website",
      "Mobile-responsive design",
      "Baseline SEO and analytics",
      "Contact form integration",
      "Email support",
      "Monthly maintenance",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$1,200",
    period: "/month",
    description: "For growing businesses and commerce.",
    features: [
      "Everything in Essential",
      "Custom design system",
      "CMS integration",
      "Ongoing SEO and content support",
      "Analytics dashboard",
      "Priority support",
    ],
    cta: "Get Started",
    highlight: true,
  },
];

export default function PricingTeaser() {
  return (
    <section className="py-24 bg-bg-subtle">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-12">
        <SectionHeader
          label="Pricing"
          title="Simple, transparent pricing"
          subtitle="No surprises. Pick a plan, or let us scope something custom."
          align="center"
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeUp}
              className={cn(
                "relative rounded-2xl p-8 bg-bg flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                plan.highlight
                  ? "border-2 border-accent-purple shadow-lg"
                  : "border border-border",
              )}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-accent-purple text-white text-[11px] font-bold uppercase tracking-wide">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-fg">{plan.name}</h3>
                <p className="text-fg-muted text-sm mt-1">{plan.description}</p>
              </div>

              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold font-serif text-fg">
                  {plan.price}
                </span>
                <span className="text-fg-muted mb-1.5 text-sm">
                  {plan.period}
                </span>
              </div>

              <ul className="flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-fg-muted"
                  >
                    <Check
                      size={15}
                      className="text-accent-teal shrink-0 mt-0.5"
                      aria-hidden
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                href={site.bookCallUrl}
                variant={plan.highlight ? "secondary" : "outline"}
                className="mt-auto w-full"
              >
                {plan.cta}
                <ArrowUpRight size={15} />
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Custom scope */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-bg p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg text-fg">Need something custom?</h3>
            <p className="text-fg-muted text-sm mt-1 max-w-md">
              Larger builds, ongoing retainers, and product partnerships are
              scoped individually. Tell us what you have in mind.
            </p>
          </div>
          <Button href={`mailto:${site.email}`} variant="primary" className="shrink-0">
            Email Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
