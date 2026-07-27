import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: site.url, changeFrequency: "monthly", priority: 1 },
      { url: `${site.url}/services`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${site.url}/portfolio`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.7 },
      { url: `${site.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
      { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.8 },
    ] satisfies MetadataRoute.Sitemap
  ).map((route) => ({ ...route, lastModified: now }));

  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
