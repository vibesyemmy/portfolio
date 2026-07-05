import type { APIRoute } from 'astro';

const isStaging = import.meta.env.PUBLIC_STAGING === 'true';

const stagingRobots = `User-agent: *
Disallow: /`;

const productionRobots = `User-agent: *
Allow: /

Sitemap: https://opeyemi.app/sitemap.xml`;

export const GET: APIRoute = () => {
  return new Response(isStaging ? stagingRobots : productionRobots, {
    headers: { 'Content-Type': 'text/plain' },
  });
};
