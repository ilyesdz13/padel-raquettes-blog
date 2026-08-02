import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { CATEGORY_LABELS } from "@/lib/articles";
import { CATEGORY_ROUTES } from "@/lib/site";

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  const routeSegment = CATEGORY_ROUTES[article.category];
  return (
    <Link
      href={`/${routeSegment}/${article.slug}`}
      className="block rounded-xl border border-border bg-surface p-5 hover:border-brand transition-colors h-full"
    >
      <span className="inline-block text-xs font-semibold uppercase tracking-wide text-brand mb-2">
        {CATEGORY_LABELS[article.category].label}
      </span>
      <h3 className="text-lg font-bold mb-2 leading-snug">{article.title}</h3>
      <p className="text-sm text-foreground/70 line-clamp-3">{article.description}</p>
      <div className="mt-3 text-xs text-foreground/50">
        {new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
        {" · "}
        {article.readingMinutes} min de lecture
      </div>
    </Link>
  );
}
