import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import dynamic from "next/dynamic";

const GlobeScene = dynamic(() => import("@/components/3d/GlobeScene"), { ssr: false });

export const metadata: Metadata = {
  title: "About — Codecrons",
  description: "Learn about Codecrons — our story, team, values, and the tech we use.",
};

// TODO: Implement About page
//
// Layout:
//   1. Hero — headline + tagline + rotating 3D globe (right side)
//      Globe represents global reach / remote-first studio
//   2. Story section — who we are, how we started, what drives us
//      Left: text paragraphs. Right: a stat or quote highlight
//   3. Values section — 3–4 value cards (e.g. Quality, Speed, Transparency, Innovation)
//      Each: icon (Lucide) + title + short description
//   4. Team section — team member cards (photo, name, role)
//      TODO: add real team data. Use placeholder initials avatars for now.
//   5. Tech stack — reuse TechStack component from home, or a smaller version
//   6. CTA — "Want to work with us?" + buttons

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-bg">
        {/* Hero with Globe */}
        <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <SectionHeader
              label="About Us"
              title="We Build the Future, One Line at a Time"
              subtitle="Codecrons is a full-stack product studio — software agency, SaaS builder, AI integrator, and automation specialist all in one."
            />
            {/* TODO: Add company story paragraphs */}
            <p className="text-fg-muted leading-relaxed">
              TODO: Add the real Codecrons story here.
            </p>
            <a
              href="https://calendly.com/codecrons"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start px-6 py-3 rounded-full bg-accent-orange text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Work With Us
            </a>
          </div>

          {/* 3D Globe */}
          <div className="hidden lg:block relative h-[500px]">
            <GlobeScene />
          </div>
        </section>

        {/* TODO: Values section */}
        <section className="py-20 bg-bg-subtle">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeader label="Values" title="What We Stand For" align="center" />
            {/* TODO: add 3–4 value cards */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {["Quality", "Speed", "Transparency", "Innovation"].map((v) => (
                <div key={v} className="border border-border rounded-2xl p-6 bg-bg">
                  <h3 className="font-bold text-fg mb-2">{v}</h3>
                  <p className="text-fg-muted text-sm">TODO: Add description for {v}.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TODO: Team section */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <SectionHeader label="Team" title="The People Behind Codecrons" align="center" />
          {/* TODO: Add real team member cards */}
          <p className="text-fg-muted text-center mt-8">TODO: Add team members here.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
