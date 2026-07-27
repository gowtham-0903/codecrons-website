import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/layout/CTASection";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import ServiceList from "@/components/services/ServiceList";
import LazyScene from "@/components/3d/LazyScene";
import Marquee from "@/components/home/Marquee";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom software development, SaaS products, AI integration, automation, mobile apps, and tech consulting from Codecrons.",
  alternates: { canonical: "/services" },
};

const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    body: "A paid, fixed-length scoping phase. We map the problem, agree what is in and out, and produce a costed plan you own — whether or not you build it with us.",
  },
  {
    step: "02",
    title: "Design",
    body: "Flows and interfaces for the screens that carry the most risk, prototyped before anything is engineered so the expensive decisions get made early.",
  },
  {
    step: "03",
    title: "Build",
    body: "Weekly increments on a staging environment you can click through. Nothing is saved for a big reveal at the end.",
  },
  {
    step: "04",
    title: "Handover",
    body: "Deployed to infrastructure you control, with documentation and a walkthrough for whoever maintains it next — including if that is not us.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-50" aria-hidden />

          <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <SectionHeader
                label="Services"
                title="Everything you need to build and scale"
                subtitle="Six practices, one team. Most engagements combine two or three — we scope them together rather than selling them separately."
              />
            </Reveal>

            {/* Decorative 3D accent (swap in a Spline URL via SplineEmbed if you publish one) */}
            <Reveal direction="left" delay={0.15} className="hidden lg:block">
              <div className="relative h-[400px] scene-glow">
                <LazyScene scene="decor" />
              </div>
            </Reveal>
          </div>
        </section>

        <Marquee />

        {/* Full service list */}
        <section className="py-16 lg:py-24 max-w-7xl mx-auto px-6">
          <ServiceList />
        </section>

        {/* How we work */}
        <section className="py-20 bg-bg-subtle">
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
            <Reveal>
              <SectionHeader
                label="Process"
                title="How an engagement runs"
                subtitle="The same four phases whether the project is four weeks or four months."
                align="center"
              />
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROCESS.map((phase, i) => (
                <Reveal key={phase.step} delay={i * 0.1}>
                  <div className="h-full bg-bg border border-border rounded-2xl p-7 transition-all duration-300 hover:border-accent-purple hover:shadow-lg hover:-translate-y-1">
                    <span className="font-serif text-3xl font-bold text-accent-orange/25">
                      {phase.step}
                    </span>
                    <h3 className="font-bold text-fg mt-3 mb-2">{phase.title}</h3>
                    <p className="text-fg-muted text-sm leading-relaxed">
                      {phase.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <CTASection
          title="Not sure which you need?"
          subtitle="Describe the problem rather than the solution. We will tell you what it actually takes — and say so if it is not us."
        />
      </main>
      <Footer />
    </>
  );
}
