import path from "path";
import reactPlugin from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [reactPlugin()],
    test: {
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 5173,
      open: true,
      proxy: {
        "/api": {
          target: env.VITE_BASE_URL_DEV, // Use environment variable dynamically
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    preview: {
      port: 5000,
      open: true,
    },
    define: {
      "process.env": JSON.stringify(env), // Define all environment variables
    },
  };
});
