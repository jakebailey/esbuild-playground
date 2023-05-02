import react from "@vitejs/plugin-react";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import { comlink } from "vite-plugin-comlink";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [
        comlink(),
        react(),
        splitVendorChunkPlugin(),
        nodePolyfills({
            // Whether to polyfill `node:` protocol imports.
            protocolImports: true,
        }),
    ],
    worker: {
        plugins: [comlink()],
    },
    build: {
        chunkSizeWarningLimit: Infinity,
        // rollupOptions: {
        //     output: {
        //         manualChunks: (id) => /esbuild-wasm/.test(id) ? "esbuild" : undefined,
        //     },
        // },
    },
});
