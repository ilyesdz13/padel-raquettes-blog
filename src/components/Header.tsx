import Link from "next/link";
import Logo from "@/components/Logo";
import { SITE_NAME } from "@/lib/site";

const NAV_LINKS = [
  { href: "/guides", label: "Guides" },
  { href: "/comparatifs", label: "Comparatifs" },
  { href: "/articles", label: "Articles" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/85 backdrop-blur supports-[backdrop-filter]:bg-surface/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight">
          <Logo />
          {SITE_NAME}
        </Link>
        <nav className="flex items-center gap-1 text-sm font-semibold">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/guides"
            className="ml-2 hidden sm:inline-flex rounded-full bg-navy px-4 py-1.5 text-white hover:bg-navy-2 transition-colors"
          >
            Trouver ma raquette
          </Link>
        </nav>
      </div>
    </header>
  );
}
