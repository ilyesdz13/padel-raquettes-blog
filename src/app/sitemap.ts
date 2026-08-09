import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { CATEGORY_ROUTES, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/trouver-ma-raquette`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/guides`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/comparatifs`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/articles`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/a-propos`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/mentions-legales`, changeFrequency: "monthly", priority: 0.2 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map((article) => ({
    url: `${SITE_URL}/${CATEGORY_ROUTES[article.category]}/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes];
}
