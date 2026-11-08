# Journal des améliorations de design

Historique des améliorations apportées au design du site, une entrée par exécution de la
routine quotidienne (voir `DESIGN_PLAYBOOK.md`). La plus récente en premier.

## 2026-11-08

- **Amélioration** : ajout des attributs `width` et `height` sur l'image produit du
  `ComparisonTable`. `ProductCard` (`width={120} height={150}`) et `RacketFinder`
  (`width={92} height={118}`) précisent déjà ces dimensions sur leur image équivalente — une
  pratique qui permet au navigateur de réserver l'espace de l'image avant son chargement et
  d'éviter un décalage de mise en page (CLS). `ComparisonTable` avait pourtant déjà reçu
  `loading="lazy"` et `decoding="async"` sur cette même image le 2026-10-21, exactement pour
  aligner son comportement de chargement sur celui de `ProductCard`, mais sans les attributs de
  dimensions qui complètent cette optimisation. Les nouvelles valeurs (`width={32} height={40}`)
  reprennent le ratio du conteneur existant (`h-10 w-8`, soit 40px sur 32px). Aucun changement
  visuel : la taille affichée de l'image reste identique, contrôlée par les classes `h-full
  w-full object-contain` déjà en place.
- **Fichiers** : `src/components/ComparisonTable.tsx`.
- **Pourquoi** : cohérence / performance perçue — `ProductCard`, `ComparisonTable` et
  `RacketFinder` affichent le même type de contenu (image produit) et devraient se comporter de
  la même façon ; l'absence de dimensions explicites sur cette occurrence était la dernière
  restante parmi les trois composants équivalents, et expose au risque de décalage de mise en
  page que les deux autres évitent déjà.

## 2026-11-07 (2)

- **Amélioration** : ajout d'un lien explicite (`aria-labelledby`) entre la région « À lire
  aussi » (`RelatedArticles`, un `<aside>` affiché en bas de chaque page d'article) et son
  titre `<h2>`. Ce bloc apparaît sur la quasi-totalité des pages d'article du site (guide,
  comparatif, article), mais son landmark `aside` n'était jusqu'ici identifié par aucun nom
  perceptible pour les technologies d'assistance : un utilisateur de lecteur d'écran qui
  navigue par régions voyait une zone « complementary » anonyme, sans pouvoir la distinguer
  d'une autre region sans l'ouvrir. Le titre reçoit désormais un `id="related-articles-heading"`
  référencé par l'attribut `aria-labelledby` du `<aside>`, selon le même principe déjà appliqué
  au regroupement question/réponses du quiz `RacketFinder` (`role="group"` +
  `aria-labelledby`). Aucun changement visuel : le texte et la mise en page du bloc restent
  identiques.
- **Fichiers** : `src/components/RelatedArticles.tsx`.
- **Pourquoi** : accessibilité — `RelatedArticles` figure en fin de la quasi-totalité des pages
  d'article du site ; nommer explicitement cette région facilite son repérage par un utilisateur
  de lecteur d'écran qui navigue par landmarks, au même titre que les autres régions déjà
  nommées du site (tableau comparatif, bannière de cookies).

## 2026-11-07

- **Amélioration** : ajout d'un `aria-label` distinctif sur chacun des trois éléments `<nav>`
  du site — la navigation principale desktop et son équivalent mobile dans `Header`
  (`aria-label="Navigation principale"`, la même étiquette pour les deux puisqu'un seul des deux
  est exposé aux technologies d'assistance à la fois, l'autre étant masqué via `display: none`),
  et la navigation du pied de page dans `Footer` (`aria-label="Pied de page"`). Jusqu'ici, un
  utilisateur de lecteur d'écran qui navigue par landmarks (une pratique courante pour se
  déplacer rapidement dans une page sans tout lire séquentiellement) voyait deux régions
  « Navigation » strictement identiques et indifférenciées sur chaque page du site — impossible
  de savoir laquelle mène à la navigation principale du site et laquelle mène aux liens du pied
  de page sans les ouvrir toutes les deux. Aucun changement visuel : les trois `<nav>` gardent
  exactement la même apparence et le même comportement.
- **Fichiers** : `src/components/Header.tsx`, `src/components/Footer.tsx`.
- **Pourquoi** : accessibilité — `Header` et `Footer` apparaissent sur l'intégralité des pages du
  site ; nommer explicitement chaque région de navigation est une pratique WAI-ARIA standard pour
  les pages qui comportent plusieurs landmarks de même type, et permet à un utilisateur de
  lecteur d'écran de choisir directement la bonne navigation plutôt que de les distinguer par
  essai-erreur.

## 2026-11-06 (2)

- **Amélioration** : correction du contraste insuffisant du texte secondaire (`--muted`, classe
  `text-muted`) en thème clair, de `#64748b` à `#5e6e86`. Cette couleur habille une vingtaine
  d'usages à travers le site (date et temps de lecture sur `ArticleCard`, `FeaturedArticle` et
  `ArticleView`, libellés de `TrustBar`, texte de la bannière `CookieConsent`, description de
  catégorie sur `CategoryListing`, fil d'Ariane, etc.), posée aussi bien sur `--surface` (blanc,
  `#ffffff`) que directement sur `--background` (`#f7f8fa`, légèrement plus sombre) selon
  l'emplacement — par exemple la description de catégorie en tête de page sur `CategoryListing`
  ou la ligne date/temps de lecture de `ArticleView`, qui n'ont pas de carte blanche derrière
  elles. Calcul du ratio de contraste WCAG : l'ancienne valeur donnait 4.48:1 sur `--background`,
  juste **sous** le seuil minimal de 4.5:1 requis par WCAG 2 AA pour du texte de taille normale
  (et 4.76:1 sur `--surface`, conforme). La nouvelle valeur, à peine plus sombre, donne 4.88:1 sur
  `--background` et 5.18:1 sur `--surface` : conforme dans les deux cas, avec une marge de
  sécurité raisonnable. Le thème sombre (`--muted: #94a3b8`, 7.34:1 sur son fond) était déjà
  largement conforme et n'a pas été modifié. `--muted` est une couleur de texte neutre, pas une
  couleur d'identité de marque (`--navy`, `--lime`, `--brand`, `--cat-*`) : son ajustement n'est
  pas concerné par l'interdiction de toucher à la palette de marque, et correspond précisément à
  l'exception prévue par `DESIGN_PLAYBOOK.md` pour « un problème de contraste avéré ». Changement
  à peine perceptible à l'œil (quelques nuances plus sombre sur un gris déjà neutre), aucune
  structure ni mise en page modifiée.
