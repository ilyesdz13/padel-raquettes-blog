# Journal des améliorations de design

Historique des améliorations apportées au design du site, une entrée par exécution de la
routine quotidienne (voir `DESIGN_PLAYBOOK.md`). La plus récente en premier.

## 2026-10-25

- **Amélioration** : ajout d'une sémantique de région accessible (`role="region"`,
  `aria-label="Consentement aux cookies"`) sur le conteneur de la bannière de consentement
  aux cookies (`CookieConsent`). Cette bannière s'affiche en superposition fixe en bas de
  l'écran à chaque nouvelle visite, mais n'était jusqu'ici qu'un simple `<div>` sans aucune
  sémantique de landmark : un utilisateur de lecteur d'écran qui navigue par régions ne
  pouvait pas l'identifier comme un bloc distinct du reste de la page, ni la retrouver
  facilement après l'avoir quittée au clavier. Le même principe de région nommée avait déjà
  été appliqué au tableau comparatif (`ComparisonTable`, 2026-10-23). Aucun changement
  visuel : la mise en page, les couleurs et le texte de la bannière restent identiques.
- **Fichiers** : `src/components/CookieConsent.tsx`.
- **Pourquoi** : accessibilité — cette bannière est l'un des tout premiers éléments
  rencontrés par un visiteur de lecteur d'écran sur chaque nouvelle visite ; lui donner une
  sémantique de région nommée facilite son repérage et sa navigation, par cohérence avec les
  autres zones déjà identifiées de cette façon sur le site.

## 2026-10-24

- **Amélioration** : ajout d'un lien « Aller au contenu principal » (skip link) juste avant le
  `Header`, dans `layout.tsx`, qui s'applique à toutes les pages du site. Jusqu'ici, un
  utilisateur naviguant au clavier (ou un utilisateur de lecteur d'écran) devait parcourir tous
  les liens du `Header` (logo, navigation desktop, bouton « Trouver ma raquette » ou burger
  mobile) avant d'atteindre le contenu de la page — répétitif sur chacune des pages du site,
  d'autant plus pénalisant sur les pages d'article où le contenu utile commence loin derrière
  l'en-tête. Le lien est masqué visuellement par défaut (`sr-only`) et devient visible
  uniquement au focus clavier (`focus:not-sr-only`, positionné en haut à gauche avec le style
  des autres badges du site), pointant vers un nouvel `id="contenu-principal"` ajouté sur la
  balise `<main>`. Aucun changement visuel pour un visiteur à la souris ou au tactile.
- **Fichiers** : `src/app/layout.tsx`.
- **Pourquoi** : accessibilité clavier — un lien d'évitement vers le contenu principal est une
  pratique standard qui manquait entièrement au site, alors qu'il réduit directement la charge
  de navigation répétitive pour les utilisateurs clavier et lecteur d'écran sur l'intégralité
  des pages, y compris les pages d'article qui portent les liens affiliés.

## 2026-10-23 (2)

- **Amélioration** : ajout d'une sémantique de région accessible (`role="region"`,
  `aria-label="Tableau comparatif des raquettes"`, `tabIndex={0}`) sur le conteneur
  `overflow-x-auto` du `ComparisonTable`. Ce tableau déborde horizontalement sur mobile et sur
  les écrans étroits (6 colonnes : raquette, note, niveau, style, prix, bouton), mais le simple
  `overflow-x-auto` d'un `<div>` n'est pas focusable au clavier : un utilisateur qui navigue au
  clavier (ou à l'aide d'un lecteur d'écran couplé à une navigation séquentielle), sans souris
  ni geste tactile pour faire défiler horizontalement, ne pouvait jusqu'ici ni atteindre ni
  parcourir les colonnes masquées par le débordement. Le conteneur est désormais identifié comme
  une région nommée et reçoit le focus clavier (`Tab`), ce qui permet de le faire défiler avec
  les flèches une fois focus. Aucun changement visuel : la mise en page, les couleurs et le
  contenu du tableau restent identiques.
- **Fichiers** : `src/components/ComparisonTable.tsx`.
- **Pourquoi** : accessibilité / conversion — `ComparisonTable` est l'un des composants qui
  porte le plus de liens affiliés par occurrence (jusqu'à plusieurs raquettes comparées dans une
  seule ligne de colonnes), et il est systématiquement placé en tout début des articles
  `comparatif` ; un contenu horizontalement scrollable inaccessible au clavier pénalise
  directement la lecture et la conversion pour cette catégorie de visiteurs.

## 2026-10-23

- **Amélioration** : ajout de `aria-hidden="true"` sur trois emojis décoratifs qui n'en
  bénéficiaient pas encore, par cohérence avec le traitement déjà appliqué partout ailleurs sur
  le site (icônes des catégories dans `CATEGORY_STYLES`, coche décorative de `RacketFinder`,
  icône "ℹ️" de `AffiliateDisclosure`). Les trois cas concernés : le badge "🎾 Le blog qui parle
  vraiment padel" du `Hero` (l'emoji était lu par un lecteur d'écran juste avant le texte,
  l'annonçant deux fois en quelque sorte — une fois via l'emoji, une fois via le mot « padel »
  qui suit), la coche "✓" de chacun des trois points de confiance du `Hero` (« Comparatifs
  indépendants », etc. — exactement le même motif de coche déjà masqué dans `RacketFinder`
  depuis une précédente itération, mais pas encore corrigé ici), et l'emoji "🎾" affiché seul
  au-dessus du titre de la page 404 (`not-found.tsx`), purement décoratif puisque le titre
  « Balle hors du court » qui suit porte déjà tout le sens utile. Aucun changement visuel : le
  texte affiché à l'écran reste strictement identique.
