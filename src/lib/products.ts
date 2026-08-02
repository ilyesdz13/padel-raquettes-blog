import productsData from "../../content/products.json";

export type Product = {
  id: string;
  name: string;
  brand: string;
  shape: string;
  level: string;
  style: string;
  priceRange: string;
  weight: string;
  highlight: string;
  score: number;
  asin: string;
  image: string;
};

const products = productsData as Product[];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByIds(ids: string[]): Product[] {
  return ids
    .map((id) => getProductById(id))
    .filter((p): p is Product => Boolean(p));
}

/** Vrai dès que `product.image` pointe vers une vraie photo (pas le placeholder par défaut). */
export function hasRealImage(product: Product): boolean {
  return Boolean(product.image) && !product.image.includes("placeholder.svg");
}

const AMAZON_DOMAIN = "www.amazon.fr";

/**
 * Tant qu'aucun tag Associates n'est configuré (NEXT_PUBLIC_AMAZON_TAG) ou que
 * l'ASIN du produit n'a pas été renseigné, le lien reste non-affilié pour éviter
 * de publier un lien cassé ou non conforme au programme Amazon Associates.
 */
export function buildAffiliateLink(product: Product): { url: string; isReady: boolean } {
  const tag = process.env.NEXT_PUBLIC_AMAZON_TAG;
  const hasAsin = Boolean(product.asin) && product.asin !== "A_COMPLETER";
  const hasTag = Boolean(tag) && tag !== "TAG-A-CONFIGURER";

  if (hasAsin && hasTag) {
    return { url: `https://${AMAZON_DOMAIN}/dp/${product.asin}?tag=${tag}`, isReady: true };
  }

  const query = encodeURIComponent(`${product.brand} ${product.name}`);
  return { url: `https://${AMAZON_DOMAIN}/s?k=${query}`, isReady: false };
}
