export const SITE_NAME = "Sweet Spot";
export const SITE_NAME_FULL = "Sweet Spot Padel";
export const SITE_TAGLINE = "Guides, comparatifs et avis pour choisir la bonne raquette de padel";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const ADSENSE_CLIENT_ID = "ca-pub-9882646335528768";

export const CATEGORY_ROUTES = {
  guide: "guides",
  comparatif: "comparatifs",
  article: "articles",
} as const;

export const ROUTE_TO_CATEGORY: Record<string, "guide" | "comparatif" | "article"> = {
  guides: "guide",
  comparatifs: "comparatif",
  articles: "article",
};

export const CATEGORY_STYLES = {
  guide: { text: "text-cat-guide", bg: "bg-cat-guide/10", dot: "bg-cat-guide", icon: "🎾" },
  comparatif: { text: "text-cat-comparatif", bg: "bg-cat-comparatif/10", dot: "bg-cat-comparatif", icon: "⚖️" },
  article: { text: "text-cat-article", bg: "bg-cat-article/10", dot: "bg-cat-article", icon: "💡" },
} as const;
