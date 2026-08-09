"use client";

import { useState } from "react";
import Link from "next/link";
import { FINDER_QUESTIONS, recommendRackets, type FinderAnswers } from "@/lib/finder";
import { buildAffiliateLink } from "@/lib/products";
import RacketIllustration from "@/components/RacketIllustration";
import Stars from "@/components/Stars";

type Answers = Partial<Record<keyof FinderAnswers, string>>;

export default function RacketFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const total = FINDER_QUESTIONS.length;
  const isDone = step >= total;

  function choose(key: keyof FinderAnswers, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStep((s) => s + 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
  }

  if (isDone) {
    const results = recommendRackets(answers as FinderAnswers);
    return (
      <div>
        <div className="text-center mb-8">
          <span className="inline-flex rounded-full bg-lime px-3 py-1 text-xs font-bold text-lime-ink mb-3">
            VOTRE RÉSULTAT
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Nos 3 raquettes pour votre profil
          </h2>
          <p className="text-muted mt-2 text-sm max-w-lg mx-auto">
            Classement établi à partir de vos réponses et des caractéristiques techniques de chaque
            raquette — forme, poids, niveau visé et budget.
          </p>
        </div>

        <div className="space-y-5">
          {results.map(({ product, reasons, warnings }, index) => {
            const { url, isReady } = buildAffiliateLink(product);
            return (
              <div
                key={product.id}
                className={`relative rounded-2xl border bg-surface p-5 sm:p-6 shadow-sm ${
                  index === 0 ? "border-lime-dark ring-2 ring-lime/40" : "border-border"
                }`}
              >
                {index === 0 && (
                  <span className="absolute -top-3 left-5 rounded-full bg-lime px-3 py-1 text-xs font-bold text-lime-ink shadow">
                    Meilleure correspondance
                  </span>
                )}
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="shrink-0 mx-auto sm:mx-0 w-[92px] h-[118px] rounded-xl bg-gradient-to-br from-navy to-navy-2 p-2.5">
                    <RacketIllustration shape={product.shape} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wide text-brand">
                        {product.brand}
                      </span>
                      <Stars score={product.score} />
                    </div>
                    <h3 className="text-lg font-bold mt-1">{product.name}</h3>

                    <ul className="mt-3 space-y-1.5 text-sm">
                      {reasons.map((reason) => (
                        <li key={reason} className="flex gap-2">
                          <span className="text-brand font-bold" aria-hidden="true">✓</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                      {warnings.map((warning) => (
                        <li key={warning} className="flex gap-2 text-muted">
                          <span aria-hidden="true">!</span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <a
                        href={url}
                        target="_blank"
                        rel="nofollow sponsored noopener noreferrer"
                        className="inline-flex rounded-full bg-lime px-5 py-2.5 text-sm font-bold text-lime-ink hover:bg-lime-dark transition-colors"
                      >
                        {isReady ? "Voir le prix sur Amazon" : "Rechercher sur Amazon"}
                      </a>
                      <span className="text-sm font-semibold text-foreground/70">
                        {product.priceRange}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={restart}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-bold hover:bg-foreground/5 transition-colors"
          >
            Refaire le test
          </button>
          <Link
            href="/guides/comment-choisir-sa-raquette-de-padel"
            className="rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white hover:bg-navy-2 transition-colors text-center"
          >
            Comprendre les critères en détail
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted text-center max-w-lg mx-auto">
          Ces recommandations reposent sur les caractéristiques techniques publiques des raquettes.
          Rien ne remplace un essai en club si vous en avez la possibilité.
        </p>
      </div>
    );
  }

  const current = FINDER_QUESTIONS[step];
  const progress = Math.round((step / total) * 100);

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-muted mb-2">
          <span>Question {step + 1} sur {total}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full bg-lime transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-6 text-balance">
        {current.question}
      </h2>

      <div className="space-y-3">
        {current.options.map((option) => (
          <button
            key={option.value}
            onClick={() => choose(current.key, option.value)}
            className="w-full text-left rounded-xl border border-border bg-surface p-4 hover:border-lime-dark hover:bg-lime/5 transition-colors group"
          >
            <div className="font-bold group-hover:text-lime-ink dark:group-hover:text-foreground">
              {option.label}
            </div>
            <div className="text-sm text-muted mt-0.5">{option.hint}</div>
          </button>
        ))}
      </div>

      {step > 0 && (
        <button
          onClick={() => setStep((s) => s - 1)}
          className="mt-6 text-sm text-muted hover:text-foreground transition-colors"
        >
          ← Question précédente
        </button>
      )}
    </div>
  );
}
