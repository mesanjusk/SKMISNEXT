import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/legacy-client/test/setupTests.js",
    exclude: ["**/node_modules/**", "**/.next/**", "src/server/test/**"],
  },
});
