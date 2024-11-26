import react from "@vitejs/plugin-react";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [
        react(),
        splitVendorChunkPlugin(),
        nodePolyfills(),
        viteStaticCopy({
            targets: [
                {
                    src: "node_modules/coi-serviceworker/coi-serviceworker.min.js",
                    dest: ".",
                },
            ],
        }),
    ],
    build: {
        chunkSizeWarningLimit: Infinity,
    },
});
