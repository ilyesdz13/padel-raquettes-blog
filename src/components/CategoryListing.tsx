import ArticleCard from "@/components/ArticleCard";
import { getArticlesByCategory, CATEGORY_LABELS, type Category } from "@/lib/articles";
import { CATEGORY_ROUTES, SITE_URL } from "@/lib/site";

export default function CategoryListing({ category }: { category: Category }) {
  const articles = getArticlesByCategory(category);
  const meta = CATEGORY_LABELS[category];

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: meta.plural,
    description: meta.description,
    itemListElement: articles.map((article, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/${CATEGORY_ROUTES[category]}/${article.slug}`,
      name: article.title,
    })),
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      {articles.length > 0 && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      )}
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">{meta.plural}</h1>
        <p className="text-muted">{meta.description}</p>
      </header>

      {articles.length === 0 ? (
        <p className="text-muted text-sm">Aucun article publié dans cette catégorie pour le moment.</p>
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
