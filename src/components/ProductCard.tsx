import { getProductById, buildAffiliateLink } from "@/lib/products";

export default function ProductCard({ id }: { id: string }) {
  const product = getProductById(id);
  if (!product) return null;

  const { url, isReady } = buildAffiliateLink(product);

  return (
    <div className="not-prose my-6 flex flex-col sm:flex-row gap-4 rounded-xl border border-border bg-surface p-5">
      <div className="shrink-0 mx-auto sm:mx-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          width={140}
          height={140}
          className="rounded-lg bg-black/5"
        />
      </div>
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">{product.brand}</p>
        <h4 className="text-lg font-bold">{product.name}</h4>
        <p className="text-sm text-foreground/70 mt-1">{product.highlight}</p>
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <dt className="text-foreground/50">Niveau</dt>
          <dd>{product.level}</dd>
          <dt className="text-foreground/50">Style</dt>
          <dd>{product.style}</dd>
          <dt className="text-foreground/50">Forme</dt>
          <dd>{product.shape}</dd>
          <dt className="text-foreground/50">Poids</dt>
          <dd>{product.weight}</dd>
          <dt className="text-foreground/50">Prix indicatif</dt>
          <dd>{product.priceRange}</dd>
        </dl>
        <a
          href={url}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
        >
          {isReady ? "Voir le prix sur Amazon" : "Rechercher sur Amazon"}
        </a>
      </div>
    </div>
  );
}
