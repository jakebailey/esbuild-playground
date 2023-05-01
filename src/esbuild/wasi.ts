import { posix as path } from "node:path";

import * as JSONC from "jsonc-parser";
import WASI, { createFileSystem } from "wasi-js";
import browserBindings from "wasi-js/dist/bindings/browser";
import { WASIExitError, WASIFileSystem } from "wasi-js/dist/types";

import { memoize } from "../helpers";
import esbuildWasmURL from "./esbuild-wasi.wasm?url";

const getModule = memoize(() => WebAssembly.compileStreaming(fetch(esbuildWasmURL)));

export const argsJsonFilename = "/args.json";

export async function runEsbuildWasi(
    files: Map<string, string>,
    entrypoint: string,
): Promise<string> {
    // TODO: this should all be hanlded in a worker; all of this blocks the main thread.
    const fs = createFileSystem([{
        type: "mem",
        contents: Object.fromEntries(files),
    }]);

    let userArgs: string[] = [];

    if (files.has(argsJsonFilename)) {
        try {
            userArgs = JSONC.parse(files.get(argsJsonFilename)!);
            if (!Array.isArray(userArgs)) {
                throw new TypeError(`args is not an array`);
            }
            for (const arg of userArgs) {
                if (typeof arg !== "string") {
                    throw new TypeError(`arg ${arg} is not a string`);
                }
            }
        } catch (e) {
            return (e as any).toString();
        }
    }

    const hasOutdir = userArgs.findIndex((v) => v.startsWith("--outdir=")) !== -1;
    const hasOutfile = userArgs.findIndex((v) => v.startsWith("--outfile=")) !== -1;
    const hasPackages = userArgs.findIndex((v) => v.startsWith("--packages=")) !== -1;
    const hasEntrypoint = userArgs.findIndex((v) => !v.startsWith("--")) !== -1;

    const stdoutOutput = !hasOutdir && !hasOutfile;

    const args = ["/esbuild", ...userArgs];

    if (!hasPackages) {
        args.push("--packages=external");
    }

    if (!hasEntrypoint) {
        args.push(entrypoint);
    }

    let stdout = "";
    let stderr = "";

    const wasi = new WASI({
        args,
        env: {
            PWD: "/",
        },
        // Workaround for bug in wasi-js; browser-hrtime incorrectly returns a number.
        bindings: { ...browserBindings, fs, hrtime: (...args) => BigInt(browserBindings.hrtime(...args)) },
        preopens: {
            "/": "/",
        },
        sendStdout: (data) => {
            stdout += new TextDecoder().decode(data);
        },
        sendStderr: (data) => {
            stderr += new TextDecoder().decode(data);
        },
        getStdin: () => Buffer.from([]),
    });

    const module = await getModule();
    const instance = await WebAssembly.instantiate(module, wasi.getImports(module));

    let exitCode: number;
    try {
        wasi.start(instance);
        exitCode = 0;
    } catch (e) {
        if (e instanceof WASIExitError) {
            exitCode = e.code ?? 127;
        } else {
            return (e as any).toString();
        }
    }

    if (exitCode !== 0) {
        return stderr;
    }

    const wasiHeader = "// Produced by esbuild compiled with GOOS=wasip1 GOARCH=wasm"
        + "\n// This mode is a work-in-progress and is subject to change."
        + "\n\n";

    if (stdoutOutput) {
        return wasiHeader + stdout.trim();
    }

    let output = "";

    for (const p of walk(fs, "/")) {
        if (files.has(p)) continue;
        output += `// @filename: ${p}\n`;
        output += fs.readFileSync(p, { encoding: "utf8" });
        output += "\n\n";
    }

    return wasiHeader + output.trim();
}

function* walk(fs: WASIFileSystem, dir: string): Generator<string> {
    for (const p of fs.readdirSync(dir)) {
        const entry = path.join(dir, p);
        const stat = fs.statSync(entry);
        if (stat.isDirectory()) {
            yield* walk(fs, entry);
        } else if (stat.isFile()) {
            yield entry;
        }
    }
}
