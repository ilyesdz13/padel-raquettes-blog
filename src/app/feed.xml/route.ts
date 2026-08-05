import { getAllArticles } from "@/lib/articles";
import { CATEGORY_ROUTES, SITE_NAME_FULL, SITE_TAGLINE, SITE_URL } from "@/lib/site";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = getAllArticles();

  const items = articles
    .map((article) => {
      const url = `${SITE_URL}/${CATEGORY_ROUTES[article.category]}/${article.slug}`;
      return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_NAME_FULL)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_TAGLINE)}</description>
    <language>fr</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
