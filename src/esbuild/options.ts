import { Static, Type } from "@sinclair/typebox";
import type esbuild from "esbuild";

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
    Type.Literal("local-css"),
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

const TsconfigRaw = Type.Union([
    Type.String(),
    Type.Object({
        compilerOptions: Type.Optional(Type.Object({
            alwaysStrict: Type.Optional(Type.Boolean()),
            baseUrl: Type.Optional(Type.String()),
            experimentalDecorators: Type.Optional(Type.Boolean()),
            importsNotUsedAsValues: Type.Optional(Type.Union([
                Type.Literal("remove"),
                Type.Literal("preserve"),
                Type.Literal("error"),
            ])),
            jsx: Type.Optional(Type.Union([
                Type.Literal("preserve"),
                Type.Literal("react-native"),
                Type.Literal("react"),
                Type.Literal("react-jsx"),
                Type.Literal("react-jsxdev"),
            ])),
            jsxFactory: Type.Optional(Type.String()),
            jsxFragmentFactory: Type.Optional(Type.String()),
            jsxImportSource: Type.Optional(Type.String()),
            paths: Type.Optional(Type.Record(Type.String(), Type.Array(Type.String()))),
            preserveValueImports: Type.Optional(Type.Boolean()),
            strict: Type.Optional(Type.Boolean()),
            target: Type.Optional(Type.String()),
            useDefineForClassFields: Type.Optional(Type.Boolean()),
            verbatimModuleSyntax: Type.Optional(Type.Boolean()),
        })),
    }),
]);
type TsconfigRaw = Static<typeof TsconfigRaw>;

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
    dropLabels: Type.Array(Type.String()),
    minify: Type.Boolean(),
    minifyWhitespace: Type.Boolean(),
    minifyIdentifiers: Type.Boolean(),
    minifySyntax: Type.Boolean(),
    lineLimit: Type.Number(),
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
    tsconfigRaw: TsconfigRaw,

    // BuildOptions
    bundle: Type.Boolean(),
    splitting: Type.Boolean(),
    preserveSymlinks: Type.Boolean(),
    outfile: Type.String(),
    metafile: Type.Boolean(),
    outdir: Type.String(),
    outbase: Type.String(),
    external: Type.Array(Type.String()),
    packages: Type.Union([Type.Literal("external"), Type.Literal("bundle")]),
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
        Type.Array(Type.Union([
            Type.String(),
            Type.Object({ in: Type.String(), out: Type.String() }),
        ])),
        Type.Record(Type.String(), Type.String()),
    ]),
    absWorkingDir: Type.String(),
    nodePaths: Type.Array(Type.String()),
    absPaths: Type.Array(Type.Union([Type.Literal("code"), Type.Literal("log"), Type.Literal("metafile")])),
}));

export type BuildOptions = Static<typeof BuildOptions>;

{
    type Complete<T> = {
        [K in keyof Required<T>]: T[K];
    };

    type OmittedOptions = "stdin" | "plugins";
    type EsbuildBuildOptions = Omit<esbuild.BuildOptions, OmittedOptions>;

    type RegExpToString<T> = T extends RegExp ? SerializableRegExp
        : T extends (infer U)[] ? RegExpToString<U>[]
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
        ...options,
        mangleProps: convertRegExp(options.mangleProps),
        reserveProps: convertRegExp(options.reserveProps),
    };
}
