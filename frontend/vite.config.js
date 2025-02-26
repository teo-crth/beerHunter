import path from 'path';
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], 
  base: "",
  server: {
    historyApiFallback: true,
  },
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@services": path.resolve(__dirname, "src/services"),
      "@": path.resolve(__dirname, "./src"),
      "@/*":  path.resolve(__dirname, "./src/*")
    },
  },
});
