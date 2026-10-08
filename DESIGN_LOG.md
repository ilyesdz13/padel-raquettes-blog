# Journal des améliorations de design

Historique des améliorations apportées au design du site, une entrée par exécution de la
routine quotidienne (voir `DESIGN_PLAYBOOK.md`). La plus récente en premier.

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
