import { getProductsByIds, buildAffiliateLink } from "@/lib/products";
import Stars from "@/components/Stars";

export default function ComparisonTable({ ids }: { ids: string[] }) {
  const products = getProductsByIds(ids);
  if (products.length === 0) return null;

  return (
    <div className="not-prose my-6 overflow-x-auto rounded-2xl border border-border shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-navy text-left text-white">
            <th className="px-4 py-3 font-bold">Raquette</th>
            <th className="px-4 py-3 font-bold">Note</th>
            <th className="px-4 py-3 font-bold">Niveau</th>
            <th className="px-4 py-3 font-bold">Style</th>
            <th className="px-4 py-3 font-bold">Prix</th>
            <th className="px-4 py-3 font-bold"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            const { url, isReady } = buildAffiliateLink(product);
            return (
              <tr
                key={product.id}
                className={`border-t border-border ${index % 2 === 1 ? "bg-foreground/[0.02]" : ""}`}
              >
                <td className="px-4 py-3 font-semibold whitespace-nowrap">{product.name}</td>
                <td className="px-4 py-3">
                  <Stars score={product.score} />
                </td>
                <td className="px-4 py-3">{product.level}</td>
                <td className="px-4 py-3">{product.style}</td>
                <td className="px-4 py-3 font-medium whitespace-nowrap">{product.priceRange}</td>
                <td className="px-4 py-3">
                  <a
                    href={url}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-lime px-3.5 py-1.5 text-xs font-bold text-lime-ink hover:bg-lime-dark transition-colors whitespace-nowrap"
                  >
                    {isReady ? "Voir le prix" : "Rechercher"}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
