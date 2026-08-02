import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface mt-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 text-sm text-foreground/70">
        <p className="mb-3">
          En tant que partenaire Amazon, {SITE_NAME} réalise un bénéfice sur les achats
          remplissant les conditions requises. Les prix et disponibilités sont susceptibles
          d&apos;être modifiés après publication.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/mentions-legales" className="hover:text-brand transition-colors">
            Mentions légales &amp; affiliation
          </Link>
          <Link href="/a-propos" className="hover:text-brand transition-colors">
            À propos
          </Link>
          <span>© {year} {SITE_NAME}</span>
        </div>
      </div>
    </footer>
  );
}
