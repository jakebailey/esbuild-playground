import react from "@vitejs/plugin-react";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        splitVendorChunkPlugin(),
        nodePolyfills({
            // Whether to polyfill `node:` protocol imports.
            protocolImports: true,
        }),
    ],
    build: {
        chunkSizeWarningLimit: Infinity,
        rollupOptions: {
            output: {
                manualChunks: (id) => /esbuild-wasm/.test(id) ? "esbuild" : undefined,
            },
        },
    },
});
