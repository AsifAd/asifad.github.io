// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// User site lives at the root of asifad.github.io — no base path needed.
export default defineConfig({
  site: "https://asifad.github.io",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
});
