"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie-consent-ads";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function updateConsent(granted: boolean) {
  const state = granted ? "granted" : "denied";
  window.gtag?.("consent", "update", {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted") {
      updateConsent(true);
    } else if (stored !== "declined") {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
    updateConsent(true);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface p-4 sm:p-5 shadow-lg">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-muted flex-1">
          Ce site utilise des cookies publicitaires (Google AdSense) pour afficher des
          annonces personnalisées et financer sa gratuité. Vous pouvez accepter ou refuser
          ces cookies — voir notre page{" "}
          <Link href="/mentions-legales" className="underline hover:text-foreground">
            mentions légales
          </Link>
          .
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-foreground/5 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="rounded-full bg-lime px-4 py-2 text-sm font-bold text-lime-ink hover:bg-lime-dark transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
