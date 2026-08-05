import Link from "next/link";

export default function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-5 text-sm text-muted overflow-x-auto whitespace-nowrap">
      {items.map((item, i) => (
        <span key={i}>
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground/70">{item.label}</span>
          )}
          {i < items.length - 1 && <span className="mx-2 text-border">/</span>}
        </span>
      ))}
    </nav>
  );
}
