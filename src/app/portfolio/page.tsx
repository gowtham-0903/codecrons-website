import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/layout/CTASection";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Projects and products built by Codecrons — web applications, SaaS platforms, AI systems, and mobile apps.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="relative py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 dot-grid opacity-50" aria-hidden />
          <div className="relative max-w-7xl mx-auto px-6">
            <Reveal>
              <SectionHeader
                label="Our Work"
                title="Projects we are proud of"
                subtitle="A selection of the software, SaaS platforms, and AI systems we have shipped."
              />
            </Reveal>
          </div>
        </section>

        <section className="pb-24 max-w-7xl mx-auto px-6">
          <PortfolioGrid />
        </section>

        <CTASection
          title="Have a project in mind?"
          subtitle="Bring us the problem — even if the spec is still a rough sketch. We will help shape it into something buildable."
        />
      </main>
      <Footer />
    </>
  );
}
