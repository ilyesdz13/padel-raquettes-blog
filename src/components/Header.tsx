import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const NAV_LINKS = [
  { href: "/guides", label: "Guides" },
  { href: "/comparatifs", label: "Comparatifs" },
  { href: "/articles", label: "Articles" },
  { href: "/a-propos", label: "À propos" },
];

export default function Header() {
  return (
    <header className="border-b border-border bg-surface sticky top-0 z-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white">
            P
          </span>
          {SITE_NAME}
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