- **Fichiers** : `src/app/globals.css`.
- **Pourquoi** : accessibilité et lisibilité — `text-muted` est l'une des couleurs de texte les
  plus utilisées du site (dates de publication, temps de lecture, descriptions de catégorie,
  bannière de cookies...) ; un contraste sous le seuil WCAG AA, même de peu, pénalise la
  lisibilité pour les visiteurs malvoyants ou en conditions d'éclairage difficiles, sur un
  élément présent sur la quasi-totalité des pages du site.

## 2026-11-06

- **Amélioration** : ajout de `aria-current="page"` sur l'élément courant (dernier maillon,
  sans lien) du fil d'Ariane (`Breadcrumb`). Ce composant distinguait déjà visuellement la page
  courante du reste du fil (texte plus contrasté, `text-foreground/70`, contre `text-muted`
  pour les liens), mais ne portait aucune information explicite pour les technologies
  d'assistance indiquant qu'il s'agit bien de la page actuellement affichée — à la différence
  de la navigation principale du `Header`, qui applique déjà `aria-current="page"` sur son lien
  actif depuis le 2026-11-03. `Breadcrumb` apparaît en tout début de la quasi-totalité des
  pages d'article (guide, comparatif, article) ainsi que sur `/trouver-ma-raquette` ; harmoniser
  ce repère avec celui déjà en place dans `Header` permet à un utilisateur de lecteur d'écran
  d'identifier sans ambiguïté, à la fois dans la navigation principale et dans le fil d'Ariane,
  sur quelle page il se trouve. Aucun changement visuel : le texte et le style du dernier
  maillon restent strictement identiques.
- **Fichiers** : `src/components/Breadcrumb.tsx`.
- **Pourquoi** : accessibilité — pratique recommandée du WAI-ARIA Authoring Practices pour le
  motif « fil d'Ariane » (marquer l'élément courant avec `aria-current="page"`), et cohérence
  avec la convention déjà appliquée à la navigation principale du site.

## 2026-11-05 (2)

