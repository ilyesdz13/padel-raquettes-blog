import Link from "next/link";

/**
 * Encart de renvoi vers l'outil de recommandation.
 * `variant="inline"` s'intègre dans le flux d'un article, `"section"` occupe
 * une bande pleine largeur sur la page d'accueil.
 */
export default function FinderCTA({ variant = "inline" }: { variant?: "inline" | "section" }) {
  const content = (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-navy-2 px-6 py-8 sm:px-10 sm:py-10 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lime/10 blur-2xl"
      />
      <div className="relative sm:flex sm:items-center sm:justify-between sm:gap-8">
        <div className="max-w-lg">
          <span className="inline-flex rounded-full bg-lime px-2.5 py-1 text-xs font-bold text-lime-ink">
            OUTIL GRATUIT
          </span>
          <h2 className="mt-3 text-xl sm:text-2xl font-extrabold tracking-tight text-balance">
            Pas sûr de votre choix ? Trouvez votre raquette en 30 secondes
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Cinq questions sur votre niveau, votre style de jeu et votre budget — et trois
            recommandations argumentées, sans inscription.
          </p>
        </div>
        <Link
          href="/trouver-ma-raquette"
          className="mt-5 sm:mt-0 inline-flex shrink-0 rounded-full bg-lime px-6 py-3 text-sm font-bold text-lime-ink hover:bg-lime-dark transition-colors"
        >
          Lancer le test
        </Link>
      </div>
    </div>
  );

  if (variant === "section") {
    return <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6">{content}</div>;
  }
  return <div className="not-prose my-10">{content}</div>;
}
