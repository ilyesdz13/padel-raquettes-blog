import { getAllProducts, type Product } from "@/lib/products";

export type Level = "debutant" | "intermediaire" | "avance";
export type Style = "controle" | "polyvalent" | "puissance";
export type Budget = "petit" | "moyen" | "eleve";
export type ArmSensitivity = "oui" | "non";
export type Frequency = "occasionnel" | "regulier" | "intensif";

export type FinderAnswers = {
  level: Level;
  style: Style;
  budget: Budget;
  arm: ArmSensitivity;
  frequency: Frequency;
};

export type Recommendation = {
  product: Product;
  score: number;
  reasons: string[];
  warnings: string[];
};

/** Niveaux numériques : 1 = débutant, 2 = intermédiaire, 3 = avancé, 4 = expert. */
function productLevelRange(level: string): [number, number] {
  const l = level.toLowerCase();
  const has = (s: string) => l.includes(s);
  const min = has("débutant") ? 1 : has("intermédiaire") ? 2 : has("avancé") ? 3 : 4;
  const max = has("expert") ? 4 : has("avancé") ? 3 : has("intermédiaire") ? 2 : 1;
  return [min, Math.max(min, max)];
}

const ANSWER_LEVEL: Record<Level, number> = { debutant: 1, intermediaire: 2, avance: 3.5 };

function shapeFamily(shape: string): "rond" | "goutte" | "diamant" {
  const s = shape.toLowerCase();
  if (s.includes("diamant")) return "diamant";
  if (s.includes("goutte")) return "goutte";
  return "rond";
}

/** « forme » est féminin : l'adjectif doit s'accorder dans les phrases affichées. */
const SHAPE_LABEL: Record<"rond" | "goutte" | "diamant", string> = {
  rond: "ronde",
  goutte: "goutte",
  diamant: "diamant",
};

/** Prix bas de la fourchette "160-190€" → 160. */
function lowPrice(priceRange: string): number {
  const match = priceRange.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

/** Poids moyen de "345-360g" → 352.5. */
function averageWeight(weight: string): number {
  const nums = weight.match(/\d+/g)?.map(Number) ?? [];
  if (nums.length === 0) return 360;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

const BUDGET_CEILING: Record<Budget, number> = { petit: 110, moyen: 190, eleve: Infinity };

const STYLE_SHAPE_FIT: Record<Style, Record<"rond" | "goutte" | "diamant", number>> = {
  controle: { rond: 30, goutte: 18, diamant: 0 },
  polyvalent: { rond: 16, goutte: 30, diamant: 12 },
  puissance: { rond: 0, goutte: 18, diamant: 30 },
};

export function recommendRackets(answers: FinderAnswers, count = 3): Recommendation[] {
  const target = ANSWER_LEVEL[answers.level];
  const ceiling = BUDGET_CEILING[answers.budget];

  const scored = getAllProducts().map((product) => {
    const reasons: string[] = [];
    const warnings: string[] = [];
    let score = 0;

    // Adéquation au niveau : le critère le plus structurant.
    const [min, max] = productLevelRange(product.level);
    if (target >= min && target <= max) {
      score += 35;
      reasons.push(`Conçue pour un niveau ${product.level.toLowerCase()}`);
    } else {
      const distance = target < min ? min - target : target - max;
      score += Math.max(0, 35 - distance * 22);
      if (target < min) warnings.push("Plus exigeante que votre niveau actuel");
    }

    // Style de jeu, via la forme du tamis.
    const family = shapeFamily(product.shape);
    const styleScore = STYLE_SHAPE_FIT[answers.style][family];
    score += styleScore;
    if (styleScore >= 30) {
      const label =
        answers.style === "controle" ? "le contrôle et la tolérance"
        : answers.style === "puissance" ? "la puissance en attaque"
        : "la polyvalence";
      reasons.push(`Forme ${SHAPE_LABEL[family]} : idéale pour ${label}`);
    }

    // Budget : au-delà du plafond, la pénalité croît avec le dépassement.
    const price = lowPrice(product.priceRange);
    if (price <= ceiling) {
      score += 20;
      reasons.push(`Dans votre budget (${product.priceRange})`);
    } else {
      const overshoot = (price - ceiling) / ceiling;
      score -= Math.min(45, overshoot * 60);
      warnings.push(`Au-dessus de votre budget (${product.priceRange})`);
    }

    // Sensibilité du bras : privilégie les formes tolérantes et les poids contenus.
    const weight = averageWeight(product.weight);
    if (answers.arm === "oui") {
      if (family === "rond") { score += 15; reasons.push("Forme ronde : vibrations limitées"); }
      else if (family === "goutte") score += 7;
      else { score -= 18; warnings.push("Forme diamant : transmet plus de vibrations"); }

      if (weight <= 355) { score += 10; reasons.push(`Poids contenu (${product.weight})`); }
      else if (weight >= 368) { score -= 10; warnings.push(`Poids élevé (${product.weight})`); }
    }

    // Fréquence : un joueur occasionnel gagne à rester léger, un intensif peut assumer plus lourd.
    if (answers.frequency === "occasionnel" && weight <= 355) score += 8;
    if (answers.frequency === "intensif" && weight >= 360) score += 6;

    // Départage par la note éditoriale, sans jamais dominer les critères d'adéquation.
    score += product.score * 2;

    return { product, score, reasons: reasons.slice(0, 3), warnings: warnings.slice(0, 2) };
  });

  return scored.sort((a, b) => b.score - a.score).slice(0, count);
}

export const FINDER_QUESTIONS = [
  {
    key: "level" as const,
    question: "Quel est votre niveau au padel ?",
    options: [
      { value: "debutant", label: "Débutant", hint: "Moins d'un an de pratique" },
      { value: "intermediaire", label: "Intermédiaire", hint: "Frappe régulière, jeu construit" },
      { value: "avance", label: "Avancé / Expert", hint: "Technique solide, compétition" },
    ],
  },
  {
    key: "style" as const,
    question: "Qu'attendez-vous en priorité de votre raquette ?",
    options: [
      { value: "controle", label: "Du contrôle", hint: "Placer la balle, jeu défensif" },
      { value: "polyvalent", label: "De la polyvalence", hint: "Un bon compromis partout" },
      { value: "puissance", label: "De la puissance", hint: "Smash, finition d'échange" },
    ],
  },
  {
    key: "budget" as const,
    question: "Quel budget souhaitez-vous y consacrer ?",
    options: [
      { value: "petit", label: "Moins de 110 €", hint: "Premier achat, découverte" },
      { value: "moyen", label: "110 à 190 €", hint: "Bon rapport qualité/prix" },
      { value: "eleve", label: "Plus de 190 €", hint: "Haut de gamme, performance" },
    ],
  },
  {
    key: "arm" as const,
    question: "Avez-vous déjà eu des douleurs au bras, coude ou poignet ?",
    options: [
      { value: "oui", label: "Oui, je suis sensible", hint: "Tennis elbow, gêne articulaire" },
      { value: "non", label: "Non, aucun souci", hint: "Aucun antécédent" },
    ],
  },
  {
    key: "frequency" as const,
    question: "À quelle fréquence jouez-vous ?",
    options: [
      { value: "occasionnel", label: "Occasionnellement", hint: "1 à 2 fois par mois" },
      { value: "regulier", label: "Régulièrement", hint: "1 à 2 fois par semaine" },
      { value: "intensif", label: "Intensivement", hint: "3 fois par semaine ou plus" },
    ],
  },
] as const;
