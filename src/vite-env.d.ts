/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ODOO_URL: string
  readonly VITE_ODOO_DB: string
  readonly VITE_ODOO_USER: string
  readonly VITE_ODOO_PASS: string
  readonly VITE_APP_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_GTM_ID: string
  readonly VITE_STRIPE_PUBLIC_KEY: string
  readonly VITE_PAYPAL_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare const __APP_VERSION__: string
