import { MDXRemote } from "next-mdx-remote/rsc";
import type { Article } from "@/lib/articles";
import { CATEGORY_LABELS } from "@/lib/articles";
import { mdxComponents } from "@/components/mdx-components";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";

export default function ArticleView({ article }: { article: Article }) {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <header className="mb-6">
        <span className="inline-block text-xs font-semibold uppercase tracking-wide text-brand mb-2">
          {CATEGORY_LABELS[article.category].label}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 leading-tight">
          {article.title}
        </h1>
        <div className="text-sm text-foreground/50">
          {new Date(article.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          {" · "}
          {article.readingMinutes} min de lecture
        </div>
      </header>

      <div className="mb-8">
        <AffiliateDisclosure />
      </div>

      <div className="prose-article">
        {/*
          blockJS: false — le contenu MDX est généré uniquement par nous (jamais par un
          utilisateur), on autorise donc les expressions JS dans les attributs (ex: ids={[...]}).
        */}
        <MDXRemote
          source={article.content}
          components={mdxComponents}
          options={{ mdxOptions: {}, parseFrontmatter: false, blockJS: false }}
        />
      </div>
    </article>
  );
}
