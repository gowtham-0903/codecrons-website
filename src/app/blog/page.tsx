import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/layout/CTASection";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import Badge from "@/components/ui/Badge";
import LazyScene from "@/components/3d/LazyScene";
import { getAllPosts, formatPostDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical deep-dives, case studies, and engineering notes from the Codecrons team.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero with particle field */}
        <section className="relative py-28 lg:py-32 overflow-hidden bg-fg">
          <div className="absolute inset-0 opacity-70" aria-hidden>
            <LazyScene scene="particles" rootMargin="0px" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <Reveal>
              <SectionHeader
                label="Blog"
                title="Ideas, insights & builds"
                subtitle="Technical deep-dives, case studies, and notes from the work we ship."
                align="center"
                invert
              />
            </Reveal>
          </div>
        </section>

        {/* Post grid */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border rounded-2xl">
              <p className="text-fg-muted">
                No posts yet. Add <code className="text-fg">.mdx</code> files to{" "}
                <code className="text-fg">/content/blog/</code> to get started.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 0.1} as="article">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col h-full"
                  >
                    {/* Cover */}
                    <div className="relative h-48 rounded-2xl overflow-hidden bg-bg-subtle border border-border mb-5">
                      {post.coverImage ? (
                        <Image
                          src={post.coverImage}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="w-full h-full bg-gradient-to-br from-accent-purple/50 via-accent-mint/25 to-accent-orange/15"
                          aria-hidden
                        />
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-fg-muted mb-3">
                      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                      <span aria-hidden>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} />
                        {post.readingTime} min read
                      </span>
                    </div>

                    <h2 className="font-serif text-xl font-bold text-fg leading-snug transition-colors group-hover:text-accent-orange">
                      {post.title}
                    </h2>

                    <p className="text-fg-muted text-sm mt-2 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} label={tag} color="purple" />
                        ))}
                      </div>
                    )}

                    <span className="inline-flex items-center gap-1.5 text-accent-orange font-semibold text-sm mt-5 transition-all group-hover:gap-2.5">
                      Read more
                      <ArrowUpRight size={15} />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </section>

        <CTASection
          title="Want us to build it instead?"
          subtitle="We write about this because we do it daily. If you would rather hand it over, that is what the studio is for."
        />
      </main>
      <Footer />
    </>
  );
}
