import { posix as path } from "node:path";

import esbuild from "esbuild-wasm";
import esbuildWasmURL from "esbuild-wasm/esbuild.wasm?url";
import * as JSONC from "jsonc-parser";
import { useEffect, useState } from "react";

export function useEsbuild(input: string): string {
    const [built, setBuilt] = useState("");

    useEffect(() => {
        void runEsbuild(input, setBuilt);
    }, [input]);

    return built;
}

const initialize = memoize(async () => {
    try {
        await esbuild.initialize({ wasmURL: esbuildWasmURL });
    } catch {
        // TODO: find a better way to handle this error in hot reload.
    }
});

async function runEsbuild(input: string, setBuilt: (built: string) => void) {
    const { files, entrypoint } = splitInput(input);

    try {
        let config: esbuild.BuildOptions = {
            entryPoints: [entrypoint],
        };

        const configFile = files.get("/config.json");
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
        setBuilt(result.outputFiles![0].text);
    } catch (e) {
        setBuilt(`${e}`);
    }
}

const allExtensions = [
    ".tsx",
    ".ts",
    ".mts",
    ".cts",
    ".jsx",
    ".js",
    ".mjs",
    ".cjs",
];

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

const defaultFilename = "/index.tsx";

// TODO: parse/ignore all twoslash comments
const filenameRegexp = /^\s*\/\/\s*@filename:\s*(.+)$/gim;

function splitInput(input: string) {
    filenameRegexp.lastIndex = 0;
    if (!filenameRegexp.test(input)) {
        return {
            files: new Map([[defaultFilename, input]]),
            entrypoint: defaultFilename,
        };
    }

    const lines = input.split(/\r?\n/g);

    let currentFilename: string | undefined;
    let currentLines: string[] = [];

    const files = new Map<string, string>();
    function finalizeFile() {
        if (currentFilename) {
            files.set(currentFilename, currentLines.join("\n"));
        }
    }

    for (const line of lines) {
        filenameRegexp.lastIndex = 0;
        const match = filenameRegexp.exec(line);
        if (match) {
            finalizeFile();
            currentFilename = path.resolve("/", match[1]);
            currentLines = [];
            continue;
        }

        if (currentFilename) {
            currentLines.push(line);
        }
    }

    finalizeFile();

    let entrypoint = currentFilename!;
    for (const ext of allExtensions) {
        const p = `/index${ext}`;
        if (files.has(p)) {
            entrypoint = p;
            break;
        }
    }

    return {
        files,
        entrypoint,
    };
}

function memoize<T extends {}>(fn: () => T): () => T {
    let value: T | undefined;
    return () => value ??= fn();
}
