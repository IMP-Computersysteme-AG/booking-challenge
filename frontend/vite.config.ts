import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    // In the dev loop the frontend runs on its own port and forwards API calls to Spring Boot,
    // so there is no CORS setup to maintain. In the container both come from the same origin.
    proxy: {
      "/api": "http://localhost:8080",
    },
  },

  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: false,
    // MUI ships ESM directory imports that Vitest cannot resolve unless they are inlined.
    server: { deps: { inline: [/@mui\//] } },
  },
});
