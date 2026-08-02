import { getProductById, buildAffiliateLink, hasRealImage } from "@/lib/products";
import Stars from "@/components/Stars";
import RacketIllustration from "@/components/RacketIllustration";

export default function ProductCard({ id }: { id: string }) {
  const product = getProductById(id);
  if (!product) return null;

  const { url, isReady } = buildAffiliateLink(product);
  const isTopPick = product.score >= 4.6;

  return (
    <div className="not-prose my-6 relative flex flex-col sm:flex-row gap-5 rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-sm">
      {isTopPick && (
        <span className="absolute -top-3 left-5 rounded-full bg-lime px-3 py-1 text-xs font-bold text-lime-ink shadow">
          Coup de cœur
        </span>
      )}
      <div className="shrink-0 mx-auto sm:mx-0">
        <div className="w-[120px] h-[150px] rounded-xl bg-gradient-to-br from-navy to-navy-2 p-3 flex items-center justify-center overflow-hidden">
          {hasRealImage(product) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
          ) : (
            <RacketIllustration shape={product.shape} />
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-brand">{product.brand}</span>
          <Stars score={product.score} />
        </div>
        <h4 className="text-lg font-bold mt-1">{product.name}</h4>
        <p className="text-sm text-muted mt-1">{product.highlight}</p>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
          <dt className="text-muted">Niveau</dt>
          <dd className="font-medium">{product.level}</dd>
          <dt className="text-muted">Style</dt>
          <dd className="font-medium">{product.style}</dd>
          <dt className="text-muted">Forme</dt>
          <dd className="font-medium">{product.shape}</dd>
          <dt className="text-muted">Poids</dt>
          <dd className="font-medium">{product.weight}</dd>
        </dl>
        <div className="mt-4 flex items-center gap-4">
          <a
            href={url}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-lime px-5 py-2.5 text-sm font-bold text-lime-ink hover:bg-lime-dark transition-colors"
          >
            {isReady ? "Voir le prix sur Amazon" : "Rechercher sur Amazon"}
          </a>
          <span className="text-sm font-semibold text-foreground/70">{product.priceRange}</span>
        </div>
      </div>
    </div>
  );
}
