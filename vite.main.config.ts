import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config
export default defineConfig(({ command, mode }) => {
  return {
    build: {
      rollupOptions: {
        external: ["puppeteer-extra-plugin-adblocker"],
      },
    },
    resolve: {
      // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
      browserField: false,
      mainFields: ["module", "jsnext:main", "jsnext"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@puppeteer": path.resolve(__dirname, "./src/utils/puppeteer"),
        "@handlers": path.resolve(__dirname, "./src/utils/ipc/handlers"),
      },
    },
  };
});