- **Fichiers** : `src/components/Hero.tsx`, `src/app/not-found.tsx`.
- **Pourquoi** : accessibilité — un lecteur d'écran annonce par défaut la description de chaque
  emoji (« tennis », « coche blanche », etc.), ce qui ajoute un bruit redondant avant un texte
  qui porte déjà toute l'information utile ; masquer ces emojis purement décoratifs aligne ces
  trois occurrences sur la convention déjà en place ailleurs sur le site.

## 2026-10-22 (2)

- **Amélioration** : correction d'un saut dans la hiérarchie des titres sur le composant
  `ProductCard`. Le nom du produit (ex. « Wilson Accent LT ») était rendu avec un `<h4>`, alors
  que la quasi-totalité des articles du site insèrent ce composant soit directement après un
  titre `##` (`<h2>`), soit même avant tout titre de section — passant directement de `<h1>`
  (titre de l'article) ou `<h2>` à `<h4>` sans `<h3>` intermédiaire. Ce saut de niveau est
  repéré par les outils d'audit d'accessibilité et nuit à la navigation par lecteur d'écran, qui
  s'appuie sur la hiérarchie des titres pour se déplacer dans la page. Le `<h4>` devient `<h3>`,
  ce qui rend la hiérarchie strictement séquentielle dans tous les cas observés (après un `<h2>`
  ou en tout début d'article). Aucun changement visuel : la taille, le poids et la couleur du
  texte restent identiques (classes Tailwind inchangées).
- **Fichiers** : `src/components/ProductCard.tsx`.
- **Pourquoi** : accessibilité — `ProductCard` est le composant qui porte le plus grand nombre
  de liens affiliés du site, présent dans la quasi-totalité des articles ; une hiérarchie de
  titres incohérente y pénalise directement la navigation des utilisateurs de lecteur d'écran,
  qui s'en servent pour comprendre et parcourir la structure de chaque page.

## 2026-10-22

- **Amélioration** : ajout d'un texte accessible masqué (« (ouvre un nouvel onglet) ») sur les
  trois boutons d'affiliation Amazon du site (`ProductCard`, `ComparisonTable`, `RacketFinder`).
  Ces liens portent tous `target="_blank"` pour ouvrir Amazon dans un nouvel onglet, mais rien
  ne signalait ce changement de contexte à un utilisateur de lecteur d'écran : il découvre le
  changement d'onglet après coup, sans avoir pu l'anticiper. Le texte ajouté est masqué
  visuellement (`sr-only`), donc perçu uniquement par les technologies d'assistance — aucun
  changement visuel, de couleur ni de mise en page sur les trois boutons.
- **Fichiers** : `src/components/ProductCard.tsx`, `src/components/ComparisonTable.tsx`,
  `src/components/RacketFinder.tsx`.
- **Pourquoi** : accessibilité — ces trois composants portent la quasi-totalité des liens
  affiliés du site, les points de conversion les plus importants ; un utilisateur de lecteur
  d'écran qui ne sait pas qu'un lien va ouvrir un nouvel onglet perd le fil de sa navigation
  (retour en arrière qui ne fonctionne pas comme attendu), ce qui est particulièrement
  pénalisant juste avant un clic vers Amazon.

## 2026-10-21 (2)

- **Amélioration** : ajout de `loading="lazy"` et `decoding="async"` sur l'image produit du
  `ComparisonTable`. `ProductCard` applique déjà ces deux attributs sur son image équivalente
  (depuis sa création), mais l'image du tableau comparatif ne les avait jamais reçus — une
  incohérence entre deux composants qui affichent la même image produit. Le tableau comparatif
  apparaît le plus souvent en milieu d'article, après le texte d'introduction : charger ses
  images produit en différé plutôt qu'immédiatement allège le chargement initial de la page.
  Aucun changement visuel, de couleur ni de mise en page.
- **Fichiers** : `src/components/ComparisonTable.tsx`.
- **Pourquoi** : performance perçue / cohérence — aligne le chargement d'image du
  `ComparisonTable` sur celui déjà en place dans `ProductCard`, deux composants qui jouent un
  rôle équivalent (présentation produit) et qui devraient se comporter de la même façon.

## 2026-10-21

- **Amélioration** : agrandissement de la zone cliquable du bouton d'affiliation
  (« Voir le prix » / « Rechercher ») dans chaque ligne du `ComparisonTable`. Ce bouton avait
  déjà été corrigé une première fois le 2026-10-07 (de `py-1.5` à `py-2.5`), mais n'avait pas
  reçu la correction finale appliquée depuis à tous les boutons équivalents du site (`py-3`),
  déjà en place sur `ProductCard` (2026-10-12), `RacketFinder` (2026-10-13 et 2026-10-14) et le
  menu mobile du `Header` (2026-10-20) — ce bouton du tableau comparatif restait donc la seule
  cible tactile de ce type encore sous le seuil déjà corrigé partout ailleurs. Le padding passe
  à `py-3`, sans changer la couleur, la forme ni le texte du bouton.
- **Fichiers** : `src/components/ComparisonTable.tsx`.
- **Pourquoi** : mobile / conversion / cohérence — ce bouton porte le lien affilié principal de
  chaque ligne du tableau comparatif, l'un des composants les plus engageants pour la conversion
  selon `DESIGN_PLAYBOOK.md` ; une cible tactile sous le seuil recommandé pénalise le taux de
  clic sur mobile, et l'incohérence avec les boutons équivalents déjà corrigés cassait
  l'uniformité des CTA du site.

## 2026-10-20 (2)

- **Amélioration** : agrandissement de la zone cliquable des liens de navigation du menu
  mobile (`Header`), affiché au clic sur le bouton burger. Les trois liens de navigation
  (« Guides », « Comparatifs », « Articles ») ainsi que le bouton d'appel à l'action
  « Trouver ma raquette » utilisaient encore `py-2.5` (~40px de hauteur sur mobile), alors que
  ce même seuil avait déjà été corrigé à `py-3` (~44px) sur des composants équivalents ailleurs
  sur le site (boutons du quiz `RacketFinder`, bannière cookies). Le menu mobile du `Header` —
  présent sur toutes les pages et seul point d'accès à la navigation principale sur petit
  écran — n'avait pas encore reçu cette correction. Le padding passe à `py-3` sur les quatre
  liens concernés, sans changer la couleur, la forme ni le texte.
- **Fichiers** : `src/components/Header.tsx`.
- **Pourquoi** : mobile / accessibilité / cohérence — le menu mobile est le seul accès à la
  navigation principale (y compris vers l'outil de recommandation `RacketFinder`) sur les
  petits écrans, d'où vient la majorité du trafic du site ; une cible tactile sous le seuil
  recommandé y est plus pénalisante que sur un composant secondaire, et l'incohérence avec les
  autres boutons déjà corrigés cassait l'uniformité du site.

## 2026-10-20

- **Amélioration** : ajout d'un libellé accessible explicite (`role="img"` + `aria-label`) sur
  le composant `Stars`, qui affiche la note sur 5 d'une raquette dans `ProductCard` et
  `ComparisonTable`. Jusqu'ici, les étoiles visuelles étaient correctement masquées aux
  lecteurs d'écran (`aria-hidden`), mais le chiffre de note affiché à côté (ex. « 4.6 ») ne
  portait aucun contexte : un lecteur d'écran l'annonçait comme un nombre isolé, sans indiquer
  qu'il s'agit d'une note sur 5. Le conteneur porte désormais `aria-label="Note : 4.6 sur 5"`
  (valeur dynamique) et le texte visuel du chiffre est à son tour masqué (`aria-hidden`) pour
  éviter une double annonce. Aucun changement visuel : les étoiles et le chiffre restent
  identiques à l'écran.
- **Fichiers** : `src/components/Stars.tsx`.
- **Pourquoi** : accessibilité — `Stars` est utilisé dans les deux composants qui portent le
  plus de liens affiliés du site (`ProductCard`, `ComparisonTable`), où la note éditoriale est
  un argument de conversion ; un lecteur d'écran qui ne reçoit qu'un chiffre nu sans unité ni
  contexte perd une information utile à la décision d'achat.

## 2026-10-19

- **Amélioration** : agrandissement de la zone cliquable des liens vers chaque section dans le
  `Sommaire` (`TableOfContents`) affiché en haut de chaque article. Ces liens n'avaient aucun
  padding (`text-sm` seul), ce qui donnait une cible tactile d'une vingtaine de pixels de
  hauteur sur mobile — nettement sous le minimum recommandé d'environ 44px, alors que ce
  composant est le premier élément interactif rencontré sur la quasi-totalité des pages
  d'article (guides, comparatifs, articles) du site. La zone cliquable passe à `px-1 py-2` avec
  des marges négatives (`-mx-1 -my-2`) qui compensent visuellement l'ajout de padding, selon le
  même principe déjà appliqué au fil d'Ariane (2026-10-13) et aux liens du footer (2026-10-14),
  pour que le texte garde exactement la même position qu'avant.
- **Fichiers** : `src/components/TableOfContents.tsx`.
- **Pourquoi** : mobile / accessibilité — une cible tactile trop petite sur un composant de
  navigation présent en tête de chaque page d'article pénalise l'une des premières
  interactions possibles sur mobile, là où arrive la majorité du trafic du site.

## 2026-10-14 (2)

- **Amélioration** : agrandissement de la zone cliquable des boutons « Refaire le test » et
  « Comprendre les critères en détail », affichés sur l'écran de résultat du quiz
  `RacketFinder` (une fois les 5 questions répondues). Ces deux boutons utilisaient encore
  `py-2.5` (~40px de hauteur sur mobile), alors que le bouton d'affiliation du même écran
  (« Voir le prix sur Amazon ») avait déjà été corrigé à `py-3` (~44px) le 2026-10-13 — la
  correction n'avait pas été répercutée sur ces deux boutons, pourtant présents sur le même
  écran de fin de test. Le padding passe à `py-3`, sans changer la couleur, la forme ni le
  texte des boutons.
- **Fichiers** : `src/components/RacketFinder.tsx`.
- **Pourquoi** : mobile / conversion / cohérence — cet écran est l'aboutissement du principal
  outil de conversion du site ; une cible tactile sous le seuil recommandé sur des boutons qui
  y figurent pénalise l'expérience mobile juste après que l'utilisateur a terminé le test, et
  l'incohérence avec le bouton Amazon voisin cassait l'uniformité visuelle de l'écran.

## 2026-10-14

- **Amélioration** : agrandissement de la zone cliquable des liens de navigation du pied de
  page (`Footer`). Ces liens (« Guides », « Comparatifs », « Articles », « À propos »,
  « Mentions légales & affiliation ») n'avaient aucun padding (`text-sm font-medium` seul),
  ce qui donnait une cible tactile d'environ 20px de hauteur — nettement sous le minimum
  recommandé d'environ 44px, alors que ce footer est présent sur l'intégralité des pages du
  site. La zone cliquable passe à `px-1 py-2` avec des marges négatives (`-mx-1 -my-2`) qui
  compensent visuellement l'ajout de padding, selon le même principe déjà appliqué au fil
  d'Ariane (2026-10-13) et au bouton Sommaire (2026-10-10), pour que le texte garde exactement
  la même position qu'avant.
- **Fichiers** : `src/components/Footer.tsx`.
- **Pourquoi** : mobile / accessibilité — une cible tactile trop petite sur des liens de
  navigation présents sur toutes les pages (y compris le lien vers les mentions légales et
  l'affiliation) pénalise l'une des zones de navigation les plus fréquemment visibles du site
  sur petit écran.

## 2026-10-13 (2)

- **Amélioration** : agrandissement de la zone cliquable du bouton d'affiliation principal
  (« Voir le prix sur Amazon » / « Rechercher sur Amazon ») affiché dans les résultats de
  l'outil de recommandation `RacketFinder`. Ce bouton utilisait encore `py-2.5` (~40px de
  hauteur sur mobile), alors que le même bouton avait déjà été corrigé à `py-3` (~44px) dans
  `ProductCard` le 2026-10-12 — la correction n'avait pas été répercutée sur cette occurrence
  du quiz, qui est pourtant l'outil de conversion principal du site. Le padding passe à `py-3`,
  sans changer la couleur, la forme ni le texte du bouton.
- **Fichiers** : `src/components/RacketFinder.tsx`.
- **Pourquoi** : mobile / conversion / cohérence — ce bouton porte le lien affilié final du
  quiz de recommandation ; une cible tactile sous le seuil recommandé pénalise le taux de clic
  sur mobile, et l'incohérence avec `ProductCard` cassait l'uniformité du principal CTA du site.

## 2026-10-13

- **Amélioration** : agrandissement de la zone cliquable des liens du fil d'Ariane
  (`Breadcrumb`), affiché en haut de chaque page d'article (guide, comparatif, article). Les
  liens « Accueil » et vers la catégorie n'avaient aucun padding (`text-sm` seul), ce qui
  donnait une cible tactile d'environ 20px de hauteur — nettement sous le minimum recommandé
  d'environ 44px, alors que ce composant apparaît en tout début de la quasi-totalité des pages
  d'article du site, juste au-dessus du titre. La zone cliquable passe à `px-1 py-2` avec des
  marges négatives (`-mx-1 -my-2`) qui compensent visuellement l'ajout de padding, pour que le
  texte garde exactement la même position qu'avant.
- **Fichiers** : `src/components/Breadcrumb.tsx`.
- **Pourquoi** : mobile / accessibilité — une cible tactile trop petite sur un élément de
  navigation présent en haut de la majorité des pages pénalise l'une des interactions les plus
  fréquentes du site sur petit écran.

## 2026-10-12

- **Amélioration** : agrandissement de la zone cliquable du bouton d'affiliation principal
  (« Voir le prix sur Amazon » / « Rechercher sur Amazon ») du composant `ProductCard`. Ce
  bouton utilisait `py-2.5` combiné à un texte `text-sm`, ce qui donnait une cible tactile
  d'environ 40px de hauteur sur mobile — juste sous le minimum recommandé d'environ 44px déjà
  appliqué à d'autres boutons du site (bannière cookies, bouton burger). `ProductCard` est le
  composant qui porte le plus grand nombre de liens affiliés du site (2 à 5 occurrences par
  article) et n'avait pourtant pas encore reçu cette correction. Le padding passe à `py-3`
  (~44px de hauteur), sans changer la couleur, la forme ni le texte du bouton.
- **Fichiers** : `src/components/ProductCard.tsx`.
- **Pourquoi** : mobile / conversion — ce bouton est le principal point de clic vers les liens
  affiliés Amazon du site, présent dans la quasi-totalité des guides et articles ; une cible
  tactile légèrement sous le seuil recommandé pénalise directement le taux de clic sur mobile,
  d'où la majorité du trafic.

## 2026-10-10 (2)

- **Amélioration** : ajout de la sémantique ARIA manquante sur la barre de progression du
  quiz `RacketFinder` (« Trouver ma raquette »). La barre n'était qu'un `<div>` purement
  visuel, sans aucun moyen pour un lecteur d'écran de connaître la progression dans le test en
  cinq questions — seul le texte « Question X sur Y » à côté était lisible, pas l'équivalent de
  la barre elle-même. Ajout de `role="progressbar"`, `aria-valuenow`/`aria-valuemin`/
  `aria-valuemax` et d'un `aria-label` explicite (« Progression du test : question X sur Y »)
  sur le conteneur de la barre.
- **Fichiers** : `src/components/RacketFinder.tsx`.
- **Pourquoi** : accessibilité — le quiz de recommandation est l'outil de conversion principal
  du site ; un utilisateur de lecteur d'écran n'avait aucune confirmation de sa progression
  dans le test au-delà du texte adjacent, ce qui nuit à la clarté de l'un des parcours les plus
  importants du site.

## 2026-10-10

- **Amélioration** : agrandissement de la zone cliquable du bouton « Sommaire » (`<summary>`)
  du composant `TableOfContents`, affiché en haut de chaque article comportant au moins trois
  titres. Le texte n'avait aucun padding (`font-bold text-sm` seul), ce qui donnait une cible
  tactile d'environ 20px de hauteur pour l'élément qui permet de replier/déplier le sommaire —
  nettement sous le minimum recommandé d'environ 44px, alors que ce bouton apparaît en tout
  début de la quasi-totalité des pages d'article du site. La zone cliquable passe à
  `px-2 py-2.5` avec des marges négatives (`-mx-2 -my-2`) qui compensent visuellement l'ajout
  de padding, et un retour visuel au survol (`hover:bg-foreground/5`) est ajouté pour rester
  cohérent avec les autres éléments interactifs du site.
- **Fichiers** : `src/components/TableOfContents.tsx`.
- **Pourquoi** : mobile / accessibilité — une cible tactile trop petite sur un élément présent
  en haut de la majorité des pages d'article pénalise l'une des interactions les plus fréquentes
  du site sur petit écran.

## 2026-10-09

- **Amélioration** : agrandissement de la zone cliquable des boutons « Refuser » et
  « Accepter » de la bannière de consentement aux cookies (`CookieConsent`). Ces deux
  boutons utilisaient un padding vertical réduit (`py-2`) combiné à un texte `text-sm`, ce
  qui donnait une cible tactile d'environ 36px de hauteur sur mobile — sous le minimum
  recommandé d'environ 44px, alors que cette bannière s'affiche à chaque nouvelle visite et
  que ces boutons sont les tout premiers éléments interactifs rencontrés par un visiteur
  mobile. Le padding passe à `py-3` (~44px de hauteur), sans changer la taille du texte, les
  couleurs ni la position de la bannière.
- **Fichiers** : `src/components/CookieConsent.tsx`.
- **Pourquoi** : mobile / accessibilité — une cible tactile trop petite sur les boutons de
  consentement, qui apparaissent avant même que le visiteur ait pu lire un article ou une
  fiche produit, pénalise directement la première interaction sur mobile.

## 2026-10-08 (2)

- **Amélioration** : agrandissement de la zone cliquable du bouton burger (menu mobile) dans
  le `Header`. Ce bouton icône faisait `h-9 w-9`, soit environ 36px de côté, nettement sous le
  minimum recommandé d'environ 44px pour une cible tactile — alors qu'il s'agit du seul moyen
  d'accéder à la navigation (Guides, Comparatifs, Articles, Trouver ma raquette) sur mobile,
  où arrive la majorité du trafic. La taille passe à `h-11 w-11` (44px), sans changer la taille
  de l'icône (`h-6 w-6`) ni sa position visuelle dans l'en-tête.
- **Fichiers** : `src/components/Header.tsx`.
- **Pourquoi** : mobile / accessibilité — une cible tactile trop petite sur le bouton qui ouvre
  toute la navigation mobile pénalise directement l'exploration du site sur les petits écrans.

## 2026-10-08

- **Amélioration** : agrandissement de la zone cliquable du bouton « ← Question précédente »
  dans l'outil `RacketFinder`. Ce bouton était un simple lien texte sans padding
  (`text-sm text-muted`, aucune marge interne), ce qui donnait une cible tactile d'environ
  20px de hauteur sur mobile — nettement sous le minimum recommandé d'environ 44px. Le bouton
  se trouve dans le quiz de recommandation qui mène directement aux liens affiliés, donc une
  cible manquée oblige l'utilisateur à retaper plusieurs fois ou à abandonner le test. La zone
  cliquable passe à `px-2 py-2.5` avec des marges négatives (`-mx-2 -my-2`) qui compensent
  visuellement l'ajout de padding, pour que le texte garde exactement la même position qu'avant.
- **Fichiers** : `src/components/RacketFinder.tsx`.
- **Pourquoi** : mobile / conversion — la majorité du trafic du site vient du mobile, et ce
  bouton se situe dans le tunnel de recommandation de raquettes, l'un des principaux leviers
  de conversion affiliée du site.

## 2026-10-07 (2)

- **Amélioration** : agrandissement de la zone cliquable du bouton d'affiliation
  (« Voir le prix » / « Rechercher ») dans chaque ligne du `ComparisonTable`. Le bouton
  utilisait un padding vertical très réduit (`py-1.5`) combiné à un texte `text-xs`, ce qui
  donnait une cible tactile d'environ 28px de hauteur sur mobile — nettement sous le minimum
  recommandé d'environ 44px, alors qu'il s'agit du lien affilié principal de ce composant et
  qu'il se trouve dans un tableau qui défile horizontalement sur petit écran. Le padding passe
  à `py-2.5` (et `px-4`), sans changer la couleur, la forme ou le texte du bouton.
- **Fichiers** : `src/components/ComparisonTable.tsx`.
- **Pourquoi** : mobile / conversion — la majorité du trafic du site vient du mobile, et ce
  bouton porte directement un lien affilié ; une cible tactile trop petite augmente le risque
  de clic manqué ou frustrant sur l'élément le plus important du tableau comparatif.

## 2026-10-07

- **Amélioration** : ajout d'un style de focus clavier visible et cohérent (`:focus-visible`)
  sur tous les liens, boutons et champs du site. Avant ce changement, aucun style de focus
  n'était défini nulle part dans le code et le site reposait entièrement sur le focus par
  défaut du navigateur, discret, inconsistant d'un navigateur à l'autre et peu fiable sur
  Safari/mobile. Le nouvel anneau de focus utilise la couleur `--accent` déjà existante dans
  la palette, avec un décalage (`outline-offset`) pour rester lisible aussi bien sur fond
  clair, fond navy foncé que sur les boutons jaune-citron.
- **Fichiers** : `src/app/globals.css`.
- **Pourquoi** : accessibilité clavier — un utilisateur naviguant au clavier (ou avec un
  lecteur d'écran couplé à une navigation séquentielle) ne pouvait pas repérer facilement
  l'élément actif sur la plupart des pages, y compris sur les CTA d'affiliation
  (`ProductCard`, `ComparisonTable`) où c'est le plus pénalisant.

<!-- Ajoute chaque nouvelle entrée juste au-dessus de cette ligne. -->
