# Playbook : génération quotidienne d'un article

Ce document est le mode d'emploi exact à suivre pour publier **un nouvel article par jour**
sur ce blog d'affiliation Amazon dédié aux raquettes de padel. Il est conçu pour être exécuté
sans supervision humaine par une tâche planifiée Claude Code. Suis chaque étape dans l'ordre.

## 0. Contexte du projet

- Site Next.js (App Router) + MDX, déployé sur Vercel via un repo GitHub (déploiement auto au push sur `main`).
- Chaque article est un fichier `.mdx` dans `content/articles/`.
- `content/calendar.json` liste les sujets à traiter, dans l'ordre, avec un champ `published`.
- `content/products.json` est la base de données de raquettes (nom, marque, ASIN, prix...).
- Les composants `<ProductCard id="..." />` et `<ComparisonTable ids={["...", "..."]} />`
  s'utilisent directement dans le MDX pour insérer les blocs produits et le tableau comparatif —
  les liens affiliés Amazon sont générés automatiquement à partir de `content/products.json`
  et de la variable d'environnement `NEXT_PUBLIC_AMAZON_TAG` (voir `src/lib/products.ts`).
  Tu n'as **jamais** à écrire de lien Amazon à la main.

## 1. Choisir le sujet du jour

1. Lis `content/calendar.json`.
2. Prends la première entrée avec `"published": false`. C'est le sujet du jour.
3. Si toutes les entrées sont `"published": true`, génère 5 nouveaux sujets à ajouter à la fin
   du fichier, en respectant :
   - Une répartition équilibrée entre les trois catégories : `guide`, `comparatif`, `article`.
   - Des sujets qui n'ont pas déjà été traités (vérifie les titres et slugs existants).
   - Le même format JSON que les entrées existantes (`slug`, `title`, `category`,
     `targetKeyword`, `productIds`, `published: false`).
   - Des mots-clés réalistes qu'un joueur de padel taperait sur Google (achat, comparatif,
     conseils, entretien, technique, profils de joueurs, saisons/soldes, etc.).
   - **Priorité à la longue traîne.** Le site est jeune et n'a pas encore l'autorité pour se
     positionner sur des requêtes génériques très concurrentielles ("meilleure raquette padel",
     "meilleure marque raquette padel"). Privilégie systématiquement :
     questions précises ("carbone 12k ou 18k", "quand changer sa raquette"), duels
     modèle contre modèle ("X vs Y"), tests d'un modèle unique, et profils de joueurs
     spécifiques. Ces requêtes sont moins disputées et convertissent mieux.
   Puis reprends l'étape 1 avec la première de ces nouvelles entrées.

## 2. Vérifier / compléter la base produits

- Si le sujet nécessite des produits déjà présents dans `content/products.json`, réutilise-les
  (ne duplique jamais une raquette déjà en base).
- Si le sujet nécessite un produit absent de la base, ajoute une nouvelle entrée dans
  `content/products.json` avec des informations réalistes (nom de modèle et marque plausibles
  pour l'année en cours, forme, niveau, style, poids, fourchette de prix, et un `"score"`
  éditorial entre 4.0 et 4.8 cohérent avec le positionnement du produit — pas de 5/5 systématique).
  Mets `"asin": "A_COMPLETER"` — ne jamais inventer un ASIN Amazon, c'est le propriétaire du
  site qui le renseignera après vérification manuelle sur Amazon.

## 3. Rédiger l'article (obligatoire : ~2500 mots)

Crée `content/articles/<slug>.mdx` avec ce frontmatter :

```yaml
---
title: "..."
slug: "<slug>"
description: "..." # 140-160 caractères, incite au clic, contient le mot-clé cible
date: "AAAA-MM-JJ" # date du jour
category: "guide" | "comparatif" | "article"
keywords: ["...", "..."]
products: ["id-produit-1", "id-produit-2"]
---
```

Règles de rédaction (calquées sur les 3 articles déjà publiés — relis-en un avant de commencer
si besoin) :

