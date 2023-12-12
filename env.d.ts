/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AZURE_AUTH_CLIENT_ID: string;
  readonly VITE_AZURE_AUTH_REDIRECT_URI: string;
  readonly VITE_AZURE_AUTH_TENANT_NAME: string;
  readonly VITE_AZURE_AUTH_POLICY_SIGNUPSIGNIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
