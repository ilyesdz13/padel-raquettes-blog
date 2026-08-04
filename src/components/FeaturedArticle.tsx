import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";
import { CATEGORY_LABELS } from "@/lib/articles";
import { CATEGORY_ROUTES, CATEGORY_STYLES } from "@/lib/site";
import RacketIllustration from "@/components/RacketIllustration";

export default function FeaturedArticle({ article }: { article: ArticleMeta }) {
  const routeSegment = CATEGORY_ROUTES[article.category];
  const style = CATEGORY_STYLES[article.category];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-10">
      <Link
        href={`/${routeSegment}/${article.slug}`}
        className="group grid sm:grid-cols-[1fr_auto] items-center gap-6 rounded-3xl border border-border bg-surface p-6 sm:p-8 shadow-xl shadow-black/5 hover:shadow-2xl hover:-translate-y-0.5 transition-all"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="rounded-full bg-lime px-2.5 py-1 text-xs font-bold text-lime-ink uppercase tracking-wide">
              À la une
            </span>
            <span className={`inline-flex items-center gap-1.5 rounded-full ${style.bg} ${style.text} px-2.5 py-1 text-xs font-bold uppercase tracking-wide`}>
              <span aria-hidden="true">{style.icon}</span>
              {CATEGORY_LABELS[article.category].label}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug group-hover:text-brand transition-colors">
            {article.title}
          </h2>
          <p className="mt-3 text-muted line-clamp-2 max-w-2xl">{article.description}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted">
            <span>
              {new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
              {" · "}
              {article.readingMinutes} min de lecture
            </span>
            <span className="font-semibold text-foreground/70 group-hover:translate-x-0.5 transition-transform">
              Lire l&apos;article →
            </span>
          </div>
        </div>
        <div className="hidden sm:block w-24 h-32 rounded-2xl bg-gradient-to-br from-navy to-navy-2 p-3 shrink-0 -rotate-3 group-hover:rotate-0 transition-transform">
          <RacketIllustration shape={article.category === "comparatif" ? "diamant" : "goutte"} />
        </div>
      </Link>
    </div>
  );
}
