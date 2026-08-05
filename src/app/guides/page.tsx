import type { Metadata } from "next";
import CategoryListing from "@/components/CategoryListing";
import { CATEGORY_LABELS } from "@/lib/articles";

export const metadata: Metadata = {
  title: CATEGORY_LABELS.guide.plural,
  description: CATEGORY_LABELS.guide.description,
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return <CategoryListing category="guide" />;
}
