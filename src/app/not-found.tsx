import Link from "next/link";
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  const articles = getAllArticles().slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 text-center">
      <span className="text-6xl">🎾</span>
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight">Balle hors du court</h1>
      <p className="mt-3 text-muted max-w-md mx-auto">
        Cette page n&apos;existe pas ou plus. Mais on a sûrement le guide ou le comparatif qu&apos;il te faut.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full bg-navy px-6 py-3 text-sm font-bold text-white hover:bg-navy-2 transition-colors"
      >
        Retour à l&apos;accueil
      </Link>

      {articles.length > 0 && (
        <div className="mt-16 text-left">
          <h2 className="text-lg font-extrabold tracking-tight mb-5 text-center">Nos derniers articles</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
