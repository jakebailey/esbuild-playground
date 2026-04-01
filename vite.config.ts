import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    plugins: [
        solidPlugin(),
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