- **Amélioration** : ajout d'une couleur et d'un soulignement au survol pour les liens de texte
  courant sans classe CSS dédiée — les renvois internes entre articles rédigés en Markdown
  (`[texte](/articles/...)`) dans le corps des articles, ainsi que les quelques liens identiques
  codés en dur sur `/trouver-ma-raquette`, `/a-propos` et `/mentions-legales`. Sans règle dédiée,
  un `<a>` sans classe hérite de la couleur et de l'absence de soulignement du texte environnant
  via le reset Tailwind, et devient donc visuellement indissociable du paragraphe qui l'entoure :
  vérifié concrètement sur `/guides/comment-choisir-sa-raquette-de-padel`, où le lien vers
  « l'influence de chaque forme sur les coups techniques du padel » avait exactement la même
  couleur que le texte autour de lui (aucun repère visuel de clic, hors changement de curseur).
  Au moins 13 articles contiennent ce type de lien de renvoi interne, en plus des 3 pages
  statiques citées. La nouvelle règle reprend la convention déjà en place ailleurs sur le site
  pour ce type de lien de texte courant (`TableOfContents`, lien « Tout voir » de la page
  d'accueil) : couleur de marque (`--brand`) au repos, soulignement au survol et au focus clavier.
  Le sélecteur cible précisément `a:not([class])`, pour ne jamais affecter les liens déjà stylés
  (boutons d'affiliation de `ProductCard` et `ComparisonTable`, qui portent toujours leurs propres
  classes) — vérifié à l'écran : le bouton « Rechercher sur Amazon » d'un `ProductCard` affiché
  dans un article conserve son fond citron et son texte navy inchangés.
- **Fichiers** : `src/app/globals.css`.
- **Pourquoi** : accessibilité et lisibilité — un lien qui ne se distingue pas du texte environnant
  (WCAG 1.4.1, usage de la couleur) prive un visiteur du repère visuel lui indiquant qu'un contenu
  est cliquable ; ce défaut touchait les liens de maillage interne vers d'autres guides et
  comparatifs du site, un levier de découverte de contenu et de répartition de l'autorité SEO
  entre les pages.

## 2026-11-05

- **Amélioration** : ajout de `aria-hidden="true"` sur l'icône SVG (hamburger / croix) du bouton
  de menu mobile dans `Header`. Ce bouton porte déjà un `aria-label` explicite (« Ouvrir le
  menu » / « Fermer le menu »), mais son icône SVG décorative (trois traits ou croix selon
  l'état `open`) n'était jusqu'ici pas masquée aux technologies d'assistance, à la différence de
  toutes les autres icônes purement visuelles du site (logo, puces de catégorie, flèches de
  liens, séparateurs) qui reçoivent systématiquement cet attribut. Même motif que les
  corrections précédentes sur des symboles décoratifs oubliés : aucune information perdue,
  aucun changement visuel.
- **Fichiers** : `src/components/Header.tsx`.
- **Pourquoi** : accessibilité et cohérence — `Header` apparaît sur toutes les pages du site et
  son bouton de menu mobile est un point d'interaction fréquent sur le trafic mobile (majoritaire
  pour ce blog) ; aligner cette icône sur la convention déjà appliquée à toutes les autres icônes
  décoratives du site évite tout bruit résiduel pour les lecteurs d'écran.

## 2026-11-04 (2)

- **Amélioration** : ajout de `aria-hidden="true"` sur le séparateur « / » du fil d'Ariane
  (`Breadcrumb`), affiché en haut de chaque page d'article (guide, comparatif, article). Ce
  composant est une `<nav>` qui enchaîne des liens (ou le libellé de la page courante) séparés
  visuellement par une simple barre oblique entre deux `<span>` — un symbole purement décoratif
  qui ne porte aucune information que la structure de la navigation (liens successifs) ne porte
  déjà. Un lecteur d'écran qui parcourt ce fil d'Ariane annonçait jusqu'ici chaque « / » comme
  un caractère à part (« barre oblique »), un bruit répété à chaque niveau de la navigation. Ce
  même motif (symbole décoratif accolé à un contenu qui porte déjà tout le sens utile) avait
  déjà été corrigé à de nombreuses reprises ailleurs sur le site (coches, puces, flèches,
  emojis), mais ce séparateur n'avait jamais été repéré à l'époque. Aucun changement visuel : le
  texte et les « / » restent affichés à l'identique.
- **Fichiers** : `src/components/Breadcrumb.tsx`.
- **Pourquoi** : accessibilité — `Breadcrumb` apparaît en tout début de la quasi-totalité des
  pages d'article du site ; un séparateur purement visuel annoncé à chaque niveau par un lecteur
  d'écran ajoute un bruit redondant déjà éliminé sur tous les autres symboles décoratifs
  équivalents du site, sans qu'aucune information ne soit perdue en le masquant.

## 2026-11-04

- **Amélioration** : ajout d'une annonce accessible (`aria-live="polite"`) lors du passage de la
  dernière question à l'écran de résultat dans le quiz `RacketFinder`. Le changement de question
  en question avait déjà reçu cette annonce le 2026-10-25 (un paragraphe masqué, repris à chaque
  étape), mais ce mécanisme n'existait que dans la branche « question en cours » du composant :
  la transition vers l'écran final (les 3 raquettes recommandées), qui remplace entièrement le
  contenu affiché par un sous-arbre différent, ne déclenchait jusqu'ici aucune annonce. Un
  utilisateur de lecteur d'écran qui validait sa dernière réponse n'avait donc aucune confirmation
  sonore que le test était terminé et que le résultat venait de s'afficher, à l'inverse de toutes
  les transitions précédentes du même quiz. Un paragraphe masqué identique au mécanisme existant
  annonce désormais l'arrivée sur l'écran de résultat. Aucun changement visuel : le texte affiché
  à l'écran reste strictement identique.
- **Fichiers** : `src/components/RacketFinder.tsx`.
- **Pourquoi** : accessibilité — le quiz de recommandation est l'outil de conversion principal du
  site ; la dernière étape, celle qui aboutit aux liens affiliés, était la seule transition du
  parcours à ne pas être annoncée aux utilisateurs de lecteur d'écran, malgré le même mécanisme
  déjà en place sur toutes les étapes précédentes.

## 2026-11-03 (2)

- **Amélioration** : regroupement sémantique des réponses du quiz `RacketFinder` sous leur
  question. Chaque question affiche trois à quatre boutons de réponse dans une simple liste de
  `<button>`, sans aucune relation explicite avec la question à laquelle ils répondent : un
  utilisateur de lecteur d'écran qui navigue par élément interactif (plutôt qu'en lisant toute la
  page dans l'ordre) entendait une suite de boutons isolés, sans savoir à quelle question ils se
  rapportent. Le conteneur des options reçoit désormais `role="group"` et `aria-labelledby`
  pointant vers l'`id` du titre de la question (`<h2 id="finder-question">`), pour que la relation
  entre la question et ses réponses soit explicite pour les technologies d'assistance. Aucun
  changement visuel : les boutons de réponse restent affichés à l'identique.
- **Fichiers** : `src/components/RacketFinder.tsx`.
- **Pourquoi** : accessibilité — le quiz de recommandation est l'outil de conversion principal
  du site ; un utilisateur de lecteur d'écran qui ne perçoit pas le lien entre une question et
  ses réponses perd un repère de navigation important dans l'un des parcours les plus
  déterminants pour la conversion.

## 2026-11-03

- **Amélioration** : mise en évidence de la section active dans la navigation du `Header`, en
  desktop comme en mobile. Jusqu'ici, un visiteur sur la page « Guides », « Comparatifs » ou
  « Articles » (y compris sur une page d'article individuelle de cette catégorie) ne voyait
  aucune différence visuelle entre le lien de navigation correspondant et les deux autres : les
  trois liens restaient identiques quelle que soit la page consultée, sans aucun repère de
  localisation dans le site. Le lien actif reçoit désormais un fond discret et un texte plus
  contrasté (mêmes tokens de couleur déjà utilisés pour l'état `hover`, aucune nouvelle couleur
  introduite), et chaque lien de navigation (y compris le bouton « Trouver ma raquette ») porte
  `aria-current="page"` quand il correspond à la page courante, pour que cette information soit
  aussi perceptible par les technologies d'assistance. Aucun changement sur les pages elles-mêmes
  ni sur la structure de navigation.
- **Fichiers** : `src/components/Header.tsx`.
- **Pourquoi** : accessibilité (repère de localisation, `aria-current` recommandé par les
  pratiques WCAG pour la navigation courante) / cohérence visuelle — le `Header` est présent sur
  toutes les pages du site, et l'absence de tout repère de section active y pénalisait
  l'orientation des visiteurs, en particulier sur les pages d'article où la navigation reste le
  seul indice de la catégorie consultée.

## 2026-11-02

- **Amélioration** : affichage de la vraie photo produit (dès qu'elle sera renseignée dans
  `content/products.json`) sur l'écran de résultat de l'outil de recommandation `RacketFinder`,
  à la place de l'illustration générique systématique. `ProductCard` et `ComparisonTable`
  vérifient déjà `hasRealImage(product)` pour afficher la photo réelle du produit dès qu'elle
  est disponible, et ne retombent sur l'illustration SVG de substitution (`RacketIllustration`)
  qu'en son absence — mais `RacketFinder`, qui présente pourtant le même type de contenu (marque,
  nom, étoiles, image), affichait toujours l'illustration générique sans jamais vérifier la
  présence d'une vraie photo. Resté inchangé aujourd'hui (tous les produits utilisent encore le
  placeholder), ce correctif évite que cette incohérence ne devienne visible silencieusement le
  jour où une première photo réelle sera ajoutée à la base produits : sans lui, `ProductCard` et
  `ComparisonTable` l'afficheraient correctement tandis que `RacketFinder`, l'outil de conversion
  principal du site, continuerait d'afficher l'illustration générique pour ce même produit.
- **Fichiers** : `src/components/RacketFinder.tsx`.
- **Pourquoi** : cohérence — `RacketFinder`, `ProductCard` et `ComparisonTable` présentent le
  même type de contenu produit et doivent donc se comporter de la même façon face à une vraie
  photo ; corriger cette incohérence maintenant, avant qu'elle ne soit visible sur le site,
  évite un décalage silencieux entre composants équivalents le jour où une photo réelle sera
  ajoutée.

## 2026-11-01 (2)

- **Amélioration** : ajout du texte accessible masqué (« (ouvre un nouvel onglet) ») sur le lien
  externe vers les règles de confidentialité publicitaires de Google, sur la page « Mentions
  légales ». Ce lien ouvre déjà Google dans un nouvel onglet (`target="_blank"`), exactement
  comme les trois boutons d'affiliation Amazon du site (`ProductCard`, `ComparisonTable`,
  `RacketFinder`), qui avaient reçu ce même texte masqué le 2026-10-22 — mais cette occurrence,
  la seule autre balise `target="_blank"` de tout le site, n'avait jamais été repérée à
  l'époque. Un lecteur d'écran ne signalait jusqu'ici ce changement de contexte sur aucun des
  deux liens de la page « Mentions légales » qui quittent le site. Aucun changement visuel : le
  texte et l'apparence du lien restent identiques.
