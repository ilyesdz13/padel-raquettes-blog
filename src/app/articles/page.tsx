import type { Metadata } from "next";
import CategoryListing from "@/components/CategoryListing";
import { CATEGORY_LABELS } from "@/lib/articles";

export const metadata: Metadata = {
  title: CATEGORY_LABELS.article.plural,
  description: CATEGORY_LABELS.article.description,
};

export default function ArticlesPage() {
  return <CategoryListing category="article" />;
}
