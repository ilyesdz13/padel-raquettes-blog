import ArticleCard from "@/components/ArticleCard";
import { getArticlesByCategory, CATEGORY_LABELS, type Category } from "@/lib/articles";

export default function CategoryListing({ category }: { category: Category }) {
  const articles = getArticlesByCategory(category);
  const meta = CATEGORY_LABELS[category];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">{meta.plural}</h1>
        <p className="text-foreground/70">{meta.description}</p>
      </header>

      {articles.length === 0 ? (
        <p className="text-foreground/60 text-sm">Aucun article publié dans cette catégorie pour le moment.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