- **Fichiers** : `src/app/mentions-legales/page.tsx`.
- **Pourquoi** : accessibilité — un utilisateur de lecteur d'écran qui ne sait pas qu'un lien va
  ouvrir un nouvel onglet perd le fil de sa navigation ; cette correction aligne la dernière
  occurrence manquante de ce motif déjà corrigé ailleurs sur le site.

## 2026-11-01

- **Amélioration** : alignement du texte alternatif de la miniature produit du
  `ComparisonTable` sur celui déjà utilisé dans `ProductCard`. Les deux composants affichent la
  même image produit (ou son illustration de substitution tant qu'aucune photo réelle n'est
  disponible), mais traitaient cette image de façon opposée : `ProductCard` lui donne un texte
  alternatif significatif (`alt={product.name}`), tandis que `ComparisonTable` la déclarait
  entièrement décorative (`alt=""`), comme si elle n'apportait aucune information distincte du
  nom du produit affiché juste à côté. Cette incohérence correspond exactement à l'exemple cité
  par `DESIGN_PLAYBOOK.md` (« incohérences ... entre composants qui devraient se ressembler, ex.
  `ProductCard`, `ComparisonTable` »). Une photo de produit n'est pas une icône purement
  décorative comme une flèche ou une puce déjà corrigées sur le site : elle reste porteuse
  d'information visuelle propre (couleur, forme du cadre) une fois que de vraies photos
  remplaceront les illustrations de substitution actuelles. Aucun changement visuel : l'image et
  la mise en page du tableau restent identiques.
