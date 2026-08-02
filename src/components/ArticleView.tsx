import { MDXRemote } from "next-mdx-remote/rsc";
import type { Article } from "@/lib/articles";
import { CATEGORY_LABELS } from "@/lib/articles";
import { CATEGORY_STYLES } from "@/lib/site";
import { mdxComponents } from "@/components/mdx-components";
import AffiliateDisclosure from "@/components/AffiliateDisclosure";

export default function ArticleView({ article }: { article: Article }) {
  const style = CATEGORY_STYLES[article.category];

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <header className="mb-6">
        <span className={`inline-flex items-center gap-1.5 rounded-full ${style.bg} ${style.text} px-2.5 py-1 text-xs font-bold uppercase tracking-wide mb-3`}>
          <span aria-hidden="true">{style.icon}</span>
          {CATEGORY_LABELS[article.category].label}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 leading-tight text-balance">
          {article.title}
        </h1>
        <div className="text-sm text-muted">
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
