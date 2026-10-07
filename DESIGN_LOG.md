# Journal des améliorations de design

Historique des améliorations apportées au design du site, une entrée par exécution de la
routine quotidienne (voir `DESIGN_PLAYBOOK.md`). La plus récente en premier.

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
