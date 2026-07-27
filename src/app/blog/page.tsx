import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("@/components/3d/ParticleField"), { ssr: false });

export const metadata: Metadata = {
  title: "Blog — Codecrons",
  description: "Insights, tutorials, and case studies from the Codecrons team.",
};

// TODO: Implement Blog list page
//
// Layout:
//   1. Hero — headline + ParticleField as background (3D particles, full-width)
//   2. Post grid — reads all .mdx files from /content/blog/ using fs
//      Each card: cover image, date, title, excerpt, "Read more →" link
//      3 columns desktop, 2 tablet, 1 mobile
//
// Data: use gray-matter to parse frontmatter from MDX files server-side
// Import: this is a server component — no "use client"
//
// MDX frontmatter expected shape:
//   title, date, excerpt, coverImage, author

export default function BlogPage() {
  // TODO: Read MDX files from /content/blog/ using fs + gray-matter
  // const posts = getAllPosts(); // implement this helper in lib/

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-bg">
        {/* Hero with particle 3D */}
        <section className="relative py-32 overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <SectionHeader
              label="Blog"
              title="Ideas, Insights & Builds"
              subtitle="Technical deep-dives, case studies, and perspectives from the Codecrons team."
              align="center"
            />
          </div>
          {/* TODO: ParticleField as bg — position absolute, full width/height of this section */}
          <div className="absolute inset-0 h-full opacity-40">
            <ParticleField />
          </div>
        </section>

        {/* Post grid */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          {/* TODO: render post cards here */}
          <p className="text-fg-muted text-center">
            No posts yet. Add .mdx files to /content/blog/ to get started.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
