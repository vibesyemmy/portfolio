/// <reference types="astro/client" />

declare module '@fontsource-variable/inter';
declare module '@fontsource/fragment-mono';

interface ImportMetaEnv {
  readonly SITE_PASSWORD?: string;
  readonly PUBLIC_STAGING?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
