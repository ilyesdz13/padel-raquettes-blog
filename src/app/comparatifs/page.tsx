import type { Metadata } from "next";
import CategoryListing from "@/components/CategoryListing";
import { CATEGORY_LABELS } from "@/lib/articles";

export const metadata: Metadata = {
  title: CATEGORY_LABELS.comparatif.plural,
  description: CATEGORY_LABELS.comparatif.description,
  alternates: { canonical: "/comparatifs" },
};

export default function ComparatifsPage() {
  return <CategoryListing category="comparatif" />;
}
