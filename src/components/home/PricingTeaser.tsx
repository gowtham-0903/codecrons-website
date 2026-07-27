"use client";

import { Check } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const BOOK_CALL_URL = "https://calendly.com/codecrons";

const PLANS = [
  {
    name: "Essential",
    price: "$750",
    period: "/month",
    description: "Perfect for startups and simple web projects.",
    features: [
      "Up to 5-page website",
      "Mobile-responsive design",
      "Basic SEO optimization",
      "Contact form integration",
      "24/7 email support",
      "Monthly maintenance",
    ],
    cta: "Get Started",
    ctaHref: BOOK_CALL_URL,
    highlight: false,
  },
  {
    name: "Growth",
    price: "$1,200",
    period: "/month",
    description: "Ideal for growing businesses and e-commerce.",
    features: [
      "Everything in Essential",
      "Custom graphic design",
      "CMS integration",
      "Advanced SEO (ongoing)",
      "Analytics dashboard",
      "Priority support",
    ],
    cta: "Get Started",
    ctaHref: BOOK_CALL_URL,
    highlight: true,
  },
];

// TODO: Implement Pricing Teaser section
// Two plan cards side by side (stacked on mobile)
// highlight=true plan → accent-purple border, "Most Popular" badge
// Features list with Check icon in accent-teal
// CTA button for each plan → opens BOOK_CALL_URL in new tab
// Custom plan box below the cards:
//   "Need something custom? We craft bespoke solutions."
//   CTA: "Book a Call" → BOOK_CALL_URL or mailto:hi@codecrons.com
export default function PricingTeaser() {
  return (
    <section className="py-24 bg-bg-subtle">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-12">
        <SectionHeader
          label="Pricing"
          title="Simple, Transparent Pricing"
          subtitle="No surprises. Pick a plan or let us build something custom."
          align="center"
        />

        {/* TODO: style cards properly */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border ${
                plan.highlight
                  ? "border-accent-purple bg-bg shadow-lg"
                  : "border-border bg-bg"
              } flex flex-col gap-6`}
            >
              {plan.highlight && (
                <span className="self-start px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple text-xs font-bold">
                  Most Popular
                </span>
              )}
              <div>
                <h3 className="text-xl font-bold text-fg">{plan.name}</h3>
                <p className="text-fg-muted text-sm mt-1">{plan.description}</p>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold font-serif text-fg">{plan.price}</span>
                <span className="text-fg-muted mb-1">{plan.period}</span>
              </div>
              <ul className="flex flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-fg-muted">
                    <Check size={14} className="text-accent-teal shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={plan.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto text-center py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-90 ${
                  plan.highlight
                    ? "bg-accent-purple text-white"
                    : "bg-fg text-bg"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Custom plan */}
        <div className="rounded-2xl border border-border bg-bg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-lg text-fg">Need something custom?</h3>
            <p className="text-fg-muted text-sm mt-1">
              We craft bespoke solutions tailored to your exact requirements.
            </p>
          </div>
          <a
            href={BOOK_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-full bg-accent-orange text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Book a Call
          </a>
        </div>
      </div>
    </section>
  );
}
