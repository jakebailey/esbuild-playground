import react from "@vitejs/plugin-react";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import { comlink } from "vite-plugin-comlink";
import Inspect from "vite-plugin-inspect";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [
        Inspect(),
        comlink(),
        react(),
        splitVendorChunkPlugin(),
        nodePolyfills({
            // Whether to polyfill `node:` protocol imports.
            protocolImports: true,
        }),
        viteStaticCopy({
            targets: [
                {
                    src: "node_modules/coi-serviceworker/coi-serviceworker.min.js",
                    dest: ".",
                },
            ],
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
