import path from "path";
import reactPlugin from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import EnvironmentPlugin from "vite-plugin-environment";
// Clear specific environment variables
delete process.env["CommonProgramFiles(x86)"];
delete process.env["ProgramFiles(x86)"];
export default defineConfig({
  plugins: [
    reactPlugin(),
    EnvironmentPlugin("all"), // Ensure environment variables are loaded
  ],
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts", // Ensure this points to your setup file
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Setup alias for @
    },
  },
  server: {
    port: 5173, // Custom port for development server
    open: true, // Opens the browser automatically
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""), // Rewrite API paths
      },
    },
  },
  preview: {
    port: 5000, // Port for the preview server
    open: true, // Automatically opens the browser
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    // Remove the 'process.env.ProgramFiles_x86' and 'process.env.CommonProgramFiles_x86' lines
  },
});