- **Fichiers** : `src/components/ComparisonTable.tsx`.
- **Pourquoi** : accessibilité / cohérence — `ComparisonTable` et `ProductCard` affichent le même
  type de contenu (photo produit) et devraient donc traiter son texte alternatif de la même
  façon ; un lecteur d'écran qui parcourt le tableau comparatif perdait jusqu'ici une information
  que la fiche produit équivalente fournit déjà.

## 2026-10-31 (2)

- **Amélioration** : agrandissement de la zone cliquable des deux derniers boutons du site
  encore à `py-2.5` (~40px de hauteur sur mobile) : le bouton « ← Question précédente » du quiz
  `RacketFinder` et le bouton « Sommaire » (`<summary>`) de `TableOfContents`. Ce même seuil avait
  déjà été corrigé à `py-3` (~44px) sur tous les autres boutons équivalents du site au fil de
  nombreuses itérations précédentes (bannière cookies, bouton d'affiliation de `ProductCard`,
  `ComparisonTable` et `RacketFinder`, menu mobile du `Header`...), mais ces deux occurrences,
  qui compensent leur padding par une marge négative pour ne pas déplacer le texte visuellement
  (`-mx-2 -my-2`), n'avaient jamais reçu cette dernière correction. La marge négative verticale
  passe de `-my-2` à `-my-3` pour compenser exactement le nouveau padding `py-3`, afin que le
  texte garde très précisément la même position qu'avant (l'ancien couple `py-2.5` / `-my-2`
  n'était déjà pas une compensation exacte, ce qui décalait très légèrement le texte vers le bas ;
  ce correctif élimine ce décalage au passage).
- **Fichiers** : `src/components/RacketFinder.tsx`, `src/components/TableOfContents.tsx`.
- **Pourquoi** : mobile / accessibilité / cohérence — ces deux boutons figurent respectivement
  dans l'outil de conversion principal du site et en tout début de la quasi-totalité des pages
  d'article ; une cible tactile sous le seuil recommandé y pénalise des interactions fréquentes
  sur mobile, et c'étaient les deux dernières occurrences de ce motif à ne pas avoir reçu la
  correction déjà appliquée partout ailleurs sur le site.

## 2026-10-31

- **Amélioration** : ajout de `aria-hidden="true"` sur la flèche « ← » décorative du bouton
  « ← Question précédente » de l'outil de recommandation `RacketFinder`. Ce motif (symbole
  purement décoratif accolé à un texte qui porte déjà tout le sens utile) avait déjà été
  corrigé sur les trois flèches « → » du site le 2026-10-30 ainsi que sur de nombreuses autres
  icônes décoratives, mais cette flèche « ← », orientée dans l'autre sens et placée avant le
  texte plutôt qu'après, n'avait pas été repérée à l'époque. Un lecteur d'écran annonçait
  jusqu'ici « flèche vers la gauche Question précédente », un bruit redondant puisque le texte
  seul indique déjà l'action. Aucun changement visuel : le texte et la flèche restent affichés
  à l'identique.
