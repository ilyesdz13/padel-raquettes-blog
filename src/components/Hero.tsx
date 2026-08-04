import Link from "next/link";
import CourtLines from "@/components/CourtLines";
import RacketIllustration from "@/components/RacketIllustration";

const TRUST_POINTS = [
  "Comparatifs indépendants",
  "Mis à jour chaque semaine",
  "Critères techniques vérifiés",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <CourtLines className="absolute inset-0 h-full w-full text-white/[0.07]" />
      <div
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-lime/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 relative grid lg:grid-cols-[1.1fr_0.9fr] items-center gap-10">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-navy-border bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-lime">
            🎾 Le blog qui parle vraiment padel
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-balance leading-[1.1]">
            Trouvez la raquette
            <br className="hidden sm:block" />
            {" "}qui va <span className="text-lime">transformer votre jeu</span>
          </h1>

          <p className="mt-5 text-white/70 max-w-xl mx-auto lg:mx-0 text-lg">
            Des comparatifs honnêtes, des guides d&apos;achat clairs et des avis qui vont droit au
            but — pour ne plus jamais choisir une raquette au hasard.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
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

          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-2 text-sm text-white/60">
            {TRUST_POINTS.map((point) => (
              <span key={point} className="inline-flex items-center gap-2">
                <span className="text-lime">✓</span>
                {point}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex justify-center items-center relative">
          <div className="absolute h-72 w-72 rounded-full bg-lime/10 blur-2xl" aria-hidden="true" />
          <div className="relative w-56 h-72 -rotate-6 drop-shadow-2xl">
            <RacketIllustration shape="diamant" className="h-full w-full" />
          </div>
          <div className="absolute right-0 bottom-4 w-40 h-52 rotate-12 opacity-40">
            <RacketIllustration shape="rond" className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
