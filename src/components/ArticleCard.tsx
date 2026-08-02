import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { CATEGORY_LABELS } from "@/lib/articles";
import { CATEGORY_ROUTES, CATEGORY_STYLES } from "@/lib/site";

export default function ArticleCard({ article }: { article: ArticleMeta }) {
  const routeSegment = CATEGORY_ROUTES[article.category];
  const style = CATEGORY_STYLES[article.category];

  return (
    <Link
      href={`/${routeSegment}/${article.slug}`}
      className="group block rounded-2xl border border-border bg-surface p-5 h-full transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-xl hover:shadow-black/5"
    >
      <span className={`inline-flex items-center gap-1.5 rounded-full ${style.bg} ${style.text} px-2.5 py-1 text-xs font-bold uppercase tracking-wide mb-3`}>
        <span aria-hidden="true">{style.icon}</span>
        {CATEGORY_LABELS[article.category].label}
      </span>
      <h3 className="text-lg font-bold mb-2 leading-snug group-hover:text-brand transition-colors">
        {article.title}
      </h3>
      <p className="text-sm text-muted line-clamp-3">{article.description}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-muted">
        <span>
          {new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          {" · "}
          {article.readingMinutes} min
        </span>
        <span className="font-semibold text-foreground/70 group-hover:translate-x-0.5 transition-transform">
          Lire →
        </span>
      </div>
    </Link>
  );
}
