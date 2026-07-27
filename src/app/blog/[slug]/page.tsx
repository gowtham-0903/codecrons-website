import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTASection from "@/components/layout/CTASection";
import Badge from "@/components/ui/Badge";
import {
  formatPostDate,
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
} from "@/lib/blog";
import { site } from "@/lib/site";

/** Pre-render every post at build time. */
export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(slug);

  // Article structured data for search engines and AI crawlers.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author ?? site.name,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: `${site.url}/blog/${slug}`,
  };

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <article className="max-w-3xl mx-auto px-6 py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-fg-muted hover:text-fg transition-colors text-sm mb-10"
          >
            <ArrowLeft size={15} />
            Back to blog
          </Link>

          <header className="flex flex-col gap-5">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} label={tag} color="purple" />
                ))}
              </div>
            )}

            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-fg leading-[1.1] text-balance">
              {post.title}
            </h1>

            <p className="text-fg-muted text-lg leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm text-fg-muted pb-8 border-b border-border">
              {post.author && (
                <>
                  <span className="font-medium text-fg">{post.author}</span>
                  <span aria-hidden>·</span>
                </>
              )}
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} />
                {post.readingTime} min read
              </span>
            </div>
          </header>

          {post.coverImage && (
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden my-10 border border-border">
              <Image
                src={post.coverImage}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg prose-codecrons max-w-none mt-10">
            <MDXRemote source={post.content} />
          </div>

          <footer className="mt-16 pt-8 border-t border-border">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-accent-orange font-semibold transition-all hover:gap-3"
            >
              <ArrowLeft size={16} />
              All posts
            </Link>
          </footer>
        </article>

        {/* Keep reading */}
        {related.length > 0 && (
          <section className="border-t border-border bg-bg-subtle py-16">
            <div className="max-w-5xl mx-auto px-6">
              <h2 className="font-serif text-2xl font-bold text-fg mb-8">
                Keep reading
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group bg-bg border border-border rounded-2xl p-6 transition-all duration-300 hover:border-accent-purple hover:shadow-lg hover:-translate-y-1"
                  >
                    <time
                      dateTime={item.date}
                      className="text-xs text-fg-muted"
                    >
                      {formatPostDate(item.date)}
                    </time>
                    <h3 className="font-bold text-fg mt-2 leading-snug transition-colors group-hover:text-accent-orange">
                      {item.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-accent-orange text-sm font-semibold mt-4 transition-all group-hover:gap-2">
                      Read
                      <ArrowUpRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
