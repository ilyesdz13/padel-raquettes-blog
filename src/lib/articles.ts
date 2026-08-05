import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export type Category = "guide" | "comparatif" | "article";

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: Category;
  keywords: string[];
  products: string[];
  readingMinutes: number;
};

export type Article = ArticleMeta & {
  content: string;
};

function readArticleFile(fileName: string): Article {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug: data.slug ?? slug,
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.category,
    keywords: data.keywords ?? [],
    products: data.products ?? [],
    readingMinutes: Math.max(1, Math.round(stats.minutes)),
    content,
  };
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readArticleFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: Category): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

/** Priorise la même catégorie, puis complète avec les articles les plus récents. */
export function getRelatedArticles(current: ArticleMeta, count = 3): ArticleMeta[] {
  const all = getAllArticles().filter((a) => a.slug !== current.slug);
  const sameCategory = all.filter((a) => a.category === current.category);
  const others = all.filter((a) => a.category !== current.category);
  return [...sameCategory, ...others].slice(0, count);
}

export function slugifyHeading(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type Heading = { text: string; slug: string };

/** Extrait les titres de niveau 2 ("## ") d'un article pour construire un sommaire. */
export function extractHeadings(content: string): Heading[] {
  const matches = content.matchAll(/^## (.+)$/gm);
  return Array.from(matches, (m) => ({ text: m[1].trim(), slug: slugifyHeading(m[1].trim()) }));
}

export type FAQItem = { question: string; answer: string };

/** Extrait les paires question/réponse de la section "## FAQ" d'un article, pour le balisage FAQPage. */
export function extractFAQItems(content: string): FAQItem[] {
  const headingMatch = content.match(/^## FAQ.*$/m);
  if (!headingMatch || headingMatch.index === undefined) return [];

  const startIndex = headingMatch.index + headingMatch[0].length;
  const nextHeadingMatch = content.slice(startIndex).match(/^## /m);
  const endIndex = nextHeadingMatch?.index !== undefined ? startIndex + nextHeadingMatch.index : content.length;
  const section = content.slice(startIndex, endIndex);

  const items: FAQItem[] = [];
  const pairRegex = /\*\*(.+?)\*\*\n([\s\S]+?)(?=\n\n|$)/g;
  let match: RegExpExecArray | null;
  while ((match = pairRegex.exec(section)) !== null) {
    items.push({ question: match[1].trim(), answer: match[2].trim() });
  }
  return items;
}

export const CATEGORY_LABELS: Record<Category, { label: string; plural: string; description: string }> = {
  guide: {
    label: "Guide",
    plural: "Guides complets",
    description: "Des guides d'achat complets pour choisir la bonne raquette selon votre profil.",
  },
  comparatif: {
    label: "Comparatif",
    plural: "Comparatifs",
    description: "Des raquettes de padel comparées face à face pour trancher facilement.",
  },
  article: {
    label: "Article",
    plural: "Articles",
    description: "Conseils, technique et actualité autour de la raquette de padel.",
  },
};
