import { posix as path } from "node:path";

import type * as esbuild from "esbuild";
import * as JSONC from "jsonc-parser";
import WASI, { createFileSystem } from "wasi-js";
import browserBindings from "wasi-js/dist/bindings/browser";
import { WASIExitError, WASIFileSystem } from "wasi-js/dist/types";

import { memoize } from "../helpers";
import { configJsonFilename } from "./constants";
import esbuildWasmURL from "./esbuild-wasi.wasm?url";
import { ESBUILD_VERSION, flagsForBuildOptions } from "./third_party/common";

const getModule = memoize(() => WebAssembly.compileStreaming(fetch(esbuildWasmURL)));

export async function runEsbuildWasi(
    files: Map<string, string>,
    fallbackEntrypoint: string,
): Promise<string> {
    const fs = createFileSystem([{
        type: "mem",
        contents: Object.fromEntries(files),
    }]);

    let config: esbuild.BuildOptions = {
        bundle: true,
        packages: "external",
        entryPoints: [fallbackEntrypoint],
    };

    const configFile = files.get(configJsonFilename);
    if (configFile !== undefined) {
        try {
            config = { ...config, ...JSONC.parse(configFile) };
        } catch (e) {
            return (e as any).toString();
        }
    }

    // Allow defaults to be deleted by specifying null.
    // This is safe becuase no esbuild configuration allows null.
    for (const key of Object.keys(config)) {
        if ((config as any)[key] === null) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete (config as any)[key];
        }
    }

    // TODO: It's unfortunate to have to copy this function from esbuild;
    // any changes there won't be synced. But, the code is not exported.
    // I'd like to find a better way.
    let parsed;
    try {
        parsed = flagsForBuildOptions("build", config, false, "info", true);
    } catch (e) {
        return `${e}`;
    }

    const entrypoints: string[] = [];
    for (const [name, filename] of parsed.entries) {
        if (name) {
            entrypoints.push(`name=${filename}`);
        } else {
            entrypoints.push(filename);
        }
    }

    const args = ["/esbuild", ...parsed.flags, ...entrypoints];
    const stdoutOutput = !config.outdir && !config.outfile;

    let stdout = "";
    let stderr = "";

    let sab: Int32Array | undefined;
    const wasi = new WASI({
        args,
        env: {
            PWD: parsed.absWorkingDir ?? "/",
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
        sleep: (ms) => {
            sab ??= new Int32Array(new SharedArrayBuffer(4));
            Atomics.wait(sab, 0, 0, Math.max(ms, 1));
        },
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

    const wasiHeader = `// esbuild v${ESBUILD_VERSION} (GOOS=wasip1 GOARCH=wasm)`
        + `\n// args: ${args.slice(1).filter((v) => !v.startsWith("--log")).join(" ")}`
        + "\n\n";

    if (stdoutOutput) {
        return wasiHeader + stdout.trim();
    }

    let output = "";

    // As an easy way to find all output files, just walk the entire
    // filesystem and ignore anything that was an input. This lets us
    // get outputs like the split chunks without being able to get an
    // actual listing out of esbuild's CLI.
    //
    // TODO: Now that we have a real FS, use --metafile and get fancy?
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
