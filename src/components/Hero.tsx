import Link from "next/link";

const TRUST_POINTS = [
  "Comparatifs indépendants",
  "Mis à jour chaque semaine",
  "Critères techniques vérifiés",
];

export default function Hero() {
  return (
    <section className="court-pattern relative overflow-hidden text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-20 sm:py-28 text-center relative">
        <span className="inline-flex items-center gap-2 rounded-full border border-navy-border bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-lime">
          Guides &amp; comparatifs padel
        </span>

        <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-balance leading-[1.1]">
          Trouvez la raquette de padel
          <br className="hidden sm:block" />
          {" "}qui va <span className="text-lime">transformer votre jeu</span>
        </h1>

        <p className="mt-5 text-white/70 max-w-xl mx-auto text-lg">
          Des comparatifs honnêtes, des guides d&apos;achat clairs et des avis qui vont droit au
          but — pour ne plus jamais choisir une raquette au hasard.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            href="/guides"
            className="rounded-full bg-lime px-6 py-3 text-sm font-bold text-lime-ink hover:bg-lime-dark transition-colors shadow-lg shadow-lime/10"
          >
            Trouver ma raquette idéale
          </Link>
          <Link
            href="/comparatifs"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors"
          >
            Voir les comparatifs
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/60">
          {TRUST_POINTS.map((point) => (
            <span key={point} className="inline-flex items-center gap-2">
              <span className="text-lime">✓</span>
              {point}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