- **~2500 mots** dans le corps de l'article (hors frontmatter). Vérifie le compte de mots avant
  de terminer (voir commande à l'étape 4).
- Structure en `##` (H2) et `###` (H3), jamais de `#` (H1, déjà géré par le template de page).
- Ton informatif, concret, orienté conseil — pas de remplissage ni de répétition artificielle
  du mot-clé. Chaque section doit apporter une information réellement utile.
- Insère 2 à 5 blocs `<ProductCard id="..." />` aux endroits pertinents du texte.
- Pour un article `comparatif`, ajoute systématiquement un `<ComparisonTable ids={[...]} />`
  en haut de l'article.
- Termine par une section `## FAQ` (3 à 5 questions/réponses courtes, utile pour les featured
  snippets Google) puis une section `## En résumé` ou `## Verdict` de conclusion.
- N'invente jamais de statistique, de citation ou de test précis (ex: "testé pendant 3 mois",
  "92% des joueurs préfèrent...") que tu ne peux pas sourcer. Reste sur des affirmations
  génériques et défendables sur les caractéristiques techniques (forme, poids, noyau, balance).
- **Exactitude factuelle sur le padel.** Une raquette de padel est **pleine et sans cordage** :
  c'est une surface percée de trous, jamais un tamis cordé. N'écris jamais sur le « cordage »,
  la « tension » ou le « remplacement des cordes » d'une raquette de padel — ce sont des notions
  de tennis qui n'existent pas ici, et ce type d'erreur décrédibilise tout le site. En cas de
  doute sur un point technique, relis un article déjà publié plutôt que de supposer.
- **Sujets touchant à la santé** (douleurs au bras, au coude, au poignet, tennis elbow). Reste
  strictement sur le terrain du matériel : explique en quoi la forme, le poids ou le noyau
  influencent les vibrations transmises. Ne pose jamais de diagnostic, ne propose ni traitement,
  ni exercice de rééducation, ni durée de guérison. Invite explicitement à consulter un
  professionnel de santé en cas de douleur persistante.
- N'hotlink jamais d'image depuis amazon.fr ou un autre site. Pour l'image produit, réutilise
  `/images/products/placeholder.svg` (champ `"image"` dans `products.json`) tant qu'aucune
  image réelle n'a été fournie par le propriétaire du site.

## 4. Vérifier avant de publier

Depuis la racine du projet :

```bash
node -e "const fs=require('fs');const matter=require('gray-matter');const {content}=matter(fs.readFileSync('content/articles/<slug>.mdx','utf8'));console.log(content.split(/\s+/).filter(Boolean).length)"
```

Le résultat doit être proche de 2500 (accepte 2200-2900). Si trop court, développe une section
existante ou ajoute une section pertinente plutôt que de paraphraser.

Puis :

```bash
npm run build
```

Le build **doit** passer sans erreur (ça valide le frontmatter, les imports de composants MDX,
les `id` de produits référencés, etc.). Si le build échoue, corrige avant de continuer — ne
publie jamais un article qui casse le build.

## 5. Marquer le sujet comme publié

Dans `content/calendar.json`, passe `"published": false` à `"published": true` pour l'entrée
du jour (et pour toute nouvelle entrée ajoutée à l'étape 1 si elle a été traitée dans la
foulée — sinon laisse-la à `false` pour un jour futur).

## 6. Commit et push

```bash
git add content/ src/
git commit -m "Ajoute l'article du jour : <titre court>"
git push
```

Le push déclenche automatiquement le redéploiement Vercel — aucune autre action n'est
nécessaire pour que l'article soit en ligne.

## 7. Rapport de fin d'exécution

Termine toujours par un résumé court : titre de l'article publié, catégorie, nombre de mots,
produits utilisés/ajoutés, résultat du build, et confirmation du push. Si une étape a échoué
(build cassé, calendrier vide sans nouveau sujet généré, etc.), dis-le explicitement plutôt
que de laisser une étape incomplète en silence.

## Rappels importants

- Un seul article par exécution. Ne rattrape pas plusieurs jours de retard en une seule fois
  sauf instruction explicite contraire.
- Ne modifie jamais le tag Amazon Associates (`NEXT_PUBLIC_AMAZON_TAG`) ou les ASIN existants
  sans instruction explicite du propriétaire du site.
- Si `NEXT_PUBLIC_AMAZON_TAG` n'est pas encore configuré, les articles continuent d'être publiés
  normalement (les boutons redirigent vers une recherche Amazon générique en attendant) — ce
  n'est pas un blocage pour la publication quotidienne.
