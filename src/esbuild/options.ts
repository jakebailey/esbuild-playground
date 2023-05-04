import { Static, Type } from "@sinclair/typebox";
import type esbuild from "esbuild-wasm";

const Platform = Type.Union([
    Type.Literal("browser"),
    Type.Literal("node"),
    Type.Literal("neutral"),
]);

const Format = Type.Union([
    Type.Literal("iife"),
    Type.Literal("cjs"),
    Type.Literal("esm"),
]);

const Loader = Type.Union([
    Type.Literal("base64"),
    Type.Literal("binary"),
    Type.Literal("copy"),
    Type.Literal("css"),
    Type.Literal("dataurl"),
    Type.Literal("default"),
    Type.Literal("empty"),
    Type.Literal("file"),
    Type.Literal("js"),
    Type.Literal("json"),
    Type.Literal("jsx"),
    Type.Literal("text"),
    Type.Literal("ts"),
    Type.Literal("tsx"),
]);

const LogLevel = Type.Union([
    Type.Literal("verbose"),
    Type.Literal("debug"),
    Type.Literal("info"),
    Type.Literal("warning"),
    Type.Literal("error"),
    Type.Literal("silent"),
]);

const Charset = Type.Union([Type.Literal("ascii"), Type.Literal("utf8")]);

const Drop = Type.Union([
    Type.Literal("console"),
    Type.Literal("debugger"),
]);

const SerializableRegExp = Type.Object({
    pattern: Type.String({ format: "regex" }),
    flags: Type.Optional(Type.String()),
});
type SerializableRegExp = Static<typeof SerializableRegExp>;

export const BuildOptions = Type.Partial(Type.Object({
    // CommonOptions
    sourcemap: Type.Union([
        Type.Boolean(),
        Type.Literal("linked"),
        Type.Literal("inline"),
        Type.Literal("external"),
        Type.Literal("both"),
    ]),
    legalComments: Type.Union([
        Type.Literal("none"),
        Type.Literal("inline"),
        Type.Literal("eof"),
        Type.Literal("linked"),
        Type.Literal("external"),
    ]),
    sourceRoot: Type.String(),
    sourcesContent: Type.Boolean(),
    format: Format,
    globalName: Type.String(),
    target: Type.Union([Type.String(), Type.Array(Type.String())]),
    supported: Type.Record(Type.String(), Type.Boolean()),
    platform: Platform,
    mangleProps: SerializableRegExp,
    reserveProps: SerializableRegExp,
    mangleQuoted: Type.Boolean(),
    mangleCache: Type.Record(Type.String(), Type.Union([Type.String(), Type.Literal(false)])),
    drop: Type.Array(Drop),
    minify: Type.Boolean(),
    minifyWhitespace: Type.Boolean(),
    minifyIdentifiers: Type.Boolean(),
    minifySyntax: Type.Boolean(),
    charset: Charset,
    treeShaking: Type.Boolean(),
    ignoreAnnotations: Type.Boolean(),
    jsx: Type.Union([Type.Literal("transform"), Type.Literal("preserve"), Type.Literal("automatic")]),
    jsxFactory: Type.String(),
    jsxFragment: Type.String(),
    jsxImportSource: Type.String(),
    jsxDev: Type.Boolean(),
    jsxSideEffects: Type.Boolean(),
    define: Type.Record(Type.String(), Type.String()),
    pure: Type.Array(Type.String()),
    keepNames: Type.Boolean(),
    color: Type.Boolean(),
    logLevel: LogLevel,
    logLimit: Type.Number(),
    logOverride: Type.Record(Type.String(), LogLevel),

    // BuildOptions
    bundle: Type.Boolean(),
    splitting: Type.Boolean(),
    preserveSymlinks: Type.Boolean(),
    outfile: Type.String(),
    metafile: Type.Boolean(),
    outdir: Type.String(),
    outbase: Type.String(),
    external: Type.Array(Type.String()),
    packages: Type.Literal("external"),
    alias: Type.Record(Type.String(), Type.String()),
    loader: Type.Record(Type.String(), Loader),
    resolveExtensions: Type.Array(Type.String()),
    mainFields: Type.Array(Type.String()),
    conditions: Type.Array(Type.String()),
    write: Type.Boolean(),
    allowOverwrite: Type.Boolean(),
    tsconfig: Type.String(),
    outExtension: Type.Record(Type.String(), Type.String()),
    publicPath: Type.String(),
    entryNames: Type.String(),
    chunkNames: Type.String(),
    assetNames: Type.String(),
    inject: Type.Array(Type.String()),
    banner: Type.Record(Type.String(), Type.String()),
    footer: Type.Record(Type.String(), Type.String()),
    entryPoints: Type.Union([
        Type.Array(Type.String()),
        Type.Record(Type.String(), Type.String()),
        Type.Array(Type.Object({ in: Type.String(), out: Type.String() })),
    ]),
    absWorkingDir: Type.String(),
    nodePaths: Type.Array(Type.String()),
}));

