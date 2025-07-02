import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [
        react(),
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
        rollupOptions: {
            output: {
                manualChunks: (id) => id.includes("node_modules") ? "vendor" : undefined,
            },
        },
    },
});
