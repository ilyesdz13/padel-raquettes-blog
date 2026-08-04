import Link from "next/link";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ArticleCard from "@/components/ArticleCard";
import FeaturedArticle from "@/components/FeaturedArticle";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const allArticles = getAllArticles();
  const [featured, ...rest] = allArticles;
  const articles = rest.slice(0, 8);

  return (
    <div>
      <Hero />
      {featured && <FeaturedArticle article={featured} />}
      <TrustBar />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-14">
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight">Derniers articles</h2>
              <p className="text-muted text-sm mt-1">Nos guides et comparatifs les plus récents.</p>
            </div>
            <Link href="/guides" className="hidden sm:inline text-sm font-semibold text-brand hover:underline">
              Tout voir →
            </Link>
          </div>
          {articles.length === 0 ? (
            <p className="text-muted text-sm">Les premiers articles arrivent très bientôt.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-14 grid sm:grid-cols-3 gap-8">
          <div className="sm:col-span-1">
            <h2 className="text-xl font-extrabold tracking-tight">Comment on choisit</h2>
            <p className="text-muted text-sm mt-2">
              Chaque recommandation est passée au crible des mêmes critères techniques.
            </p>
          </div>
          <div className="sm:col-span-2 grid sm:grid-cols-2 gap-5 text-sm">
            <div className="flex gap-3">
              <span className="text-lime-dark text-lg">●</span>
              <div>
                <div className="font-bold">Forme &amp; tolérance</div>
                <div className="text-muted mt-0.5">Ronde, goutte ou diamant : on identifie le sweet spot adapté à votre niveau.</div>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-lime-dark text-lg">●</span>
              <div>
                <div className="font-bold">Poids &amp; confort</div>
                <div className="text-muted mt-0.5">On croise poids, noyau et balance pour limiter la fatigue et les douleurs.</div>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-lime-dark text-lg">●</span>
              <div>
                <div className="font-bold">Style de jeu</div>
                <div className="text-muted mt-0.5">Puissance, contrôle ou polyvalence : on colle à votre façon de jouer.</div>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-lime-dark text-lg">●</span>
              <div>
                <div className="font-bold">Rapport qualité / prix</div>
                <div className="text-muted mt-0.5">On compare toujours à budget équivalent, jamais dans l&apos;absolu.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
