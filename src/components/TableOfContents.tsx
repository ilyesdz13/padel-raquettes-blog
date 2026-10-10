import type { Heading } from "@/lib/articles";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <details className="not-prose mb-8 rounded-2xl border border-border bg-surface p-5" open>
      <summary className="-mx-2 -my-2 inline-flex items-center rounded-lg px-2 py-2.5 cursor-pointer select-none font-bold text-sm hover:bg-foreground/5 transition-colors">
        Sommaire
      </summary>
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
