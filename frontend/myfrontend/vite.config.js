import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 1000,
  },
  server: {
    host: "0.0.0.0", // Listen on all network interfaces
    port: 5173, // Port number (optional, if you want to specify a port)
  },
});
