// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

const isStaging = process.env.PUBLIC_STAGING === 'true';

// https://astro.build/config
export default defineConfig({
  output: isStaging ? 'server' : 'static',
  ...(isStaging ? { adapter: vercel() } : {}),
  integrations: [mdx()],
});
