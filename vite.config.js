import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  // Base path for GitHub Pages (repo hosted at https://JoseAlvarezDev.github.io/f1-2026-web)
  base: "/f1-2026-web/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["logo.png", "logo.webp", "background.png"],
      manifest: {
        name: "F1 2026 Calendar",
        short_name: "F1 2026",
        description: "Calendario Oficial Fórmula 1 Temporada 2026",
        theme_color: "#e10600",
        background_color: "#15151e",
        display: "standalone",
        scope: "/f1-2026-web/",
        start_url: "/f1-2026-web/",
        icons: [
          {
            src: "/f1-2026-web/logo.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/f1-2026-web/logo.webp",
            sizes: "512x512",
            type: "image/webp",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
