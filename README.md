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
VITE_QORMED_SALES_EMAIL=sales@example.com
```

If `VITE_QORMED_DEMO_ENDPOINT` is not configured, the demo form stores the lead locally and opens a prefilled email to sales. This keeps the landing usable before the backend/CRM integration is ready.
