import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// TODO: Implement individual blog post page
//
// Reads a single .mdx file from /content/blog/[slug].mdx
// Uses next-mdx-remote/rsc (React Server Component compatible)
// Install: npm install next-mdx-remote gray-matter
//
// Steps:
//   1. Read file with fs.readFileSync
//   2. Parse with gray-matter to get { content, data (frontmatter) }
//   3. Render with <MDXRemote source={content} />
//   4. generateStaticParams() to pre-generate all post slugs
//   5. generateMetadata() for per-post SEO title/description
//
// Layout:
//   - Narrow centered column (max-w-2xl or max-w-3xl)
//   - Cover image full-width at top
//   - Title (PT Serif), date, author
//   - Prose content — style with Tailwind typography plugin (optional: @tailwindcss/typography)
//   - Back to blog link at top and bottom

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // TODO: read frontmatter and return real title/description
  return {
    title: `${slug} — Codecrons Blog`,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // TODO: implement file read + MDXRemote render
  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-bg">
        <article className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="font-serif text-4xl font-bold text-fg mb-4">
            TODO: Post title for /{slug}
          </h1>
          <p className="text-fg-muted">
            TODO: Render MDX content here using next-mdx-remote.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
