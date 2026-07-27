import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import { projects, projectCategories } from "@/data/projects";

export const metadata: Metadata = {
  title: "Portfolio — Codecrons",
  description: "Projects and products built by Codecrons — software, SaaS, AI, and more.",
};

// TODO: Implement Portfolio page
//
// Layout:
//   1. Page hero — headline + brief
//   2. Category filter bar — pill buttons for each category in projectCategories
//      Clicking a category filters the grid (use client-side state)
//      "All" shows everything
//   3. Project grid — 3 columns on desktop, 2 on tablet, 1 on mobile
//      Each card:
//        - Cover image (next/image, fill)
//        - Category tag (Badge)
//        - Project title
//        - Short description
//        - "View Project →" link (if project.link exists)
//        - Hover: image zooms slightly, overlay appears with title
//   4. "Have a project in mind?" CTA at the bottom
//
// 3D: The grid cards should have a subtle 3D hover tilt effect
//     Use Framer Motion's useMotionValue + useTransform for tilt
//     See: framer.com/docs/motion-value
//
// NOTE: This needs "use client" due to category filter state

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-bg">
        <section className="py-20 max-w-7xl mx-auto px-6">
          <SectionHeader
            label="Our Work"
            title="Projects We're Proud Of"
            subtitle="A selection of software, SaaS, and AI products we've built."
          />
        </section>

        {/* TODO: Add category filter + project grid */}
        <section className="pb-24 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="border border-border rounded-2xl overflow-hidden bg-bg hover:shadow-lg transition-shadow">
                {/* TODO: Add next/image cover */}
                <div className="bg-bg-subtle h-48 flex items-center justify-center">
                  <span className="text-fg-muted text-sm">Image: {project.image}</span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-accent-purple uppercase tracking-widest">{project.category}</span>
                  <h3 className="text-lg font-bold text-fg mt-2">{project.title}</h3>
                  <p className="text-fg-muted text-sm mt-1">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
