import { posix as path } from "node:path";

import { useEffect, useState } from "react";

import { argsJsonFilename } from "./esbuild/constants";
import { runEsbuildWasi } from "./esbuild/wasi";
import { runEsbuildWasm } from "./esbuild/wasm";
import { allExtensions } from "./helpers";

export function useEsbuild(input: string): string {
    const [built, setBuilt] = useState("");

    useEffect(() => {
        void runEsbuild(input, setBuilt);
    }, [input]);

    return built;
}

async function runEsbuild(input: string, setBuilt: (built: string) => void) {
    const { files, entrypoint } = splitInput(input);
    const builder = files.has(argsJsonFilename) ? runEsbuildWasi : runEsbuildWasm;
    const out = await builder(files, entrypoint);
    setBuilt(out);
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
