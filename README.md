# land4mis

Premium QorMed landing/auth page built from the company brochure.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:5173/auth`.

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
- `public/robots.txt`, `public/sitemap.xml`, and `public/og-qormed.svg` are ready for `qormed.kz`.
- Analytics events are pushed to `window.dataLayer` and also emitted as `qormed:analytics` custom events.
- Public QorMed copy sources reflected in the page: implementation range, support positioning, 3-language support, and official inbox contact.
