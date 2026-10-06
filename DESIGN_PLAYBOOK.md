# Playbook : amélioration quotidienne du design

Ce document est le mode d'emploi à suivre pour améliorer le design du site **en complément**
de la publication de l'article du jour (voir `AGENT_PLAYBOOK.md`), sans supervision humaine,
dans le cadre de la routine planifiée quotidienne. L'objectif est une progression continue et
sûre de l'UI/UX, jamais une refonte.

## 0. Principe directeur

**Une amélioration ciblée par exécution, jamais une refonte.** Le design évolue par petites
touches cohérentes avec l'identité visuelle existante (navy + jaune-citron "balle de padel",
voir `src/app/globals.css`), pas par changements radicaux non supervisés. Une IA qui exécute
cette tâche chaque jour sans revue humaine doit rester conservatrice : mieux vaut un site qui
s'améliore lentement et sûrement qu'un site qui change de direction visuelle chaque semaine.

## 1. Lire l'historique avant d'agir

Lis `DESIGN_LOG.md` à la racine du projet avant toute chose. Il liste, par date, les
améliorations déjà apportées. Cela évite de :
- répéter une amélioration déjà faite,
- revenir en arrière sur un choix précédent sans bonne raison,
- empiler des changements incohérents entre eux au fil des jours.

## 2. Choisir UNE amélioration du jour

Inspecte le site (composants dans `src/components/`, pages dans `src/app/`, styles dans
`src/app/globals.css`) et choisis **une seule** amélioration parmi ces familles, par ordre de
priorité :

1. **Accessibilité et lisibilité** : contraste insuffisant, taille de texte trop petite sur
   mobile, focus states manquants sur les éléments interactifs, attributs `alt` manquants,
   hiérarchie des titres incohérente.
2. **Responsive / mobile** : débordements, espacements cassés, zones de clic trop petites sur
   petit écran (la majorité du trafic d'un blog affilié vient du mobile).
3. **Cohérence visuelle** : espacements (padding/margin) irréguliers entre sections ou cartes
   similaires, incohérences de rayon de bordure, d'ombre ou de couleur entre composants qui
   devraient se ressembler (ex. `ArticleCard`, `ProductCard`, `ComparisonTable`).
4. **Polish des composants clés pour la conversion** : `ProductCard`, `ComparisonTable`,
   `Hero`, `FinderCTA`, `TrustBar` — ce sont les composants qui portent les liens affiliés et
   l'intention d'achat, leur clarté visuelle a un impact direct sur les revenus du site.
5. **Micro-interactions sobres** : transitions au survol/focus, états actifs des boutons et
   liens — toujours discrètes, jamais une animation qui distrait de la lecture ou ralentit la
   page.
6. **Performance perçue** : tailles d'image, `loading`/`priority` sur les composants `Image`,
   réduction de CSS mort évident si repéré en cours de route.

Privilégie une amélioration **visible et objectivement positive**, pas un changement de goût
pur (ex: ne change pas une couleur de la palette existante sans raison fonctionnelle comme un
problème de contraste avéré).

## 3. Règles strictes à respecter

- **Ne jamais modifier** la palette de couleurs de marque (`--navy`, `--lime`, `--brand`, les
  couleurs `--cat-*`) ni la structure des liens affiliés (`src/lib/products.ts`,
  `buildAffiliateLink`) dans le cadre de cette tâche. Un changement de palette ou de logique
  d'affiliation nécessite une décision explicite du propriétaire du site.
- **Ne jamais toucher** à `content/articles/`, `content/products.json` ou
  `content/calendar.json` dans le cadre de la tâche design — c'est le périmètre de
  `AGENT_PLAYBOOK.md`.
- Reste dans les conventions déjà en place : Tailwind CSS v4 (classes utilitaires), tokens
  définis dans `src/app/globals.css` via `@theme inline`. N'introduis pas une nouvelle
  bibliothèque UI, un nouveau système de styles (ex. styled-components) ou une nouvelle
  police sans raison impérieuse.
- Préfère modifier un composant partagé (dans `src/components/`) plutôt que dupliquer un
  correctif dans plusieurs pages.
- Un changement doit rester **reversible facilement** : pas de restructuration profonde de
  l'arborescence des composants ou des routes.

## 4. Vérifier avant de publier

Depuis la racine du projet :

```bash
npm run lint
npm run build
```

Le lint et le build **doivent** passer sans erreur. Si l'amélioration choisie casse le build
ou introduit des erreurs de lint, corrige-la ou reviens-y — ne publie jamais un changement de
design qui casse le site.

Si possible, lance `npm run dev` et vérifie visuellement l'effet du changement sur au moins
une page concernée (accueil, un article, une fiche produit) avant de conclure.

## 5. Documenter dans DESIGN_LOG.md

Ajoute une entrée en haut de `DESIGN_LOG.md` (ordre antéchronologique, le plus récent en
premier) avec ce format :

```markdown
## AAAA-MM-JJ

- **Amélioration** : description courte et concrète de ce qui a changé.
- **Fichiers** : liste des fichiers modifiés.
- **Pourquoi** : la raison (accessibilité, cohérence, conversion, mobile...).
```

## 6. Commit et push

Fais un commit séparé de celui de l'article du jour, pour garder un historique lisible :

```bash
git add src/ DESIGN_LOG.md
git commit -m "Design : <résumé court de l'amélioration du jour>"
git push
```

## 7. Rapport de fin d'exécution

Dans le rapport de fin de routine (en complément du rapport article), indique : l'amélioration
de design apportée, les fichiers modifiés, le résultat du lint/build, et la confirmation du
push. Si aucune amélioration raisonnable et sûre n'a été identifiée ce jour-là, dis-le
explicitement plutôt que de forcer un changement superflu — passer un jour sans modification
design est acceptable, un changement de mauvaise qualité ne l'est pas.

## Rappels importants

- Une amélioration par exécution, pas plus.
- Toujours en complément de l'article du jour, jamais à sa place.
- Jamais de refonte, jamais de changement de palette ou d'identité de marque.
- En cas de doute entre deux améliorations possibles, choisis la plus petite et la plus sûre.
