"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { SITE_NAME } from "@/lib/site";

const NAV_LINKS = [
  { href: "/guides", label: "Guides" },
  { href: "/comparatifs", label: "Comparatifs" },
  { href: "/articles", label: "Articles" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/85 backdrop-blur supports-[backdrop-filter]:bg-surface/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight shrink-0"
          onClick={() => setOpen(false)}
        >
          <Logo />
          {SITE_NAME}
        </Link>

        <nav className="hidden sm:flex items-center gap-1 text-sm font-semibold">
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
            href="/trouver-ma-raquette"
            className="ml-2 inline-flex rounded-full bg-navy px-4 py-1.5 text-white hover:bg-navy-2 transition-colors"
          >
            Trouver ma raquette
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className="sm:hidden inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 hover:bg-foreground/5 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="sm:hidden border-t border-border px-4 py-3 flex flex-col gap-1 text-sm font-semibold bg-surface">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-foreground/80 hover:bg-foreground/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/trouver-ma-raquette"
            onClick={() => setOpen(false)}
            className="mt-1 inline-flex justify-center rounded-full bg-navy px-4 py-2.5 text-white hover:bg-navy-2 transition-colors"
          >
            Trouver ma raquette
          </Link>
        </nav>
      )}
    </header>
  );
}
