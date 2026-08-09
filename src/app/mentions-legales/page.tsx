import type { Metadata } from "next";
import { SITE_NAME_FULL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales & affiliation",
  description: "Mentions légales et informations sur le programme d'affiliation Amazon de " + SITE_NAME_FULL + ".",
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 prose-article">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">Mentions légales &amp; affiliation</h1>

      <h2>Programme Amazon Associates</h2>
      <p>
        {`${SITE_NAME_FULL} participe au programme Amazon Associates, un programme d'affiliation conçu pour permettre à des sites de percevoir une rémunération grâce à la création de liens vers Amazon.fr. En tant que partenaire Amazon, nous réalisons un bénéfice sur les achats remplissant les conditions requises, sans surcoût pour vous. Amazon et le logo Amazon sont des marques d'Amazon.com, Inc. ou de ses filiales.`}
      </p>

      <h2>Indépendance éditoriale</h2>
      <p>
        Les avis, comparatifs et recommandations publiés sur ce site reflètent notre analyse des
        caractéristiques techniques des produits (poids, forme, niveau, style de jeu). La présence
        d&apos;un lien affilié n&apos;influence pas notre classement ou notre appréciation d&apos;un
        produit.
      </p>

      <h2>Éditeur du site</h2>
      <p>
        Ce site est édité à titre personnel. Pour toute question, vous pouvez nous contacter via
        la page <a href="/a-propos">À propos</a>.
      </p>

      <h2>Cookies et données personnelles</h2>
      <p>
        Ce site utilise des cookies techniques nécessaires à son fonctionnement, des cookies de
        mesure d&apos;audience (Vercel Analytics, sans données personnelles identifiables), ainsi
        que des cookies publicitaires via Google AdSense, qui permettent d&apos;afficher des
        annonces et de financer la gratuité du site. Ces cookies publicitaires ne sont déposés
        qu&apos;après votre consentement explicite, recueilli via la bannière affichée lors de
        votre première visite. Vous pouvez à tout moment revenir sur ce choix en effaçant les
        cookies de votre navigateur pour ce site. Aucune donnée personnelle n&apos;est vendue à
        des tiers.
      </p>
      <p>
        Google, en tant que fournisseur tiers, utilise des cookies pour diffuser des annonces sur
        ce site. L&apos;utilisation par Google du cookie de publicité lui permet, ainsi qu&apos;à
        ses partenaires, de diffuser des annonces pertinentes pour les utilisateurs. Vous pouvez
        désactiver la publicité personnalisée en consultant les{" "}
        <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
          règles de confidentialité de Google pour les annonces
        </a>
        .
      </p>
    </div>
  );
}
