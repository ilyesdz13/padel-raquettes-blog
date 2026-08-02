import { getProductsByIds, buildAffiliateLink } from "@/lib/products";

export default function ComparisonTable({ ids }: { ids: string[] }) {
  const products = getProductsByIds(ids);
  if (products.length === 0) return null;

  return (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-brand/5 text-left">
            <th className="px-3 py-2 font-semibold">Raquette</th>
            <th className="px-3 py-2 font-semibold">Niveau</th>
            <th className="px-3 py-2 font-semibold">Style</th>
            <th className="px-3 py-2 font-semibold">Poids</th>
            <th className="px-3 py-2 font-semibold">Prix</th>
            <th className="px-3 py-2 font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const { url, isReady } = buildAffiliateLink(product);
            return (
              <tr key={product.id} className="border-t border-border">
                <td className="px-3 py-2 font-medium">{product.name}</td>
                <td className="px-3 py-2">{product.level}</td>
                <td className="px-3 py-2">{product.style}</td>
                <td className="px-3 py-2">{product.weight}</td>
                <td className="px-3 py-2">{product.priceRange}</td>
                <td className="px-3 py-2">
                  <a
                    href={url}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="text-brand font-semibold hover:underline whitespace-nowrap"
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
