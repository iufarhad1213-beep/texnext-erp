# TexNext ERP

Textile & Garments ERP. Stack: React + Vite + TypeScript, Tailwind CSS, Lucide icons, Supabase (Auth, PostgreSQL, Storage), deployed on Vercel.

## Phase 01 status

| Step | Scope | Status |
|------|-------|--------|
| 1 | Project scaffold, i18n (EN/BN), pixel-matched Login page | Built, awaiting visual sign-off |
| 2 | Supabase Auth: email login, Google OAuth, session, protected routes, logout, password reset | Not started |
| 3 | Supabase schema, RLS, branding loaded from database | Not started |
| 4 | Executive Dashboard (Image 2 layout) | Not started |
| 5 | Admin Settings: branding, appearance, language, dashboard, users, roles, system | Not started |

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase URL and anon key
npm run dev
```

Open http://localhost:5173/login.

### Environment variables

| Name | Where to get it |
|------|-----------------|
| `VITE_SUPABASE_URL` | Supabase dashboard → Project Settings → API |
| `VITE_SUPABASE_ANON_KEY` | Same page, the `anon` public key |

Only the anon key goes in the frontend. Never put the `service_role` key in any `VITE_` variable or in the repository.

### Assets

The left login panel uses `public/assets/login-factory.jpg` as its background. Copy the factory photo to that path. Until then the panel shows a plain light-blue background. Step 5 will replace this with an upload in Admin Settings.

## Project structure

```
src/
  components/
    auth/        LoginForm
    branding/    Logo, TexNext wordmark
    common/      shared UI (buttons, inputs, cards) – added as needed
    layout/      Header, Sidebar, Bottom navigation – Step 4
  config/        branding defaults and types
  contexts/      LanguageContext, BrandingContext
  i18n/          English and Bengali dictionaries (type-checked key parity)
  pages/
    auth/        LoginPage
    dashboard/   Executive Dashboard – Step 4
    admin/       Admin Settings – Step 5
  services/      supabase client, auth service
  styles/        global CSS and Tailwind layers
  types/         shared TypeScript types
supabase/
  migrations/    SQL migrations – added in Step 3
```

## Deployment (Vercel)

1. Push to GitHub.
2. In Vercel, import the repository. Framework preset: Vite. Build command: `npm run build`. Output: `dist`.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under Project Settings → Environment Variables.
4. In Supabase → Authentication → URL Configuration, set the Site URL and add the Vercel URL to Redirect URLs. Google OAuth needs the Google client ID and secret configured under Authentication → Providers → Google, and the Supabase callback URL added to the Google Cloud console.

## Scripts

- `npm run dev`: development server
- `npm run build`: type-check and production build
- `npm run typecheck`: type-check only
- `npm run preview`: serve the production build locally
