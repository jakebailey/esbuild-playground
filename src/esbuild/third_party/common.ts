// Code generated by scripts/vendor-esbuild; DO NOT EDIT.
// https://raw.githubusercontent.com/evanw/esbuild/v0.18.18/lib/shared/common.ts

/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */

/*!
MIT License

Copyright (c) 2020 Evan Wallace

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

import type * as types from "esbuild";
import * as protocol from "./stdio_protocol";

const quote: (x: string) => string = JSON.stringify;

function validateTarget(target: string): string {
    validateStringValue(target, "target");
    if (target.indexOf(",") >= 0) throw new Error(`Invalid target: ${target}`);
    return target;
}

let mustBeBoolean = (value: boolean | undefined): string | null => typeof value === "boolean" ? null : "a boolean";

let mustBeString = (value: string | undefined): string | null => typeof value === "string" ? null : "a string";

let mustBeRegExp = (value: RegExp | undefined): string | null => value instanceof RegExp ? null : "a RegExp object";

let mustBeInteger = (value: number | undefined): string | null =>
    typeof value === "number" && value === (value | 0) ? null : "an integer";

let mustBeArray = <T>(value: T[] | undefined): string | null => Array.isArray(value) ? null : "an array";

let mustBeObject = (value: Object | undefined): string | null =>
    typeof value === "object" && value !== null && !Array.isArray(value) ? null : "an object";

let mustBeEntryPoints = (value: types.BuildOptions["entryPoints"]): string | null =>
    typeof value === "object" && value !== null ? null : "an array or an object";

let mustBeStringOrBoolean = (value: string | boolean | undefined): string | null =>
    typeof value === "string" || typeof value === "boolean" ? null : "a string or a boolean";

let mustBeStringOrObject = (value: string | Object | undefined): string | null =>
    typeof value === "string" || typeof value === "object" && value !== null && !Array.isArray(value)
        ? null
        : "a string or an object";

let mustBeStringOrArray = (value: string | string[] | undefined): string | null =>
    typeof value === "string" || Array.isArray(value) ? null : "a string or an array";

let mustBeStringOrUint8Array = (value: string | Uint8Array | undefined): string | null =>
    typeof value === "string" || value instanceof Uint8Array ? null : "a string or a Uint8Array";

type OptionKeys = { [key: string]: boolean; };

function getFlag<T, K extends (keyof T & string)>(
    object: T,
    keys: OptionKeys,
    key: K,
    mustBeFn: (value: T[K]) => string | null,
): T[K] | undefined {
    let value = object[key];
    keys[key + ""] = true;
    if (value === undefined) return undefined;
    let mustBe = mustBeFn(value);
    if (mustBe !== null) throw new Error(`${quote(key)} must be ${mustBe}`);
    return value;
}

function checkForInvalidFlags(object: Object, keys: OptionKeys, where: string): void {
    for (let key in object) {
        if (!(key in keys)) {
            throw new Error(`Invalid option ${where}: ${quote(key)}`);
        }
    }
}

type MangleCache = Record<string, string | false>;

function validateMangleCache(mangleCache: MangleCache | undefined): MangleCache | undefined {
    let validated: MangleCache | undefined;
    if (mangleCache !== undefined) {
        validated = Object.create(null) as MangleCache;
        for (let key in mangleCache) {
            let value = mangleCache[key];
            if (typeof value === "string" || value === false) {
                validated[key] = value;
            } else {
                throw new Error(`Expected ${quote(key)} in mangle cache to map to either a string or false`);
            }
        }
    }
    return validated;
}

type CommonOptions = types.BuildOptions | types.TransformOptions;

function pushLogFlags(
    flags: string[],
    options: CommonOptions,
    keys: OptionKeys,
    isTTY: boolean,
    logLevelDefault: types.LogLevel,
): void {
    let color = getFlag(options, keys, "color", mustBeBoolean);
    let logLevel = getFlag(options, keys, "logLevel", mustBeString);
    let logLimit = getFlag(options, keys, "logLimit", mustBeInteger);

    if (color !== void 0) flags.push(`--color=${color}`);
    else if (isTTY) flags.push(`--color=true`); // This is needed to fix "execFileSync" which buffers stderr
    flags.push(`--log-level=${logLevel || logLevelDefault}`);
    flags.push(`--log-limit=${logLimit || 0}`);
}

function validateStringValue(value: unknown, what: string, key?: string): string {
    if (typeof value !== "string") {
        throw new Error(
            `Expected value for ${what}${
                key !== void 0 ? " " + quote(key) : ""
            } to be a string, got ${typeof value} instead`,
        );
    }
    return value;
}

function pushCommonFlags(flags: string[], options: CommonOptions, keys: OptionKeys): void {
    let legalComments = getFlag(options, keys, "legalComments", mustBeString);
    let sourceRoot = getFlag(options, keys, "sourceRoot", mustBeString);
    let sourcesContent = getFlag(options, keys, "sourcesContent", mustBeBoolean);
    let target = getFlag(options, keys, "target", mustBeStringOrArray);
    let format = getFlag(options, keys, "format", mustBeString);
    let globalName = getFlag(options, keys, "globalName", mustBeString);
    let mangleProps = getFlag(options, keys, "mangleProps", mustBeRegExp);
    let reserveProps = getFlag(options, keys, "reserveProps", mustBeRegExp);
    let mangleQuoted = getFlag(options, keys, "mangleQuoted", mustBeBoolean);
    let minify = getFlag(options, keys, "minify", mustBeBoolean);
    let minifySyntax = getFlag(options, keys, "minifySyntax", mustBeBoolean);
    let minifyWhitespace = getFlag(options, keys, "minifyWhitespace", mustBeBoolean);
    let minifyIdentifiers = getFlag(options, keys, "minifyIdentifiers", mustBeBoolean);
    let lineLimit = getFlag(options, keys, "lineLimit", mustBeInteger);
    let drop = getFlag(options, keys, "drop", mustBeArray);
    let dropLabels = getFlag(options, keys, "dropLabels", mustBeArray);
    let charset = getFlag(options, keys, "charset", mustBeString);
    let treeShaking = getFlag(options, keys, "treeShaking", mustBeBoolean);
    let ignoreAnnotations = getFlag(options, keys, "ignoreAnnotations", mustBeBoolean);
    let jsx = getFlag(options, keys, "jsx", mustBeString);
    let jsxFactory = getFlag(options, keys, "jsxFactory", mustBeString);
    let jsxFragment = getFlag(options, keys, "jsxFragment", mustBeString);
    let jsxImportSource = getFlag(options, keys, "jsxImportSource", mustBeString);
    let jsxDev = getFlag(options, keys, "jsxDev", mustBeBoolean);
    let jsxSideEffects = getFlag(options, keys, "jsxSideEffects", mustBeBoolean);
    let define = getFlag(options, keys, "define", mustBeObject);
    let logOverride = getFlag(options, keys, "logOverride", mustBeObject);
    let supported = getFlag(options, keys, "supported", mustBeObject);
    let pure = getFlag(options, keys, "pure", mustBeArray);
    let keepNames = getFlag(options, keys, "keepNames", mustBeBoolean);
    let platform = getFlag(options, keys, "platform", mustBeString);
    let tsconfigRaw = getFlag(options, keys, "tsconfigRaw", mustBeStringOrObject);

    if (legalComments) flags.push(`--legal-comments=${legalComments}`);
    if (sourceRoot !== void 0) flags.push(`--source-root=${sourceRoot}`);
    if (sourcesContent !== void 0) flags.push(`--sources-content=${sourcesContent}`);
    if (target) {
        if (Array.isArray(target)) flags.push(`--target=${Array.from(target).map(validateTarget).join(",")}`);
        else flags.push(`--target=${validateTarget(target)}`);
    }
    if (format) flags.push(`--format=${format}`);
    if (globalName) flags.push(`--global-name=${globalName}`);
    if (platform) flags.push(`--platform=${platform}`);
    if (tsconfigRaw) {
        flags.push(`--tsconfig-raw=${typeof tsconfigRaw === "string" ? tsconfigRaw : JSON.stringify(tsconfigRaw)}`);
    }

    if (minify) flags.push("--minify");
    if (minifySyntax) flags.push("--minify-syntax");
    if (minifyWhitespace) flags.push("--minify-whitespace");
    if (minifyIdentifiers) flags.push("--minify-identifiers");
    if (lineLimit) flags.push(`--line-limit=${lineLimit}`);
    if (charset) flags.push(`--charset=${charset}`);
    if (treeShaking !== void 0) flags.push(`--tree-shaking=${treeShaking}`);
    if (ignoreAnnotations) flags.push(`--ignore-annotations`);
    if (drop) for (let what of drop) flags.push(`--drop:${validateStringValue(what, "drop")}`);
    if (dropLabels) {
        flags.push(
            `--drop-labels=${Array.from(dropLabels).map((what) => validateStringValue(what, "dropLabels")).join(",")}`,
        );
    }
    if (mangleProps) flags.push(`--mangle-props=${mangleProps.source}`);
    if (reserveProps) flags.push(`--reserve-props=${reserveProps.source}`);
    if (mangleQuoted !== void 0) flags.push(`--mangle-quoted=${mangleQuoted}`);

    if (jsx) flags.push(`--jsx=${jsx}`);
    if (jsxFactory) flags.push(`--jsx-factory=${jsxFactory}`);
    if (jsxFragment) flags.push(`--jsx-fragment=${jsxFragment}`);
    if (jsxImportSource) flags.push(`--jsx-import-source=${jsxImportSource}`);
    if (jsxDev) flags.push(`--jsx-dev`);
    if (jsxSideEffects) flags.push(`--jsx-side-effects`);

    if (define) {
        for (let key in define) {
            if (key.indexOf("=") >= 0) throw new Error(`Invalid define: ${key}`);
            flags.push(`--define:${key}=${validateStringValue(define[key], "define", key)}`);
        }
    }
    if (logOverride) {
        for (let key in logOverride) {
            if (key.indexOf("=") >= 0) throw new Error(`Invalid log override: ${key}`);
            flags.push(`--log-override:${key}=${validateStringValue(logOverride[key], "log override", key)}`);
        }
    }
    if (supported) {
        for (let key in supported) {
            if (key.indexOf("=") >= 0) throw new Error(`Invalid supported: ${key}`);
            const value = supported[key];
            if (typeof value !== "boolean") {
                throw new Error(
                    `Expected value for supported ${quote(key)} to be a boolean, got ${typeof value} instead`,
                );
            }
            flags.push(`--supported:${key}=${value}`);
        }
    }
    if (pure) for (let fn of pure) flags.push(`--pure:${validateStringValue(fn, "pure")}`);
    if (keepNames) flags.push(`--keep-names`);
}

export function flagsForBuildOptions(
    callName: string,
    options: types.BuildOptions,
    isTTY: boolean,
    logLevelDefault: types.LogLevel,
    writeDefault: boolean,
): {
    entries: [string, string][];
    flags: string[];
    write: boolean;
    stdinContents: Uint8Array | null;
    stdinResolveDir: string | null;
    absWorkingDir: string | undefined;
    nodePaths: string[];
    mangleCache: MangleCache | undefined;
} {
    let flags: string[] = [];
    let entries: [string, string][] = [];
    let keys: OptionKeys = Object.create(null);
    let stdinContents: Uint8Array | null = null;
    let stdinResolveDir: string | null = null;
    pushLogFlags(flags, options, keys, isTTY, logLevelDefault);
    pushCommonFlags(flags, options, keys);

    let sourcemap = getFlag(options, keys, "sourcemap", mustBeStringOrBoolean);
    let bundle = getFlag(options, keys, "bundle", mustBeBoolean);
    let splitting = getFlag(options, keys, "splitting", mustBeBoolean);
    let preserveSymlinks = getFlag(options, keys, "preserveSymlinks", mustBeBoolean);
    let metafile = getFlag(options, keys, "metafile", mustBeBoolean);
    let outfile = getFlag(options, keys, "outfile", mustBeString);
    let outdir = getFlag(options, keys, "outdir", mustBeString);
    let outbase = getFlag(options, keys, "outbase", mustBeString);
    let tsconfig = getFlag(options, keys, "tsconfig", mustBeString);
    let resolveExtensions = getFlag(options, keys, "resolveExtensions", mustBeArray);
    let nodePathsInput = getFlag(options, keys, "nodePaths", mustBeArray);
    let mainFields = getFlag(options, keys, "mainFields", mustBeArray);
    let conditions = getFlag(options, keys, "conditions", mustBeArray);
    let external = getFlag(options, keys, "external", mustBeArray);
    let packages = getFlag(options, keys, "packages", mustBeString);
    let alias = getFlag(options, keys, "alias", mustBeObject);
    let loader = getFlag(options, keys, "loader", mustBeObject);
    let outExtension = getFlag(options, keys, "outExtension", mustBeObject);
    let publicPath = getFlag(options, keys, "publicPath", mustBeString);
    let entryNames = getFlag(options, keys, "entryNames", mustBeString);
    let chunkNames = getFlag(options, keys, "chunkNames", mustBeString);
    let assetNames = getFlag(options, keys, "assetNames", mustBeString);
    let inject = getFlag(options, keys, "inject", mustBeArray);
    let banner = getFlag(options, keys, "banner", mustBeObject);
    let footer = getFlag(options, keys, "footer", mustBeObject);
    let entryPoints = getFlag(options, keys, "entryPoints", mustBeEntryPoints);
    let absWorkingDir = getFlag(options, keys, "absWorkingDir", mustBeString);
    let stdin = getFlag(options, keys, "stdin", mustBeObject);
    let write = getFlag(options, keys, "write", mustBeBoolean) ?? writeDefault; // Default to true if not specified
    let allowOverwrite = getFlag(options, keys, "allowOverwrite", mustBeBoolean);
    let mangleCache = getFlag(options, keys, "mangleCache", mustBeObject);
    keys.plugins = true; // "plugins" has already been read earlier
    checkForInvalidFlags(options, keys, `in ${callName}() call`);

    if (sourcemap) flags.push(`--sourcemap${sourcemap === true ? "" : `=${sourcemap}`}`);
    if (bundle) flags.push("--bundle");
    if (allowOverwrite) flags.push("--allow-overwrite");
    if (splitting) flags.push("--splitting");
    if (preserveSymlinks) flags.push("--preserve-symlinks");
    if (metafile) flags.push(`--metafile`);
    if (outfile) flags.push(`--outfile=${outfile}`);
    if (outdir) flags.push(`--outdir=${outdir}`);
    if (outbase) flags.push(`--outbase=${outbase}`);
    if (tsconfig) flags.push(`--tsconfig=${tsconfig}`);
    if (packages) flags.push(`--packages=${packages}`);
    if (resolveExtensions) {
        let values: string[] = [];
        for (let value of resolveExtensions) {
            validateStringValue(value, "resolve extension");
            if (value.indexOf(",") >= 0) throw new Error(`Invalid resolve extension: ${value}`);
            values.push(value);
        }
        flags.push(`--resolve-extensions=${values.join(",")}`);
    }
    if (publicPath) flags.push(`--public-path=${publicPath}`);
    if (entryNames) flags.push(`--entry-names=${entryNames}`);
    if (chunkNames) flags.push(`--chunk-names=${chunkNames}`);
    if (assetNames) flags.push(`--asset-names=${assetNames}`);
    if (mainFields) {
        let values: string[] = [];
        for (let value of mainFields) {
            validateStringValue(value, "main field");
            if (value.indexOf(",") >= 0) throw new Error(`Invalid main field: ${value}`);
            values.push(value);
        }
        flags.push(`--main-fields=${values.join(",")}`);
    }
    if (conditions) {
        let values: string[] = [];
        for (let value of conditions) {
            validateStringValue(value, "condition");
            if (value.indexOf(",") >= 0) throw new Error(`Invalid condition: ${value}`);
            values.push(value);
        }
        flags.push(`--conditions=${values.join(",")}`);
    }
    if (external) for (let name of external) flags.push(`--external:${validateStringValue(name, "external")}`);
    if (alias) {
        for (let old in alias) {
            if (old.indexOf("=") >= 0) throw new Error(`Invalid package name in alias: ${old}`);
            flags.push(`--alias:${old}=${validateStringValue(alias[old], "alias", old)}`);
        }
    }
    if (banner) {
        for (let type in banner) {
            if (type.indexOf("=") >= 0) throw new Error(`Invalid banner file type: ${type}`);
            flags.push(`--banner:${type}=${validateStringValue(banner[type], "banner", type)}`);
        }
    }
    if (footer) {
        for (let type in footer) {
            if (type.indexOf("=") >= 0) throw new Error(`Invalid footer file type: ${type}`);
            flags.push(`--footer:${type}=${validateStringValue(footer[type], "footer", type)}`);
        }
    }
    if (inject) for (let path of inject) flags.push(`--inject:${validateStringValue(path, "inject")}`);
    if (loader) {
        for (let ext in loader) {
            if (ext.indexOf("=") >= 0) throw new Error(`Invalid loader extension: ${ext}`);
            flags.push(`--loader:${ext}=${validateStringValue(loader[ext], "loader", ext)}`);
        }
    }
    if (outExtension) {
        for (let ext in outExtension) {
            if (ext.indexOf("=") >= 0) throw new Error(`Invalid out extension: ${ext}`);
            flags.push(`--out-extension:${ext}=${validateStringValue(outExtension[ext], "out extension", ext)}`);
        }
    }

    if (entryPoints) {
        if (Array.isArray(entryPoints)) {
            for (let i = 0, n = entryPoints.length; i < n; i++) {
                let entryPoint = entryPoints[i];
                if (typeof entryPoint === "object" && entryPoint !== null) {
                    let entryPointKeys: OptionKeys = Object.create(null);
                    let input = getFlag(entryPoint, entryPointKeys, "in", mustBeString);
                    let output = getFlag(entryPoint, entryPointKeys, "out", mustBeString);
                    checkForInvalidFlags(entryPoint, entryPointKeys, "in entry point at index " + i);
                    if (input === undefined) throw new Error('Missing property "in" for entry point at index ' + i);
                    if (output === undefined) throw new Error('Missing property "out" for entry point at index ' + i);
                    entries.push([output, input]);
                } else {
                    entries.push(["", validateStringValue(entryPoint, "entry point at index " + i)]);
                }
            }
        } else {
            for (let key in entryPoints) {
                entries.push([key, validateStringValue(entryPoints[key], "entry point", key)]);
            }
        }
    }

    if (stdin) {
        let stdinKeys: OptionKeys = Object.create(null);
        let contents = getFlag(stdin, stdinKeys, "contents", mustBeStringOrUint8Array);
        let resolveDir = getFlag(stdin, stdinKeys, "resolveDir", mustBeString);
        let sourcefile = getFlag(stdin, stdinKeys, "sourcefile", mustBeString);
        let loader = getFlag(stdin, stdinKeys, "loader", mustBeString);
        checkForInvalidFlags(stdin, stdinKeys, 'in "stdin" object');

        if (sourcefile) flags.push(`--sourcefile=${sourcefile}`);
        if (loader) flags.push(`--loader=${loader}`);
        if (resolveDir) stdinResolveDir = resolveDir;
        if (typeof contents === "string") stdinContents = protocol.encodeUTF8(contents);
        else if (contents instanceof Uint8Array) stdinContents = contents;
    }

    let nodePaths: string[] = [];
    if (nodePathsInput) {
        for (let value of nodePathsInput) {
            value += "";
            nodePaths.push(value);
        }
    }

    return {
        entries,
        flags,
        write,
        stdinContents,
        stdinResolveDir,
        absWorkingDir,
        nodePaths,
        mangleCache: validateMangleCache(mangleCache),
    };
}

export const ESBUILD_VERSION = "0.18.18";
