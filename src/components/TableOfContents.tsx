import type { Heading } from "@/lib/articles";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <details className="not-prose mb-8 rounded-2xl border border-border bg-surface p-5" open>
      <summary className="cursor-pointer font-bold text-sm">Sommaire</summary>
      <ol className="mt-3 space-y-1.5 text-sm">
        {headings.map((h) => (
          <li key={h.slug}>
            <a href={`#${h.slug}`} className="text-brand hover:underline">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
