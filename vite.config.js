import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) {
            return;
          }

          if (id.includes("firebase")) {
            return "firebase-vendor";
          }

          if (
            id.includes("@stripe") ||
            id.includes("axios") ||
            id.includes("@tanstack/react-query")
          ) {
            return "data-vendor";
          }

          if (id.includes("react-multi-carousel")) {
            return "ui-utils";
          }
        },
      },
    },
  },
  server: {
    open: true,
  },
  plugins: [react()],
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled"],
  },
});
