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
