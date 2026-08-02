import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "À propos",
  description: `Pourquoi ${SITE_NAME} existe et comment nous sélectionnons les raquettes de padel que nous recommandons.`,
};

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 prose-article">
      <h1 className="text-3xl font-extrabold tracking-tight mb-6">À propos de {SITE_NAME}</h1>
      <p>
        {SITE_NAME} publie régulièrement des guides d&apos;achat, des comparatifs et des articles
        pour aider les joueurs de padel, du débutant au joueur confirmé, à choisir une raquette
        adaptée à leur niveau, leur style de jeu et leur budget.
      </p>
      <p>
        Nos recommandations s&apos;appuient sur les caractéristiques techniques publiques des
        raquettes (forme, poids, noyau, niveau visé) et sur des comparatifs croisés entre marques.
        Le site est financé par les commissions du programme Amazon Associates — voir notre page{" "}
        <a href="/mentions-legales">mentions légales</a>.
      </p>
    </div>
  );
}
