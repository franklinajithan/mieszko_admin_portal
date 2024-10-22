import path from "path";
import reactPlugin from "@vitejs/plugin-react"; // Renamed to avoid conflict
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173, // Custom port for development server
    open: true, // Opens the browser automatically
    proxy: {
      '/api': {
        target: 'http://localhost:5005',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  preview: {
    port: 5005, // Port for the preview server
    open: true, // Automatically opens the browser
    proxy: {
      '/api': {
        target: 'http://192.168.128.139:5002',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
