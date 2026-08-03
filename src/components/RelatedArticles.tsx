import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { CATEGORY_LABELS } from "@/lib/articles";
import { CATEGORY_ROUTES, CATEGORY_STYLES } from "@/lib/site";

export default function RelatedArticles({ articles }: { articles: ArticleMeta[] }) {
  if (articles.length === 0) return null;

  return (
    <aside className="not-prose mt-14 border-t border-border pt-10">
      <h2 className="text-xl font-extrabold tracking-tight mb-5">À lire aussi</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {articles.map((article) => {
          const style = CATEGORY_STYLES[article.category];
          return (
            <Link
              key={article.slug}
              href={`/${CATEGORY_ROUTES[article.category]}/${article.slug}`}
              className="group rounded-xl border border-border bg-surface p-4 hover:border-brand/40 hover:shadow-sm transition-all"
            >
              <span className={`inline-flex items-center gap-1 rounded-full ${style.bg} ${style.text} px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide mb-2`}>
                <span aria-hidden="true">{style.icon}</span>
                {CATEGORY_LABELS[article.category].label}
              </span>
              <h3 className="text-sm font-bold leading-snug group-hover:text-brand transition-colors">
                {article.title}
              </h3>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
