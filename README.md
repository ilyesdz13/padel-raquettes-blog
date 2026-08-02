# Sweet Spot Padel — blog d'affiliation

Blog Next.js + MDX qui publie automatiquement un article de ~2500 mots par jour (guides,
comparatifs, articles) sur les raquettes de padel, avec liens affiliés Amazon.

## Démarrer en local

```bash
npm install
npm run dev
```

## Mise en ligne (à faire une seule fois)

### 1. Créer le repo GitHub

```bash
git add -A
git commit -m "Initial commit: blog padel"
```

Puis sur [github.com/new](https://github.com/new), crée un repo vide (ne coche ni README ni
.gitignore), et exécute les commandes qu'il te donne, du type :

```bash
git remote add origin https://github.com/<ton-compte>/padel-raquettes-blog.git
git branch -M main
git push -u origin main
```

### 2. Connecter Vercel

1. Va sur [vercel.com/new](https://vercel.com/new) et connecte-toi avec ton compte GitHub.
2. Importe le repo `padel-raquettes-blog`.
3. Vercel détecte Next.js automatiquement — laisse les réglages par défaut et clique sur Deploy.
4. Chaque `git push` sur `main` redéploiera automatiquement le site.

### 3. Configurer les variables d'environnement

Dans Vercel → Project Settings → Environment Variables, ajoute :

- `NEXT_PUBLIC_SITE_URL` : l'URL de ton site une fois déployé (ex: `https://padel-raquettes-blog.vercel.app`, ou ton domaine si tu en connectes un).
- `NEXT_PUBLIC_AMAZON_TAG` : ton identifiant Amazon Associates (ex: `montag-21`). **Tant que
  cette variable n'est pas configurée, les boutons produits redirigent vers une recherche
  Amazon générique (non affiliée) au lieu d'un vrai lien affilié.**

Voir `.env.example` pour la liste complète.

### 4. Créer ton compte Amazon Associates

Le programme d'affiliation Amazon n'est pas créé automatiquement — c'est une étape que tu dois
faire toi-même sur [affiliate-amazon.fr](https://affiliate-amazon.fr/) :

1. Inscris-toi avec ton compte Amazon.
2. Renseigne l'URL de ton site (celle de Vercel suffit pour démarrer).
3. Amazon te donne un identifiant de suivi (tracking ID), du type `montag-21`. Renseigne-le
   dans `NEXT_PUBLIC_AMAZON_TAG` sur Vercel (étape 3).
4. Pour chaque produit dans `content/products.json`, remplace le champ `"asin": "A_COMPLETER"`
   par le véritable ASIN Amazon du produit (visible dans l'URL de la page produit Amazon,
   juste après `/dp/`). C'est la seule étape manuelle nécessaire pour rendre les liens
   affiliés pleinement fonctionnels.
5. **Important** : le programme Amazon Associates exige au moins 3 ventes qualifiées dans les
   180 jours suivant l'inscription, sous peine de fermeture du compte. Fais la promotion du
   site (réseaux sociaux, SEO, bouche-à-oreille) dès les premières semaines.

## Comment le contenu quotidien est généré

Une tâche planifiée Claude Code exécute chaque jour les instructions décrites dans
[`AGENT_PLAYBOOK.md`](./AGENT_PLAYBOOK.md) : choix du sujet du jour dans
`content/calendar.json`, rédaction de l'article, insertion des liens affiliés, vérification du
build, puis commit + push (ce qui déclenche le redéploiement Vercel automatiquement).

Pour ajuster la ligne éditoriale, les critères SEO ou la façon dont les produits sont
sélectionnés, modifie directement `AGENT_PLAYBOOK.md`.

## Structure du projet

- `content/articles/*.mdx` — les articles publiés.
- `content/products.json` — base de données des raquettes (nom, ASIN, prix, caractéristiques).
- `content/calendar.json` — file d'attente des sujets à traiter, un par jour.
- `src/app/` — pages Next.js (guides, comparatifs, articles, mentions légales...).
- `src/components/` — composants UI, dont `ProductCard` et `ComparisonTable` utilisables
  directement dans le MDX des articles.
- `AGENT_PLAYBOOK.md` — mode d'emploi de la génération quotidienne d'article.
