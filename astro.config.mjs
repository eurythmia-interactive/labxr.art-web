import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://labxr.art',
  output: 'static',
  integrations: [react(), tailwind()],
  build: {
    format: 'directory',
  },
  trailingSlash: 'never',
  transitions: {
    style: 'fade',
    animation: 'none',
  },
});
