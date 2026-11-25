# ByTwoFolds

    npm install
    npm run dev

- Sitemap and copy plan: `docs/sitemap-and-content.md`
- All copy, services, projects and contact details: `src/lib/content.ts`
- 3D scenes: `src/three/` (hero fold, sea). Scroll motion: `src/components/Motion.tsx`
- Grid: 4 / 8 / 12 columns (`site-grid` in `src/app/globals.css`). Shift + G shows it in development.
- Copy `.env.example` to `.env.local` and set `INQUIRY_WEBHOOK_URL` so the form delivers.
