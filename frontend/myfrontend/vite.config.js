import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    rollupOptions: {
      // External dependencies are typically only needed if you're
      // not bundling them with your application, such as using a CDN.

      external: ["react", "react-dom"],
    },
    outDir: "dist", // Ensure the build output is in the 'dist' directory
  },
  server: {
    host: "0.0.0.0", // Listen on all network interfaces
    port: 5173, // Port number (optional, if you want to specify a port)
  },
});