export type BuildOptions = Static<typeof BuildOptions>;

type Complete<T> = {
    [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>> ? T[P] : (T[P] | undefined);
};

type OmittedOptions = "stdin" | "plugins";
type EsbuildBuildOptions = Omit<esbuild.BuildOptions, OmittedOptions>;

{
    type RegExpToString<T> = T extends RegExp ? SerializableRegExp
        : T extends Array<infer U> ? RegExpToString<U>[]
        : T extends {} ? { [K in keyof T]: RegExpToString<T[K]>; }
        : T;
    type ExpectedOptions = Complete<RegExpToString<EsbuildBuildOptions>>;
    type ActualOptions = Complete<BuildOptions>;

    function _(x: ExpectedOptions, y: ActualOptions) {
        x = y;
        y = x;
    }
}

function convertRegExp(r: SerializableRegExp | undefined): RegExp | undefined {
    return r !== undefined ? new RegExp(r.pattern, r.flags) : undefined;
}

export function convert(options: BuildOptions): esbuild.BuildOptions {
    return {
        sourcemap: options.sourcemap,
        legalComments: options.legalComments,
        sourceRoot: options.sourceRoot,
        sourcesContent: options.sourcesContent,
        format: options.format,
        globalName: options.globalName,
        target: options.target,
        supported: options.supported,
        platform: options.platform,
        mangleProps: convertRegExp(options.mangleProps),
        reserveProps: convertRegExp(options.reserveProps),
        mangleQuoted: options.mangleQuoted,
        mangleCache: options.mangleCache,
        drop: options.drop,
        minify: options.minify,
        minifyWhitespace: options.minifyWhitespace,
        minifyIdentifiers: options.minifyIdentifiers,
        minifySyntax: options.minifySyntax,
        charset: options.charset,
        treeShaking: options.treeShaking,
        ignoreAnnotations: options.ignoreAnnotations,
        jsx: options.jsx,
        jsxFactory: options.jsxFactory,
        jsxFragment: options.jsxFragment,
        jsxImportSource: options.jsxImportSource,
        jsxDev: options.jsxDev,
        jsxSideEffects: options.jsxSideEffects,
        define: options.define,
        pure: options.pure,
        keepNames: options.keepNames,
        color: options.color,
        logLevel: options.logLevel,
        logLimit: options.logLimit,
        logOverride: options.logOverride,
        bundle: options.bundle,
        splitting: options.splitting,
        preserveSymlinks: options.preserveSymlinks,
        outfile: options.outfile,
        metafile: options.metafile,
        outdir: options.outdir,
        outbase: options.outbase,
        external: options.external,
        packages: options.packages,
        alias: options.alias,
        loader: options.loader,
        resolveExtensions: options.resolveExtensions,
        mainFields: options.mainFields,
        conditions: options.conditions,
        write: options.write,
        allowOverwrite: options.allowOverwrite,
        tsconfig: options.tsconfig,
        outExtension: options.outExtension,
        publicPath: options.publicPath,
        entryNames: options.entryNames,
        chunkNames: options.chunkNames,
        assetNames: options.assetNames,
        inject: options.inject,
        banner: options.banner,
        footer: options.footer,
        entryPoints: options.entryPoints,
        absWorkingDir: options.absWorkingDir,
        nodePaths: options.nodePaths,
    } satisfies Complete<EsbuildBuildOptions>;
}