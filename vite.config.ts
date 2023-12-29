import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "BBBoards App",
        short_name: "BBBoards",
        description: "BBBoards App description",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "screenshot1.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "wide",
            label: "Wonder Widgets",
          },
          {
            src: "screenshot1.png",
            sizes: "640x320",
            type: "image/png",
            form_factor: "narrow",
            label: "Wonder Widgets",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
