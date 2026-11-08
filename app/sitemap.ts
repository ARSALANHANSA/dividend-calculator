import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { posts } from "@/data/posts";
import { absoluteUrl, siteConfig } from "@/lib/site-config";

// Only canonical, indexable pages. The 404 page is intentionally excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${siteConfig.lastReviewed}T00:00:00Z`);
  const page = (path: string, priority: number, changeFrequency: "monthly" | "yearly" = "monthly") => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1),
    page("/dividend-guides", 0.8),
    ...guides.map((g) => page(`/dividend-guides/${g.slug}`, 0.7)),
    page("/blog", 0.7),
    ...posts.map((p) => ({ ...page(`/blog/${p.slug}`, 0.6), lastModified: new Date(`${p.updated}T00:00:00Z`) })),
    page("/faq", 0.5),
    page("/about", 0.4, "yearly"),
    page("/contact", 0.3, "yearly"),
    page("/privacy-policy", 0.2, "yearly"),
    page("/cookie-policy", 0.2, "yearly"),
    page("/terms-and-conditions", 0.2, "yearly"),
    page("/disclaimer", 0.2, "yearly"),
  ];
}