- **Fichiers** : `src/components/RacketFinder.tsx`.
- **Pourquoi** : accessibilité — ce bouton apparaît sur chaque question du quiz `RacketFinder`,
  l'outil de conversion principal du site ; cette correction aligne la dernière occurrence
  manquante de ce motif décoratif sur la convention déjà en place partout ailleurs.

## 2026-10-30 (2)

- **Amélioration** : ajout de `aria-hidden="true"` sur la flèche « → » décorative qui suit le
  texte des trois liens « Lire plus » du site : « Lire → » (`ArticleCard`, utilisé dans tous les
  listings de catégories et la page d'accueil), « Lire l'article → » (`FeaturedArticle`, le bloc
  « À la une » de la page d'accueil) et « Tout voir → » (lien vers la liste des guides sur la
  page d'accueil). Cette flèche n'avait jamais reçu ce traitement, alors que le même motif
  (symbole purement décoratif accolé à un texte qui porte déjà tout le sens utile) avait déjà été
  corrigé à de nombreuses reprises ailleurs sur le site — coches « ✓ », puces « ● », émojis
  décoratifs. Un lecteur d'écran annonçait jusqu'ici « Lire flèche vers la droite » ou
  « Tout voir flèche vers la droite », un bruit redondant puisque le verbe seul indique déjà
  l'action. Aucun changement visuel : le texte et la flèche restent affichés à l'identique.
- **Fichiers** : `src/components/ArticleCard.tsx`, `src/components/FeaturedArticle.tsx`,
  `src/app/page.tsx`.
- **Pourquoi** : accessibilité — ces trois liens apparaissent sur la page d'accueil et sur tous
  les listings de catégories, parmi les pages les plus consultées du site ; cette correction
  aligne la dernière occurrence manquante de ce motif décoratif sur la convention déjà en place
  partout ailleurs.

## 2026-10-30

- **Amélioration** : ajout d'un préfixe accessible masqué (« À noter : », `sr-only`) devant
  chaque point d'avertissement listé sous une raquette recommandée, sur l'écran de résultat du
  quiz `RacketFinder`. Sur cet écran, chaque raquette affiche une liste de points positifs
  précédés d'une coche « ✓ » et, le cas échéant, des points de vigilance précédés d'un « ! » —
  les deux icônes étaient déjà correctement masquées aux lecteurs d'écran (`aria-hidden`), mais
  rien ne venait remplacer, pour ces technologies d'assistance, la distinction que ces icônes
  apportent visuellement entre un argument favorable et une réserve. Un utilisateur de lecteur
  d'écran entendait donc les deux types de puces de façon strictement identique, sans percevoir
  la nuance de prudence que l'icône « ! » signale aux visiteurs voyants. Aucun changement
  visuel : le texte affiché à l'écran reste strictement identique, seul un texte masqué
  supplémentaire est ajouté avant chaque avertissement.
- **Fichiers** : `src/components/RacketFinder.tsx`.
- **Pourquoi** : accessibilité / conversion — le quiz de recommandation est l'outil de
  conversion principal du site, et c'est sur cet écran de résultat, juste avant le lien
  d'affiliation, que la nuance entre un point fort et un point de vigilance a le plus
  d'importance pour la décision d'achat ; un utilisateur de lecteur d'écran qui ne perçoit pas
  cette nuance perd une information utile au moment précis où elle compte le plus.

## 2026-10-29 (2)

- **Amélioration** : ajout d'un lien `aria-controls` entre le bouton burger du `Header` et le
  menu de navigation mobile qu'il ouvre et ferme. Le bouton portait déjà `aria-expanded` pour
  signaler son état ouvert/fermé, mais rien ne reliait explicitement ce bouton à l'élément de
  navigation qu'il contrôle : un utilisateur de lecteur d'écran percevait le changement d'état
  du bouton sans pouvoir identifier avec certitude quel contenu de la page ce bouton fait
  apparaître ou disparaître. Le menu de navigation mobile reçoit désormais un `id="menu-mobile"`
  référencé par l'attribut `aria-controls` du bouton. Aucun changement visuel : le bouton et le
  menu gardent exactement la même apparence et le même comportement au clic.
- **Fichiers** : `src/components/Header.tsx`.
- **Pourquoi** : accessibilité — le bouton burger est le seul moyen d'accéder à la navigation
  principale (y compris vers l'outil de recommandation `RacketFinder`) sur les petits écrans,
  d'où vient la majorité du trafic du site ; une relation `aria-controls` manquante sur un
  bouton qui ouvre/ferme un panneau est un motif de signalement fréquent des audits
  d'accessibilité, et sa présence aide les technologies d'assistance à annoncer correctement la
  relation entre le déclencheur et le contenu contrôlé.

## 2026-10-29

- **Amélioration** : prise en compte de la préférence système « réduire les animations »
  (`prefers-reduced-motion: reduce`) au niveau global du site. Jusqu'ici, aucune règle CSS ne
  tenait compte de cette préférence, alors que le site multiplie les transitions et animations
  déclenchées au survol ou au changement d'état (`transition-all`, `hover:-translate-y-0.5` sur
  les cartes d'article et l'article à la une, changement de question du quiz `RacketFinder`,
  barre de progression animée, survols des boutons d'affiliation...). Un visiteur ayant activé
  cette préférence système — généralement pour des raisons vestibulaires ou de sensibilité aux
  mouvements — continuait de recevoir toutes ces animations sans distinction. Une règle globale
  réduit désormais la durée de toutes les transitions et animations CSS à une valeur quasi nulle
  pour ces visiteurs, selon le motif standard recommandé pour cette préférence. Aucun changement
  visuel ni de comportement pour l'immense majorité des visiteurs qui n'activent pas cette
  préférence système.
- **Fichiers** : `src/app/globals.css`.
- **Pourquoi** : accessibilité — le site s'appuie sur de nombreuses micro-interactions animées
  sans qu'aucune d'elles ne respecte jusqu'ici la préférence système « réduire les animations » ;
  cette règle globale couvre d'un coup l'ensemble des composants concernés, présents et futurs,
  sans avoir à corriger chaque transition individuellement.

## 2026-10-28 (2)

- **Amélioration** : chargement du script Google AdSense (`adsbygoogle.js`) via le composant
  `<Script>` de Next.js (`strategy="afterInteractive"`) à la place d'une balise `<script async>`
  classique posée directement dans le `<head>` du layout racine. Cette balise brute échappait
  au système d'injection de scripts de Next.js, qui priorise et planifie le chargement des
  scripts tiers pour ne jamais retarder l'hydratation de la page — le script se charge
  désormais après l'hydratation plutôt que de façon totalement indépendante au niveau du
  `<head>`. Le script de consentement par défaut (`gtag('consent', 'default', ...)`), qui doit
  s'exécuter avant toute requête publicitaire, reste une balise `<script>` classique inline dans
  le `<head>` : il continue de s'exécuter en premier, avant même l'hydratation, donc l'ordre de
  chargement (consentement d'abord, AdSense ensuite) reste garanti. Aucun changement visuel.
- **Fichiers** : `src/app/layout.tsx`.
- **Pourquoi** : performance perçue — le script AdSense est présent sur l'intégralité des pages
  du site ; le faire passer par le composant `<Script>` officiel de Next.js, déjà la méthode
  recommandée par le framework pour les scripts tiers, limite son impact sur le temps
  d'interactivité de la page sans rien changer à l'affichage des annonces.

## 2026-10-28

- **Amélioration** : remplacement par le composant `Link` de Next.js des cinq liens internes
  qui utilisaient encore une balise `<a>` classique — dans le corps de la page « Trouver ma
  raquette » (vers un article sur les formes de raquette, un guide sur le poids idéal et la
  liste des comparatifs), de la page « À propos » (vers les mentions légales) et de la page
  « Mentions légales » (vers la page À propos). Partout ailleurs sur le site (`Header`,
  `Footer`, `Breadcrumb`, `ArticleCard`, `RelatedArticles`, `TableOfContents`...), la navigation
  interne passe systématiquement par `Link`, qui évite un rechargement complet de la page et
  profite du préchargement automatique des pages liées ; ces cinq liens, situés dans des pages
  statiques rédigées directement en JSX plutôt qu'en MDX, n'avaient jamais reçu cette
  conversion. Le lien externe vers les règles de confidentialité publicitaires de Google, sur
  la page « Mentions légales », reste une balise `<a>` classique à juste titre puisqu'il quitte
  le site. Aucun changement visuel : le texte et l'apparence des liens restent identiques.
- **Fichiers** : `src/app/trouver-ma-raquette/page.tsx`, `src/app/a-propos/page.tsx`,
  `src/app/mentions-legales/page.tsx`.
- **Pourquoi** : performance perçue / cohérence — une navigation interne en balise `<a>` simple
  déclenche un rechargement complet de la page (perte de l'état client, re-téléchargement des
  assets déjà en cache) et ne bénéficie pas du préchargement au survol qu'offre `Link`,
  contrairement à la quasi-totalité des autres liens internes du site ; cette correction aligne
  les dernières occurrences manquantes sur la convention de navigation déjà en place partout
  ailleurs.

## 2026-10-27 (2)

- **Amélioration** : ajout de `aria-hidden="true"` sur les quatre puces décoratives « ● » de
  la section « Comment on choisit » de la page d'accueil (critères « Forme & tolérance »,
  « Poids & confort », « Style de jeu », « Rapport qualité / prix »). Ces puces n'avaient
  jamais reçu ce traitement, alors que le même motif (icônes et symboles purement décoratifs
  précédant un texte qui porte déjà tout le sens utile) avait déjà été corrigé partout
  ailleurs sur le site — coche « ✓ » du `Hero` et du `RacketFinder`, émoji de la bannière du
  `Hero` et de la page 404 (2026-10-23) — sans que cette occurrence de la page d'accueil n'ait
  été repérée à l'époque. Aucun changement visuel : le texte affiché reste strictement
  identique.
- **Fichiers** : `src/app/page.tsx`.
- **Pourquoi** : accessibilité — un lecteur d'écran annonçait jusqu'ici « point rond » avant
  chacun des quatre critères de la section qui explique la méthode de recommandation du site,
  un bruit redondant déjà éliminé sur toutes les autres puces et coches décoratives du site ;
  cette correction aligne la dernière occurrence manquante sur la convention déjà en place.

## 2026-10-27

- **Amélioration** : marquage sémantique de la date de publication avec l'élément HTML
  `<time>` (attribut `dateTime` au format ISO `AAAA-MM-JJ` déjà disponible dans les
  métadonnées de chaque article), à la place d'un simple texte formaté en français. Trois
  occurrences concernées : la carte d'article (`ArticleCard`, utilisée dans les listings de
  catégories et la page d'accueil), le bloc « À la une » de la page d'accueil
  (`FeaturedArticle`) et l'en-tête de chaque page d'article (`ArticleView`). Jusqu'ici, la
  date n'existait que comme texte visuel localisé (« 27 octobre 2026 ») sans aucune valeur
  machine-lisible associée — un lecteur d'écran ou un outil d'analyse ne pouvait pas
  distinguer cette date d'un texte quelconque, ni la relier de façon fiable à une date
  calendaire. Le texte affiché reste strictement identique ; seul l'élément porteur change
  (`<span>`/`<div>` → `<time dateTime="...">` autour du texte de date uniquement, la mention
  du temps de lecture reste hors de l'élément `<time>`).
- **Fichiers** : `src/components/ArticleCard.tsx`, `src/components/FeaturedArticle.tsx`,
  `src/components/ArticleView.tsx`.
- **Pourquoi** : accessibilité / cohérence sémantique — ces trois emplacements affichent la
  date de publication sur la quasi-totalité des pages du site (accueil, listings de
  catégories, pages d'article) ; leur donner une sémantique HTML standard (`<time>` avec une
  valeur machine-lisible) aligne le balisage sur les bonnes pratiques et facilite
  l'interprétation de la date par les technologies d'assistance et les outils externes,
  sans aucun changement visuel.

## 2026-10-26

- **Amélioration** : ajout d'un libellé accessible masqué (`sr-only`, « Lien d'achat ») sur
  l'en-tête de la dernière colonne du `ComparisonTable`, jusqu'ici un `<th>` entièrement vide.
  Ce tableau est déjà identifié comme une région nommée au clavier (2026-10-23), mais la colonne
  qui porte le bouton d'affiliation de chaque ligne n'avait aucun nom de colonne perceptible par
  un lecteur d'écran naviguant le tableau par en-têtes — un `<th>` vide ne permet pas d'associer
  le contenu de la cellule (le lien Amazon) à une colonne identifiée. Aucun changement visuel : le
  texte masqué n'apparaît que pour les technologies d'assistance, l'en-tête reste visuellement
  vide comme avant.
- **Fichiers** : `src/components/ComparisonTable.tsx`.
- **Pourquoi** : accessibilité — `ComparisonTable` porte le lien affilié principal de chaque
  ligne, c'est l'un des composants les plus engageants pour la conversion selon
  `DESIGN_PLAYBOOK.md` ; un en-tête de colonne sans nom perceptible nuit à la compréhension du
  tableau pour un utilisateur de lecteur d'écran qui navigue par colonnes.

## 2026-10-25 (2)

- **Amélioration** : ajout d'une annonce accessible (`aria-live="polite"`) lors du changement de
  question dans le quiz `RacketFinder`. Jusqu'ici, lorsqu'un utilisateur sélectionnait une
  réponse, le composant affichait la question suivante en remplaçant simplement le texte du
  `<h2>` — un changement purement visuel qu'un utilisateur de lecteur d'écran ne pouvait pas
  percevoir sans reprendre une lecture manuelle de la page, faute de tout signal annonçant la
  mise à jour. Un paragraphe masqué visuellement (`sr-only`), placé juste avant le titre et
  reprenant le numéro et le texte de la nouvelle question, est désormais mis à jour à chaque
  changement d'étape et annoncé automatiquement grâce à `aria-live="polite"`. Cette amélioration
  complète la barre de progression déjà rendue accessible (`role="progressbar"`, 2026-10-10) sur
  ce même composant. Aucun changement visuel : le texte affiché à l'écran reste strictement
  identique.
- **Fichiers** : `src/components/RacketFinder.tsx`.
- **Pourquoi** : accessibilité — le quiz de recommandation est l'outil de conversion principal
  du site ; un utilisateur de lecteur d'écran qui ne reçoit aucune confirmation du passage à la
  question suivante perd le fil de sa progression dans l'un des parcours les plus importants du
  site, malgré la barre de progression déjà accessible.

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
