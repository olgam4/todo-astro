import { defineConfig } from 'astro/config';

import solid from '@astrojs/solid-js';
import netlify from '@astrojs/netlify/edge-functions';

// https://astro.build/config
export default defineConfig({
  integrations: [solid(), netlify()]
});
