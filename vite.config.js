import path from 'path';
import reactPlugin from '@vitejs/plugin-react'; // Renamed to avoid conflict
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment'; // Import for environment variables

// Filter out invalid environment variables
const filteredEnv = Object.fromEntries(
  Object.entries(process.env).filter(([key]) => 
    !/ProgramFiles|CommonProgramFiles/.test(key) // Exclude problematic environment variables
  )
);

export default defineConfig({
  plugins: [
    reactPlugin(),
    EnvironmentPlugin({ all: true }) // Ensure environment variables are loaded
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
<<<<<<< HEAD
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    // Remove the 'process.env.ProgramFiles_x86' and 'process.env.CommonProgramFiles_x86' lines
=======
    // Use the filtered environment variables instead of the global ones
    'process.env': JSON.stringify(filteredEnv),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'), // Define process.env.NODE_ENV for compatibility
>>>>>>> 3bc2dc99f34893d5eaa349a7ddadc9595d6156a5
  },
});
