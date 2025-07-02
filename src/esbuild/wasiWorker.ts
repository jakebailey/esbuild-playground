// eslint-disable-next-line unicorn/import-style
import { posix as path } from "node:path";

import { Directory, Fd, File, Inode, OpenFile, PreopenDirectory, WASI, WASIProcExit } from "@bjorn3/browser_wasi_shim";
import esbuildWasmURL from "@esbuild/wasi-preview1/esbuild.wasm?url";
import * as Comlink from "comlink";
import type * as esbuild from "esbuild";
import * as JSONC from "jsonc-parser";

import { memoize } from "../helpers";
import { configJsonFilename } from "./constants";
import { ESBUILD_VERSION, flagsForBuildOptions } from "./third_party/common";

const getModule = memoize(() => WebAssembly.compileStreaming(fetch(esbuildWasmURL)));

async function runEsbuildWasi(
    files: Map<string, string>,
    fallbackEntrypoint: string,
): Promise<string> {
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

    class StringOutput extends Fd {
        #output: (data: string) => void;

        constructor(output: (data: string) => void) {
            super();
            this.#output = output;
        }

        // eslint-disable-next-line @typescript-eslint/naming-convention
        override fd_write(data: Uint8Array): { ret: number; nwritten: number; } {
            this.#output(new TextDecoder().decode(data));
            return { ret: 0, nwritten: data.length };
        }
    }

    const fs = createFileSystem(files);

    const fds = [
        new OpenFile(new File([])), // stdin
        new StringOutput((data) => {
            stdout += data;
        }),
        new StringOutput((data) => {
            stderr += data;
        }),
        fs,
    ];

    const wasi = new WASI(args, [`PWD=${parsed.absWorkingDir ?? "/"}`], fds, { debug: false });

    const module = await getModule();
    const instance = await WebAssembly.instantiate(module, {
        "wasi_snapshot_preview1": wasi.wasiImport,
    });

    let exitCode: number;
    try {
        exitCode = wasi.start(instance as any);
    } catch (e) {
        if (e instanceof WASIProcExit) {
            exitCode = e.code;
        } else {
            return (e as any).toString();
        }
    }

    const wasiHeader = `// esbuild v${ESBUILD_VERSION} (GOOS=wasip1 GOARCH=wasm)`
        + `\n// args: ${args.slice(1).filter((v) => !v.startsWith("--log")).join(" ")}`
        + "\n\n";

    if (exitCode !== 0) {
        return wasiHeader + stderr.trim();
    }

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
    for (const { name, contents } of walk(fs, "/")) {
        if (files.has(name)) continue;
        output += `// @filename: ${name}\n`;
        output += contents;
        output += "\n\n";
    }

    return wasiHeader + output.trim();
}

type Tree = Map<string, string | Tree>;

function createFileSystem(files: Map<string, string>): PreopenDirectory {
    // Convert to Tree
    const tree: Tree = new Map();
    for (const [name, data] of files) {
        const parts = name.slice(1).split("/");
        const parents = parts.slice(0, -1);
        const base = parts.at(-1)!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

        let current = tree;
        for (const parent of parents) {
            if (!current.has(parent)) {
                current.set(parent, new Map());
            }
            current = current.get(parent) as Tree;
        }
        current.set(base, data);
    }

    function build(name: "/", tree: Tree): PreopenDirectory;
    function build(name: string, tree: Tree): Directory;
    function build(name: string, tree: Tree): PreopenDirectory | Directory {
        const contents = new Map<string, Inode>();
        for (const [name, data] of tree) {
            if (typeof data === "string") {
                contents.set(name, new File(new TextEncoder().encode(data)));
            } else {
                contents.set(name, build(name, data));
            }
        }
        return name === "/" ? new PreopenDirectory(name, contents) : new Directory(contents);
    }

    return build("/", tree);
}

function* walk(fs: PreopenDirectory | Directory, name: string): Generator<{ name: string; contents: string; }> {
    const dir = fs instanceof PreopenDirectory ? fs.dir : fs;

    for (const [childName, child] of dir.contents) {
        const childPath = path.join(name, childName);
        if (child instanceof Directory) {
            yield* walk(child, childPath);
        } else if (child instanceof File) {
            yield { name: childPath, contents: new TextDecoder().decode(child.data) };
        }
    }
}

export interface WASIWorkerExposed {
    runEsbuildWasi(files: Map<string, string>, entrypoint: string): Promise<string>;
}

const exposed: WASIWorkerExposed = { runEsbuildWasi };

Comlink.expose(exposed);
