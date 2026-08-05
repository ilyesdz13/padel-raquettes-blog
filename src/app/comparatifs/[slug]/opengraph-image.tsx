import { getArticleBySlug } from "@/lib/articles";
import { renderArticleOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return renderArticleOgImage(article?.title ?? "Comparatif raquette de padel", "comparatif");
}
