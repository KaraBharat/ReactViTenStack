import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    checker({
      typescript: {
        root: ".",
        tsconfigPath: "./tsconfig.app.json",
        buildMode: true,
      },
      enableBuild: true,
      overlay: true,
      terminal: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@server": path.resolve(__dirname, "../server"),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react/") || id.includes("react-dom/")) {
              return "react";
            }

            if (
              id.includes("@tanstack/react-query") ||
              id.includes("@tanstack/react-router")
            ) {
              return "tanstack";
            }

            if (id.includes("@radix-ui/react-") || id.includes("next-themes")) {
              return "radix";
            }
          }
        },
      },
    },
  },
});
