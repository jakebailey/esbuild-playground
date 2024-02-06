import assert from "node:assert";
import { posix as path } from "node:path";

import { allExtensions } from "./helpers";

const defaultFilename = "/index.tsx";

// TODO: parse/ignore all twoslash comments
export const filenameRegexp = /^\s*\/\/\s*@filename:\s*(.+)$/gim;

export interface SplitInput {
    files: Map<string, string>;
    entrypoint: string;
}

export function splitInput(input: string): SplitInput {
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
    assert(currentFilename, "at least one file should have been found");

    let entrypoint = currentFilename;
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
