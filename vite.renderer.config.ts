import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@renderer": path.resolve(__dirname, "./src/renderer"),
      "@pages": path.resolve(__dirname, "./src/renderer/pages"),
      "@components": path.resolve(__dirname, "./src/renderer/components"),
      "@routes": path.resolve(__dirname, "./src/renderer/routes"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@recoil": path.resolve(__dirname, "./src/utils/recoil"),
    },
  },
});
