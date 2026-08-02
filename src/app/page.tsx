import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function Home() {
  const articles = getAllArticles().slice(0, 9);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
      <section className="mb-14 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          {SITE_NAME} : {SITE_TAGLINE}
        </h1>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Chaque semaine, de nouveaux guides d&apos;achat, comparatifs et tests pour vous
          aider à choisir la raquette de padel adaptée à votre niveau et à votre style de jeu.
        </p>
        <div className="mt-6 flex justify-center gap-3 text-sm font-semibold">
          <Link href="/guides" className="rounded-lg bg-brand px-4 py-2 text-white hover:bg-brand-dark transition-colors">
            Voir les guides
          </Link>
          <Link href="/comparatifs" className="rounded-lg border border-border px-4 py-2 hover:border-brand transition-colors">
            Voir les comparatifs
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-5">Derniers articles</h2>
        {articles.length === 0 ? (
          <p className="text-foreground/60 text-sm">
            Les premiers articles arrivent très bientôt.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
