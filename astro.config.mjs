// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
        prefixDefaultLocale: false
    }
  },

  site: "https://portfolio.coloma.design",
  integrations: [sitemap()],
});