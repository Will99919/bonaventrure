# Bonaventure

Site vitrine et back-office pour Hermide Bonaventure, styliste sur mesure à Lyon.

Stack : Next.js (App Router) · CSS Modules · Prisma + SQLite · Auth.js (credentials) · Cloudinary (images) · Resend (emails).

La maquette de référence (comportements, tokens, copie définitive) est dans `design_handoff_bonaventure/README.md`.

## Démarrer

```bash
npm install
cp .env.example .env   # puis renseigner les valeurs
npx prisma migrate dev
npm run db:seed        # crée le compte admin à partir de ADMIN_EMAIL / ADMIN_PASSWORD
npm run dev
```

- Site public : http://localhost:3000
- Back-office : http://localhost:3000/admin (identifiants du seed)

## Variables d'environnement

Voir `.env.example`. Sans clés Cloudinary/Resend, l'upload d'image et l'envoi d'email échouent silencieusement (avertissement en console) mais le reste de l'app fonctionne normalement.

## Scripts

- `npm run dev` — serveur de développement
- `npm run build` / `npm run start` — build et exécution en production
- `npm run lint` — ESLint
- `npm run db:seed` — (re)crée le compte admin et la ligne de textes par défaut
