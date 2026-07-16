This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

---------------------------------------------Français-----------------------------------------------------------------

# Ô di Sé Janzu

Site vitrine full-stack avec dashboard admin pour **Nathalie**, praticienne de soins aquatiques (Janzu) au Pays Basque. Projet de fin de formation (DWWM/RNCP), développé en autonomie du backend au frontend.

🔗 [odise-janzu.com](https://odise-janzu.com)

## Aperçu

- Site vitrine public : présentation, prestations, galerie photo/vidéo, formulaire de contact
- Dashboard admin : gestion du contenu (photos, avis, textes du site)
- Version mobile responsive

## Stack technique

| Domaine         | Techno                                                |
| --------------- | ----------------------------------------------------- |
| Frontend        | Next.js 16 (App Router), Bootstrap, Framer Motion     |
| Backend         | Express.js (Node.js)                                  |
| Base de données | MySQL (AlwaysData)                                    |
| Hébergement     | Vercel (frontend et backend sur deux projets séparés) |
| Stockage média  | Cloudflare Images & Stream                            |
| DNS / Domaine   | Cloudflare (registrar), `odise-janzu.com`             |

## Sécurité

- Authentification JWT double-token : `accessToken` (15 min, en mémoire React via `AuthContext`) + `refreshToken` (7 jours, cookie httpOnly)
- Intercepteurs Axios avec flag anti-boucle sur le refresh
- Hash des mots de passe : Argon2
- Validation des données : Zod
- Rate limiting : `express-rate-limit`
- CORS avec `credentials: true`
- RGPD : consentement explicite sur le formulaire de contact

## Prérequis

- Node.js ≥ 18
- Une base MySQL accessible
- Un compte Cloudflare (Images & Stream)

## Installation

```bash
git clone https://github.com/Leodevtech/odiseJanzu.git
cd odiseJanzu
npm install
```

## Variables d'environnement

Créer un fichier `.env` (backend) et `.env.local` (frontend) à partir des exemples fournis :

```env
# Frontend
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_BASE_URL=

# Backend
DATABASE_URL=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=
CORS_ORIGIN=
```

## Lancer le projet en local

```bash
npm run launch
```

(lance frontend et backend en parallèle via `concurrently`)

## Structure du projet

```
odiseJanzu/
├── frontend/        # Next.js (App Router)
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   └── lib/
├── backend/          # Express.js
│   ├── routes/
│   ├── controllers/
│   └── middlewares/
└── README.md
```

## Déploiement

Le frontend et le backend sont déployés séparément sur Vercel. Le domaine `odise-janzu.com` est enregistré sur Cloudflare, avec des CNAMEs pointant vers Vercel.

⚠️ Vercel impose un filesystem en lecture seule et une limite de payload serverless de 4.5 Mo : tout le stockage média (photos/vidéos) passe par Cloudflare Images & Stream, pas de stockage disque local ni de BLOB en base.

## Roadmap

- [ ] Compression des images côté frontend avant upload (`browser-image-compression`)
- [ ] Corriger l'affichage des légendes de galerie (afficher `description` au lieu de `alt`)
- [ ] Audit sécurité du dashboard admin
- [ ] Remplacer certaines images statiques par de courtes vidéos animées
- [ ] Remplir la base de données de production

## Auteur

Développé par **Léo** ([Leodevtech](https://github.com/Leodevtech)) dans le cadre d'une formation DWWM.
