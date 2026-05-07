/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_QORMED_LOGIN_URL?: string;
  readonly VITE_QORMED_DEMO_ENDPOINT?: string;
  readonly VITE_QORMED_SALES_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
