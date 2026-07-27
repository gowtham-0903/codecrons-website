import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Filesystem-backed blog. Posts are .mdx files in /content/blog with
 * frontmatter: title, date, excerpt, coverImage?, author?, tags?
 *
 * Server-only — never import this from a Client Component.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  author?: string;
  tags?: string[];
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTime: number;
}

export interface Post extends PostMeta {
  content: string;
}

/** ~200 wpm, rounded up, minimum 1. */
function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function readPostFile(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as Partial<PostFrontmatter>;

  // A post without a title or date is malformed — skip rather than crash.
  if (!frontmatter.title || !frontmatter.date) return null;

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    excerpt: frontmatter.excerpt ?? "",
    coverImage: frontmatter.coverImage,
    author: frontmatter.author,
    tags: frontmatter.tags ?? [],
    readingTime: estimateReadingTime(content),
    content,
  };
}

/** All post slugs, unsorted. */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** Post metadata for every post, newest first. */
export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => readPostFile(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(({ content: _content, ...meta }) => {
      void _content;
      return meta;
    });
}

/** A single post including its MDX body, or null when the slug is unknown. */
export function getPostBySlug(slug: string): Post | null {
  return readPostFile(slug);
}

/** Up to `limit` other posts, newest first — used for "keep reading". */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, limit);
}

export function formatPostDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
