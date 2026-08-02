import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleView from "@/components/ArticleView";
import { getArticleBySlug, getArticlesByCategory } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticlesByCategory("article").map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || article.category !== "article") return {};

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article || article.category !== "article") notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    url: `${SITE_URL}/articles/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleView article={article} />
    </>
  );
}
