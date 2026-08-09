import type { Metadata } from "next";
import RacketFinder from "@/components/RacketFinder";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_URL, SITE_NAME_FULL } from "@/lib/site";

const TITLE = "Quelle raquette de padel choisir ? Le test en 5 questions";
const DESCRIPTION =
  "Répondez à 5 questions sur votre niveau, votre style de jeu et votre budget : notre outil vous recommande les 3 raquettes de padel les plus adaptées à votre profil.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "quelle raquette de padel choisir",
    "trouver ma raquette de padel",
    "test raquette padel",
    "raquette padel adaptée à mon niveau",
  ],
  alternates: { canonical: "/trouver-ma-raquette" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
};

export default function TrouverMaRaquettePage() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Trouveur de raquette de padel",
    url: `${SITE_URL}/trouver-ma-raquette`,
    description: DESCRIPTION,
    applicationCategory: "SportsApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    publisher: { "@type": "Organization", name: SITE_NAME_FULL },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Trouver ma raquette", item: `${SITE_URL}/trouver-ma-raquette` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="bg-navy text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14 text-center">
          <span className="inline-flex rounded-full border border-navy-border px-3 py-1 text-xs font-bold tracking-wide text-lime mb-4">
            OUTIL GRATUIT
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-balance">
            Quelle raquette de padel est faite pour vous ?
          </h1>
          <p className="mt-4 text-white/70 max-w-xl mx-auto">
            Cinq questions, trente secondes, et une sélection de trois raquettes adaptées à votre
            niveau, votre style de jeu et votre budget — avec le détail de ce qui justifie chaque
            recommandation.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10">
        <Breadcrumb
          items={[{ label: "Accueil", href: "/" }, { label: "Trouver ma raquette" }]}
        />
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
          <RacketFinder />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-16 prose-article">
        <h2>Sur quels critères repose cette recommandation ?</h2>
        <p>
          Choisir une raquette de padel au hasard, ou parce qu&apos;un joueur professionnel
          l&apos;utilise, est le meilleur moyen de freiner sa progression — voire de se blesser. Cet
          outil applique les mêmes critères techniques que ceux détaillés dans nos guides, dans un
          ordre de priorité précis.
        </p>

        <h3>Votre niveau de jeu</h3>
        <p>
          C&apos;est le critère le plus structurant. Une raquette conçue pour un joueur expert
          possède un sweet spot réduit qui exige une frappe déjà très régulière : entre les mains
          d&apos;un débutant, elle produit des vibrations désagréables et une perte de contrôle sur
          la moindre balle décentrée. À l&apos;inverse, un joueur avancé se sentira rapidement limité
          par une raquette d&apos;initiation.
        </p>

        <h3>Votre style de jeu, traduit en forme de tamis</h3>
        <p>
          La forme détermine où se situe le point d&apos;équilibre, donc le compromis entre puissance
          et contrôle. La forme ronde privilégie la tolérance, la forme diamant la puissance, et la
          forme goutte se place entre les deux. Notre article dédié détaille{" "}
          <a href="/articles/forme-diamant-goutte-ronde-raquette-padel">
            l&apos;influence de chaque forme sur les coups techniques du padel
          </a>
          .
        </p>

        <h3>Votre budget réel</h3>
        <p>
          Au-delà de 150 à 200 €, une raquette n&apos;apporte de bénéfice réel que si votre technique
          permet d&apos;en exploiter le potentiel. En dessous de 60 €, la qualité des matériaux
          devient généralement insuffisante pour une pratique régulière. L&apos;outil écarte donc les
          modèles nettement hors de votre fourchette plutôt que de vous pousser vers le plus cher.
        </p>

        <h3>Votre sensibilité articulaire</h3>
        <p>
          Si vous avez déjà ressenti des douleurs au coude ou au poignet, ce critère prend le pas sur
          la recherche de puissance : les formes tolérantes et les poids contenus limitent les
          vibrations transmises au bras. C&apos;est le facteur le plus souvent négligé, et celui qui
          interrompt le plus de pratiques. Notre{" "}
          <a href="/articles/poids-ideal-raquette-padel">guide sur le poids idéal</a> détaille ces
          repères.
        </p>

        <h2>Questions fréquentes</h2>

        <p>
          <strong>Cet outil est-il gratuit ?</strong>
          <br />
          Oui, entièrement, et sans inscription. Le site se finance via le programme Amazon
          Associates : si vous achetez une raquette via l&apos;un de nos liens, nous touchons une
          commission sans surcoût pour vous.
        </p>

        <p>
          <strong>Les recommandations sont-elles influencées par les commissions ?</strong>
          <br />
          Non. Le classement repose uniquement sur l&apos;adéquation entre vos réponses et les
          caractéristiques techniques de chaque raquette. Une raquette moins chère peut donc très
          bien arriver en tête, et c&apos;est fréquemment le cas pour les profils débutants.
        </p>

        <p>
          <strong>Puis-je faire confiance au résultat sans essayer la raquette ?</strong>
          <br />
          Le résultat vous donne une présélection cohérente, ce qui évite les erreurs les plus
          coûteuses. Si un club près de chez vous propose des raquettes à l&apos;essai, cela reste
          le meilleur moyen de valider une sensation de jeu avant l&apos;achat.
        </p>

        <p>
          <strong>Que faire si aucune raquette proposée ne me convient ?</strong>
          <br />
          Refaites le test en ajustant le critère dont vous êtes le moins sûr, souvent le style de
          jeu. Vous pouvez aussi parcourir directement nos{" "}
          <a href="/comparatifs">comparatifs par catégorie</a> pour explorer plus de modèles.
        </p>
      </div>
    </>
  );
}
