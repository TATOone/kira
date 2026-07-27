import cloudflare from '@astrojs/cloudflare';
import markdoc from '@astrojs/markdoc';
import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const isCloudflare = process.env.DEPLOY_TARGET === 'cloudflare';
const rootDir = path.dirname(fileURLToPath(import.meta.url));
const keystaticApiFix = path.resolve(rootDir, 'src/lib/keystatic-astro-api-fix.js');

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://resurs-materinstva.ru',
  output: 'static',
  adapter: isCloudflare ? cloudflare() : node({ mode: 'standalone' }),
  integrations: [
    react(),
    markdoc(),
    sitemap({
      filter: (page) => !page.includes('/keystatic'),
      serialize(item) {
        const isHome =
          item.url === 'https://resurs-materinstva.ru/' ||
          (new URL(item.url).pathname === '/');
        item.lastmod = new Date().toISOString();
        if (item.url.includes('/privacy')) {
          item.changefreq = 'yearly';
          item.priority = 0.3;
          return item;
        }
        item.changefreq = 'weekly';
        item.priority = isHome ? 1.0 : 0.5;
        return item;
      },
    }),
    keystatic(),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        {
          find: '@keystatic/astro/api',
          replacement: keystaticApiFix,
        },
        {
          find: /.*\/@keystatic\/astro\/dist\/keystatic-astro-api\.js$/,
          replacement: keystaticApiFix,
        },
      ],
    },
  },
});
