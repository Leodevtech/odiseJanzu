Ô di Sé Janzu

Site vitrine full-stack avec dashboard admin pour Nathalie, praticienne de soins aquatiques (Janzu) au Pays Basque. Projet de fin de formation (DWWM/RNCP), développé en autonomie du backend au frontend.

🔗 odise-janzu.com

Aperçu


Site vitrine public : présentation, prestations, galerie photo/vidéo, formulaire de contact
Dashboard admin : gestion du contenu (photos, avis, textes du site)
Version mobile responsive

Stack technique

| Domaine | Techno |
|---|---|
| Frontend | Next.js 16 (App Router), Bootstrap, Framer Motion |
| Backend | Express.js (Node.js) |
| Base de données | MySQL (AlwaysData) |
| Hébergement | Vercel (frontend et backend sur deux projets séparés) |
| Stockage média | Cloudflare Images & Stream |
| DNS / Domaine | Cloudflare (registrar), `odise-janzu.com` |

Sécurité

- Authentification JWT double-token : `accessToken` (15 min, en mémoire React via `AuthContext`) + `refreshToken` (7 jours, cookie httpOnly)
- Intercepteurs Axios avec flag anti-boucle sur le refresh
- Hash des mots de passe : Argon2
- Validation des données : Zod
- Rate limiting : `express-rate-limit`
- CORS avec `credentials: true`
- RGPD : consentement explicite sur le formulaire de contact

- Prérequis

- Node.js ≥ 18
- Une base MySQL accessible
- Un compte Cloudflare (Images & Stream)


Variables d'environnement

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

Lancer le projet en local

```bash -backend
npm run launch
```
(lance frontend et backend en parallèle via `concurrently`)

Structure du projet

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

Déploiement

Le frontend et le backend sont déployés séparément sur Vercel. Le domaine `odise-janzu.com` est enregistré sur Cloudflare, avec des CNAMEs pointant vers Vercel.

⚠️ Vercel impose un filesystem en lecture seule et une limite de payload serverless de 4.5 Mo : tout le stockage média (photos/vidéos) passe par Cloudflare Images & Stream, pas de stockage disque local ni de BLOB en base.



Auteur

Développé par Léo (Leodevtech) dans le cadre d'une formation DWWM.
