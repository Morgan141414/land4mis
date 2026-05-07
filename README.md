# land4mis

Premium QorMed landing/auth page built from the company brochure.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173/auth`.

Before shipping:

```bash
npm run qa
```

The QA command builds the production bundle, serves `dist`, and checks desktop/mobile rendering for console issues, horizontal overflow, manifest presence, the diagnostic widget, and the demo form wiring.

## Production knobs

Optional Vite environment variables:

```bash
VITE_QORMED_LOGIN_URL=https://mis.qormed.kz/auth
VITE_QORMED_DEMO_ENDPOINT=https://your-api.example.com/leads
VITE_QORMED_SALES_EMAIL=inbox@qormed.kz
```

If `VITE_QORMED_DEMO_ENDPOINT` is not configured, the demo form stores the lead locally and opens a prefilled email to sales. This keeps the landing usable before the backend/CRM integration is ready.

## Deploy notes

- `vercel.json` includes `/auth` SPA rewrites and basic security headers.
- `public/robots.txt`, `public/sitemap.xml`, `public/og-qormed.svg`, `public/favicon.svg`, and `public/site.webmanifest` are ready for `qormed.kz`.
- Analytics events are pushed to `window.dataLayer` and also emitted as `qormed:analytics` custom events.
- Demo leads get a local `QM-...` lead id and are posted to `VITE_QORMED_DEMO_ENDPOINT` when configured, otherwise a prefilled sales email opens.
- Public QorMed copy sources reflected in the page: implementation range, support positioning, 3-language support, and official inbox contact.
