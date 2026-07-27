import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import { services } from "@/data/services";
import SplineEmbed from "@/components/3d/SplineEmbed";

export const metadata: Metadata = {
  title: "Services — Codecrons",
  description: "Custom software development, SaaS, AI, automation, and design services from Codecrons.",
};

// TODO: Implement Services page
//
// Layout:
//   1. Page hero — headline + sub-text + Spline decorative scene on the right
//      Spline URL: TODO — add a relevant Spline scene URL
//   2. Full services list — all items from data/services.ts
//      Each service as a large numbered row (like the Framer template)
//      Number | Title + Tags | Description | (hover reveals arrow)
//   3. Bottom CTA — "Ready to start?" + Book a Call button
//
// 3D: SplineEmbed component, right side of hero area
// Animate: Framer Motion fade-up on each service row (stagger)
export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-bg">
        {/* Hero */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Services"
            title="Everything You Need to Build & Scale"
            subtitle="From initial concept to production — we handle the full stack."
          />
          {/* TODO: Add Spline scene here */}
        </section>

        {/* Services list */}
        <section className="py-12 max-w-7xl mx-auto px-6">
          {services.map((service, i) => (
            <div
              key={service.id}
              id={service.id}
              className="flex flex-col md:flex-row gap-6 py-10 border-b border-border group"
            >
              <span className="text-sm font-bold text-accent-purple w-12 shrink-0 pt-1">
                {service.number}
              </span>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-fg mb-3">{service.title}</h2>
                <p className="text-fg-muted leading-relaxed">{service.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {service.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-accent-purple/10 text-accent-purple text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="py-20 text-center max-w-2xl mx-auto px-6">
          <h2 className="font-serif text-3xl font-bold text-fg mb-4">Ready to start?</h2>
          <p className="text-fg-muted mb-8">Let's talk about your project. No commitments.</p>
          <a
            href="https://calendly.com/codecrons"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-accent-orange text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Book a Free Call
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
