export const SITE_NAME = "Padel Raquettes";
export const SITE_TAGLINE = "Guides, comparatifs et avis pour choisir la bonne raquette de padel";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
