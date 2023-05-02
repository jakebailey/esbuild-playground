// This file is currently unused in favor of the new WASI-based option.
// It will be removed at some point, once I feel confident that the WASI
// is working out.

import { posix as path } from "node:path";

import esbuild from "esbuild-wasm";
import esbuildWasmURL from "esbuild-wasm/esbuild.wasm?url";
import * as JSONC from "jsonc-parser";

import { allExtensions, memoize } from "../helpers";
import { configJsonFilename } from "./constants";

const initialize = memoize(async () => {
    try {
        await esbuild.initialize({ wasmURL: esbuildWasmURL });
    } catch {
        // TODO: find a better way to handle this error in hot reload.
    }
});

export async function runEsbuildWasm(
    files: Map<string, string>,
    entrypoint: string,
): Promise<string> {
    try {
        let config: esbuild.BuildOptions = {
            entryPoints: [entrypoint],
        };

        const configFile = files.get(configJsonFilename);
        if (configFile !== undefined) {
            config = { ...config, ...JSONC.parse(configFile) };
        }

        config = {
            ...config,
            bundle: true,
            logLevel: "silent",
            packages: "external",
            plugins: [
                {
                    name: "vfs",
                    setup: (build) => {
                        build.onResolve({ filter: /.*/ }, (args) => {
                            const importPath = path.normalize(path.join(args.resolveDir, args.path));
                            let p: string | undefined;

                            // TODO: how can we do exactly what esbuild does and just stub the FS?
                            if (files.has(importPath)) {
                                p = importPath;
                            } else {
                                for (const ext of allExtensions) {
                                    const pWithExt = `${importPath}${ext}`;
                                    if (files.has(pWithExt)) {
                                        p = pWithExt;
                                        break;
                                    }
                                }
                            }

                            if (p === undefined) {
                                return undefined;
                            }

                            return { path: p };
                        });

                        build.onLoad({ filter: /.*/ }, (args) => {
                            const file = files.get(args.path);
                            if (file === undefined) {
                                return undefined;
                            }

                            return {
                                contents: file,
                                loader: pathToLoader(args.path),
                            };
                        });
                    },
                },
            ],
        };

        await initialize();
        const result = await esbuild.build(config);
        return result.outputFiles![0].text;
    } catch (e) {
        return (e as any).toString();
    }
}

function pathToLoader(p: string): esbuild.Loader | undefined {
    const ext = path.extname(p);
    switch (ext) {
        case ".js":
        case ".mjs":
        case ".cjs":
            return "js";
        case ".jsx":
            return "jsx";
        case ".ts":
        case ".mts":
        case ".cts":
            return "ts";
        case ".tsx":
            return "tsx";
        case ".json":
            return "json";
        default:
            return undefined;
    }
}
