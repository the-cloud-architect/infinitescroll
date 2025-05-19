import { defineConfig } from "vite";
import { vitePlugin as remix } from "@remix-run/dev";
import { fileURLToPath, URL } from "node:url";   // ← add

export default defineConfig({
  plugins: [
    remix({
      appDirectory: "src",
    }),
  ],

  ssr: { noExternal: ["react-dom/server"] },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
