import Link from "next/link";
import Logo from "@/components/Logo";
import { SITE_NAME, SITE_NAME_FULL } from "@/lib/site";

const NAV_LINKS = [
  { href: "/guides", label: "Guides" },
  { href: "/comparatifs", label: "Comparatifs" },
  { href: "/articles", label: "Articles" },
  { href: "/a-propos", label: "À propos" },
  { href: "/mentions-legales", label: "Mentions légales & affiliation" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 bg-navy text-white/70">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-8 border-b border-navy-border">
          <Link href="/" className="flex items-center gap-2.5 font-extrabold text-lg text-white">
            <Logo />
            {SITE_NAME}
          </Link>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-lime transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-white/50">
          <p className="max-w-2xl">
            {`En tant que partenaire Amazon, ${SITE_NAME_FULL} réalise un bénéfice sur les achats remplissant les conditions requises. Les prix et disponibilités sont susceptibles d'être modifiés après publication.`}
          </p>
          <span>© {year} {SITE_NAME_FULL}</span>
        </div>
      </div>
    </footer>
  );
}
